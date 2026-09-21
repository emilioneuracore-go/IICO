# Proposal

## Why

El Departamento de Orientación (psicóloga y psicopedagoga) hoy no tiene una herramienta que integre la información académica, de asistencia y de convivencia de un alumno con su propio seguimiento pedagógico/psicológico. Sin esto, dependen de pedir datos sueltos a Secretaría Académica y de llevar sus registros en soportes separados, lo que dificulta el seguimiento continuo de un alumno y la coordinación con Dirección. Este change les da una vista integrada de solo lectura sobre lo que ya gestiona el resto del sistema, más un espacio propio para su trabajo de seguimiento, con la confidencialidad que su tarea requiere.

## What Changes

- El Departamento de Orientación puede **consultar** calificaciones, inasistencias, situación disciplinaria y datos de contacto de padres/madres de un alumno, en una vista integrada de solo lectura.
- El Departamento de Orientación puede llevar **registros propios** sobre un alumno (seguimiento psicológico/psicopedagógico). Estos registros son compartidos entre todos los profesionales de Orientación y con Dirección, pero nunca visibles para Secretaría Académica, docentes ni familias.
- El Departamento de Orientación puede **enviar comunicados** a un alumno y a su familia, reutilizando el canal institucional ya definido (se lo agrega como rol emisor autorizado).
- El Departamento de Orientación puede **agendar reuniones** con el alumno y/o su familia, y registrar el **acta** de cada reunión y **informes** generales sobre un alumno. La convocatoria a la reunión no se expone a la familia dentro del sistema (se comunica por fuera); tanto la reunión agendada como su acta/informe quedan visibles únicamente para Orientación y Dirección.
- El Departamento de Orientación puede **recopilar información de convivencia estudiantil** y **registrar información de grupos** de alumnos (agrupamientos de seguimiento propios de Orientación, distintos del curso/división formal de Secretaría Académica).

Fuera de alcance de este change: cualquier acceso de Secretaría Académica, docentes o familias a los registros, reuniones e informes internos de Orientación; y la definición de protocolos clínicos/pedagógicos de la práctica de Orientación (el sistema solo registra y organiza la información, no define criterios profesionales).

## Capabilities

### New Capabilities
- `orientacion/consulta-integral`: vista de solo lectura para Orientación y Dirección de calificaciones, inasistencias, situación disciplinaria y datos de contacto de padres/madres de un alumno.
- `orientacion/registros-propios`: registros de seguimiento de Orientación sobre un alumno, compartidos entre profesionales de Orientación y con Dirección, ocultos para el resto de la institución.
- `orientacion/reuniones`: agenda de reuniones con alumno y/o familia y registro del acta de cada reunión, visible solo para Orientación y Dirección.
- `orientacion/informes`: elaboración de informes generales sobre un alumno, con el mismo alcance de visibilidad que `orientacion/reuniones`.
- `orientacion/grupos`: registro de información de convivencia estudiantil y de grupos de alumnos de seguimiento propios de Orientación.

### Modified Capabilities
(ninguna en este change — el envío de comunicados por parte de Orientación ya se resolvió agregando a Orientación como rol emisor autorizado directamente en la spec de `institucional/calendario-comunicados` dentro del change `portal-familias`, que todavía no está archivada como spec principal; no vuelve a declararse aquí para no duplicar esa modificación)

## Impact

- **Datos**: nuevas entidades para registro propio de Orientación, reunión, acta de reunión, informe, grupo de seguimiento y observación de convivencia.
- **Roles**: se agrega el rol "Orientación" (psicóloga, psicopedagoga) a `identity/access-control`, reutilizando su extensibilidad ya prevista; se apoya en que el rol "Dirección" ya existe conceptualmente en otras capabilities (`convivencia/sanciones`, `institucional/calendario-comunicados`).
- **Confidencialidad**: el modelo de permisos debe distinguir explícitamente "visible para Orientación + Dirección" de "visible para el resto de roles", un nivel de aislamiento más estricto que el usado hasta ahora (que solo distinguía por alumno vinculado, no por área funcional).
- **Dependencias funcionales**: `orientacion/consulta-integral` depende de datos producidos por `secretaria-academica/libreta-calificaciones`, `secretaria-academica/asistencia`, `convivencia/sanciones` y `familias/cuenta-familiar` (datos de contacto de responsables).
