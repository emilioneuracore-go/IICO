# Spec Delta

## Purpose

Permitir que los docentes propongan desafíos académicos a sus alumnos y que estos reciban puntaje al resolverlos, como base de la tabla de posiciones.

## ADDED Requirements

### Requirement: Creación de un desafío académico por el docente
El sistema SHALL permitir a una cuenta docente crear un desafío académico para una materia y curso/división a su cargo, con una consigna y un puntaje máximo posible.

#### Scenario: Alta de un desafío
- **WHEN** un docente crea un desafío académico para su materia y curso con una consigna y un puntaje máximo
- **THEN** el sistema lo publica como disponible para los alumnos de ese curso

### Requirement: Resolución de un desafío por el alumno
El sistema SHALL permitir a una cuenta de Alumno del curso correspondiente enviar su resolución a un desafío académico disponible.

#### Scenario: Envío de una resolución
- **WHEN** un alumno del curso envía su resolución a un desafío disponible
- **THEN** el sistema la registra asociada a ese alumno y ese desafío

### Requirement: Asignación de puntaje por el docente
El sistema SHALL permitir al docente que creó el desafío asignar un puntaje a cada resolución enviada, sin superar el puntaje máximo del desafío.

#### Scenario: Asignación de puntaje a una resolución
- **WHEN** el docente asigna un puntaje a la resolución de un alumno, dentro del máximo definido para el desafío
- **THEN** el sistema registra ese puntaje asociado al alumno

#### Scenario: Intento de asignar un puntaje mayor al máximo
- **WHEN** el docente intenta asignar a una resolución un puntaje mayor al máximo definido para el desafío
- **THEN** el sistema rechaza la asignación

### Requirement: Acumulación de puntaje por alumno
El sistema SHALL acumular el puntaje obtenido por un alumno en todos los desafíos que resolvió, como base para `alumnos/tabla-posiciones`.

#### Scenario: Consulta del puntaje acumulado de un alumno
- **WHEN** se consulta el puntaje acumulado de un alumno
- **THEN** el sistema devuelve la suma de los puntajes asignados en todos sus desafíos resueltos
