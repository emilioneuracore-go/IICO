# Design

## Context

Módulo independiente que solo depende de `identity/access-control` para roles (docente, directivo, Secretaría). Ver `proposal.md - Why`. A diferencia de otros changes, acá el riesgo principal no es de negocio sino de concurrencia: dos docentes podrían intentar reservar el mismo recurso para la misma franja casi al mismo tiempo.

## Goals / Non-Goals

**Goals:**
- Garantizar que nunca queden dos reservas confirmadas superpuestas para el mismo espacio/elemento, incluso ante solicitudes simultáneas.
- Mantener el modelo simple: cada espacio/elemento del catálogo es una unidad reservable individual (sin cantidades ni sub-unidades).

**Non-Goals:**
- No se implementa un flujo de aprobación (se descartó: confirmación automática).
- No se modela reserva recurrente/periódica (por ejemplo, "todos los martes a las 10hs") en esta primera versión; cada reserva es puntual.

## Decisions

### Prevención de superposición a nivel de base de datos, no solo de aplicación
La verificación de superposición horaria se refuerza con una restricción a nivel de base de datos (por ejemplo, un índice de exclusión por rango de tiempo en PostgreSQL) además de la validación en la capa de aplicación. Esto evita una condición de carrera donde dos solicitudes de reserva simultáneas para el mismo recurso pasen ambas la validación en memoria antes de que la primera se guarde. Alternativa considerada: solo validar en la capa de aplicación con una transacción — se descarta como única defensa porque no es tan robusta ante alta concurrencia real como una restricción de la propia base de datos.

### Espacio y elemento como el mismo tipo de entidad reservable
`recursos/catalogo` modela espacios y elementos con la misma estructura (un campo "tipo" los distingue), y `recursos/reservas` opera sobre "un recurso reservable" genérico, sin lógica distinta para espacios vs. elementos. Esto evita duplicar las reglas de superposición y disponibilidad para cada tipo.

## Risks / Trade-offs

- [Riesgo] Sin reservas recurrentes, un docente que usa el mismo espacio todas las semanas debe reservar cada vez → Mitigación: aceptable para esta primera versión; se puede agregar recurrencia en un change posterior sin romper el modelo actual (una reserva recurrente se traduciría en múltiples reservas puntuales).
- [Riesgo] Sin aprobación, un uso indebido del catálogo (reservas abusivas) no tiene control humano en el momento → Mitigación: fuera de alcance según lo confirmado; se puede revisar si la escuela reporta un problema real de uso.

## Open Questions

- Si conviene soportar reservas recurrentes en el futuro — no bloquea este change.
