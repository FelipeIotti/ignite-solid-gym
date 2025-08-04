import { FastifyInstance } from "fastify";

import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { authenticateUserController } from "./authenticate-user.controller";
import { profileUserController } from "./profile-user.controller";
import { registerUserController } from "./register-user.controller";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", registerUserController);
  app.post("/sessions", authenticateUserController);

  // app.patch('/token/refresh', refresh)

  // /** Authenticated */
  app.get("/me", { onRequest: [verifyJwt] }, profileUserController);
}
