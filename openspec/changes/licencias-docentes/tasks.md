# Tasks

## 1. Modelo de datos

- [ ] 1.1 Modelar en Prisma Solicitud de Autorización Docente (docente, tipo, fecha/turno, motivo, adjunto opcional, estado, resuelta por) y verificar con migración aplicada

## 2. Solicitud (`secretaria-academica/licencias-docentes`)

- [ ] 2.1 Implementar la creación de una solicitud con tipo, fecha/turno y motivo, y verificar con un test
- [ ] 2.2 Implementar la aceptación de solicitudes anticipadas y retroactivas y verificar con tests ambos casos
- [ ] 2.3 Implementar el adjunto opcional de un archivo de respaldo y verificar con un test
- [ ] 2.4 Implementar la consulta de solicitudes propias por el docente y verificar con un test

## 3. Resolución por Dirección

- [ ] 3.1 Implementar la aprobación y el rechazo de una solicitud pendiente por Dirección, registrando quién la resolvió, y verificar con tests ambos desenlaces
- [ ] 3.2 Restringir la resolución al rol Dirección y verificar con un test que otro rol es rechazado

## 4. Vínculo con asistencia docente

- [ ] 4.1 Implementar la referencia de una solicitud aprobada hacia el registro de `secretaria-academica/asistencia-docente` del turno/fecha correspondiente, y verificar con un test
- [ ] 4.2 Implementar que la consulta de asistencia muestre la solicitud vinculada cuando exista, y verificar con un test

## 5. Frontend

- [ ] 5.1 Implementar el formulario de solicitud para docentes (tipo, fecha/turno, motivo, adjunto) y verificar manualmente
- [ ] 5.2 Implementar la bandeja de aprobación/rechazo para Dirección y verificar manualmente
- [ ] 5.3 Mostrar la solicitud vinculada en la consulta de asistencia docente y verificar manualmente

## 6. Verificación integral

- [ ] 6.1 Ejecutar la suite completa de tests automatizados de este change y verificar que todos pasan
- [ ] 6.2 Validar los artefactos de OpenSpec con `openspec validate --strict` para este change y verificar que no reporta errores
