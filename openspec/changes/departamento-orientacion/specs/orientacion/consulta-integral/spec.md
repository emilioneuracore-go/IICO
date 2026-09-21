# Spec Delta

## Purpose

Dar al Departamento de Orientación y a Dirección una vista de solo lectura que integre calificaciones, inasistencias, situación disciplinaria y datos de contacto de padres/madres de un alumno, sin tener que consultar cada capability por separado.

## ADDED Requirements

### Requirement: Vista integrada de un alumno
El sistema SHALL permitir a una cuenta con rol Orientación o Dirección consultar, para un alumno determinado, sus calificaciones, sus inasistencias, su situación disciplinaria y los datos de contacto de sus responsables, en una única vista.

#### Scenario: Consulta integral por Orientación
- **WHEN** una cuenta con rol Orientación solicita la vista integrada de un alumno
- **THEN** el sistema devuelve sus calificaciones, inasistencias, situación disciplinaria y datos de contacto de responsables

### Requirement: Acceso de solo lectura
El sistema SHALL exponer la vista integrada en modo solo lectura; ninguna modificación de calificaciones, inasistencias, sanciones o datos de contacto se realiza desde esta capability.

#### Scenario: Intento de modificación desde la vista integrada
- **WHEN** una cuenta con rol Orientación intenta modificar un dato mostrado en la vista integrada
- **THEN** el sistema rechaza la operación, indicando que esa modificación corresponde a la capability de origen del dato

### Requirement: Restricción de acceso por rol
El sistema SHALL denegar el acceso a la vista integrada de un alumno a cualquier cuenta que no tenga rol Orientación o Dirección.

#### Scenario: Usuario sin rol autorizado intenta acceder
- **WHEN** una cuenta sin rol Orientación ni Dirección intenta consultar la vista integrada de un alumno
- **THEN** el sistema deniega el acceso
