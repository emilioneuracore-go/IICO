# Spec Delta

## Purpose

Avisar proactivamente a la familia de novedades relevantes de su alumno: evaluaciones próximas, nuevas sanciones y nuevos comunicados.

## ADDED Requirements

### Requirement: Alerta de evaluación próxima
El sistema SHALL generar una alerta a la familia cuando se registre una evaluación próxima para una materia del alumno vinculado.

#### Scenario: Nueva evaluación programada
- **WHEN** se registra una evaluación próxima para una materia del curso del alumno
- **THEN** el sistema genera una alerta visible para las cuentas de familia vinculadas a ese alumno

### Requirement: Alerta de nueva sanción
El sistema SHALL generar una alerta a la familia cuando se registre una nueva sanción para su alumno.

#### Scenario: Nueva sanción registrada
- **WHEN** se registra una sanción para un alumno
- **THEN** el sistema genera una alerta visible para las cuentas de familia vinculadas a ese alumno

### Requirement: Alerta de nuevo comunicado
El sistema SHALL generar una alerta a la familia cuando se publique un comunicado cuyo alcance incluya a su alumno.

#### Scenario: Nuevo comunicado dirigido al curso del alumno
- **WHEN** se publica un comunicado dirigido al curso del alumno
- **THEN** el sistema genera una alerta visible para las cuentas de familia vinculadas a ese alumno

### Requirement: Marcado de alertas como leídas
El sistema SHALL permitir a la cuenta de familia marcar una alerta como leída sin afectar la visibilidad de esa alerta para otros responsables del mismo alumno.

#### Scenario: Un responsable lee una alerta
- **WHEN** un responsable marca una alerta como leída
- **THEN** esa alerta sigue apareciendo como no leída para los demás responsables vinculados al mismo alumno
