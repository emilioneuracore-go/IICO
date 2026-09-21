# Spec Delta

## Purpose

Permitir que el Departamento de Orientación registre información de convivencia estudiantil y organice a los alumnos en grupos de seguimiento propios, distintos del curso/división formal de Secretaría Académica.

## ADDED Requirements

### Requirement: Registro de grupo de seguimiento
El sistema SHALL permitir a una cuenta con rol Orientación crear un grupo de seguimiento compuesto por dos o más alumnos, con un motivo u objetivo de seguimiento, independiente del curso/división formal.

#### Scenario: Alta de un grupo de seguimiento
- **WHEN** un profesional de Orientación crea un grupo de seguimiento con un conjunto de alumnos y un motivo
- **THEN** el sistema registra el grupo con sus alumnos y motivo

### Requirement: Un alumno puede pertenecer a más de un grupo de seguimiento
El sistema SHALL permitir que un alumno esté incluido en más de un grupo de seguimiento simultáneamente.

#### Scenario: Alumno en dos grupos de seguimiento
- **WHEN** un alumno ya pertenece a un grupo de seguimiento y se lo incluye en otro grupo distinto
- **THEN** el sistema mantiene su pertenencia a ambos grupos

### Requirement: Registro de observación de convivencia estudiantil
El sistema SHALL permitir registrar una observación de convivencia estudiantil asociada a un grupo de seguimiento o a un curso/división, con fecha y descripción.

#### Scenario: Alta de observación de convivencia
- **WHEN** un profesional de Orientación registra una observación de convivencia para un grupo de seguimiento
- **THEN** el sistema la asocia a ese grupo, con fecha y descripción

### Requirement: Visibilidad restringida a Orientación y Dirección
El sistema SHALL denegar el acceso a los grupos de seguimiento y a sus observaciones de convivencia a cualquier cuenta sin rol Orientación o Dirección.

#### Scenario: Preceptor intenta acceder a un grupo de seguimiento
- **WHEN** una cuenta con rol preceptor intenta consultar un grupo de seguimiento de Orientación
- **THEN** el sistema deniega el acceso
