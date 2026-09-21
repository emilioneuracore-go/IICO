# Spec Delta

## Purpose

Generar automáticamente una cuenta de correo institucional en Google Workspace para cada alumno matriculado y cada docente dado de alta, con un formato de usuario uniforme y sin bloquear el trámite académico/administrativo que la origina.

## ADDED Requirements

### Requirement: Generación automática al matricular a un alumno
El sistema SHALL generar una cuenta de correo institucional cuando se confirma la matriculación de un alumno en `administracion/matriculacion`.

#### Scenario: Matriculación confirmada dispara la generación
- **WHEN** se confirma la matriculación de un alumno que todavía no tiene cuenta de correo institucional
- **THEN** el sistema inicia la generación de su cuenta de correo

### Requirement: Generación automática al dar de alta a un docente
El sistema SHALL generar una cuenta de correo institucional cuando se crea una cuenta de usuario con rol Docente en `identity/access-control`.

#### Scenario: Alta de docente dispara la generación
- **WHEN** se crea una cuenta con rol Docente que todavía no tiene cuenta de correo institucional
- **THEN** el sistema inicia la generación de su cuenta de correo

### Requirement: Formato del nombre de usuario
El sistema SHALL construir el nombre de usuario del correo concatenando el nombre y el apellido de la persona, en minúscula y sin acentos ni "ñ" (normalizados a su equivalente sin diacríticos), sin separador entre ambos, seguido del dominio `@iico.edu.ar`.

#### Scenario: Generación de un nombre de usuario simple
- **WHEN** se genera el correo de una persona llamada "Juan Pérez"
- **THEN** el sistema genera la dirección `juanperez@iico.edu.ar`

### Requirement: Desambiguación por colisión
El sistema SHALL agregar un número incremental al nombre de usuario cuando ya existe una cuenta de correo institucional con el mismo nombreapellido.

#### Scenario: Segunda persona con el mismo nombre y apellido
- **WHEN** ya existe la cuenta `juanperez@iico.edu.ar` y se genera el correo de otra persona también llamada "Juan Pérez"
- **THEN** el sistema genera la dirección `juanperez2@iico.edu.ar`

#### Scenario: Tercera colisión sobre el mismo nombreapellido
- **WHEN** ya existen `juanperez@iico.edu.ar` y `juanperez2@iico.edu.ar` y se genera el correo de una tercera persona con el mismo nombre y apellido
- **THEN** el sistema genera la dirección `juanperez3@iico.edu.ar`

### Requirement: La generación no bloquea el trámite que la origina
El sistema SHALL NOT impedir ni revertir la matriculación de un alumno ni el alta de un docente si la generación de su cuenta de correo falla.

#### Scenario: Falla la integración con Google Workspace
- **WHEN** la matriculación de un alumno se confirma pero la creación de la cuenta en Google Workspace falla
- **THEN** el sistema mantiene la matriculación confirmada y marca la generación de correo como pendiente de reintento

### Requirement: Reintento de una generación pendiente o en error
El sistema SHALL permitir reintentar la generación de una cuenta de correo que quedó pendiente o en error.

#### Scenario: Reintento manual de una generación fallida
- **WHEN** personal autorizado reintenta la generación de una cuenta de correo marcada en error
- **THEN** el sistema vuelve a intentar la creación en Google Workspace

### Requirement: Consulta del correo institucional generado
El sistema SHALL permitir consultar, desde el legajo de un alumno o de un docente, la dirección de correo institucional generada y su estado (creada, pendiente, error).

#### Scenario: Consulta del correo de un alumno
- **WHEN** personal autorizado consulta el legajo de un alumno con correo institucional ya generado
- **THEN** el sistema muestra la dirección de correo y su estado
