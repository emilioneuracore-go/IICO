# Spec Delta

## Purpose

Dar a cada alumno una cuenta de usuario propia, vinculada a su legajo, para que pueda consultar información institucional sin depender de la cuenta de su responsable.

## ADDED Requirements

### Requirement: Cuenta de usuario vinculada al propio legajo
El sistema SHALL permitir crear una cuenta de usuario con rol Alumno, vinculada al legajo del alumno correspondiente.

#### Scenario: Alta de cuenta para un alumno con legajo existente
- **WHEN** Secretaría Académica genera credenciales para un alumno con legajo activo
- **THEN** el sistema crea una cuenta con rol Alumno vinculada a ese legajo

### Requirement: Acceso restringido al propio legajo
El sistema SHALL permitir que una cuenta de Alumno acceda únicamente a la información vinculada a su propio legajo.

#### Scenario: Intento de acceso a información de otro alumno
- **WHEN** una cuenta de Alumno intenta consultar información vinculada al legajo de otro alumno
- **THEN** el sistema deniega el acceso

### Requirement: Alcance de solo lectura para el rol Alumno
El sistema SHALL exponer al rol Alumno acceso de solo lectura sobre la información institucional prevista para ese rol (situación académica, horario, calendario y comunicados, notificaciones), sin permitir edición.

#### Scenario: Intento de modificación por parte de una cuenta de Alumno
- **WHEN** una cuenta de Alumno intenta modificar una nota, un acta, una sanción o un comunicado
- **THEN** el sistema rechaza la operación
