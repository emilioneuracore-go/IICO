# Spec Delta

## Purpose

Definir el modelo base de usuarios, roles y permisos multiusuario sobre el que se apoya Secretaría Académica y en el que se anclarán los futuros módulos de Padres/Madres y Departamento de Orientación.

## ADDED Requirements

### Requirement: Autenticación de usuarios
El sistema SHALL requerir que todo usuario se autentique con credenciales válidas antes de acceder a cualquier capacidad protegida.

#### Scenario: Usuario con credenciales válidas inicia sesión
- **WHEN** un usuario ingresa credenciales correctas
- **THEN** el sistema le concede una sesión con los permisos de su rol

#### Scenario: Usuario con credenciales inválidas es rechazado
- **WHEN** un usuario ingresa credenciales incorrectas
- **THEN** el sistema rechaza el inicio de sesión sin conceder acceso

### Requirement: Roles diferenciados por perfil
El sistema SHALL asociar a cada usuario uno o más roles que determinan a qué capacidades puede acceder.

#### Scenario: Usuario con rol de Secretaría Académica accede a las capacidades del módulo
- **WHEN** un usuario con rol de Secretaría Académica opera sobre legajos, libro matriz, actas o pases
- **THEN** el sistema permite la operación

#### Scenario: Usuario sin rol asignado no accede a ninguna capacidad protegida
- **WHEN** un usuario autenticado no tiene ningún rol asignado
- **THEN** el sistema le deniega el acceso a las capacidades protegidas

### Requirement: Extensibilidad de roles para módulos futuros
El sistema SHALL permitir definir nuevos roles (por ejemplo, familiar o profesional de orientación) sin modificar la definición de los roles existentes.

#### Scenario: Alta de un nuevo rol
- **WHEN** un administrador define un nuevo rol para un módulo futuro
- **THEN** el sistema lo incorpora sin alterar los permisos de los roles ya definidos

### Requirement: Registro de auditoría de accesos sensibles
El sistema SHALL registrar quién y cuándo consulta o modifica información sensible de un alumno (por ejemplo, su legajo).

#### Scenario: Consulta de legajo queda auditada
- **WHEN** un usuario consulta o modifica el legajo de un alumno
- **THEN** el sistema registra el usuario, la acción y la fecha/hora del evento
