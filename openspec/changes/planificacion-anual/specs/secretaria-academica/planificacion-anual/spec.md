# Spec Delta

## Purpose

Permitir que cada docente cargue la planificación anual de su materia y curso en un formulario estructurado de formato único, consultable por estudiantes, familias, Orientación, Dirección y Secretaría Académica.

## ADDED Requirements

### Requirement: Carga de planificación anual con formato estructurado único
El sistema SHALL permitir al docente a cargo de una materia y curso/división cargar su planificación anual completando un formulario con campos estructurados comunes a todas las materias (objetivos, contenidos, metodología, cronograma y criterios de evaluación, como mínimo).

#### Scenario: Alta de planificación anual
- **WHEN** el docente a cargo de una materia y curso completa el formulario de planificación anual para el año lectivo vigente
- **THEN** el sistema la registra asociada a esa materia, curso y año lectivo

### Requirement: Sección de articulación para materias con Proyecto Integrado
El sistema SHALL incluir en el formulario una sección de articulación con la materia vinculada cuando la materia tiene un Proyecto Integrado registrado en `secretaria-academica/materias`.

#### Scenario: Planificación de una materia con Proyecto Integrado
- **WHEN** el docente carga la planificación de una materia que tiene un Proyecto Integrado vinculado
- **THEN** el formulario exige completar la sección de articulación con la materia vinculada antes de dar la planificación por completa

#### Scenario: Planificación de una materia sin Proyecto Integrado
- **WHEN** el docente carga la planificación de una materia sin Proyecto Integrado vinculado
- **THEN** el formulario no exige la sección de articulación

### Requirement: Una planificación vigente por materia, curso y año lectivo
El sistema SHALL mantener una única planificación vigente por materia, curso/división y año lectivo; una nueva carga sobre la misma combinación corrige a la anterior, dejando trazabilidad de quién y cuándo hizo la corrección.

#### Scenario: Corrección de una planificación ya cargada
- **WHEN** el docente a cargo vuelve a cargar la planificación de una materia/curso que ya tenía una vigente para el mismo año lectivo
- **THEN** el sistema reemplaza el contenido vigente y conserva un registro de la corrección

### Requirement: Solo el docente a cargo puede cargar o corregir su planificación
El sistema SHALL permitir cargar o corregir una planificación anual únicamente a la cuenta docente asignada a esa materia y curso/división.

#### Scenario: Otro docente intenta modificar una planificación ajena
- **WHEN** una cuenta docente distinta de la asignada a esa materia/curso intenta cargar o corregir su planificación
- **THEN** el sistema deniega la operación

### Requirement: Consulta de solo lectura por roles autorizados
El sistema SHALL permitir consultar, en modo solo lectura, la planificación anual vigente de una materia/curso a: el alumno de ese curso, la familia vinculada a un alumno de ese curso, el Departamento de Orientación, Dirección y Secretaría Académica.

#### Scenario: Alumno consulta la planificación de su curso
- **WHEN** una cuenta de Alumno solicita la planificación anual de una materia de su curso
- **THEN** el sistema la devuelve en modo solo lectura

#### Scenario: Familia consulta la planificación de su alumno
- **WHEN** una cuenta de familia solicita la planificación anual de una materia del curso de su alumno vinculado
- **THEN** el sistema la devuelve en modo solo lectura

### Requirement: Restricción de acceso a roles no autorizados
El sistema SHALL denegar la consulta de una planificación anual a cualquier cuenta sin rol autorizado ni vínculo con ese alumno/curso.

#### Scenario: Familia sin alumno en ese curso intenta consultar
- **WHEN** una cuenta de familia sin ningún alumno vinculado a ese curso intenta consultar su planificación anual
- **THEN** el sistema deniega el acceso
