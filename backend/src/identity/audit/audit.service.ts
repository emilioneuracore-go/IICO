import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuditService {
  constructor(private readonly prisma: PrismaService) {}

  async registrar(usuarioId: string, accion: string, entidad: string, entidadId: string) {
    return this.prisma.registroAuditoria.create({
      data: { usuarioId, accion, entidad, entidadId },
    });
  }

  async historialDe(entidad: string, entidadId: string) {
    return this.prisma.registroAuditoria.findMany({
      where: { entidad, entidadId },
      orderBy: { fecha: 'asc' },
      include: { usuario: { select: { email: true } } },
    });
  }
}
