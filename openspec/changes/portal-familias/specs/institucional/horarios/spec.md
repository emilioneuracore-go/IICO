# Spec Delta

## Purpose

Publicar el horario de clases por curso y división, para que esté disponible a las familias y a los alumnos correspondientes.

## ADDED Requirements

### Requirement: Publicación del horario por curso y división
El sistema SHALL permitir a personal autorizado registrar el horario semanal de clases (materia, día, franja horaria, docente) para un curso y división determinados.

#### Scenario: Alta de horario para un curso y división
- **WHEN** personal autorizado registra el horario semanal de un curso y división
- **THEN** el sistema lo deja disponible como el horario vigente de ese curso y división

### Requirement: Actualización del horario vigente
El sistema SHALL permitir actualizar el horario de un curso y división, conservando cuándo entró en vigencia el cambio.

#### Scenario: Modificación del horario de un curso
- **WHEN** personal autorizado actualiza el horario de un curso y división ya publicado
- **THEN** el sistema aplica el nuevo horario como vigente y registra desde cuándo rige

### Requirement: Consulta del horario por la familia
El sistema SHALL permitir a una cuenta de familia consultar el horario del curso y división de su alumno vinculado.

#### Scenario: Familia consulta el horario de su alumno
- **WHEN** una cuenta de familia solicita el horario de su alumno vinculado
- **THEN** el sistema devuelve el horario vigente del curso y división de ese alumno

### Requirement: Consulta del horario por el propio alumno
El sistema SHALL permitir a una cuenta de Alumno consultar el horario de su propio curso y división.

#### Scenario: Alumno consulta su propio horario
- **WHEN** una cuenta de Alumno solicita su horario
- **THEN** el sistema devuelve el horario vigente de su curso y división

### Requirement: Franja horaria compartida entre materias de un Proyecto Integrado
El sistema SHALL permitir marcar una franja horaria como compartida entre las dos materias vinculadas en un Proyecto Integrado, de modo que esa franja aparezca en el horario de ambas materias sin duplicar su carga, mientras el resto de las franjas de cada materia permanece independiente.

#### Scenario: Franja compartida de un Proyecto Integrado
- **WHEN** se registra una franja horaria marcada como compartida entre las dos materias de un Proyecto Integrado
- **THEN** el horario del curso muestra esa franja asociada a ambas materias, y las demás franjas de cada materia se mantienen sin compartir
