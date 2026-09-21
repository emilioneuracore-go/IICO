# Spec Delta

## Purpose

Organizar a los alumnos en cursos y divisiones por año lectivo, como agrupamiento base que usan el horario de clases, la libreta de calificaciones y los comunicados con alcance por curso.

## ADDED Requirements

### Requirement: Definición de curso y división por año lectivo
El sistema SHALL permitir definir un curso y división (por ejemplo, "3° 2da") para un año lectivo determinado.

#### Scenario: Alta de curso y división
- **WHEN** personal autorizado crea un curso y división para el año lectivo vigente
- **THEN** el sistema lo deja disponible para asignar alumnos, horarios y comunicados

### Requirement: Asignación de alumno a curso y división
El sistema SHALL permitir asignar a un alumno a un curso y división vigente.

#### Scenario: Asignación de un alumno
- **WHEN** personal autorizado asigna un alumno a un curso y división del año lectivo vigente
- **THEN** el sistema registra esa asignación como la vigente para ese alumno

### Requirement: Un alumno pertenece a un único curso y división vigente
El sistema SHALL impedir que un alumno tenga más de una asignación vigente de curso y división en el mismo año lectivo.

#### Scenario: Reasignación de curso y división
- **WHEN** se asigna a un alumno a un nuevo curso y división estando ya asignado a otro en el mismo año lectivo
- **THEN** el sistema reemplaza la asignación vigente y conserva un registro del cambio

### Requirement: Consulta de alumnos por curso y división
El sistema SHALL permitir consultar el listado de alumnos asignados a un curso y división.

#### Scenario: Consulta de listado de un curso y división
- **WHEN** personal autorizado solicita el listado de alumnos de un curso y división
- **THEN** el sistema devuelve los alumnos actualmente asignados a ese curso y división
