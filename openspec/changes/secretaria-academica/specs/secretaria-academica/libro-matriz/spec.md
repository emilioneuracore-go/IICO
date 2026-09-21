# Spec Delta

## Purpose

Llevar el registro oficial y correlativo de matriculación de alumnos por libro y año, como respaldo legal de la inscripción en la institución.

## ADDED Requirements

### Requirement: Numeración correlativa de matrícula
El sistema SHALL asignar a cada nueva inscripción un número de matrícula correlativo dentro de su libro y año correspondiente.

#### Scenario: Alta de nuevo alumno asigna número correlativo
- **WHEN** se inscribe un alumno en el libro matriz de un año determinado
- **THEN** el sistema le asigna el siguiente número correlativo disponible en ese libro/año

### Requirement: Unicidad de inscripción por período
El sistema SHALL impedir que un mismo alumno tenga dos inscripciones activas en el libro matriz para el mismo período.

#### Scenario: Intento de doble inscripción en el mismo período es rechazado
- **WHEN** se intenta inscribir en el libro matriz a un alumno que ya tiene una inscripción activa en ese período
- **THEN** el sistema rechaza la nueva inscripción e indica la inscripción existente

### Requirement: Consulta histórica del libro matriz
El sistema SHALL permitir consultar las inscripciones del libro matriz filtrando por año o libro.

#### Scenario: Consulta de inscripciones por año/libro
- **WHEN** el personal de Secretaría Académica solicita el listado de inscripciones de un año/libro específico
- **THEN** el sistema devuelve todas las inscripciones registradas en ese libro/año con su número correlativo
