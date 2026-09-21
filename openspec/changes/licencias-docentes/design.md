# Design

## Context

Se apoya en `secretaria-academica/asistencia-docente` (vínculo, sin modificar sus requisitos) y en los roles docente/Dirección ya definidos. Ver `proposal.md - Why`.

## Goals / Non-Goals

**Goals:**
- Un único tipo de solicitud (con un campo "tipo") para los cuatro casos pedidos (llegada tarde, retiro anticipado, falta, licencia), en lugar de cuatro capabilities separadas.
- Que el vínculo con `asistencia-docente` sea de solo referencia, sin que una capability dependa de reescribir a la otra.

**Non-Goals:**
- No se define en este change un catálogo de tipos de licencia con reglas propias (días, documentación obligatoria) — motivo genérico por decisión de la dirección.
- No se automatiza ninguna consecuencia sobre haberes o liquidación de sueldo.

## Decisions

### Un modelo único de "Solicitud de Autorización Docente" con campo tipo
Los cuatro casos (llegada tarde, retiro anticipado, falta, licencia) comparten el mismo ciclo de vida (pendiente → aprobada/rechazada) y los mismos campos (fecha/turno, motivo, adjunto opcional). Modelarlos como una única entidad con un campo "tipo" evita duplicar la lógica de aprobación y consulta en cuatro capabilities casi idénticas. Si en el futuro un tipo específico (por ejemplo, licencia) necesita reglas propias (catálogo de subtipos, documentación obligatoria), se extendería este mismo modelo en lugar de partirlo.

### Vínculo por referencia hacia asistencia docente, no por escritura directa
Una solicitud aprobada no modifica el registro de asistencia en sí (que sigue reflejando fielmente si hubo check-in o corrección manual); se guarda como una referencia adicional que la consulta de asistencia puede mostrar junto al registro. Esto evita que dos capabilities compitan por ser la fuente de verdad del mismo dato: `asistencia-docente` sigue siendo la fuente de verdad de la asistencia, y `licencias-docentes` es la fuente de verdad de por qué esa asistencia se ve como se ve.

## Risks / Trade-offs

- [Riesgo] Sin reglas de tipo de licencia (documentación obligatoria, límites de días), Dirección debe evaluar cada solicitud de licencia caso por caso sin ayuda del sistema → Mitigación: aceptado explícitamente por la dirección para esta primera versión; se puede sumar un catálogo con reglas en un change futuro sin cambiar el modelo de datos de base.
- [Riesgo] Una solicitud retroactiva podría usarse para justificar cualquier ausencia después del hecho, sin control adicional → Mitigación: Dirección sigue teniendo la decisión de aprobar o rechazar; el sistema no aprueba nada automáticamente.

## Open Questions

- Si en el futuro se necesita un catálogo cerrado de tipos de licencia con reglas propias del Estatuto del Docente — explícitamente fuera de alcance de este change.
