import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { IdentityModule } from './identity/identity.module';
import { MateriasModule } from './secretaria-academica/materias/materias.module';
import { LegajosAlumnosModule } from './secretaria-academica/legajos-alumnos/legajos-alumnos.module';
import { LibroMatrizModule } from './secretaria-academica/libro-matriz/libro-matriz.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    IdentityModule,
    MateriasModule,
    LegajosAlumnosModule,
    LibroMatrizModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
