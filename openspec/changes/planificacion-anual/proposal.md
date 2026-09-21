# Proposal

## Why

Hoy no hay un lugar único donde consultar qué va a enseñar cada docente durante el año. Cada uno organiza su planificación como puede, en formatos distintos, sin que Dirección, Orientación, las familias o los propios estudiantes tengan una forma simple de consultarla. Un formulario único dentro de IICO estandariza el formato, lo hace consultable por todos los roles interesados, y deja explícita la articulación cuando una materia forma parte de un Proyecto Integrado.

## What Changes

- Los docentes cargan una **planificación anual** por materia y curso/división, a través de un **formulario estructurado** con el mismo formato para todas las materias (no es un archivo subido).
- Cuando la materia tiene un **Proyecto Integrado** vinculado (`secretaria-academica/materias`), el formulario incluye una **sección de articulación** con la materia vinculada.
- La planificación es **consultable de solo lectura** por: el propio alumno (de su curso), la familia vinculada, el Departamento de Orientación, Dirección y Secretaría Académica.
- Solo el **docente a cargo** de esa materia/curso puede cargar o corregir su planificación.
- Existe una única planificación **vigente** por materia, curso y año lectivo; una corrección reemplaza la anterior dejando trazabilidad.

Fuera de alcance de este change: aprobación o revisión formal de la planificación por parte de Dirección (por ahora es de solo lectura para ese rol, sin flujo de aprobación/rechazo), y versionado histórico completo navegable año a año (se deja como pregunta abierta).

## Capabilities

### New Capabilities
- `secretaria-academica/planificacion-anual`: carga, corrección y consulta de la planificación anual de una materia/curso, con formato estructurado único y sección de articulación para materias con Proyecto Integrado.

### Modified Capabilities
(ninguna — se apoya en `secretaria-academica/materias` para identificar si una materia tiene un Proyecto Integrado vinculado, sin modificar sus requisitos)

## Impact

- **Datos**: nueva entidad de Planificación Anual (materia, curso/división, docente, año lectivo, campos estructurados, sección de articulación si aplica).
- **Roles**: se apoya en los roles ya existentes (docente, Alumno, Familia, Orientación, Dirección, Secretaría Académica); no se agrega ningún rol nuevo.
- **Dependencias funcionales**: depende de `secretaria-academica/materias` (para saber si hay Proyecto Integrado), `secretaria-academica/cursos-divisiones` y de los roles ya definidos en `identity/access-control`, `familias/cuenta-familiar` y `alumnos/cuenta`.
