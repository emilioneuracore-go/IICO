# Spec Delta

## Purpose

Permitir que el Departamento de Orientación agende reuniones con un alumno y/o su familia, y registre el acta de cada reunión, con el mismo nivel de confidencialidad que sus registros propios.

## ADDED Requirements

### Requirement: Agenda de reunión
El sistema SHALL permitir a una cuenta con rol Orientación agendar una reunión asociada a un alumno, indicando fecha, motivo y participantes previstos (alumno, responsables, profesional de Orientación).

#### Scenario: Alta de reunión agendada
- **WHEN** un profesional de Orientación agenda una reunión para un alumno con fecha y motivo
- **THEN** el sistema la registra asociada a ese alumno

### Requirement: Convocatoria no expuesta a la familia dentro del sistema
El sistema SHALL NOT mostrar a las cuentas de familia ni de alumno la existencia de una reunión agendada por Orientación.

#### Scenario: Familia consulta su portal
- **WHEN** una cuenta de familia con una reunión agendada para su alumno consulta su portal
- **THEN** el sistema no muestra esa reunión entre su información visible

### Requirement: Registro de acta de la reunión
El sistema SHALL permitir registrar, para una reunión ya realizada, un acta con resumen y acuerdos alcanzados.

#### Scenario: Alta de acta tras la reunión
- **WHEN** un profesional de Orientación registra el acta de una reunión ya agendada
- **THEN** el sistema la asocia a esa reunión y al alumno correspondiente

### Requirement: Visibilidad restringida a Orientación y Dirección
El sistema SHALL denegar el acceso a una reunión agendada y a su acta a cualquier cuenta sin rol Orientación o Dirección.

#### Scenario: Usuario sin rol autorizado intenta consultar una reunión
- **WHEN** una cuenta sin rol Orientación ni Dirección intenta consultar una reunión o su acta
- **THEN** el sistema deniega el acceso
