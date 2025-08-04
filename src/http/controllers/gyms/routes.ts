import { FastifyInstance } from "fastify";

import { verifyJwt } from "@/http/middlewares/verify-jwt";

import { verifyUserRole } from "@/http/middlewares/verify-user-role";
import { createGymController } from "./create-gym.controller";
import { nearbyGymsController } from "./nearby-gyms.controller";
import { searchGymController } from "./search-gym.controller";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  app.get("/gyms/search", searchGymController);
  app.get("/gyms/nearby", nearbyGymsController);

  app.post(
    "/gyms",
    { onRequest: [verifyUserRole("ADMIN")] },
    createGymController
  );
}
