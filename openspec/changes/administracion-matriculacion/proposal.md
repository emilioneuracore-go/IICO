# Proposal

## Why

Administración necesita saber, antes de matricular a un alumno para el nuevo período, si está habilitado académicamente para hacerlo. Hoy esa verificación depende de preguntarle a Secretaría Académica caso por caso, con riesgo de matricular (y cobrar) a un alumno que no debería, porque adeuda más materias de las que la normativa permite. Cruzar automáticamente esta información evita ese error y agiliza el trámite.

## What Changes

- Administración puede **consultar la habilitación para matriculación** de un alumno, cruzando información con el tope de materias adeudadas ya definido en `secretaria-academica/materias-previas` (máximo 3 materias adeudadas).
- El sistema **bloquea el registro de matriculación** de un alumno con más de 3 materias adeudadas.
- Se registra la **matriculación** de un alumno habilitado (fecha, período) como trámite propio de Administración, **separado** del libro matriz de Secretaría Académica (son trámites distintos, aunque ambos refieren al mismo alumno y período).

Fuera de alcance de este change (a definir en un change futuro si se pide): montos de matrícula, medios de pago, comprobantes, aranceles mensuales y becas. Este change es exclusivamente el "gate" de habilitación y el registro de que la matriculación ocurrió.

## Capabilities

### New Capabilities
- `administracion/matriculacion`: consulta de habilitación de un alumno para matricularse (según el tope de materias adeudadas), bloqueo del registro de matriculación cuando no está habilitado, y registro de la matriculación de un alumno habilitado como trámite propio de Administración.

### Modified Capabilities
(ninguna — se apoya en `secretaria-academica/materias-previas` en modo solo lectura, sin modificar sus requisitos)

## Impact

- **Datos**: nueva entidad de Matriculación (alumno, período, fecha, estado), separada de la inscripción en el libro matriz.
- **Roles**: se agrega el rol "Administración" a `identity/access-control`, reutilizando su extensibilidad ya prevista.
- **Dependencias funcionales**: `administracion/matriculacion` depende de `secretaria-academica/materias-previas` para el cálculo de habilitación (mismo tope y misma lógica que la habilitación a promoción, sin duplicarla).
