import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { IdentityModule } from './identity/identity.module';
import { MateriasModule } from './secretaria-academica/materias/materias.module';
import { LegajosAlumnosModule } from './secretaria-academica/legajos-alumnos/legajos-alumnos.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    IdentityModule,
    MateriasModule,
    LegajosAlumnosModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
