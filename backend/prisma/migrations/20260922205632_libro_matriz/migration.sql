-- CreateTable
CREATE TABLE "InscripcionLibroMatriz" (
    "id" TEXT NOT NULL,
    "libro" TEXT NOT NULL,
    "anio" INTEGER NOT NULL,
    "numeroCorrelativo" INTEGER NOT NULL,
    "alumnoId" TEXT NOT NULL,
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "claveUnicidadActiva" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InscripcionLibroMatriz_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InscripcionLibroMatriz_claveUnicidadActiva_key" ON "InscripcionLibroMatriz"("claveUnicidadActiva");

-- CreateIndex
CREATE UNIQUE INDEX "InscripcionLibroMatriz_libro_anio_numeroCorrelativo_key" ON "InscripcionLibroMatriz"("libro", "anio", "numeroCorrelativo");

-- AddForeignKey
ALTER TABLE "InscripcionLibroMatriz" ADD CONSTRAINT "InscripcionLibroMatriz_alumnoId_fkey" FOREIGN KEY ("alumnoId") REFERENCES "Alumno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
