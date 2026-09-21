# Tasks

## 1. Inasistencias (`secretaria-academica/asistencia`)

- [ ] 1.1 Modelar en Prisma Inasistencia (alumno, materia, fecha, origen: manual/SGE) y verificar con migración aplicada
- [ ] 1.2 Implementar alta manual de inasistencia y verificar con un test
- [ ] 1.3 Implementar consulta de inasistencias por alumno filtrando por materia o rango de fechas, y verificar con un test

## 2. Parser del archivo SGE

- [ ] 2.1 Definir la interfaz de "registro neutro" (documento del alumno, materia/código SGE, fecha, tipo: calificación/inasistencia, valor) y verificar con un test de tipos/esquema
- [ ] 2.2 Implementar el parser del formato de archivo del SGE (a ajustar cuando se cuente con un archivo de ejemplo real) y verificar con un test usando un archivo de muestra
- [ ] 2.3 Implementar el rechazo de archivos con formato no reconocido y verificar con un test

## 3. Mapeo de materias SGE ↔ IICO

- [ ] 3.1 Modelar en Prisma la tabla de mapeo (código/nombre de materia SGE → materia o área de IICO) y verificar con migración aplicada
- [ ] 3.2 Implementar la carga/edición del mapeo por parte de Secretaría Académica y verificar con un test
- [ ] 3.3 Implementar la resolución de materia/área de IICO a partir del código SGE durante la importación, y verificar con un test que un registro sin mapeo configurado se reporta como error

## 4. Aplicador de importación

- [ ] 4.1 Modelar en Prisma el Lote de Importación SGE (fecha, usuario, archivo, resumen) y verificar con migración aplicada
- [ ] 4.2 Implementar la identificación de alumno por documento (DNI) y verificar con un test el caso de alumno no encontrado
- [ ] 4.3 Implementar la aplicación de calificaciones importadas sobre `libreta-calificaciones`, reemplazando el valor vigente y dejando trazabilidad del origen SGE y del lote, y verificar con un test el caso de reemplazo de una nota manual
- [ ] 4.4 Implementar la aplicación de inasistencias importadas sobre `asistencia`, con el mismo criterio de reemplazo y trazabilidad, y verificar con un test
- [ ] 4.5 Implementar el reintento idempotente de un mismo archivo (no duplica registros, actualiza al lote más reciente) y verificar con un test subiendo el mismo archivo dos veces
- [ ] 4.6 Implementar el resumen de resultados (aplicados, reemplazados, errores) y verificar con un test que refleja correctamente un archivo con casos mixtos

## 5. Acceso y auditoría

- [ ] 5.1 Restringir la subida y consulta de importaciones a personal de Secretaría Académica autorizado, y verificar con un test que un usuario sin rol es rechazado
- [ ] 5.2 Implementar la consulta del origen (manual/SGE + lote) de una calificación o inasistencia puntual, y verificar con un test

## 6. Frontend de importación

- [ ] 6.1 Implementar la pantalla de subida de archivo SGE con resumen de resultado, y verificar manualmente con un archivo de muestra válido y uno inválido
- [ ] 6.2 Implementar la pantalla de administración del mapeo de materias SGE ↔ IICO, y verificar manualmente el alta/edición de un mapeo

## 7. Verificación integral

- [ ] 7.1 Ejecutar la suite completa de tests automatizados de este change y verificar que todos pasan
- [ ] 7.2 Validar los artefactos de OpenSpec con `openspec validate --strict` para este change y verificar que no reporta errores
