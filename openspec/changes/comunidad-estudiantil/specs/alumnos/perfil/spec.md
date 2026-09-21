# Spec Delta

## Purpose

Permitir que cada alumno personalice cómo se lo identifica en el sistema, mediante un avatar predefinido seguro y una foto de perfil moderada.

## ADDED Requirements

### Requirement: Selección de avatar entre opciones predefinidas
El sistema SHALL permitir a una cuenta de Alumno elegir su avatar entre un catálogo de opciones predefinidas por la escuela, sin permitir subir una imagen propia como avatar.

#### Scenario: Selección de avatar
- **WHEN** una cuenta de Alumno elige uno de los avatares del catálogo predefinido
- **THEN** el sistema lo asigna como su avatar visible en el curso

### Requirement: Administración del catálogo de avatares
El sistema SHALL permitir a personal autorizado (Dirección o Secretaría Académica) agregar o quitar opciones del catálogo de avatares predefinidos.

#### Scenario: Alta de una opción de avatar
- **WHEN** personal autorizado agrega una nueva opción al catálogo de avatares
- **THEN** el sistema la deja disponible para que los alumnos la elijan

### Requirement: Carga de foto de perfil sujeta a moderación
El sistema SHALL permitir a una cuenta de Alumno subir una foto de perfil, quedando sujeta al mismo mecanismo de reporte y revisión que las publicaciones del foro (`alumnos/foro-curso`).

#### Scenario: Carga de foto de perfil
- **WHEN** una cuenta de Alumno sube una foto de perfil
- **THEN** el sistema la publica como su foto de perfil, disponible para ser reportada si corresponde

### Requirement: Eliminación de foto de perfil reportada
El sistema SHALL permitir a personal autorizado eliminar una foto de perfil reportada que atente contra la integridad de un integrante de la comunidad educativa, revirtiendo al avatar predefinido del alumno.

#### Scenario: Eliminación de una foto de perfil inapropiada
- **WHEN** personal autorizado revisa un reporte sobre una foto de perfil y decide eliminarla
- **THEN** el sistema la quita y muestra el avatar predefinido del alumno en su lugar
