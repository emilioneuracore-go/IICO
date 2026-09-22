-- CreateEnum
CREATE TYPE "TipoPase" AS ENUM ('INGRESO', 'EGRESO');

-- CreateEnum
CREATE TYPE "EstadoPase" AS ENUM ('PENDIENTE', 'EN_PROCESO', 'COMPLETO');

-- CreateTable
CREATE TABLE "PaseEstudiante" (
    "id" TEXT NOT NULL,
    "tipo" "TipoPase" NOT NULL,
    "alumnoId" TEXT NOT NULL,
    "institucionOrigen" TEXT,
    "institucionDestino" TEXT,
    "documentacionOrigen" TEXT,
    "documentacionPase" TEXT,
    "estado" "EstadoPase" NOT NULL DEFAULT 'PENDIENTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completadoAt" TIMESTAMP(3),

    CONSTRAINT "PaseEstudiante_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PaseEstudiante" ADD CONSTRAINT "PaseEstudiante_alumnoId_fkey" FOREIGN KEY ("alumnoId") REFERENCES "Alumno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
