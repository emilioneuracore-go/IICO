# Spec Delta

## Purpose

Permitir que Administración consulte si un alumno está habilitado para matricularse y registre su matriculación, bloqueando el trámite cuando el alumno adeuda más materias de las que la normativa permite.

## ADDED Requirements

### Requirement: Consulta de habilitación para matriculación
El sistema SHALL permitir a una cuenta con rol Administración consultar si un alumno está habilitado para matricularse, usando el mismo tope de materias adeudadas definido en `secretaria-academica/materias-previas`.

#### Scenario: Consulta de un alumno habilitado
- **WHEN** Administración consulta la habilitación de un alumno con 3 o menos materias adeudadas
- **THEN** el sistema informa que el alumno está habilitado para matricularse

#### Scenario: Consulta de un alumno no habilitado
- **WHEN** Administración consulta la habilitación de un alumno con más de 3 materias adeudadas
- **THEN** el sistema informa que el alumno no está habilitado para matricularse

### Requirement: Bloqueo del registro de matriculación
El sistema SHALL rechazar el registro de matriculación de un alumno con más de 3 materias adeudadas, sin excepción alguna: ningún rol, incluido Dirección, puede autorizar una matriculación por fuera de esta regla.

#### Scenario: Intento de matricular a un alumno no habilitado
- **WHEN** Administración intenta registrar la matriculación de un alumno con más de 3 materias adeudadas
- **THEN** el sistema rechaza el registro e indica el motivo

#### Scenario: Dirección intenta autorizar una excepción
- **WHEN** una cuenta con rol Dirección intenta registrar o forzar la matriculación de un alumno con más de 3 materias adeudadas
- **THEN** el sistema rechaza la operación de la misma forma que a cualquier otro rol, sin ofrecer una vía de excepción

### Requirement: Registro de matriculación de un alumno habilitado
El sistema SHALL permitir registrar la matriculación de un alumno habilitado para un período determinado, con su fecha.

#### Scenario: Matriculación exitosa
- **WHEN** Administración registra la matriculación de un alumno habilitado para el período vigente
- **THEN** el sistema crea el registro de matriculación asociado a ese alumno y período

### Requirement: La matriculación es un trámite independiente del libro matriz
El sistema SHALL mantener el registro de matriculación de Administración como una entidad separada de la inscripción en el libro matriz de Secretaría Académica, aunque ambos refieran al mismo alumno y período.

#### Scenario: Consulta de un alumno con libro matriz pero sin matriculación registrada
- **WHEN** se consulta a un alumno inscripto en el libro matriz que todavía no tiene matriculación registrada por Administración para el período vigente
- **THEN** el sistema muestra ambos estados por separado, sin asumir que uno implica el otro

### Requirement: Restricción de acceso por rol
El sistema SHALL denegar el acceso a la consulta de habilitación y al registro de matriculación a cualquier cuenta sin rol Administración.

#### Scenario: Usuario sin rol autorizado intenta registrar una matriculación
- **WHEN** una cuenta sin rol Administración intenta registrar una matriculación
- **THEN** el sistema deniega la operación
