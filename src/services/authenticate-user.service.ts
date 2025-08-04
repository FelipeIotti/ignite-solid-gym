import { UsersRepository } from "@/repositories/users-repository";
import { compare } from "bcryptjs";
import { User } from "generated/prisma";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

interface AuthenticateUserServiceRequestProps {
  email: string;
  password: string;
}

interface AuthenticateUserServiceResponseProps {
  user: User;
}

export class AuthenticateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUserServiceRequestProps): Promise<AuthenticateUserServiceResponseProps> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doestPasswordMatches = await compare(password, user.password_hash);

    if (!doestPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}
