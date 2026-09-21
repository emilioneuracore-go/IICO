# Proposal

## Why

El sistema hoy le da a los estudiantes solo acceso de consulta (situación académica, horario, comunicados). No hay ningún espacio propio donde se identifiquen entre compañeros de curso, compartan materiales de estudio, ni un incentivo para participar en desafíos académicos. Sumar esto aumenta el uso del sistema por parte de los estudiantes y da a la escuela una herramienta de motivación (tabla de posiciones), siempre que quede resguardada la convivencia dentro del espacio.

## What Changes

- Cada alumno puede elegir un **avatar** entre opciones **predefinidas por la escuela** (no una imagen libre, para evitar contenido inapropiado) y subir una **foto de perfil**, sujeta a moderación.
- Cada curso y división tiene un **foro/portal propio**, visible solo para los alumnos de ese curso (y personal autorizado, para supervisión), donde pueden publicar ideas y compartir materiales de estudio.
- El foro se modera por **reporte + revisión manual**: cualquiera puede reportar una publicación (o una foto de perfil) que atente contra la integridad de un integrante de la comunidad educativa; personal autorizado (preceptor, Orientación o Dirección) la revisa y decide si la elimina, quedando registrado.
- Los docentes pueden crear **desafíos académicos** para su materia/curso; los alumnos los resuelven y reciben **puntaje**.
- Existe una **tabla de posiciones** de todos los alumnos de la escuela, ordenada por puntaje acumulado de desafíos.
- Los primeros **10 puestos** de la tabla de posiciones obtienen **créditos** — por ahora un reconocimiento registrado, sin un uso/canje definido todavía.

Fuera de alcance de este change: qué se puede canjear con los créditos (queda como pregunta abierta / change futuro), mensajería privada entre alumnos, y cualquier tipo de contenido multimedia más allá de texto e imágenes/archivos de materiales de estudio.

## Capabilities

### New Capabilities
- `alumnos/perfil`: selección de avatar predefinido y carga de foto de perfil, sujeta a moderación.
- `alumnos/foro-curso`: foro/portal exclusivo de un curso y división, con publicaciones, materiales de estudio, reporte de contenido y revisión/moderación por personal autorizado.
- `alumnos/desafios`: creación de desafíos académicos por parte de docentes, resolución por alumnos y asignación de puntaje.
- `alumnos/tabla-posiciones`: ranking de alumnos de toda la escuela por puntaje acumulado, con reconocimiento de créditos para los primeros 10 puestos.

### Modified Capabilities
(ninguna — la eliminación de contenido moderado puede derivar, a discreción de quien modera, en una sanción registrada en `convivencia/sanciones`, sin modificar sus requisitos)

## Impact

- **Datos**: nuevas entidades de Avatar (catálogo predefinido), Foto de Perfil, Publicación de Foro, Reporte de Contenido, Desafío Académico, Resolución de Desafío, Puntaje Acumulado y Crédito.
- **Roles**: se apoya en los roles ya existentes (Alumno, docente, preceptor, Orientación, Dirección); no se agrega ningún rol nuevo.
- **Confidencialidad/seguridad**: el contenido del foro y las fotos de perfil quedan expuestos a menores de edad; la moderación por reporte + revisión manual es la salvaguarda principal (ver `design.md` para riesgos y mitigaciones adicionales).
- **Dependencias funcionales**: `alumnos/foro-curso` depende de `secretaria-academica/cursos-divisiones`; `alumnos/desafios` depende de las materias que dicta cada docente; la eliminación de contenido puede derivar en un registro de `convivencia/sanciones`.
