# Tasks

## 1. Roles y confidencialidad base

- [ ] 1.1 Agregar el rol Orientación (y confirmar/crear el rol Dirección si no existe) en el modelo de roles, y verificar con un test de alta de ambos roles
- [ ] 1.2 Implementar el guard transversal "rol Orientación o Dirección" reutilizable por las capabilities de este change, y verificar con un test que rechaza a un usuario con otro rol

## 2. Consulta integral (`orientacion/consulta-integral`)

- [ ] 2.1 Implementar el agregador que combina calificaciones, inasistencias, situación disciplinaria y datos de contacto de responsables de un alumno, y verificar con un test que devuelve los cuatro bloques de información
- [ ] 2.2 Implementar el manejo tolerante de fuentes no disponibles (mostrar lo que hay y señalar qué falta) y verificar con un test simulando una fuente caída
- [ ] 2.3 Restringir el acceso con el guard de Orientación/Dirección y verificar con un test que otro rol es rechazado

## 3. Registros propios (`orientacion/registros-propios`)

- [ ] 3.1 Modelar en Prisma Registro de Orientación (alumno, autor, fecha, contenido) y verificar con migración aplicada
- [ ] 3.2 Implementar alta de registro y verificar con un test
- [ ] 3.3 Implementar la consulta compartida entre profesionales de Orientación (sin filtrar por autor) y verificar con un test que un profesional ve registros de otro
- [ ] 3.4 Restringir el acceso con el guard de Orientación/Dirección y verificar con tests que Secretaría Académica y familia son rechazadas

## 4. Reuniones (`orientacion/reuniones`)

- [ ] 4.1 Modelar en Prisma Reunión (alumno, fecha, motivo, participantes previstos) y Acta de Reunión, y verificar con migración aplicada
- [ ] 4.2 Implementar el alta de reunión agendada y verificar con un test
- [ ] 4.3 Implementar el registro del acta asociada a una reunión y verificar con un test
- [ ] 4.4 Verificar explícitamente con un test que una cuenta de familia o de alumno no ve la reunión agendada en ninguna consulta de su portal
- [ ] 4.5 Restringir el acceso a la reunión y al acta con el guard de Orientación/Dirección y verificar con un test

## 5. Informes (`orientacion/informes`)

- [ ] 5.1 Modelar en Prisma Informe (alumno, autor, fecha, contenido, reuniones vinculadas opcionales) y verificar con migración aplicada
- [ ] 5.2 Implementar alta de informe, con y sin vínculo a una reunión, y verificar con tests ambos casos
- [ ] 5.3 Restringir el acceso con el guard de Orientación/Dirección y verificar con un test

## 6. Grupos y convivencia (`orientacion/grupos`)

- [ ] 6.1 Modelar en Prisma Grupo de Seguimiento (alumnos miembros, motivo) y Observación de Convivencia, y verificar con migración aplicada
- [ ] 6.2 Implementar alta de grupo de seguimiento con sus alumnos y verificar con un test que un alumno puede pertenecer a más de un grupo
- [ ] 6.3 Implementar alta de observación de convivencia asociada a un grupo o curso/división y verificar con un test
- [ ] 6.4 Restringir el acceso con el guard de Orientación/Dirección y verificar con un test

## 7. Comunicados desde Orientación

- [ ] 7.1 Habilitar a Orientación como rol emisor en la implementación de `institucional/calendario-comunicados` (spec ya extendida en el change `portal-familias`) y verificar con un test que un comunicado de Orientación llega a la familia del alumno destinatario

## 8. Frontend de Orientación

- [ ] 8.1 Implementar la vista de consulta integral de un alumno y verificar manualmente con una cuenta de Orientación
- [ ] 8.2 Implementar las pantallas de registros propios, reuniones/actas, informes y grupos de seguimiento, y verificar manualmente que no aparecen para otros roles
- [ ] 8.3 Implementar el flujo de envío de comunicado desde Orientación y verificar manualmente que la familia lo recibe

## 9. Verificación integral

- [ ] 9.1 Ejecutar la suite completa de tests automatizados de este change y verificar que todos pasan
- [ ] 9.2 Validar los artefactos de OpenSpec con `openspec validate --strict` para este change y verificar que no reporta errores
