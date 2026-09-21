# Spec Delta

## Purpose

Registrar y consultar las inasistencias de un alumno por materia y fecha, como base tanto para la gestión interna de Secretaría Académica como para la importación de datos oficiales del SGE.

## ADDED Requirements

### Requirement: Registro de inasistencia por materia y fecha
El sistema SHALL permitir registrar una inasistencia de un alumno a una materia en una fecha determinada.

#### Scenario: Alta de inasistencia
- **WHEN** personal autorizado registra la inasistencia de un alumno a una materia en una fecha determinada
- **THEN** el sistema la registra asociada a ese alumno, materia y fecha

### Requirement: Origen del registro de inasistencia
El sistema SHALL registrar si una inasistencia fue cargada manualmente o proviene de una importación del SGE.

#### Scenario: Inasistencia cargada manualmente
- **WHEN** personal autorizado carga una inasistencia directamente en IICO
- **THEN** el sistema la registra con origen "manual"

### Requirement: Consulta de inasistencias por alumno
El sistema SHALL permitir consultar el listado de inasistencias de un alumno, filtrando por materia o por rango de fechas.

#### Scenario: Consulta de inasistencias de un alumno en un período
- **WHEN** se solicita el listado de inasistencias de un alumno para un rango de fechas
- **THEN** el sistema devuelve las inasistencias registradas en ese rango, indicando materia y origen de cada una
