# Spec Delta

## Purpose

Dar a los docentes un espacio institucional para compartir experiencias, materiales de estudio, bibliografía y material audiovisual entre pares, resguardado por reporte y revisión de Dirección.

## ADDED Requirements

### Requirement: Publicación en el foro de docentes
El sistema SHALL permitir a una cuenta docente publicar en el foro institucional de docentes, incluyendo texto y, opcionalmente, materiales adjuntos (documentos, bibliografía o material audiovisual).

#### Scenario: Publicación con material adjunto
- **WHEN** un docente publica en el foro compartiendo un material de estudio adjunto
- **THEN** el sistema la hace visible a todos los docentes de la escuela

### Requirement: Alcance institucional del foro
El sistema SHALL mostrar el foro de docentes a cualquier cuenta docente de la escuela, sin acotarlo por curso, división o materia.

#### Scenario: Consulta del foro por cualquier docente
- **WHEN** un docente consulta el foro institucional
- **THEN** el sistema le muestra las publicaciones de todos los docentes de la escuela

### Requirement: Reporte de contenido
El sistema SHALL permitir a cualquier cuenta docente reportar una publicación del foro que considere inapropiada.

#### Scenario: Reporte de una publicación
- **WHEN** un docente reporta una publicación del foro
- **THEN** el sistema registra el reporte y lo deja disponible para revisión de Dirección

### Requirement: Revisión y eliminación por Dirección
El sistema SHALL permitir a una cuenta con rol Dirección revisar un contenido reportado del foro de docentes y decidir si lo elimina, quedando registrada la decisión.

#### Scenario: Eliminación de una publicación reportada
- **WHEN** Dirección revisa un reporte del foro de docentes y decide eliminar la publicación
- **THEN** el sistema la retira del foro y conserva un registro de la decisión

#### Scenario: Reporte desestimado
- **WHEN** Dirección revisa un reporte y decide que la publicación no amerita eliminación
- **THEN** el sistema mantiene la publicación visible y conserva el registro de la revisión

### Requirement: Restricción de revisión al rol Dirección
El sistema SHALL denegar la revisión o eliminación de contenido reportado del foro de docentes a cualquier cuenta sin rol Dirección.

#### Scenario: Docente intenta eliminar una publicación reportada
- **WHEN** una cuenta docente sin rol Dirección intenta eliminar una publicación reportada
- **THEN** el sistema deniega la operación
