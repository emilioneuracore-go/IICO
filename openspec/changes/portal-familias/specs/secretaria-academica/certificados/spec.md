# Spec Delta

## Purpose

Emitir certificados oficiales sobre la situación de un alumno (por ejemplo, certificado de alumno regular) a pedido de la familia o del propio alumno.

## ADDED Requirements

### Requirement: Emisión de certificado de alumno regular
El sistema SHALL permitir a Secretaría Académica emitir un certificado de alumno regular para un alumno con matrícula activa en el libro matriz.

#### Scenario: Emisión exitosa
- **WHEN** Secretaría Académica emite un certificado de alumno regular para un alumno con inscripción activa
- **THEN** el sistema genera el certificado con los datos vigentes del alumno y la fecha de emisión

#### Scenario: Emisión rechazada por matrícula inactiva
- **WHEN** se solicita un certificado de alumno regular para un alumno sin inscripción activa en el período vigente
- **THEN** el sistema rechaza la emisión e indica el motivo

### Requirement: Historial de certificados emitidos
El sistema SHALL mantener un historial de los certificados emitidos por alumno, con tipo, fecha y quién lo emitió.

#### Scenario: Consulta del historial de certificados de un alumno
- **WHEN** Secretaría Académica consulta el historial de certificados de un alumno
- **THEN** el sistema devuelve todos los certificados emitidos con su tipo y fecha
