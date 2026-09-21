# Spec Delta

## Purpose

Dar a cada responsable (madre, padre o tutor) una cuenta de usuario vinculada al legajo de su alumno, con el mismo nivel de acceso que cualquier otro responsable del mismo alumno.

## ADDED Requirements

### Requirement: Cuenta de usuario vinculada a un responsable
El sistema SHALL permitir crear una cuenta de usuario con rol Familia, vinculada a uno o más responsables ya registrados en el legajo de un alumno.

#### Scenario: Alta de cuenta para un responsable existente
- **WHEN** Secretaría Académica genera credenciales para un responsable ya registrado en el legajo de un alumno
- **THEN** el sistema crea una cuenta con rol Familia vinculada a ese responsable y al alumno correspondiente

### Requirement: Igual nivel de acceso entre responsables de un mismo alumno
El sistema SHALL otorgar el mismo nivel de acceso a la información de un alumno a todos los responsables vinculados a ese alumno.

#### Scenario: Dos responsables del mismo alumno ven la misma información
- **WHEN** dos cuentas de responsables distintos están vinculadas al mismo alumno
- **THEN** ambas cuentas acceden al mismo conjunto de información académica, de convivencia, institucional y de trámites de ese alumno

### Requirement: Una cuenta puede estar vinculada a más de un alumno
El sistema SHALL permitir que una misma cuenta de responsable esté vinculada a más de un alumno (por ejemplo, hermanos).

#### Scenario: Responsable con más de un hijo/a en la institución
- **WHEN** un responsable tiene más de un alumno a cargo en la institución
- **THEN** su cuenta permite seleccionar y consultar la información de cada alumno vinculado

### Requirement: Acceso restringido a alumnos no vinculados
El sistema SHALL impedir que una cuenta de responsable acceda a información de un alumno al que no está vinculada.

#### Scenario: Intento de acceso a un alumno no vinculado
- **WHEN** una cuenta de responsable intenta consultar información de un alumno con el que no tiene vínculo registrado
- **THEN** el sistema deniega el acceso
