# Spec Delta

## Purpose

Permitir que la familia inicie trámites habituales (certificado de alumno regular, solicitud de pase) sin tener que hacerlo presencialmente, y que pueda seguir su estado hasta la resolución de Secretaría Académica.

## ADDED Requirements

### Requirement: Solicitud de certificado de alumno regular
El sistema SHALL permitir a una cuenta de familia solicitar un certificado de alumno regular para su alumno vinculado.

#### Scenario: Solicitud registrada
- **WHEN** una cuenta de familia solicita un certificado de alumno regular para su alumno
- **THEN** el sistema crea la solicitud en estado pendiente y la deja visible para Secretaría Académica

### Requirement: Solicitud de pase de estudiante
El sistema SHALL permitir a una cuenta de familia iniciar una solicitud de pase (egreso hacia otra institución) para su alumno vinculado.

#### Scenario: Solicitud de pase registrada
- **WHEN** una cuenta de familia inicia una solicitud de pase para su alumno
- **THEN** el sistema crea la solicitud en estado pendiente, quedando disponible para que Secretaría Académica la gestione con la capacidad de pases existente

### Requirement: Seguimiento de estado de la solicitud
El sistema SHALL permitir a la familia consultar el estado de sus solicitudes de trámite (pendiente, en proceso, resuelta) hasta su resolución.

#### Scenario: Consulta de estado de una solicitud en curso
- **WHEN** una cuenta de familia consulta una solicitud que aún no fue resuelta
- **THEN** el sistema muestra su estado actual

### Requirement: Resolución de la solicitud vinculada al trámite correspondiente
El sistema SHALL vincular cada solicitud resuelta al certificado emitido o al pase gestionado que le dio origen.

#### Scenario: Solicitud de certificado resuelta
- **WHEN** Secretaría Académica emite el certificado correspondiente a una solicitud pendiente
- **THEN** el sistema marca la solicitud como resuelta y la vincula al certificado emitido
