# Tasks

## 1. Normalización de nombre de usuario

- [ ] 1.1 Implementar la función pura de normalización (quitar acentos/ñ, minúscula, concatenar nombre+apellido tal como figuran en el legajo) y verificar con tests distintos casos (nombre compuesto, apellido compuesto, acentos, ñ)
- [ ] 1.2 Implementar la consulta de colisión contra las cuentas de correo institucional ya generadas y el agregado de sufijo numérico incremental, y verificar con tests para 2ª y 3ª colisión

## 2. Integración con Google Workspace

- [ ] 2.1 Configurar las credenciales de administrador de Google Workspace (Admin/Directory API) para el dominio @iico.edu.ar y verificar con una llamada de prueba (por ejemplo, listar usuarios) que autentica correctamente
- [ ] 2.2 Implementar la creación de una cuenta de Google Workspace a partir de un nombre de usuario ya normalizado y verificar con un test de integración que la cuenta queda creada en el dominio
- [ ] 2.3 Implementar la verificación de si una cuenta ya existe en Google Workspace antes de reintentar su creación, y verificar con un test

## 3. Aprovisionamiento (`integraciones/correo-institucional`)

- [ ] 3.1 Modelar en Prisma Cuenta de Correo Institucional (persona, dirección generada, estado: pendiente/creada/error) y verificar con migración aplicada
- [ ] 3.2 Implementar el listener del evento de matriculación confirmada que crea el registro en estado "pendiente" y dispara la generación, y verificar con un test
- [ ] 3.3 Implementar el listener del evento de alta de cuenta con rol Docente que hace lo mismo, y verificar con un test
- [ ] 3.4 Implementar el manejo de error de la llamada a Google Workspace sin afectar la matriculación/alta original, marcando el registro en estado "error", y verificar con un test simulando una falla de la API
- [ ] 3.5 Implementar el reintento manual de una generación pendiente o en error, y verificar con un test

## 4. Consulta y acceso

- [ ] 4.1 Implementar la consulta del correo institucional y su estado desde el legajo de alumno y de docente, y verificar con un test
- [ ] 4.2 Restringir la consulta y el reintento manual a personal autorizado (Secretaría Académica/Administración) y verificar con un test que otro rol es rechazado

## 5. Frontend

- [ ] 5.1 Mostrar el correo institucional y su estado en la pantalla de legajo de alumno y de docente, y verificar manualmente los tres estados (pendiente, creada, error)
- [ ] 5.2 Implementar la acción de reintentar manualmente una generación en error, y verificar manualmente

## 6. Verificación integral

- [ ] 6.1 Ejecutar la suite completa de tests automatizados de este change y verificar que todos pasan
- [ ] 6.2 Validar los artefactos de OpenSpec con `openspec validate --strict` para este change y verificar que no reporta errores
