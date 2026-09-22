-- CreateEnum
CREATE TYPE "AlcanceActa" AS ENUM ('TRAMO', 'CICLO_COMPLETO');

-- CreateEnum
CREATE TYPE "EstadoActa" AS ENUM ('ABIERTA', 'CERRADA');

-- CreateEnum
CREATE TYPE "ResultadoActaAlumno" AS ENUM ('APROBADO', 'DESAPROBADO');

-- CreateTable
CREATE TABLE "LibroActas" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "anio" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LibroActas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Acta" (
    "id" TEXT NOT NULL,
    "libroActasId" TEXT NOT NULL,
    "materiaId" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "alcance" "AlcanceActa" NOT NULL,
    "tramoAnio" INTEGER,
    "estado" "EstadoActa" NOT NULL DEFAULT 'ABIERTA',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cerradaAt" TIMESTAMP(3),

    CONSTRAINT "Acta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActaDocente" (
    "actaId" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "ActaDocente_pkey" PRIMARY KEY ("actaId","usuarioId")
);

-- CreateTable
CREATE TABLE "ActaAlumno" (
    "id" TEXT NOT NULL,
    "actaId" TEXT NOT NULL,
    "alumnoId" TEXT NOT NULL,
    "nota" INTEGER,
    "resultado" "ResultadoActaAlumno",

    CONSTRAINT "ActaAlumno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CursadaMateria" (
    "id" TEXT NOT NULL,
    "alumnoId" TEXT NOT NULL,
    "materiaId" TEXT NOT NULL,
    "anio" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CursadaMateria_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LibroActas_nombre_anio_key" ON "LibroActas"("nombre", "anio");

-- CreateIndex
CREATE UNIQUE INDEX "ActaAlumno_actaId_alumnoId_key" ON "ActaAlumno"("actaId", "alumnoId");

-- CreateIndex
CREATE UNIQUE INDEX "CursadaMateria_alumnoId_materiaId_anio_key" ON "CursadaMateria"("alumnoId", "materiaId", "anio");

-- AddForeignKey
ALTER TABLE "Acta" ADD CONSTRAINT "Acta_libroActasId_fkey" FOREIGN KEY ("libroActasId") REFERENCES "LibroActas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Acta" ADD CONSTRAINT "Acta_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActaDocente" ADD CONSTRAINT "ActaDocente_actaId_fkey" FOREIGN KEY ("actaId") REFERENCES "Acta"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActaDocente" ADD CONSTRAINT "ActaDocente_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActaAlumno" ADD CONSTRAINT "ActaAlumno_actaId_fkey" FOREIGN KEY ("actaId") REFERENCES "Acta"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActaAlumno" ADD CONSTRAINT "ActaAlumno_alumnoId_fkey" FOREIGN KEY ("alumnoId") REFERENCES "Alumno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CursadaMateria" ADD CONSTRAINT "CursadaMateria_alumnoId_fkey" FOREIGN KEY ("alumnoId") REFERENCES "Alumno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CursadaMateria" ADD CONSTRAINT "CursadaMateria_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
