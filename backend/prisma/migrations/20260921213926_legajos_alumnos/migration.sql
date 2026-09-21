-- CreateEnum
CREATE TYPE "VinculoResponsable" AS ENUM ('MADRE', 'PADRE', 'TUTOR');

-- CreateTable
CREATE TABLE "Alumno" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "documento" TEXT NOT NULL,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,
    "domicilio" TEXT,
    "telefono" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Alumno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Responsable" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "telefono" TEXT,
    "email" TEXT,

    CONSTRAINT "Responsable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlumnoResponsable" (
    "alumnoId" TEXT NOT NULL,
    "responsableId" TEXT NOT NULL,
    "vinculo" "VinculoResponsable" NOT NULL,

    CONSTRAINT "AlumnoResponsable_pkey" PRIMARY KEY ("alumnoId","responsableId")
);

-- CreateTable
CREATE TABLE "LegajoHistorialCambio" (
    "id" TEXT NOT NULL,
    "alumnoId" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "campo" TEXT NOT NULL,
    "valorAnterior" TEXT,
    "valorNuevo" TEXT,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LegajoHistorialCambio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Alumno_documento_key" ON "Alumno"("documento");

-- AddForeignKey
ALTER TABLE "AlumnoResponsable" ADD CONSTRAINT "AlumnoResponsable_alumnoId_fkey" FOREIGN KEY ("alumnoId") REFERENCES "Alumno"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlumnoResponsable" ADD CONSTRAINT "AlumnoResponsable_responsableId_fkey" FOREIGN KEY ("responsableId") REFERENCES "Responsable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LegajoHistorialCambio" ADD CONSTRAINT "LegajoHistorialCambio_alumnoId_fkey" FOREIGN KEY ("alumnoId") REFERENCES "Alumno"("id") ON DELETE CASCADE ON UPDATE CASCADE;
