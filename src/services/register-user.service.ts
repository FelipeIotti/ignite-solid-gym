import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { User } from "generated/prisma";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface RegisterUserServiceRequestProps {
  name: string;
  email: string;
  password: string;
}

interface RegisterUserServiceResponseProps {
  user: User;
}

export class RegisterUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUserServiceRequestProps): Promise<RegisterUserServiceResponseProps> {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) throw new UserAlreadyExistsError();

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
    return { user };
  }
}
