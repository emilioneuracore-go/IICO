# Tasks

## 1. Rol Administración

- [ ] 1.1 Agregar el rol Administración al modelo de roles y verificar con un test de alta

## 2. Habilitación de matriculación

- [ ] 2.1 Exponer el cálculo de habilitación de `secretaria-academica/materias-previas` como función reutilizable (sin duplicar el tope) y verificar con un test que devuelve el mismo resultado que usa la promoción
- [ ] 2.2 Implementar la consulta de habilitación para un alumno desde Administración y verificar con tests los casos habilitado/no habilitado

## 3. Registro de matriculación (`administracion/matriculacion`)

- [ ] 3.1 Modelar en Prisma Matriculación (alumno, período, fecha, estado) como entidad separada de la inscripción del libro matriz, y verificar con migración aplicada
- [ ] 3.2 Implementar el bloqueo del registro de matriculación para un alumno con más de 3 materias adeudadas (sin excepción para ningún rol, incluido Dirección), y verificar con tests ambos casos
- [ ] 3.3 Implementar el registro de matriculación de un alumno habilitado y verificar con un test
- [ ] 3.4 Implementar la consulta combinada de estado de libro matriz y de matriculación de un alumno, mostrando ambos por separado, y verificar con un test el caso de un alumno con uno registrado y el otro no
- [ ] 3.5 Restringir el acceso a consulta y registro con el rol Administración y verificar con un test que otro rol es rechazado

## 4. Frontend de Administración

- [ ] 4.1 Implementar la pantalla de consulta de habilitación y registro de matriculación, y verificar manualmente los casos habilitado, no habilitado y ya matriculado

## 5. Verificación integral

- [ ] 5.1 Ejecutar la suite completa de tests automatizados de este change y verificar que todos pasan
- [ ] 5.2 Validar los artefactos de OpenSpec con `openspec validate --strict` para este change y verificar que no reporta errores
