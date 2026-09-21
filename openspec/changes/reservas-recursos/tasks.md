# Tasks

## 1. Catálogo de recursos (`recursos/catalogo`)

- [ ] 1.1 Modelar en Prisma Recurso Reservable (nombre, tipo: espacio/elemento, estado: activo/fuera de servicio/dado de baja) y verificar con migración aplicada
- [ ] 1.2 Implementar alta de espacio y de elemento, y verificar con tests ambos casos
- [ ] 1.3 Implementar baja de un recurso y verificar con un test que deja de ofrecerse para nuevas reservas
- [ ] 1.4 Implementar marcado como fuera de servicio y su reversión, y verificar con un test
- [ ] 1.5 Restringir alta/baja/marcado a roles directivo o Secretaría y verificar con un test que un docente es rechazado

## 2. Reservas (`recursos/reservas`)

- [ ] 2.1 Modelar en Prisma Reserva (docente, recurso, fecha, franja horaria, estado) y verificar con migración aplicada
- [ ] 2.2 Implementar la restricción de no superposición a nivel de base de datos (índice de exclusión por rango de tiempo) y verificar con un test de dos inserciones concurrentes superpuestas
- [ ] 2.3 Implementar la confirmación automática de una reserva disponible y verificar con un test
- [ ] 2.4 Implementar el rechazo por superposición horaria a nivel de aplicación (mensaje claro antes de depender solo de la restricción de base de datos) y verificar con un test
- [ ] 2.5 Implementar el bloqueo de reserva de un recurso fuera de servicio y verificar con un test
- [ ] 2.6 Implementar la consulta de reservas propias por docente y verificar con un test
- [ ] 2.7 Implementar la cancelación de una reserva propia futura y verificar con tests el caso propio y el intento sobre la reserva de otro docente

## 3. Frontend de reservas

- [ ] 3.1 Implementar la pantalla de administración del catálogo (alta, baja, fuera de servicio) y verificar manualmente con rol directivo/Secretaría
- [ ] 3.2 Implementar la pantalla de reserva para docentes (selección de recurso, franja horaria, confirmación) y verificar manualmente el caso disponible y el caso de superposición
- [ ] 3.3 Implementar la pantalla de "mis reservas" con opción de cancelar, y verificar manualmente

## 4. Verificación integral

- [ ] 4.1 Ejecutar la suite completa de tests automatizados de este change y verificar que todos pasan
- [ ] 4.2 Validar los artefactos de OpenSpec con `openspec validate --strict` para este change y verificar que no reporta errores
