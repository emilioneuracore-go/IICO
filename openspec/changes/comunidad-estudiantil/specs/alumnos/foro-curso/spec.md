# Spec Delta

## Purpose

Dar a cada curso y división un espacio propio donde sus alumnos compartan ideas y materiales de estudio, resguardado por un mecanismo de reporte y revisión manual.

## ADDED Requirements

### Requirement: Publicación en el foro del propio curso
El sistema SHALL permitir a una cuenta de Alumno publicar una idea o un material de estudio en el foro de su curso y división.

#### Scenario: Publicación de un material de estudio
- **WHEN** un alumno publica un material de estudio en el foro de su curso
- **THEN** el sistema lo hace visible a los demás alumnos de ese mismo curso y división

### Requirement: Visibilidad acotada al curso y división
El sistema SHALL mostrar el foro de un curso y división únicamente a los alumnos de ese curso y división y al personal autorizado para supervisarlo.

#### Scenario: Alumno de otro curso intenta acceder
- **WHEN** un alumno de un curso distinto intenta acceder al foro de otro curso
- **THEN** el sistema deniega el acceso

### Requirement: Supervisión del foro por personal autorizado
El sistema SHALL permitir a los docentes del curso, preceptores, Orientación y Dirección consultar el contenido del foro de un curso para su supervisión, sin necesidad de que exista un reporte previo.

#### Scenario: Preceptor consulta el foro de un curso
- **WHEN** un preceptor consulta el foro de un curso a su cargo
- **THEN** el sistema le muestra las publicaciones de ese foro

### Requirement: Reporte de contenido
El sistema SHALL permitir a cualquier cuenta con acceso al foro reportar una publicación que considere que atenta contra la integridad de un integrante de la comunidad educativa.

#### Scenario: Reporte de una publicación
- **WHEN** un alumno reporta una publicación del foro de su curso
- **THEN** el sistema registra el reporte y lo deja disponible para revisión por personal autorizado

### Requirement: Revisión y eliminación de contenido reportado
El sistema SHALL permitir a personal autorizado (preceptor, Orientación o Dirección) revisar un contenido reportado y decidir si lo elimina, quedando registrada la decisión.

#### Scenario: Eliminación de una publicación reportada
- **WHEN** personal autorizado revisa un reporte y decide eliminar la publicación
- **THEN** el sistema la retira del foro y conserva un registro de quién tomó la decisión y cuándo

#### Scenario: Reporte desestimado
- **WHEN** personal autorizado revisa un reporte y decide que la publicación no amerita eliminación
- **THEN** el sistema mantiene la publicación visible y conserva el registro de la revisión

### Requirement: Restricción de publicación a alumnos del curso
El sistema SHALL permitir publicar en el foro de un curso únicamente a los alumnos de ese curso y división.

#### Scenario: Intento de publicación desde otro curso
- **WHEN** un alumno de otro curso intenta publicar en un foro que no es el suyo
- **THEN** el sistema rechaza la publicación
