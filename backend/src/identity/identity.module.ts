import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { RolesService } from './roles/roles.service';
import { RolesController } from './roles/roles.controller';
import { AuditService } from './audit/audit.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';

// Módulo transversal (ver design.md - "Identidad y control de acceso como
// módulo transversal desde el inicio"): global para que cualquier otro
// módulo pueda usar JwtAuthGuard/RolesGuard/AuditService sin re-importarlo.
@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET', 'dev-secret-change-in-production'),
        signOptions: { expiresIn: '8h' },
      }),
    }),
  ],
  controllers: [AuthController, RolesController],
  providers: [AuthService, RolesService, AuditService, JwtAuthGuard, RolesGuard],
  exports: [AuthService, RolesService, AuditService, JwtModule, JwtAuthGuard, RolesGuard],
})
export class IdentityModule {}
