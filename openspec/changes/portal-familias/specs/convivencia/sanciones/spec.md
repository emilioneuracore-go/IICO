# Spec Delta

## Purpose

Registrar las faltas disciplinarias y sanciones aplicadas a un alumno, y ponerlas a disposición de la familia y del personal autorizado.

## ADDED Requirements

### Requirement: Registro de falta disciplinaria
El sistema SHALL permitir registrar una falta disciplinaria de un alumno, con motivo, fecha y quién la reporta.

#### Scenario: Alta de falta disciplinaria
- **WHEN** un preceptor o directivo registra una falta disciplinaria de un alumno con motivo y fecha
- **THEN** el sistema crea el registro y lo asocia al legajo del alumno

### Requirement: Registro de sanción asociada a una o más faltas
El sistema SHALL permitir registrar una sanción (por ejemplo, apercibimiento o suspensión) asociada a una o más faltas disciplinarias de un alumno.

#### Scenario: Alta de sanción
- **WHEN** un directivo registra una sanción para un alumno, indicando el tipo de sanción y las faltas que la motivan
- **THEN** el sistema crea el registro de sanción vinculado a esas faltas y al alumno

### Requirement: Consulta de faltas y sanciones por rol autorizado
El sistema SHALL permitir consultar las faltas y sanciones de un alumno a la familia vinculada y al personal con rol autorizado.

#### Scenario: Familia consulta las sanciones de su alumno
- **WHEN** una cuenta de familia solicita el historial de faltas y sanciones de su alumno vinculado
- **THEN** el sistema devuelve ese historial

#### Scenario: Usuario sin rol autorizado no accede a faltas/sanciones de un alumno no vinculado
- **WHEN** un usuario sin rol autorizado ni vínculo con el alumno intenta consultar sus faltas o sanciones
- **THEN** el sistema deniega el acceso
