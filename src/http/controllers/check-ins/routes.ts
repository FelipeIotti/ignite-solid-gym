import { FastifyInstance } from "fastify";

import { verifyJwt } from "@/http/middlewares/verify-jwt";

import { verifyUserRole } from "@/http/middlewares/verify-user-role";
import { createCheckInController } from "./create-check-in.controller";
import { historyCheckInController } from "./history-check-in.controller";
import { metricsCheckInController } from "./metrics-check-in.controller";
import { validateCheckInController } from "./validate-check-in.controller";

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  app.get("/check-ins/history", historyCheckInController);
  app.get("/check-ins/metrics", metricsCheckInController);

  app.post("/gyms/:gymId/check-ins", createCheckInController);

  app.patch(
    "/check-ins/:checkInId/validate",
    { onRequest: [verifyUserRole("ADMIN")] },
    validateCheckInController
  );
}
