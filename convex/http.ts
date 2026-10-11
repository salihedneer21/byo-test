import { httpRouter } from "convex/server";
import { registerStaticRoutes } from "@convex-dev/static-hosting";
import { components } from "./_generated/api";
import { authClient, createAuth } from "./auth";
import { registerSpecodeRoutes } from "./specode/routes";

const http = httpRouter();

authClient.registerRoutes(http, createAuth, { cors: true });
registerStaticRoutes(http, components.selfHosting);

// Specode release routes (frontend uploads, health).
registerSpecodeRoutes(http);

export default http;