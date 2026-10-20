import { v } from "convex/values";
import { internalAction, internalQuery, mutation } from "./_generated/server";
import { internal } from "./_generated/api";
import { recordAuditLog } from "./lib/audit";
import { todayDate, validateAppointmentRequest } from "../shared/appointmentRequest";

// Implementation detail: server callers use the audited action below.
// Server time defines a half-open UTC day, never the preferred appointment date.
export const _countSubmittedToday = internalQuery({
  args: {},
  returns: v.number(),
  handler: async (ctx): Promise<number> => {
    const start = Date.parse(`${todayDate()}T00:00:00.000Z`);
    const end = start + 24 * 60 * 60 * 1000;
    let count = 0;
    for await (const request of ctx.db.query("appointment_requests")) {
      const submittedAt = request.submittedAt ?? request._creationTime;
      if (submittedAt >= start && submittedAt < end) count += 1;
    }
    return count;
  },
});

// No public count endpoint until an authorized staff surface is approved.
// Audit must succeed before releasing even this numeric aggregate.
export const countSubmittedToday = internalAction({
  args: {},
  returns: v.number(),
  handler: async (ctx): Promise<number> => {
    const count = await ctx.runQuery(internal.appointmentRequests._countSubmittedToday, {});
    await ctx.runMutation(internal.lib.audit._record, {
      action: "PHI_READ",
      resource_type: "appointment_requests",
      resource_id: "*",
      metadata: { op: "count_today" },
    });
    return count;
  },
});

// Intentionally no public get/list endpoint or record ID in the receipt.
export const submit = mutation({
  args: {
    name: v.string(),
    phoneNumber: v.string(),
    email: v.optional(v.string()),
    preferredDate: v.string(),
  },
  returns: v.union(
    v.object({ saved: v.literal(true), submittedAt: v.number() }),
    v.object({
      saved: v.literal(false),
      errors: v.object({
        name: v.optional(v.string()),
        phoneNumber: v.optional(v.string()),
        email: v.optional(v.string()),
        preferredDate: v.optional(v.string()),
      }),
    }),
  ),
  handler: async (ctx, args) => {
    const errors = validateAppointmentRequest(args);
    if (Object.keys(errors).length > 0) return { saved: false as const, errors };

    const email = args.email?.trim();
    const submittedAt = Date.now();
    const requestId = await ctx.db.insert("appointment_requests", {
      name: args.name.trim(),
      phoneNumber: args.phoneNumber.trim(),
      ...(email ? { email } : {}),
      preferredDate: args.preferredDate,
      submittedAt,
      status: "new",
    });
    await recordAuditLog(ctx, {
      action: "PHI_WRITE",
      resource_type: "appointment_requests",
      resource_id: requestId,
      metadata: { op: "create" },
    });
    // The insert and audit are atomic. Anonymous callers have no fabricated
    // actor/patient identity. Never return submitted patient values.
    return { saved: true as const, submittedAt };
  },
});
