# Spec Delta

## Purpose

Gestionar el legajo de cada alumno como registro central de sus datos personales, de contacto, responsables/familiares y trayectoria dentro de la institución.

## ADDED Requirements

### Requirement: Alta de legajo de alumno
El sistema SHALL permitir crear un legajo de alumno con sus datos personales y de contacto obligatorios.

#### Scenario: Alta exitosa con datos obligatorios completos
- **WHEN** el personal de Secretaría Académica crea un legajo con todos los datos obligatorios (nombre, apellido, documento, fecha de nacimiento)
- **THEN** el sistema crea el legajo y lo deja disponible para consulta

#### Scenario: Alta rechazada por datos obligatorios faltantes
- **WHEN** se intenta crear un legajo sin uno de los datos obligatorios
- **THEN** el sistema rechaza el alta e indica qué dato falta

### Requirement: Edición de datos del legajo
El sistema SHALL permitir actualizar los datos de un legajo existente, conservando un registro de que fue modificado.

#### Scenario: Actualización de datos de contacto
- **WHEN** el personal autorizado actualiza el domicilio o teléfono de contacto de un alumno
- **THEN** el legajo refleja los nuevos datos y queda registrado quién y cuándo hizo el cambio

### Requirement: Registro de responsables/familiares del alumno
El sistema SHALL permitir asociar uno o más responsables (madre, padre, tutor) a un legajo de alumno.

#### Scenario: Asociación de uno o más responsables a un alumno
- **WHEN** se registra un responsable con sus datos de contacto y vínculo con el alumno
- **THEN** el legajo del alumno lista a ese responsable entre sus contactos autorizados

### Requirement: Consulta de legajo por rol autorizado
El sistema SHALL restringir la consulta y edición del legajo a usuarios con rol autorizado para Secretaría Académica.

#### Scenario: Personal de Secretaría Académica consulta legajo completo
- **WHEN** un usuario con rol de Secretaría Académica solicita el legajo de un alumno
- **THEN** el sistema muestra el legajo completo

#### Scenario: Usuario sin permiso no puede acceder al legajo
- **WHEN** un usuario sin rol autorizado intenta consultar un legajo
- **THEN** el sistema deniega el acceso
