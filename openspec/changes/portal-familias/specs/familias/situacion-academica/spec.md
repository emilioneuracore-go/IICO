# Spec Delta

## Purpose

Ofrecer a la familia una vista unificada y de solo lectura de la situación académica de su alumno: actas de examen, materias previas/promoción y libreta de calificaciones periódicas.

## ADDED Requirements

### Requirement: Consulta de resultados de actas de examen
El sistema SHALL permitir a una cuenta de familia consultar los resultados de las actas de examen del alumno vinculado.

#### Scenario: Consulta de historial de actas
- **WHEN** una cuenta de familia solicita el historial de actas de examen de su alumno
- **THEN** el sistema devuelve las actas en las que el alumno participó, con materia, fecha y resultado

### Requirement: Consulta de materias previas y habilitación a promoción
El sistema SHALL permitir a una cuenta de familia consultar las materias adeudadas de su alumno y si está habilitado a promocionar.

#### Scenario: Consulta de situación de promoción
- **WHEN** una cuenta de familia solicita la situación de promoción de su alumno
- **THEN** el sistema muestra las materias adeudadas y si el alumno está habilitado o no a promocionar, según el tope vigente

### Requirement: Consulta de libreta de calificaciones y boletín
El sistema SHALL permitir a una cuenta de familia consultar las notas periódicas y el boletín de su alumno.

#### Scenario: Consulta de boletín de un período
- **WHEN** una cuenta de familia solicita el boletín de un período determinado de su alumno
- **THEN** el sistema devuelve las notas periódicas registradas para ese alumno y período

### Requirement: Acceso de solo lectura
El sistema SHALL exponer la situación académica a la familia en modo solo lectura, sin permitir que modifique calificaciones, actas o materias previas.

#### Scenario: Intento de modificación por parte de una cuenta de familia
- **WHEN** una cuenta de familia intenta modificar una nota, un acta o una materia previa
- **THEN** el sistema rechaza la operación
