// SPECODE-OWNED FILE. Production releases refuse to ship if it is changed.
//
// No-op functions Specode calls to confirm the production deploy key can NOT
// run internal functions or act as a user.
import { internalAction, internalMutation, internalQuery, query } from "../_generated/server";

export const internalQueryNoop = internalQuery({ args: {}, handler: async () => "ok" });
export const internalMutationNoop = internalMutation({ args: {}, handler: async () => "ok" });
export const internalActionNoop = internalAction({ args: {}, handler: async () => "ok" });
export const whoami = query({
  args: {},
  handler: async (ctx) => ((await ctx.auth.getUserIdentity()) ? "identity" : "anonymous"),
});
