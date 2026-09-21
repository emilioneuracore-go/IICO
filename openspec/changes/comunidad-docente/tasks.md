# Tasks

## 1. Foro de docentes (`docentes/foro`)

- [ ] 1.1 Modelar en Prisma Publicación de Foro Docente y Reporte de Contenido Docente, y verificar con migración aplicada
- [ ] 1.2 Implementar la publicación con materiales adjuntos (documento/bibliografía/audiovisual) y verificar con un test
- [ ] 1.3 Implementar la consulta del foro para cualquier docente de la escuela y verificar con un test
- [ ] 1.4 Implementar el reporte de una publicación y verificar con un test
- [ ] 1.5 Implementar la revisión (eliminar o desestimar) por Dirección, con registro de la decisión, y verificar con tests ambos desenlaces
- [ ] 1.6 Restringir la revisión al rol Dirección y verificar con un test que otro rol es rechazado

## 2. Chats entre docentes (`docentes/chats`)

- [ ] 2.1 Modelar en Prisma Chat, Participante de Chat y Mensaje (un chat con 2 o más participantes cubre tanto el caso directo como el grupal) y verificar con migración aplicada
- [ ] 2.2 Implementar el inicio de un chat directo (2 participantes) y el envío/consulta de mensajes, y verificar con un test
- [ ] 2.3 Implementar la creación de un chat grupal (3 o más participantes) y verificar con un test
- [ ] 2.4 Restringir el acceso a los mensajes de un chat a sus participantes y verificar con un test de acceso denegado
- [ ] 2.5 Implementar el reporte de un mensaje por un participante y verificar con un test
- [ ] 2.6 Implementar la revisión de un mensaje reportado por Dirección, con el contexto acotado necesario, y verificar con un test
- [ ] 2.7 Restringir la revisión al rol Dirección y verificar con un test que otro rol es rechazado

## 3. Frontend

- [ ] 3.1 Implementar el foro de docentes (publicar, ver, reportar) y la vista de moderación para Dirección, y verificar manualmente ambos flujos
- [ ] 3.2 Implementar la mensajería directa y grupal entre docentes, y verificar manualmente
- [ ] 3.3 Implementar el reporte de un mensaje y la vista de revisión de mensajes reportados para Dirección, y verificar manualmente

## 4. Verificación integral

- [ ] 4.1 Ejecutar la suite completa de tests automatizados de este change y verificar que todos pasan
- [ ] 4.2 Validar los artefactos de OpenSpec con `openspec validate --strict` para este change y verificar que no reporta errores
