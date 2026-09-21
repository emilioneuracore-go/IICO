# Tasks

## 1. Cursos y divisiones (`secretaria-academica/cursos-divisiones`)

- [ ] 1.1 Modelar en Prisma Curso/División por año lectivo y verificar con migración aplicada
- [ ] 1.2 Implementar asignación de alumno a curso/división vigente y verificar con un test que un alumno no puede tener dos asignaciones vigentes en el mismo año lectivo
- [ ] 1.3 Implementar consulta de alumnos por curso/división y verificar con un test que devuelve el listado correcto

## 2. Cuenta familiar (`familias/cuenta-familiar`)

- [ ] 2.1 Modelar en Prisma la relación entre cuenta de usuario, responsable y legajo de alumno, y verificar con migración aplicada
- [ ] 2.2 Implementar alta de cuenta con rol Familia vinculada a un responsable existente y verificar con un test el caso de alta exitosa
- [ ] 2.3 Implementar que todos los responsables vinculados a un mismo alumno reciban igual nivel de acceso, y verificar con un test que dos cuentas distintas ven la misma información de ese alumno
- [ ] 2.4 Implementar el soporte de una cuenta vinculada a más de un alumno y verificar con un test la selección entre alumnos vinculados
- [ ] 2.5 Restringir el acceso a alumnos no vinculados y verificar con un test que se deniega

## 3. Cuenta de alumno (`alumnos/cuenta`)

- [ ] 3.1 Modelar en Prisma la relación entre cuenta de usuario con rol Alumno y su propio legajo, y verificar con migración aplicada
- [ ] 3.2 Implementar alta de cuenta con rol Alumno vinculada a un legajo existente y verificar con un test el caso de alta exitosa
- [ ] 3.3 Restringir el acceso de una cuenta Alumno a su propio legajo y verificar con un test que no accede a otro alumno
- [ ] 3.4 Implementar el bloqueo de operaciones de escritura para el rol Alumno sobre notas, actas, sanciones y comunicados, y verificar con un test que se rechazan

## 4. Libreta de calificaciones (`secretaria-academica/libreta-calificaciones`)

- [ ] 4.1 Modelar en Prisma Nota Periódica (alumno, materia, período, valor, escala) y verificar con migración aplicada
- [ ] 4.2 Implementar carga de nota periódica y su corrección con trazabilidad, y verificar con tests ambos flujos
- [ ] 4.3 Implementar la generación del boletín consolidado por período y verificar con un test que devuelve todas las materias del alumno
- [ ] 4.4 Implementar el tratamiento formativo de las notas de años intermedios en materias "al final del ciclo" y verificar con un test que no generan acreditación ni previa
- [ ] 4.5 Implementar el registro de notas en escala cualitativa cuando la materia lo tiene configurado, y verificar con un test usando el caso UTP
- [ ] 4.6 Implementar el registro de notas por área en materias compuestas y verificar con un test que registra las notas de las tres áreas de UTP
- [ ] 4.7 Implementar el registro de evaluaciones próximas por materia y verificar con un test que quedan disponibles antes de la carga de nota

## 5. Sanciones (`convivencia/sanciones`)

- [ ] 5.1 Modelar en Prisma Falta Disciplinaria y Sanción, y verificar con migración aplicada
- [ ] 5.2 Implementar alta de falta disciplinaria y de sanción asociada, y verificar con tests ambos flujos
- [ ] 5.3 Implementar consulta de faltas/sanciones restringida a familia vinculada y personal autorizado, y verificar con un test que un usuario sin vínculo ni rol es rechazado

## 6. Calendario y comunicados institucionales (`institucional/calendario-comunicados`)

- [ ] 6.1 Modelar en Prisma Evento de Calendario y Comunicado (con alcance: institucional, por curso, por alumno) y verificar con migración aplicada
- [ ] 6.2 Implementar publicación de eventos de calendario y verificar con un test el alta con alcance
- [ ] 6.3 Implementar publicación de comunicados por distintos roles emisores y verificar con un test que registra el emisor
- [ ] 6.4 Implementar la consulta filtrada por alcance para una cuenta de familia/alumno y verificar con un test que solo ve lo que corresponde a su alumno/curso

## 7. Horarios (`institucional/horarios`)

- [ ] 7.1 Modelar en Prisma Horario de Clase (curso/división, materia, día, franja horaria, docente) y verificar con migración aplicada
- [ ] 7.2 Implementar publicación y actualización del horario vigente de un curso/división, conservando vigencia histórica, y verificar con tests ambos flujos
- [ ] 7.3 Implementar consulta de horario por familia (vía alumno vinculado) y por alumno (propio curso/división), y verificar con tests ambos casos
- [ ] 7.4 Implementar la franja horaria compartida entre las dos materias de un Proyecto Integrado y verificar con un test que aparece en el horario de ambas sin duplicar la carga, mientras el resto de sus franjas queda independiente

## 8. Notificaciones (`familias/notificaciones`)

- [ ] 8.1 Modelar en Prisma Alerta (origen, alumno, estado de lectura por cuenta) y verificar con migración aplicada
- [ ] 8.2 Implementar la generación de alertas a partir de evaluación próxima, nueva sanción y nuevo comunicado, y verificar con tests los tres orígenes
- [ ] 8.3 Implementar el marcado de alerta como leída por cuenta, y verificar con un test que no oculta la alerta a otros responsables del mismo alumno

## 9. Certificados (`secretaria-academica/certificados`)

- [ ] 9.1 Modelar en Prisma Certificado Emitido (tipo, alumno, fecha, emisor) y verificar con migración aplicada
- [ ] 9.2 Implementar emisión de certificado de alumno regular validando matrícula activa, y verificar con tests el caso exitoso y el de rechazo por matrícula inactiva
- [ ] 9.3 Implementar consulta del historial de certificados por alumno y verificar con un test

## 10. Trámites de familia (`familias/tramites`)

- [ ] 10.1 Modelar en Prisma Solicitud de Trámite (tipo, alumno, estado, resultado vinculado) y verificar con migración aplicada
- [ ] 10.2 Implementar solicitud de certificado de alumno regular desde la cuenta de familia y verificar con un test que queda pendiente
- [ ] 10.3 Implementar solicitud de pase desde la cuenta de familia, dejándola disponible para que Secretaría Académica la gestione con `secretaria-academica/pases-estudiantes`, y verificar con un test de integración
- [ ] 10.4 Implementar consulta de estado de solicitudes por parte de la familia y verificar con un test
- [ ] 10.5 Implementar el vínculo entre solicitud resuelta y el certificado/pase resultante, y verificar con un test que la solicitud queda marcada como resuelta

## 11. Frontend del portal de familias/alumnos

- [ ] 11.1 Implementar las vistas de situación académica (actas, previas, boletín) para familia y alumno, y verificar manualmente en desktop y en viewport móvil
- [ ] 11.2 Implementar las vistas de horario, calendario y comunicados, y verificar manualmente ambos roles
- [ ] 11.3 Implementar la bandeja de notificaciones con marcado de leído, y verificar manualmente que no afecta a otro responsable
- [ ] 11.4 Implementar el flujo de solicitud y seguimiento de trámites, y verificar manualmente end-to-end

## 12. Verificación integral

- [ ] 12.1 Ejecutar la suite completa de tests automatizados de este change y verificar que todos pasan
- [ ] 12.2 Validar los artefactos de OpenSpec con `openspec validate --strict` para este change y verificar que no reporta errores
