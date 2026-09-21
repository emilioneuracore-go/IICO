# Tasks

## 1. Configuración de red institucional

- [ ] 1.1 Modelar en Prisma la configuración de rangos/IPs de red institucional autorizados y verificar con migración aplicada
- [ ] 1.2 Implementar la administración de esa configuración por Secretaría Académica/Dirección y verificar con un test
- [ ] 1.3 Implementar la validación de la IP de origen de una solicitud contra la configuración vigente y verificar con tests el caso dentro y fuera del rango

## 2. Check-in de asistencia (`secretaria-academica/asistencia-docente`)

- [ ] 2.1 Modelar en Prisma Asistencia Docente (docente, fecha, turno, origen: check-in/manual, quién corrigió si aplica) y verificar con migración aplicada
- [ ] 2.2 Implementar la determinación de turno (mañana/tarde) según horario de corte configurable, y verificar con un test
- [ ] 2.3 Implementar el check-in gateado por la validación de red institucional, y verificar con tests el caso aceptado y el rechazado
- [ ] 2.4 Implementar la prevención de check-in duplicado por turno y día, y verificar con un test
- [ ] 2.5 Implementar el check-in independiente de ambos turnos el mismo día, y verificar con un test

## 3. Corrección manual y consulta

- [ ] 3.1 Implementar la carga/corrección manual de asistencia por Secretaría Académica/Dirección, con registro de quién la hizo, y verificar con un test
- [ ] 3.2 Restringir la corrección manual a esos roles y verificar con un test que un docente es rechazado
- [ ] 3.3 Implementar la consulta de asistencia de un docente por turno/día/rango de fechas, con origen de cada registro, y verificar con un test

## 4. Frontend

- [ ] 4.1 Implementar el botón de check-in para docentes (con mensaje claro si la red no es válida) y verificar manualmente dentro y fuera de la red institucional
- [ ] 4.2 Implementar la pantalla de consulta/corrección de asistencia para Secretaría Académica/Dirección y verificar manualmente

## 5. Verificación integral

- [ ] 5.1 Ejecutar la suite completa de tests automatizados de este change y verificar que todos pasan
- [ ] 5.2 Validar los artefactos de OpenSpec con `openspec validate --strict` para este change y verificar que no reporta errores
