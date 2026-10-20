import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Patient-data surface. Public access is create-only; no public reads.
  appointment_requests: defineTable({
    name: v.string(),
    phoneNumber: v.string(),
    email: v.optional(v.string()),
    preferredDate: v.string(),
    // Optional for historical requests created before submission receipts.
    submittedAt: v.optional(v.number()),
    status: v.literal("new"),
  }),
  audit_logs: defineTable({
    actor_id: v.optional(v.string()),
    action: v.union(v.literal("PHI_READ"), v.literal("PHI_WRITE")),
    resource_type: v.string(),
    resource_id: v.string(),
    patient_id: v.optional(v.string()),
    metadata: v.optional(
      v.record(v.string(), v.union(v.string(), v.number(), v.boolean()))
    ),
  })
    .index("by_actor", ["actor_id"])
    .index("by_patient", ["patient_id"])
    .index("by_resource_type_and_resource_id", ["resource_type", "resource_id"]),
});
