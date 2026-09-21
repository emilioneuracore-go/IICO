# Spec Delta

## Purpose

Definir las materias del plan de estudios, su duración (anual, bianual o trianual) y su modalidad de acreditación, como base común para actas de examen, materias previas y libreta de calificaciones.

## ADDED Requirements

### Requirement: Registro de materia del plan de estudios
El sistema SHALL permitir registrar una materia del plan de estudios indicando su duración: anual, bianual o trianual.

#### Scenario: Alta de materia bianual
- **WHEN** se registra una materia indicando que su duración es bianual
- **THEN** el sistema la deja disponible para vincularse a los dos años consecutivos que abarca

### Requirement: Modalidad de acreditación configurable por materia
El sistema SHALL permitir configurar, para cada materia bianual o trianual, si se acredita por tramo (cada año se acredita de forma independiente, como materias encadenadas) o al final del ciclo completo (recién se acredita al término del último año).

#### Scenario: Materia bianual configurada "por tramo"
- **WHEN** una materia bianual está configurada con modalidad "por tramo"
- **THEN** cada año de esa materia se evalúa y acredita de forma independiente, pudiendo generar una materia adeudada de ese tramo específico

#### Scenario: Materia trianual configurada "al final del ciclo"
- **WHEN** una materia trianual está configurada con modalidad "al final del ciclo"
- **THEN** la acreditación de la materia solo puede registrarse al completar el último año del ciclo, y los años intermedios no generan una materia adeudada por sí solos

### Requirement: Identidad continua de una materia plurianual
El sistema SHALL vincular los años intermedios de una materia bianual o trianual a la misma materia, de modo que actas, calificaciones periódicas y horarios de esos años se asocien a un único registro de materia.

#### Scenario: Consulta de una materia bianual a través de sus dos años
- **WHEN** se consulta la materia bianual de un alumno en su primer y en su segundo año de cursada
- **THEN** ambas consultas refieren a la misma materia, con su historial de calificaciones periódicas continuo

### Requirement: Materia compuesta por áreas
El sistema SHALL permitir que una materia esté compuesta por dos o más áreas, cada una con su propio docente, que se evalúan de forma integrada bajo una única acreditación de la materia.

#### Scenario: Alta de materia compuesta por áreas (UTP)
- **WHEN** se registra la materia "Unidad Técnica Pedagógica" (UTP) indicando que está compuesta por las áreas Dibujo Técnico, Taller y Educación Tecnológica
- **THEN** el sistema permite asignar un docente a cada área y las vincula a la misma materia trianual

#### Scenario: Materia simple sin áreas (FAT)
- **WHEN** se registra la materia "Formación en Ambiente de Trabajo" (FAT) sin indicar áreas
- **THEN** el sistema la trata como una materia bianual simple, sin descomposición en áreas

### Requirement: Escala de calificación configurable por etapa
El sistema SHALL permitir configurar, para una materia con modalidad "al final del ciclo", que las etapas intermedias se califiquen en escala cualitativa y que el cierre final se califique en escala cuantitativa.

#### Scenario: UTP calificada cualitativamente hasta el cierre
- **WHEN** se registran calificaciones de UTP para el primer y segundo año, configurada con escala cualitativa en etapas intermedias y cuantitativa en el cierre
- **THEN** el sistema acepta esas calificaciones en escala cualitativa y exige escala cuantitativa recién en el acta de cierre de tercer año

### Requirement: Vínculo entre materias de un Proyecto Integrado
El sistema SHALL permitir vincular dos materias independientes como un Proyecto Integrado, sin fusionar su identidad ni su acreditación (a diferencia de una materia compuesta por áreas, cada materia del Proyecto Integrado mantiene su propia acreditación y sus propias notas).

#### Scenario: Alta de un Proyecto Integrado entre dos materias
- **WHEN** se vinculan dos materias existentes como Proyecto Integrado
- **THEN** el sistema conserva a cada materia con su propia acreditación, calificaciones y materia previa, y registra únicamente el vínculo entre ambas
