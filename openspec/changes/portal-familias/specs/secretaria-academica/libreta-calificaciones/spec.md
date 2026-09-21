# Spec Delta

## Purpose

Registrar las notas periódicas (trimestrales o bimestrales) de cada alumno por materia, como insumo del boletín/informe escolar, de forma independiente de las actas de mesas de examen.

## ADDED Requirements

### Requirement: Registro de nota periódica por materia
El sistema SHALL permitir registrar una nota periódica de un alumno en una materia, para un período (trimestre/bimestre) determinado.

#### Scenario: Carga de nota periódica
- **WHEN** un docente o preceptor autorizado carga la nota de un alumno en una materia para el período vigente
- **THEN** el sistema registra la nota asociada a esa materia, alumno y período

### Requirement: Un alumno tiene a lo sumo una nota vigente por materia y período
El sistema SHALL impedir el registro de dos notas activas para el mismo alumno, materia y período; una nueva carga corrige la anterior dejando trazabilidad.

#### Scenario: Corrección de una nota ya cargada
- **WHEN** se carga una nueva nota para un alumno, materia y período que ya tenían una nota registrada
- **THEN** el sistema reemplaza el valor vigente y conserva un registro de qué usuario hizo la corrección y cuándo

### Requirement: Boletín consolidado por período
El sistema SHALL poder generar un boletín con todas las notas periódicas de un alumno para un período dado.

#### Scenario: Consulta del boletín de un período
- **WHEN** se solicita el boletín de un alumno para un período determinado
- **THEN** el sistema devuelve las notas de todas las materias cargadas para ese alumno en ese período

### Requirement: Nota periódica formativa en materias "al final del ciclo"
El sistema SHALL registrar las notas periódicas de los años intermedios de una materia bianual o trianual configurada como "al final del ciclo" como notas formativas, sin que impliquen por sí solas la acreditación de la materia (ver `secretaria-academica/materias-previas`).

#### Scenario: Nota periódica de un año intermedio "al final del ciclo"
- **WHEN** se carga una nota periódica de un alumno en un año intermedio de una materia trianual "al final del ciclo"
- **THEN** el sistema la registra como nota formativa del boletín de ese período, sin marcar la materia como acreditada ni adeudada

### Requirement: Nota periódica en escala cualitativa
El sistema SHALL permitir registrar una nota periódica en escala cualitativa cuando la materia lo tiene configurado para esa etapa, en lugar de exigir una escala numérica.

#### Scenario: Carga de nota cualitativa de UTP en un año intermedio
- **WHEN** un docente carga la nota periódica de un alumno en UTP (configurada con escala cualitativa en etapas intermedias) para el período vigente
- **THEN** el sistema registra la nota en escala cualitativa sin exigir un valor numérico

### Requirement: Nota periódica por área en materias compuestas
El sistema SHALL permitir registrar una nota periódica por cada área de una materia compuesta (por ejemplo, Dibujo Técnico, Taller y Educación Tecnológica dentro de UTP), además de la nota integrada de la materia.

#### Scenario: Carga de notas por área de UTP
- **WHEN** los docentes de Dibujo Técnico, Taller y Educación Tecnológica cargan cada uno la nota periódica de su área para un alumno
- **THEN** el sistema registra las tres notas de área asociadas a la materia UTP de ese alumno y período

### Requirement: Alerta de evaluación próxima
El sistema SHALL poder registrar una evaluación programada por materia, de forma que pueda anticiparse antes de la carga de la nota.

#### Scenario: Registro de fecha de evaluación
- **WHEN** un docente registra la fecha de una evaluación próxima para una materia y curso
- **THEN** el sistema deja disponible esa fecha para ser consultada antes de que exista una nota cargada
