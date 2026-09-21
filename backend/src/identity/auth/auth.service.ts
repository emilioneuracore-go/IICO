import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../prisma/prisma.service';

export interface AuthenticatedUser {
  id: string;
  email: string;
  roles: string[];
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateCredentials(email: string, password: string): Promise<AuthenticatedUser> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email },
      include: { roles: { include: { rol: true } } },
    });

    if (!usuario || !usuario.activo) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordValida = await bcrypt.compare(password, usuario.passwordHash);
    if (!passwordValida) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return {
      id: usuario.id,
      email: usuario.email,
      roles: usuario.roles.map((ur) => ur.rol.nombre),
    };
  }

  async login(email: string, password: string): Promise<{ accessToken: string; user: AuthenticatedUser }> {
    const user = await this.validateCredentials(email, password);
    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      roles: user.roles,
    });
    return { accessToken, user };
  }

  async createUsuario(email: string, password: string, roles: string[] = []): Promise<AuthenticatedUser> {
    const passwordHash = await bcrypt.hash(password, 10);
    const usuario = await this.prisma.usuario.create({
      data: {
        email,
        passwordHash,
        roles: {
          create: roles.map((rolNombre) => ({
            rol: {
              connectOrCreate: {
                where: { nombre: rolNombre },
                create: { nombre: rolNombre },
              },
            },
          })),
        },
      },
      include: { roles: { include: { rol: true } } },
    });

    return {
      id: usuario.id,
      email: usuario.email,
      roles: usuario.roles.map((ur) => ur.rol.nombre),
    };
  }
}
