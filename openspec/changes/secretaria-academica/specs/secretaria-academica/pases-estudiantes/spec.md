# Spec Delta

## Purpose

Registrar y dar trazabilidad a los pases de estudiantes que ingresan desde otra institución o egresan hacia otra.

## ADDED Requirements

### Requirement: Registro de pase de ingreso
El sistema SHALL permitir registrar el ingreso de un alumno proveniente de otra institución, incluyendo la documentación de origen recibida.

#### Scenario: Alta de alumno por pase con documentación de origen
- **WHEN** se registra un pase de ingreso con los datos del alumno y la documentación remitida por la institución de origen
- **THEN** el sistema crea o vincula el legajo del alumno y deja constancia del pase de ingreso

### Requirement: Registro de pase de egreso
El sistema SHALL permitir registrar el egreso de un alumno hacia otra institución, generando la documentación necesaria para el pase.

#### Scenario: Emisión de documentación de pase hacia institución de destino
- **WHEN** se registra un pase de egreso para un alumno con institución de destino
- **THEN** el sistema genera la documentación de pase con los datos académicos vigentes del alumno

### Requirement: Trazabilidad del estado del pase
El sistema SHALL mantener el estado de cada pase en trámite (pendiente, en proceso, completo).

#### Scenario: Consulta del estado de un pase en trámite
- **WHEN** el personal de Secretaría Académica consulta un pase que aún no fue completado
- **THEN** el sistema muestra su estado actual y la documentación pendiente, si la hubiera
