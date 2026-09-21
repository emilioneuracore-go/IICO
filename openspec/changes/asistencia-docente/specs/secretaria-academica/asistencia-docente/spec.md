# Spec Delta

## Purpose

Registrar la asistencia de los docentes mediante un check-in desde su dispositivo móvil, válido solo cuando se realiza conectado a la red institucional de la escuela, contemplando que es una escuela de doble turno.

## ADDED Requirements

### Requirement: Check-in de asistencia por turno
El sistema SHALL permitir a una cuenta docente registrar su presencia para un turno (mañana o tarde) del día en curso mediante un check-in.

#### Scenario: Check-in del turno mañana
- **WHEN** un docente hace check-in durante el turno mañana
- **THEN** el sistema registra su asistencia para ese turno y esa fecha

#### Scenario: Check-in de ambos turnos el mismo día
- **WHEN** un docente hace check-in en el turno mañana y más tarde también en el turno tarde del mismo día
- **THEN** el sistema registra su asistencia para ambos turnos de forma independiente

### Requirement: Check-in válido solo desde la red institucional
El sistema SHALL aceptar un check-in únicamente cuando la solicitud proviene de la red institucional de la escuela.

#### Scenario: Check-in fuera de la red institucional
- **WHEN** un docente intenta hacer check-in desde una conexión que no es la red institucional
- **THEN** el sistema rechaza el check-in e indica el motivo

### Requirement: Un check-in confirmado por turno y día
El sistema SHALL impedir más de un check-in confirmado para el mismo docente, turno y día.

#### Scenario: Intento de check-in duplicado en el mismo turno
- **WHEN** un docente que ya tiene check-in confirmado en el turno mañana de ese día intenta hacer check-in de nuevo para el mismo turno
- **THEN** el sistema no genera un segundo registro

### Requirement: Corrección manual de asistencia
El sistema SHALL permitir a una cuenta con rol Secretaría Académica o Dirección cargar o corregir manualmente la asistencia de un docente para un turno y fecha determinados.

#### Scenario: Carga manual de una asistencia no registrada
- **WHEN** Secretaría Académica carga manualmente la asistencia de un docente que no hizo check-in en un turno en el que estuvo presente
- **THEN** el sistema registra esa asistencia con origen "manual" y quién la cargó

### Requirement: Restricción de la corrección manual por rol
El sistema SHALL denegar la carga o corrección manual de asistencia docente a cualquier cuenta sin rol Secretaría Académica o Dirección.

#### Scenario: Docente intenta corregir su propia asistencia
- **WHEN** una cuenta docente intenta cargar o corregir manualmente su propia asistencia
- **THEN** el sistema deniega la operación

### Requirement: Consulta de asistencia de un docente
El sistema SHALL permitir consultar la asistencia de un docente por turno, día o rango de fechas, indicando el origen de cada registro (check-in o manual).

#### Scenario: Consulta de asistencia de un período
- **WHEN** Secretaría Académica o Dirección consultan la asistencia de un docente para un rango de fechas
- **THEN** el sistema devuelve los registros de asistencia de ese docente en ese rango, con turno y origen de cada uno
