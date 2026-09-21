# Proposal

## Why

IICO no tiene hoy ningún sistema: la Secretaría Académica de la escuela técnica lleva legajos, libro matriz, actas de examen, seguimiento de materias previas y pases de estudiantes en soportes manuales/dispersos. Esto genera riesgo de pérdida de información, dificulta el control de situaciones académicas (por ejemplo el límite de materias adeudadas para promocionar) y demora trámites como pases y certificaciones. Se prioriza este módulo porque es la base documental/administrativa de la que dependerán los futuros módulos de padres/madres y Departamento de Orientación.

## What Changes

- Se crea el módulo de Secretaría Académica como primer módulo del sistema IICO.
- Alta y mantenimiento de **legajos de alumnos** (datos personales, familiares, documentación, historial dentro de la institución).
- Registro digital del **libro matriz** (inscripción oficial y numeración correlativa de alumnos por cohorte/año).
- Definición de **materias del plan de estudios**, incluyendo materias anuales, bianuales y trianuales, con su modalidad de acreditación (por tramo/año o al final del ciclo completo), configurable por materia porque varía caso a caso.
- Gestión de **libros de actas de examen** y **actas de examen** individuales (mesas de examen, calificaciones, docentes evaluadores, fechas), contemplando que una materia plurianual puede evaluarse por tramo o al cierre del ciclo según su modalidad.
- Seguimiento de **materias previas/adeudadas** por alumno, incluyendo:
  - Control del límite normativo de **máximo 3 materias adeudadas** (previas de años anteriores + último período) para autorizar la promoción al curso siguiente.
  - Registro del **plan de acompañamiento/fortalecimiento institucional** obligatorio cuando la materia adeudada es la tercera (docentes o actividades en contraturno), conforme al marco normativo provincial vigente (ej. Resolución 11/2025).
  - La normativa de acreditación (topes, excepciones, obligatoriedad de mesas específicas) debe quedar parametrizable, dado que ya cambió recientemente y puede volver a cambiar.
  - Las materias plurianuales evaluadas "por tramo" pueden generar previa de un tramo específico; las evaluadas "al final del ciclo" no generan previa en sus años intermedios.
  - Una materia puede estar compuesta por áreas con docente propio (caso UTP: Dibujo Técnico, Taller, Educación Tecnológica) y su escala de calificación puede ser cualitativa en las etapas intermedias y cuantitativa recién en el cierre del ciclo.
- Registro de **pases de estudiantes** (ingreso desde otra institución / egreso hacia otra institución), con la documentación y datos que se transfieren.
- El sistema se diseña **multiusuario** con roles/permisos desde esta primera etapa, para poder anexar sin retrabajo los módulos futuros de Padres/Madres (acceso responsive) y Departamento de Orientación (Psicología/Psicopedagogía).

Fuera de alcance de este change (se definirán en changes separados): portal de padres/madres, módulo de Departamento de Orientación, facturación/aranceles, y "otras tareas" de Secretaría Académica aún no especificadas por la dirección de la escuela.

## Capabilities

### New Capabilities
- `secretaria-academica/legajos-alumnos`: alta, edición y consulta del legajo de cada alumno (datos personales, de contacto, familiares/responsables, documentación y estado dentro de la institución).
- `secretaria-academica/materias`: definición de las materias del plan de estudios, su duración (anual/bianual/trianual) y su modalidad de acreditación (por tramo o al final del ciclo).
- `secretaria-academica/libro-matriz`: inscripción oficial de alumnos con numeración correlativa por libro/año, como registro legal de matriculación.
- `secretaria-academica/actas-examen`: gestión de libros de actas de examen y de actas de examen individuales (mesas, calificaciones, docentes, fechas).
- `secretaria-academica/materias-previas`: seguimiento de materias adeudadas por alumno, control del tope de 3 materias para promoción y registro del plan de acompañamiento cuando corresponde.
- `secretaria-academica/pases-estudiantes`: alta y trazabilidad de pases de ingreso/egreso de estudiantes entre instituciones.
- `identity/access-control`: modelo base de usuarios, roles y permisos multiusuario que sostiene Secretaría Académica y sobre el que se apoyarán los módulos de Padres/Madres y Departamento de Orientación.

### Modified Capabilities
(ninguna — proyecto greenfield, no hay specs previas)

## Impact

- **Sistema**: proyecto nuevo (repo actualmente vacío salvo README); esta propuesta define el primer conjunto de capacidades a construir.
- **Datos**: se introduce el modelo de datos inicial de alumnos, legajos, libro matriz, actas de examen, materias previas/planes de acompañamiento y pases.
- **Usuarios/roles**: se define el modelo base de usuarios y roles multiusuario (personal de Secretaría Académica, con extensión futura a familias y Departamento de Orientación).
- **Normativa**: la lógica de materias previas depende de normativa provincial que cambia con el tiempo; debe quedar configurable, no hardcodeada.
