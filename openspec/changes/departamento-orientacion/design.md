# Design

## Context

Este change se apoya en la base técnica ya definida (monolito modular Node.js/TypeScript, PostgreSQL/Prisma, `identity/access-control`) y consume datos de `secretaria-academica/libreta-calificaciones`, `secretaria-academica/asistencia`, `convivencia/sanciones` y `familias/cuenta-familiar` en modo solo lectura. Ver `proposal.md - Why` para la motivación. A diferencia de los changes anteriores, este es el primero que necesita una confidencialidad por área funcional (Orientación + Dirección) y no solo por vínculo con el alumno.

## Goals / Non-Goals

**Goals:**
- Formalizar un rol "Orientación" y confirmar el uso de un rol "Dirección" (ya referenciado implícitamente en `convivencia/sanciones` e `institucional/calendario-comunicados`) en `identity/access-control`, sin modificar su comportamiento existente.
- Un único mecanismo de confidencialidad ("visible solo para Orientación + Dirección") reutilizable por `registros-propios`, `reuniones`, `informes` y `grupos`, en lugar de reinventarlo en cada capability.
- Que `orientacion/consulta-integral` sea una capa de agregación de solo lectura, sin duplicar datos de las capabilities de origen.

**Non-Goals:**
- No se define en este change ningún criterio clínico o pedagógico de cómo Orientación debe actuar; el sistema solo registra y organiza información.
- No se implementa un mecanismo de permisos granular por profesional individual dentro de Orientación (la dirección confirmó que el acceso es compartido dentro del área, no por profesional).
- No se expone la convocatoria de reuniones a la familia (confirmado por la dirección); un futuro change podría revisar esto si la escuela lo pide.

## Decisions

### Confidencialidad por área funcional, como capa sobre el modelo de roles existente
Se introduce el concepto de "área funcional confidencial" (Orientación) aplicado de manera uniforme: cualquier dato de las capabilities `orientacion/*` (salvo `consulta-integral`, que es de lectura hacia afuera) solo es visible para cuentas con rol Orientación o Dirección. Se implementa como una regla de autorización transversal (un guard que exige "rol Orientación o Dirección") en lugar de marcar cada registro con una lista de roles permitidos, para mantener la regla simple y uniforme entre `registros-propios`, `reuniones`, `informes` y `grupos`. No se modifica `identity/access-control`: se apoya en su extensibilidad de roles ya especificada.

### `orientacion/consulta-integral` como agregador, sin copiar datos
Sigue el mismo patrón ya usado en `familias/situacion-academica`: no se duplican calificaciones, inasistencias, sanciones ni datos de contacto en una tabla propia de Orientación; se consultan en tiempo real desde sus capabilities de origen y se combinan en la respuesta. Esto evita que la vista de Orientación quede desactualizada respecto de la fuente.

### Registros propios compartidos, sin distinción por autor en la lectura
Dado que la dirección confirmó que el acceso es compartido dentro de Orientación (no privado por profesional), no se modela ningún filtro adicional por autor al leer: el autor se guarda solo como metadato de trazabilidad, no como restricción de acceso.

### Grupos de seguimiento como entidad separada de curso/división
`orientacion/grupos` no reutiliza `secretaria-academica/cursos-divisiones`: un grupo de seguimiento es un agrupamiento ad-hoc definido por Orientación (puede cruzar cursos, ser más chico que un curso, o cambiar con el tiempo), mientras que curso/división es la unidad administrativa formal de Secretaría Académica. Mezclarlos obligaría a Secretaría Académica a exponer o modificar su modelo de cursos por necesidades de Orientación.

## Risks / Trade-offs

- [Riesgo] Un guard uniforme "Orientación o Dirección" es simple pero no distingue matices futuros (por ejemplo, si más adelante se quisiera que Dirección viera menos que Orientación) → Mitigación: aceptable para el alcance actual, confirmado por la dirección; se puede refinar en un change posterior sin romper la spec, que ya declara ambos roles de forma explícita.
- [Riesgo] `orientacion/consulta-integral` depende de la disponibilidad de varias capabilities de otros changes (`libreta-calificaciones`, `asistencia`, `sanciones`, `cuenta-familiar`); si alguna no está implementada aún, la vista integrada queda incompleta → Mitigación: se implementa de forma tolerante a fuentes faltantes (muestra lo disponible y señala qué falta), en lugar de fallar por completo.
- [Riesgo] Que la familia no vea ni la convocatoria de una reunión podría generar fricción si Orientación olvida avisar por otro medio → Mitigación: fuera del alcance técnico de este change; queda como proceso institucional a cargo de Orientación.

## Open Questions

- Si el rol "Dirección" necesita distinguirse en el futuro de un rol "Orientación" dentro de esta misma área confidencial (por ejemplo, que Dirección solo vea informes cerrados y no notas de seguimiento en curso) — no bloquea este change, que trata a ambos roles por igual según lo confirmado.
- Si conviene, más adelante, notificar a la familia por fuera del sistema (email/SMS) cuando se agenda una reunión — no bloquea este change, que no incluye canales externos de notificación (ver `changes/portal-familias/design.md - Non-Goals`).
