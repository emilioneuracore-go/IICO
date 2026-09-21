# Spec Delta

## Purpose

Permitir que un docente solicite autorización institucional para llegar tarde, retirarse antes, faltar o tomar una licencia, que Dirección la resuelva, y que quede vinculada al registro de asistencia correspondiente.

## ADDED Requirements

### Requirement: Solicitud de autorización
El sistema SHALL permitir a una cuenta docente crear una solicitud de autorización de tipo llegada tarde, retiro anticipado, falta o licencia, indicando la fecha y turno afectado y un motivo.

#### Scenario: Solicitud de llegada tarde
- **WHEN** un docente crea una solicitud de llegada tarde para un turno y fecha determinados con un motivo
- **THEN** el sistema la registra en estado pendiente

### Requirement: Solicitud anticipada o retroactiva
El sistema SHALL permitir crear una solicitud tanto para una fecha futura (pedido anticipado) como para una fecha ya transcurrida (justificación retroactiva).

#### Scenario: Justificación retroactiva de una falta
- **WHEN** un docente crea una solicitud de falta para un turno de una fecha anterior a la actual
- **THEN** el sistema la acepta y la registra en estado pendiente igual que una solicitud anticipada

### Requirement: Adjunto opcional de respaldo
El sistema SHALL permitir adjuntar un archivo opcional de respaldo a una solicitud.

#### Scenario: Solicitud con adjunto
- **WHEN** un docente adjunta un archivo de respaldo a su solicitud
- **THEN** el sistema lo asocia a esa solicitud

### Requirement: Aprobación o rechazo por Dirección
El sistema SHALL permitir a una cuenta con rol Dirección aprobar o rechazar una solicitud pendiente.

#### Scenario: Aprobación de una solicitud
- **WHEN** Dirección aprueba una solicitud pendiente
- **THEN** el sistema la marca como aprobada y registra quién la resolvió

#### Scenario: Rechazo de una solicitud
- **WHEN** Dirección rechaza una solicitud pendiente
- **THEN** el sistema la marca como rechazada y registra quién la resolvió

### Requirement: Restricción de resolución por rol
El sistema SHALL denegar la aprobación o rechazo de una solicitud a cualquier cuenta sin rol Dirección.

#### Scenario: Secretaría Académica intenta aprobar una solicitud
- **WHEN** una cuenta con rol de Secretaría Académica intenta aprobar una solicitud
- **THEN** el sistema deniega la operación

### Requirement: Vínculo de una solicitud aprobada con la asistencia docente
El sistema SHALL vincular una solicitud aprobada al registro de `secretaria-academica/asistencia-docente` del turno y fecha que afecta, como explicación de ese registro.

#### Scenario: Consulta de asistencia con solicitud aprobada vinculada
- **WHEN** se consulta la asistencia de un docente en un turno con una solicitud aprobada para esa fecha
- **THEN** el sistema muestra la asistencia junto con la solicitud que la explica

### Requirement: Consulta de solicitudes propias
El sistema SHALL permitir a un docente consultar el estado de sus propias solicitudes.

#### Scenario: Consulta de solicitudes propias
- **WHEN** un docente solicita el listado de sus propias solicitudes
- **THEN** el sistema devuelve sus solicitudes con tipo, fecha/turno, motivo y estado
