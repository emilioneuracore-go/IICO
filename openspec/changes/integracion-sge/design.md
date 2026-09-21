# Design

## Context

Este change se apoya en la base técnica ya definida (monolito modular Node.js/TypeScript, PostgreSQL/Prisma) y en las capabilities de `secretaria-academica/libreta-calificaciones` (calificaciones) y la nueva `secretaria-academica/asistencia` (inasistencias) como destino de la importación. Ver `proposal.md - Why` para la motivación normativa. El SGE es un sistema externo del Ministerio de Educación de Córdoba sobre el que IICO no tiene control ni acceso a su código o API.

## Goals / Non-Goals

**Goals:**
- Procesar un archivo exportado del SGE y aplicar sus calificaciones e inasistencias a IICO, sin intervención manual registro por registro.
- Que el mecanismo de importación sea tolerante al formato exacto del archivo del SGE, dado que todavía no se cuenta con un archivo de ejemplo real confirmado.
- Dejar trazabilidad completa de qué quedó importado, qué reemplazó a un dato manual, y qué no pudo procesarse.

**Non-Goals:**
- No se implementa una integración automática por API con el SGE (no existe esa vía hoy).
- No se envían datos desde IICO hacia el SGE.
- No se define en este change el mapeo columna por columna del archivo del SGE (ver Open Questions).

## Decisions

### Capa de parseo desacoplada del resto de la importación
El procesamiento se separa en dos etapas: (1) un parser específico del formato del archivo del SGE que lo traduce a una lista intermedia de registros neutros (alumno identificado por documento, materia, fecha, tipo de dato, valor), y (2) un aplicador genérico que toma esa lista intermedia y la vuelca sobre `libreta-calificaciones` y `asistencia`. Esto aísla el riesgo de que el formato exacto del SGE cambie o no esté totalmente confirmado: si cambia, solo se reemplaza el parser de la etapa 1, sin tocar la lógica de conflictos ni de trazabilidad de la etapa 2.

### Identificación de alumno por documento (DNI)
Dado que IICO y el SGE son sistemas distintos, se necesita una clave común para identificar al mismo alumno en ambos. Se usa el número de documento (DNI), ya registrado en `secretaria-academica/legajos-alumnos`, como clave de matching. Alternativa considerada: usar el número de libro matriz — se descarta porque es interno de IICO y el SGE no lo conoce.

### Mapeo de materias entre SGE e IICO
El SGE probablemente no representa materias compuestas (UTP con sus áreas) ni Proyectos Integrados de la misma forma que IICO. Se resuelve con una tabla de mapeo configurable (nombre/código de materia del SGE → materia o área de IICO), mantenida por Secretaría Académica, en lugar de asumir una correspondencia automática por nombre. Esto permite ajustar el mapeo sin cambios de código si el SGE nombra las materias de otra forma o las agrupa distinto.

### Importación idempotente por lote
Cada importación se identifica como un lote (batch) con su propio registro. Volver a subir el mismo archivo (por error, o porque el SGE lo reexporta con correcciones) se trata como una nueva importación que vuelve a aplicar el criterio "SGE es fuente de verdad", sin duplicar registros de calificación/inasistencia: se actualiza el valor vigente y se re-vincula al lote más reciente.

### Procesamiento síncrono con resumen inmediato
Dado el volumen esperado (una escuela, no una red de escuelas), el archivo se procesa de forma síncrona al subirlo y se devuelve el resumen al finalizar, sin necesidad de una cola de procesamiento en background. Si el volumen creciera significativamente, se puede mover a procesamiento asíncrono sin cambiar la spec (es un detalle de implementación).

## Risks / Trade-offs

- [Riesgo] El formato exacto del archivo del SGE no está confirmado → Mitigación: parser desacoplado (ver Decisions) para poder ajustarlo cuando se cuente con un archivo real, sin rediseñar el resto de la importación.
- [Riesgo] El mapeo de materias compuestas (UTP) y Proyectos Integrados entre SGE e IICO puede no ser uno a uno → Mitigación: tabla de mapeo configurable por Secretaría Académica en lugar de correspondencia automática.
- [Riesgo] Reemplazar silenciosamente un dato cargado manualmente por uno del SGE podría sorprender a quien lo cargó → Mitigación: trazabilidad obligatoria del origen (requirement ya especificado) para que quede claro que el valor vigente vino de una importación.
- [Riesgo] Un archivo mal exportado del SGE podría aplicar datos incorrectos masivamente → Mitigación: el resumen de la importación (aplicados/reemplazados/errores) permite a Secretaría Académica revisar el resultado antes de considerarlo definitivo; no se implementa en este change una función de "deshacer" un lote completo (ver Open Questions).

## Open Questions

- Formato exacto del archivo exportado por el SGE (columnas, codificación, si es CSV/Excel/otro) — se resuelve al obtener un archivo de ejemplo real; no bloquea la spec, que se definió en términos de "registros neutros" independientes del formato.
- Si hace falta una función explícita de "deshacer" un lote de importación completo — se deja pendiente; por ahora la corrección ante un error de importación sería una nueva importación correctiva o edición manual puntual.
- Con qué frecuencia se espera correr esta importación (diaria, semanal, por período de cierre) — no cambia el diseño, es un detalle operativo de Secretaría Académica.
