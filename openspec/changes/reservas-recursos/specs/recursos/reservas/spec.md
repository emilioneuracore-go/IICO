# Spec Delta

## Purpose

Permitir que los docentes reserven espacios y elementos del catálogo de la escuela para una franja horaria, con confirmación automática y sin superposiciones.

## ADDED Requirements

### Requirement: Reserva con confirmación automática
El sistema SHALL confirmar automáticamente la reserva de un espacio o elemento del catálogo cuando está disponible en la franja horaria solicitada, sin requerir aprobación de ningún otro rol.

#### Scenario: Reserva de un espacio disponible
- **WHEN** un docente reserva el laboratorio para una franja horaria en la que no tiene otra reserva confirmada
- **THEN** el sistema confirma la reserva de inmediato

### Requirement: Rechazo por superposición horaria
El sistema SHALL rechazar una reserva cuya franja horaria se superpone con otra reserva ya confirmada para el mismo espacio o elemento.

#### Scenario: Intento de reserva superpuesta
- **WHEN** un docente intenta reservar un espacio para una franja horaria que se superpone con una reserva ya confirmada de ese mismo espacio
- **THEN** el sistema rechaza la nueva reserva e indica el conflicto

### Requirement: Bloqueo de reserva de un recurso fuera de servicio
El sistema SHALL rechazar la reserva de un espacio o elemento marcado como fuera de servicio en `recursos/catalogo`.

#### Scenario: Intento de reserva de un elemento fuera de servicio
- **WHEN** un docente intenta reservar un elemento marcado como fuera de servicio
- **THEN** el sistema rechaza la reserva e indica el motivo

### Requirement: Consulta de reservas propias
El sistema SHALL permitir a un docente consultar sus propias reservas, vigentes y pasadas.

#### Scenario: Consulta de reservas propias
- **WHEN** un docente solicita el listado de sus reservas
- **THEN** el sistema devuelve sus reservas con el espacio/elemento, fecha y franja horaria de cada una

### Requirement: Cancelación de una reserva propia
El sistema SHALL permitir a un docente cancelar una reserva propia que todavía no comenzó.

#### Scenario: Cancelación de una reserva futura
- **WHEN** un docente cancela una reserva propia con franja horaria futura
- **THEN** el sistema la cancela y libera esa franja para otras reservas

#### Scenario: Intento de cancelar la reserva de otro docente
- **WHEN** un docente intenta cancelar una reserva que no le pertenece
- **THEN** el sistema deniega la operación
