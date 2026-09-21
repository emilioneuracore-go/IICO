-- CreateEnum
CREATE TYPE "DuracionMateria" AS ENUM ('ANUAL', 'BIANUAL', 'TRIANUAL');

-- CreateEnum
CREATE TYPE "ModalidadAcreditacion" AS ENUM ('POR_TRAMO', 'AL_FINAL_DEL_CICLO');

-- CreateEnum
CREATE TYPE "EscalaCalificacion" AS ENUM ('CUALITATIVA', 'CUANTITATIVA');

-- CreateTable
CREATE TABLE "Materia" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "duracion" "DuracionMateria" NOT NULL DEFAULT 'ANUAL',
    "modalidadAcreditacion" "ModalidadAcreditacion",
    "escalaEtapaIntermedia" "EscalaCalificacion",
    "escalaCierre" "EscalaCalificacion",

    CONSTRAINT "Materia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MateriaArea" (
    "id" TEXT NOT NULL,
    "materiaId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "docenteUsuarioId" TEXT,

    CONSTRAINT "MateriaArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MateriaVinculo" (
    "id" TEXT NOT NULL,
    "materiaAId" TEXT NOT NULL,
    "materiaBId" TEXT NOT NULL,

    CONSTRAINT "MateriaVinculo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MateriaArea_materiaId_nombre_key" ON "MateriaArea"("materiaId", "nombre");

-- CreateIndex
CREATE UNIQUE INDEX "MateriaVinculo_materiaAId_materiaBId_key" ON "MateriaVinculo"("materiaAId", "materiaBId");

-- AddForeignKey
ALTER TABLE "MateriaArea" ADD CONSTRAINT "MateriaArea_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MateriaArea" ADD CONSTRAINT "MateriaArea_docenteUsuarioId_fkey" FOREIGN KEY ("docenteUsuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MateriaVinculo" ADD CONSTRAINT "MateriaVinculo_materiaAId_fkey" FOREIGN KEY ("materiaAId") REFERENCES "Materia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MateriaVinculo" ADD CONSTRAINT "MateriaVinculo_materiaBId_fkey" FOREIGN KEY ("materiaBId") REFERENCES "Materia"("id") ON DELETE CASCADE ON UPDATE CASCADE;
