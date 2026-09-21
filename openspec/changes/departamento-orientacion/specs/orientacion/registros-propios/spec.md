# Spec Delta

## Purpose

Permitir que el Departamento de Orientación registre su propio seguimiento de un alumno, compartido entre sus profesionales y con Dirección, y oculto para el resto de la institución.

## ADDED Requirements

### Requirement: Registro de seguimiento propio de Orientación
El sistema SHALL permitir a una cuenta con rol Orientación crear un registro de seguimiento sobre un alumno, con fecha, autor y contenido.

#### Scenario: Alta de un registro de seguimiento
- **WHEN** un profesional de Orientación registra una nota de seguimiento sobre un alumno
- **THEN** el sistema la guarda asociada a ese alumno, con el autor y la fecha

### Requirement: Visibilidad compartida dentro de Orientación y con Dirección
El sistema SHALL mostrar los registros propios de Orientación de un alumno a cualquier cuenta con rol Orientación o Dirección, sin importar qué profesional los haya escrito.

#### Scenario: Otro profesional de Orientación consulta un registro
- **WHEN** un profesional de Orientación distinto del autor consulta los registros de un alumno
- **THEN** el sistema le muestra todos los registros, incluidos los escritos por otros profesionales de Orientación

### Requirement: Ocultamiento para el resto de la institución
El sistema SHALL denegar el acceso a los registros propios de Orientación de un alumno a cualquier cuenta sin rol Orientación o Dirección, incluyendo Secretaría Académica, docentes y familias.

#### Scenario: Secretaría Académica intenta acceder a un registro de Orientación
- **WHEN** una cuenta con rol de Secretaría Académica intenta consultar los registros propios de Orientación de un alumno
- **THEN** el sistema deniega el acceso

#### Scenario: Familia intenta acceder a un registro de Orientación
- **WHEN** una cuenta de familia intenta consultar los registros propios de Orientación de su alumno vinculado
- **THEN** el sistema deniega el acceso
