// SPECODE-OWNED FILE. Production releases refuse to ship if it is changed.
//
// Registers the Specode routes on the app's HTTP router (convex/http.ts calls
// registerSpecodeRoutes(http) once).
import type { HttpRouter } from "convex/server";
import { health } from "./health";
import { finalizeRelease, uploadAsset } from "./uploader";

export function registerSpecodeRoutes(http: HttpRouter): void {
  http.route({ path: "/__specode/upload", method: "POST", handler: uploadAsset });
  http.route({ path: "/__specode/finalize", method: "POST", handler: finalizeRelease });
  http.route({ path: "/__specode/health", method: "GET", handler: health });
}
