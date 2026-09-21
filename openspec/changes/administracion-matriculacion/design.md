# Design

## Context

Este change se apoya en la base técnica ya definida (monolito modular Node.js/TypeScript, PostgreSQL/Prisma, `identity/access-control`) y en el cálculo de habilitación ya especificado en `secretaria-academica/materias-previas` (tope de 3 materias adeudadas). Ver `proposal.md - Why` para la motivación. Es el primer change que introduce un rol de Administración.

## Goals / Non-Goals

**Goals:**
- Reutilizar el cálculo de habilitación de `materias-previas` sin duplicar la regla del tope en un segundo lugar.
- Mantener matriculación y libro matriz como registros independientes, consultables juntos pero sin fusionarlos.

**Non-Goals:**
- No se diseña en este change ningún aspecto de cobro (montos, medios de pago, comprobantes) — se deja explícitamente para un change futuro si la escuela lo pide.
- No existe ningún mecanismo de excepción al bloqueo: la dirección confirmó que ni siquiera Dirección puede autorizar matricular a un alumno con más de 3 materias adeudadas. El bloqueo es absoluto e incondicional.

## Decisions

### Reutilización directa del cálculo de habilitación, no una copia del tope
`administracion/matriculacion` consulta el mismo cálculo de habilitación que ya usa `secretaria-academica/materias-previas` para la promoción (mismo tope, misma fuente de configuración normativa), en lugar de mantener un segundo valor de "tope de materias" en el módulo de Administración. Si el tope normativo cambia (como ya pasó con la Resolución 11/2025), se actualiza en un solo lugar y ambos módulos lo reflejan.

### Matriculación como entidad propia, vinculada pero no fusionada con el libro matriz
Se modela `Matriculación` como tabla separada de la inscripción del libro matriz, vinculada por alumno y período pero sin depender una de la otra para existir. Esto refleja la realidad institucional confirmada por la dirección: son trámites distintos (uno académico/legal, a cargo de Secretaría; otro administrativo, a cargo de Administración) que en la práctica deberían coincidir en el tiempo pero no son la misma operación en el sistema.

## Risks / Trade-offs

- [Riesgo] Un bloqueo absoluto sin excepción podría dejar sin salida dentro del sistema un caso institucional legítimo pero atípico (por ejemplo, una resolución especial) → Mitigación: decisión explícita de la dirección, no un descuido de diseño; si la política cambia en el futuro, se trataría como un nuevo requisito, no como un ajuste de este bloqueo.
- [Riesgo] Matriculación y libro matriz podrían desincronizarse en la práctica (alumno matriculado sin inscripción en libro matriz, o viceversa) → Mitigación: la spec ya prevé mostrar ambos estados por separado en la consulta, para que Secretaría Académica y Administración puedan detectar y resolver la discrepancia manualmente.

## Open Questions

- Si Secretaría Académica necesita ver el estado de matriculación de Administración (y no solo al revés) — no cambia el modelo de datos, es una decisión de qué pantallas exponer en el frontend.
