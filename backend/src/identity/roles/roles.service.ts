import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  async crearRol(nombre: string) {
    const existente = await this.prisma.rol.findUnique({ where: { nombre } });
    if (existente) {
      throw new ConflictException(`El rol "${nombre}" ya existe`);
    }
    return this.prisma.rol.create({ data: { nombre } });
  }

  async listarRoles() {
    return this.prisma.rol.findMany({ include: { permisos: { include: { permiso: true } } } });
  }
}
