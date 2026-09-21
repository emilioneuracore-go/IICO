# Proposal

## Why

Hoy las familias (madre/padre/tutor) no tienen forma de consultar la situación de sus hijos/as ni de hacer trámites simples sin ir presencialmente a la escuela. Esto sobrecarga a Secretaría Académica con consultas repetitivas (notas, materias previas, pases, certificados) y demora la comunicación de novedades importantes (evaluaciones, sanciones, comunicados). Un portal de familias, apoyado en los datos que ya administra Secretaría Académica, resuelve ambos problemas y es el siguiente paso natural una vez que existe la base de legajos, actas y materias previas.

## What Changes

- Se crea una **cuenta de usuario por responsable**, vinculada al legajo del alumno. Todos los responsables de un mismo alumno acceden al mismo nivel de información (decisión ya tomada: sin diferenciación por tipo de vínculo).
- Las familias pueden consultar la **situación académica** del alumno: resultados de actas de examen, materias previas y habilitación a promoción (ya especificados en `secretaria-academica`), más una **libreta de calificaciones periódicas** (trimestral/bimestral) que hoy no existe como capability y se agrega en este change.
- Se agrega el registro de **faltas disciplinarias y sanciones** (dominio nuevo "Convivencia"), consultable por la familia.
- Se agrega el **calendario escolar** y los **comunicados institucionales** (de docentes, directivos, secretaría, preceptores), consultables por la familia.
- Las familias reciben **notificaciones/alertas** (evaluaciones próximas, nueva sanción, nuevo comunicado) construidas a partir de las fuentes anteriores.
- Las familias pueden **consultar y proponer actualizaciones** de sus datos de contacto y los del alumno, sujetas a validación de Secretaría Académica (no se auto-aplican).
- Las familias pueden **solicitar trámites**: certificado de alumno regular (capability nueva de emisión en Secretaría Académica) y solicitud de pase de estudiante (la familia inicia el pedido; el pase en sí lo sigue gestionando Secretaría Académica con la capability ya existente).
- Se crea también una **cuenta de usuario propia para el alumno** (rol Alumno), vinculada a su legajo, para que pueda consultar información sin depender de la cuenta de su responsable.
- Familias y alumnos pueden consultar el **horario de clases** de su curso y división.

Fuera de alcance de este change: Departamento de Orientación (change futuro), mensajería directa entre familia y personal, y firma digital de documentos emitidos.

## Capabilities

### New Capabilities
- `familias/cuenta-familiar`: cuentas de responsables vinculadas a uno o más legajos de alumno, con igual nivel de acceso entre todos los responsables de un mismo alumno.
- `familias/situacion-academica`: vista unificada para la familia de actas de examen, materias previas/promoción y libreta de calificaciones periódicas de su alumno.
- `secretaria-academica/libreta-calificaciones`: registro de notas periódicas (trimestral/bimestral) por materia, distinto de las actas de examen (mesas/finales).
- `convivencia/sanciones`: registro y consulta de faltas disciplinarias y sanciones aplicadas a un alumno.
- `institucional/calendario-comunicados`: calendario escolar y comunicados institucionales emitidos por distintos roles del personal (docentes, directivos, secretaría, preceptores).
- `familias/notificaciones`: alertas dirigidas a la familia derivadas de evaluaciones próximas, nuevas sanciones y nuevos comunicados.
- `secretaria-academica/certificados`: emisión de certificados (por ejemplo, certificado de alumno regular) por parte de Secretaría Académica.
- `familias/tramites`: solicitud, por parte de la familia, de certificados y de pases de estudiante, con seguimiento de estado hasta que Secretaría Académica lo resuelve.
- `alumnos/cuenta`: cuenta de usuario propia del alumno (rol Alumno), vinculada a su legajo.
- `institucional/horarios`: publicación y consulta del horario de clases por curso y división, disponible para familias y alumnos.
- `secretaria-academica/cursos-divisiones`: definición de cursos y divisiones por año lectivo y asignación de alumnos a ellos — base que usan horarios, libreta de calificaciones y comunicados con alcance por curso.

### Modified Capabilities
(ninguna — `secretaria-academica/pases-estudiantes` e `identity/access-control` todavía no están archivados como specs principales; esta propuesta se apoya en ellos pero no modifica sus requisitos, solo agrega capacidades nuevas que los consumen)

## Impact

- **Datos**: nuevas entidades para cuenta familiar/responsable-usuario, libreta de calificaciones, sanciones, calendario/comunicados, notificaciones, certificados emitidos y solicitudes de trámite.
- **Roles**: se agregan los roles "Familia" y "Alumno" al modelo de `identity/access-control`, y roles de personal que cargan sanciones/comunicados (a definir su alcance exacto en `design.md`).
- **Frontend**: se extiende la aplicación web responsive ya definida en `secretaria-academica` con las vistas específicas del rol Familia.
- **Dependencias funcionales**: `familias/situacion-academica` depende de datos producidos por `secretaria-academica/actas-examen`, `secretaria-academica/materias-previas` y la nueva `secretaria-academica/libreta-calificaciones`; `familias/tramites` depende de `secretaria-academica/pases-estudiantes` y `secretaria-academica/certificados`.
