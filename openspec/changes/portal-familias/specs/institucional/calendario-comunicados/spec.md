# Spec Delta

## Purpose

Publicar el calendario escolar y los comunicados institucionales emitidos por distintos roles del personal, para que estén disponibles a las familias y a la comunidad educativa.

## ADDED Requirements

### Requirement: Publicación de eventos del calendario escolar
El sistema SHALL permitir a personal autorizado publicar eventos del calendario escolar (fecha, título, descripción, alcance).

#### Scenario: Alta de evento de calendario
- **WHEN** un directivo o secretario publica un evento con fecha, título y alcance (institucional, por curso, etc.)
- **THEN** el sistema lo incorpora al calendario escolar visible según ese alcance

### Requirement: Publicación de comunicados por rol emisor
El sistema SHALL permitir a docentes, directivos, secretarios, preceptores y profesionales del Departamento de Orientación publicar comunicados dirigidos a un alumno, un curso o a toda la institución, quedando registrado quién lo emitió.

#### Scenario: Publicación de comunicado por un preceptor
- **WHEN** un preceptor publica un comunicado dirigido a un curso
- **THEN** el sistema lo pone a disposición de las familias de los alumnos de ese curso, identificando al preceptor como emisor

#### Scenario: Publicación de comunicado por Orientación
- **WHEN** un profesional del Departamento de Orientación publica un comunicado dirigido a un alumno y su familia
- **THEN** el sistema lo pone a disposición de la familia vinculada a ese alumno, identificando a Orientación como emisor, sin exponer el contenido de los registros internos de Orientación

### Requirement: Consulta de calendario y comunicados por alcance
El sistema SHALL mostrar a cada cuenta de familia únicamente el calendario y los comunicados cuyo alcance incluye al alumno vinculado.

#### Scenario: Familia consulta comunicados de su alumno
- **WHEN** una cuenta de familia solicita los comunicados vigentes
- **THEN** el sistema devuelve los comunicados institucionales, del curso del alumno y dirigidos específicamente al alumno vinculado
