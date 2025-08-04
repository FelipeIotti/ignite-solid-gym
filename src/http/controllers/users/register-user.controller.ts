import { UserAlreadyExistsError } from "@/services/errors/user-already-exists-error";
import { makeRegisterUserService } from "@/services/factories/make-register-user-service";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function registerUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const registerUserService = makeRegisterUserService();

    await registerUserService.execute({ name, email, password });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(201).send("success");
}
