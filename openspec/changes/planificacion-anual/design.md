# Design

## Context

Se apoya en `secretaria-academica/materias` (para saber si hay Proyecto Integrado), `secretaria-academica/cursos-divisiones` y en los roles ya definidos (docente, Alumno, Familia, Orientación, Dirección, Secretaría Académica). Ver `proposal.md - Why`.

## Goals / Non-Goals

**Goals:**
- Un único esquema de campos para la planificación anual, igual para todas las materias, para que sea comparable y consultable de forma uniforme.
- Que la articulación entre las dos materias de un Proyecto Integrado quede explícita en ambas planificaciones, sin fusionar sus datos.

**Non-Goals:**
- No se define en este change un flujo de aprobación/rechazo de la planificación por parte de Dirección; por ahora Dirección solo la consulta.
- No se diseña un historial navegable de planificaciones de años anteriores más allá de la trazabilidad de correcciones dentro del mismo año lectivo (ver Open Questions).

## Decisions

### Esquema de campos fijo, definido en el sistema (no configurable por materia)
El formulario de planificación anual usa un esquema de campos fijo (objetivos, contenidos, metodología, cronograma, criterios de evaluación) igual para todas las materias, en lugar de un constructor de formularios configurable. Esto cumple directamente con el pedido de "formato único" y evita que cada docente o Secretaría termine definiendo su propia estructura, que es justamente lo que se quiere evitar. Si en el futuro se necesitan campos adicionales, se agregan al esquema fijo para todos, no por materia.

### Articulación de Proyecto Integrado como sección adicional, no como planificación compartida
Cada materia del Proyecto Integrado mantiene su propia planificación completa e independiente; la "sección de articulación" es un campo adicional dentro de cada una que describe cómo se coordina con la otra materia (actividades conjuntas, franja horaria compartida ya definida en `institucional/horarios`). Se descarta modelar una "planificación conjunta" única para el Proyecto Integrado porque cada materia sigue teniendo su propia acreditación y su propio docente responsable (ver `changes/secretaria-academica/design.md - Proyecto Integrado como vínculo entre materias, no como fusión`), y la planificación debe seguir ese mismo criterio.

### Visibilidad de solo lectura resuelta por los mismos vínculos ya existentes
La consulta por parte de Alumno y Familia reutiliza el mismo vínculo alumno↔curso/división y alumno↔responsable ya usado en `institucional/horarios` y `familias/situacion-academica`, en lugar de definir un nuevo mecanismo de autorización. Orientación, Dirección y Secretaría Académica acceden por rol, sin necesidad de vínculo con un alumno particular (ya consultan información de cualquier alumno/curso en otras capabilities).

## Risks / Trade-offs

- [Riesgo] Un esquema de campos fijo podría no alcanzar para materias con necesidades muy particulares (por ejemplo, UTP con sus áreas) → Mitigación: fuera de alcance de este change ampliar el esquema por tipo de materia; si se necesita, sería un campo adicional dentro del mismo esquema fijo, no una excepción por materia.
- [Riesgo] Sin historial navegable entre años lectivos, comparar la planificación de una materia año a año requiere consultar registros de corrección dentro de cada año por separado → Mitigación: se deja como pregunta abierta; no bloquea la carga y consulta del año vigente, que es el pedido actual.

## Open Questions

- Si Dirección necesita en el futuro un flujo de aprobación/observaciones sobre la planificación, en lugar de solo consultarla — no bloquea este change, que la definió como solo lectura para Dirección.
- Si conviene un historial navegable de planificaciones de años lectivos anteriores (no solo del vigente) — no bloquea este change.
