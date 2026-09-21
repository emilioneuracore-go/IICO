# Spec Delta

## Purpose

Mantener el catálogo de espacios y elementos de la escuela que los docentes pueden reservar.

## ADDED Requirements

### Requirement: Alta de espacio o elemento reservable
El sistema SHALL permitir a una cuenta con rol directivo o de Secretaría registrar un espacio o elemento reservable, indicando su nombre y tipo (espacio o elemento).

#### Scenario: Alta de un espacio
- **WHEN** una cuenta con rol directivo registra el laboratorio como espacio reservable
- **THEN** el sistema lo incorpora al catálogo como disponible para reservas

#### Scenario: Alta de un elemento
- **WHEN** una cuenta con rol de Secretaría registra un proyector como elemento reservable
- **THEN** el sistema lo incorpora al catálogo como disponible para reservas

### Requirement: Baja de un espacio o elemento del catálogo
El sistema SHALL permitir dar de baja un espacio o elemento del catálogo, dejando de ofrecerlo para nuevas reservas.

#### Scenario: Baja de un elemento
- **WHEN** una cuenta con rol directivo o de Secretaría da de baja un elemento del catálogo
- **THEN** el sistema no lo ofrece más como opción para nuevas reservas

### Requirement: Marcado como fuera de servicio
El sistema SHALL permitir marcar un espacio o elemento como fuera de servicio, sin darlo de baja del catálogo, para impedir reservas mientras dure esa condición.

#### Scenario: Marcado fuera de servicio
- **WHEN** una cuenta con rol directivo o de Secretaría marca un proyector como fuera de servicio
- **THEN** el sistema impide nuevas reservas de ese elemento hasta que se revierta la marca

### Requirement: Restricción de administración del catálogo por rol
El sistema SHALL denegar el alta, baja o marcado fuera de servicio de un espacio o elemento a cualquier cuenta sin rol directivo o de Secretaría.

#### Scenario: Docente intenta dar de alta un elemento
- **WHEN** una cuenta con rol docente intenta registrar un nuevo elemento en el catálogo
- **THEN** el sistema deniega la operación
