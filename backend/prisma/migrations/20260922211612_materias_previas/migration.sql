-- CreateEnum
CREATE TYPE "EstadoMateriaAdeudada" AS ENUM ('ACTIVA', 'ACREDITADA');

-- CreateTable
CREATE TABLE "MateriaAdeudada" (
    "id" TEXT NOT NULL,
    "alumnoId" TEXT NOT NULL,
    "materiaId" TEXT NOT NULL,
    "tramoAnio" INTEGER,
    "estado" "EstadoMateriaAdeudada" NOT NULL DEFAULT 'ACTIVA',
    "actaOrigenId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "acreditadaAt" TIMESTAMP(3),

    CONSTRAINT "MateriaAdeudada_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanAcompanamiento" (
    "id" TEXT NOT NULL,
    "materiaAdeudadaId" TEXT NOT NULL,
    "docenteResponsableId" TEXT NOT NULL,
    "modalidad" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlanAcompanamiento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConfiguracionAcreditacion" (
    "id" TEXT NOT NULL,
    "clave" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConfiguracionAcreditacion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlanAcompanamiento_materiaAdeudadaId_key" ON "PlanAcompanamiento"("materiaAdeudadaId");

-- CreateIndex
CREATE UNIQUE INDEX "ConfiguracionAcreditacion_clave_key" ON "ConfiguracionAcreditacion"("clave");

-- AddForeignKey
ALTER TABLE "MateriaAdeudada" ADD CONSTRAINT "MateriaAdeudada_alumnoId_fkey" FOREIGN KEY ("alumnoId") REFERENCES "Alumno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MateriaAdeudada" ADD CONSTRAINT "MateriaAdeudada_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MateriaAdeudada" ADD CONSTRAINT "MateriaAdeudada_actaOrigenId_fkey" FOREIGN KEY ("actaOrigenId") REFERENCES "Acta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanAcompanamiento" ADD CONSTRAINT "PlanAcompanamiento_materiaAdeudadaId_fkey" FOREIGN KEY ("materiaAdeudadaId") REFERENCES "MateriaAdeudada"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanAcompanamiento" ADD CONSTRAINT "PlanAcompanamiento_docenteResponsableId_fkey" FOREIGN KEY ("docenteResponsableId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
