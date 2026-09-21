# Tasks

## 1. Modelo de datos

- [ ] 1.1 Modelar en Prisma Planificación Anual (materia, curso/división, docente, año lectivo, campos estructurados fijos, sección de articulación opcional) y verificar con migración aplicada
- [ ] 1.2 Modelar el historial de correcciones de una planificación (quién, cuándo) y verificar con migración aplicada

## 2. Carga y corrección

- [ ] 2.1 Implementar la carga de planificación anual con el esquema fijo de campos y verificar con un test de alta completa
- [ ] 2.2 Implementar la exigencia de la sección de articulación cuando la materia tiene Proyecto Integrado vinculado (consultando `secretaria-academica/materias`), y verificar con tests ambos casos (con y sin Proyecto Integrado)
- [ ] 2.3 Implementar la corrección de una planificación vigente, dejando trazabilidad, y verificar con un test
- [ ] 2.4 Restringir la carga/corrección al docente asignado a esa materia/curso y verificar con un test que otro docente es rechazado

## 3. Consulta por roles autorizados

- [ ] 3.1 Implementar la consulta de solo lectura para Alumno (su propio curso) y verificar con un test
- [ ] 3.2 Implementar la consulta de solo lectura para Familia (curso del alumno vinculado) y verificar con un test
- [ ] 3.3 Implementar la consulta de solo lectura para Orientación, Dirección y Secretaría Académica (sin requerir vínculo con un alumno particular) y verificar con tests
- [ ] 3.4 Restringir el acceso a cuentas sin rol autorizado ni vínculo, y verificar con un test de rechazo

## 4. Frontend

- [ ] 4.1 Implementar el formulario de carga/corrección de planificación anual para docentes, incluyendo la sección de articulación cuando aplica, y verificar manualmente ambos casos
- [ ] 4.2 Implementar las vistas de consulta de planificación para Alumno, Familia, Orientación, Dirección y Secretaría Académica, y verificar manualmente cada rol

## 5. Verificación integral

- [ ] 5.1 Ejecutar la suite completa de tests automatizados de este change y verificar que todos pasan
- [ ] 5.2 Validar los artefactos de OpenSpec con `openspec validate --strict` para este change y verificar que no reporta errores
