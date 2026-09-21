# Tasks

## 1. Perfil de alumno (`alumnos/perfil`)

- [ ] 1.1 Modelar en Prisma el catálogo de Avatares predefinidos y la Foto de Perfil por alumno, y verificar con migración aplicada
- [ ] 1.2 Implementar la administración del catálogo de avatares (alta/baja) por Dirección/Secretaría, y verificar con un test
- [ ] 1.3 Implementar la selección de avatar por el alumno y verificar con un test
- [ ] 1.4 Implementar la carga de foto de perfil y verificar con un test
- [ ] 1.5 Implementar la eliminación de una foto de perfil reportada, revirtiendo al avatar predefinido, y verificar con un test

## 2. Foro de curso (`alumnos/foro-curso`)

- [ ] 2.1 Modelar en Prisma Publicación de Foro y Reporte de Contenido (con vínculo a curso/división) y verificar con migración aplicada
- [ ] 2.2 Implementar la publicación en el foro del propio curso y verificar con un test
- [ ] 2.3 Implementar la restricción de visibilidad y publicación al curso/división correspondiente, y verificar con un test que otro curso es rechazado
- [ ] 2.4 Implementar la consulta de supervisión para docentes del curso, preceptores, Orientación y Dirección, y verificar con un test
- [ ] 2.5 Implementar el reporte de una publicación y verificar con un test
- [ ] 2.6 Implementar la revisión de un reporte (eliminar o desestimar) por personal autorizado, dejando registro, y verificar con tests ambos desenlaces

## 3. Desafíos académicos (`alumnos/desafios`)

- [ ] 3.1 Modelar en Prisma Desafío Académico y Resolución de Desafío (con puntaje) y verificar con migración aplicada
- [ ] 3.2 Implementar la creación de un desafío por el docente con puntaje máximo, y verificar con un test
- [ ] 3.3 Implementar el envío de resolución por el alumno del curso correspondiente, y verificar con un test
- [ ] 3.4 Implementar la asignación de puntaje por el docente, con el tope del puntaje máximo, y verificar con tests el caso válido y el de exceso
- [ ] 3.5 Implementar el cálculo de puntaje acumulado por alumno y verificar con un test

## 4. Tabla de posiciones (`alumnos/tabla-posiciones`)

- [ ] 4.1 Implementar el cálculo del ranking en vivo por puntaje acumulado y verificar con un test
- [ ] 4.2 Implementar la consulta del ranking para alumnos, docentes, Secretaría Académica y Dirección, y verificar con un test
- [ ] 4.3 Modelar en Prisma Cierre de Período y Crédito Otorgado, y verificar con migración aplicada
- [ ] 4.4 Implementar el cierre de período con otorgamiento de créditos al top 10 vigente, disparado por personal autorizado, y verificar con un test
- [ ] 4.5 Implementar la persistencia de créditos ya otorgados independiente de cambios posteriores del ranking, y verificar con un test
- [ ] 4.6 Implementar la consulta del historial de créditos de un alumno y verificar con un test

## 5. Frontend

- [ ] 5.1 Implementar la pantalla de selección de avatar y carga de foto de perfil, y verificar manualmente
- [ ] 5.2 Implementar el foro del curso (publicar, ver, reportar) y la vista de moderación para personal autorizado, y verificar manualmente ambos flujos
- [ ] 5.3 Implementar la pantalla de desafíos (creación por docente, resolución por alumno, asignación de puntaje) y verificar manualmente
- [ ] 5.4 Implementar la tabla de posiciones y el historial de créditos, y verificar manualmente

## 6. Verificación integral

- [ ] 6.1 Ejecutar la suite completa de tests automatizados de este change y verificar que todos pasan
- [ ] 6.2 Validar los artefactos de OpenSpec con `openspec validate --strict` para este change y verificar que no reporta errores
