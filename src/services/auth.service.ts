import { HttpStatusCode } from "@/lib/http";
import prisma from "@/lib/prisma";
import { env } from "@/utils/env";
import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { UsersService } from "./users.service";

export class AuthService {
  private usersService: UsersService;
  constructor() {
    this.usersService = new UsersService();
  }

  async login(email: string, password: string): Promise<Response> {
    // Verificar o email e a senha do usuário (geralmente obtidos a partir de um banco de dados)
    const user = await this.validateUser(email, password);

    if (user instanceof Response) {
      return user;
    }

    // Gerar um token JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        roles: user.roles,
        name: user.name,
        image: user.image,
      },
      env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const cookieStore = cookies();

    cookieStore.set("fsio@token", `Bearer ${token}`, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    return Response.json(
      {
        message: "Usuário autenticado",
        status: HttpStatusCode.OK,
      },
      { status: HttpStatusCode.OK }
    );
  }

  async signUp({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) {
    return await this.usersService.create({
      email,
      password,
      name,
    });
  }

  private async validateUser(
    email: string,
    password: string
  ): Promise<User | Response> {
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      return Response.json(
        {
          message: "Usuário não encontrado",
        },
        {
          status: HttpStatusCode.UNAUTHORIZED,
        }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return Response.json(
        {
          message: "Senha incorreta",
        },
        {
          status: HttpStatusCode.UNAUTHORIZED,
        }
      );
    }

    return user;
  }

  async me(id: string) {
    const user = await this.usersService.findOne(id);
    return user;
  }
}
