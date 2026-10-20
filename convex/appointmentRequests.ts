import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { recordAuditLog } from "./lib/audit";
import { validateAppointmentRequest } from "../shared/appointmentRequest";

// Intentionally no public get/list endpoint or record ID in the receipt.
export const submit = mutation({
  args: {
    name: v.string(),
    phoneNumber: v.string(),
    preferredDate: v.string(),
  },
  returns: v.union(
    v.object({ saved: v.literal(true) }),
    v.object({
      saved: v.literal(false),
      errors: v.object({
        name: v.optional(v.string()),
        phoneNumber: v.optional(v.string()),
        preferredDate: v.optional(v.string()),
      }),
    }),
  ),
  handler: async (ctx, args) => {
    const errors = validateAppointmentRequest(args);
    if (Object.keys(errors).length > 0) return { saved: false as const, errors };

    const requestId = await ctx.db.insert("appointment_requests", {
      name: args.name.trim(),
      phoneNumber: args.phoneNumber.trim(),
      preferredDate: args.preferredDate,
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
    return { saved: true as const };
  },
});
