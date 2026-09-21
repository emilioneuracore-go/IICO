# Spec Delta

## Purpose

Mostrar un ranking de todos los alumnos de la escuela según su puntaje acumulado de desafíos académicos, y reconocer con créditos a los primeros 10 puestos al cierre de un período.

## ADDED Requirements

### Requirement: Ranking de alumnos por puntaje acumulado
El sistema SHALL calcular un ranking de todos los alumnos de la escuela ordenado por su puntaje acumulado en `alumnos/desafios`, actualizado a medida que se asignan nuevos puntajes.

#### Scenario: Consulta del ranking vigente
- **WHEN** se consulta la tabla de posiciones
- **THEN** el sistema devuelve a los alumnos ordenados de mayor a menor puntaje acumulado

### Requirement: Consulta de la tabla de posiciones por alumnos y personal
El sistema SHALL permitir consultar la tabla de posiciones a cualquier cuenta de Alumno y a personal de Secretaría Académica, Dirección y docentes.

#### Scenario: Alumno consulta la tabla de posiciones
- **WHEN** una cuenta de Alumno solicita la tabla de posiciones
- **THEN** el sistema le muestra el ranking de todos los alumnos de la escuela

### Requirement: Cierre de período y otorgamiento de créditos
El sistema SHALL permitir a personal autorizado (Dirección o Secretaría Académica) cerrar un período de la tabla de posiciones, otorgando un crédito a cada uno de los alumnos que ocupan los primeros 10 puestos en ese momento.

#### Scenario: Cierre de período con otorgamiento de créditos
- **WHEN** personal autorizado cierra el período vigente de la tabla de posiciones
- **THEN** el sistema otorga un crédito a cada uno de los 10 alumnos mejor posicionados en ese momento y lo deja registrado

### Requirement: Los créditos otorgados son permanentes
El sistema SHALL conservar un crédito ya otorgado a un alumno aunque su posición en el ranking cambie después del cierre que lo originó.

#### Scenario: Alumno sale del top 10 después de recibir un crédito
- **WHEN** un alumno que recibió un crédito en un cierre desciende del top 10 en el ranking vigente
- **THEN** el sistema conserva el crédito ya otorgado en su historial

### Requirement: Consulta del historial de créditos de un alumno
El sistema SHALL permitir consultar el historial de créditos obtenidos por un alumno, con el período de cada cierre.

#### Scenario: Consulta del historial de créditos
- **WHEN** se consulta el historial de créditos de un alumno
- **THEN** el sistema devuelve los créditos obtenidos y el período de cada cierre correspondiente
