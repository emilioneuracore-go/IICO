# Proposal

## Why

El Ministerio de Educación de la provincia de Córdoba exige que las escuelas mantengan cargados calificaciones e inasistencias en el SGE (Sistema de Gestión de Estudiantes) oficial. Sin una importación hacia IICO, Secretaría Académica terminaría cargando la misma información dos veces (una en el SGE para cumplir con la normativa provincial, otra en IICO para uso interno), duplicando trabajo y arriesgando que ambos sistemas queden desincronizados. Importar desde el SGE resuelve esto: IICO refleja lo que ya es oficial ante el Ministerio, sin duplicar la carga manual.

## What Changes

- Se agrega el registro de **inasistencias** de alumnos por materia y fecha (`secretaria-academica/asistencia`), que hasta ahora no existía como capability en IICO y es necesario como destino de la información importada.
- Se agrega la **importación de archivos exportados del SGE** con calificaciones e inasistencias (`integraciones/importacion-sge`):
  - El SGE entrega los datos como archivo exportado manualmente (no hay API); personal de Secretaría Académica sube ese archivo a IICO.
  - El sistema procesa el archivo, identifica a qué alumno, materia y fecha corresponde cada registro, y aplica los valores a la libreta de calificaciones y a las inasistencias.
  - **El SGE es la fuente de verdad**: cuando un dato importado choca con uno ya cargado manualmente en IICO para el mismo alumno/materia/fecha, el valor importado del SGE reemplaza al valor local, dejando trazabilidad de que ese reemplazo vino de una importación.
  - El sistema informa un resumen de la importación (registros aplicados, reemplazados, y con errores) para que Secretaría Académica pueda revisarlo.

Fuera de alcance de este change: integración automática por API con el SGE (hoy no existe: la vía es archivo manual), envío de datos desde IICO hacia el SGE (esta importación es de solo lectura del lado del SGE), y la definición del formato exacto del archivo del SGE columna por columna (se deja como pregunta abierta hasta contar con un archivo de ejemplo real).

## Capabilities

### New Capabilities
- `secretaria-academica/asistencia`: registro y consulta de inasistencias de un alumno por materia y fecha.
- `integraciones/importacion-sge`: importación de archivos exportados del SGE con calificaciones e inasistencias, con el SGE como fuente de verdad ante conflictos con datos cargados manualmente en IICO.

### Modified Capabilities
(ninguna — `secretaria-academica/libreta-calificaciones` todavía no está archivada como spec principal; esta propuesta se apoya en ella como destino de la importación de calificaciones, pero no modifica sus requisitos)

## Impact

- **Datos**: nueva entidad de Inasistencia (alumno, materia, fecha), y un registro de Importación SGE (archivo procesado, fecha, resumen de resultados, usuario que la ejecutó).
- **Integración**: `integraciones/importacion-sge` escribe sobre `secretaria-academica/libreta-calificaciones` (calificaciones) y sobre la nueva `secretaria-academica/asistencia` (inasistencias); ambas deben registrar cuándo un valor proviene de una importación del SGE en lugar de una carga manual.
- **Roles**: la importación queda restringida a personal de Secretaría Académica autorizado.
- **Riesgo normativo/formato**: el formato del archivo del SGE no está confirmado técnicamente todavía; se deja como pregunta abierta en `design.md`.
