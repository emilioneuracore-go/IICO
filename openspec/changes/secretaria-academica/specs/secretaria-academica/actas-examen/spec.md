# Spec Delta

## Purpose

Administrar los libros de actas de examen y las actas individuales que documentan las mesas de examen, sus participantes y resultados.

## ADDED Requirements

### Requirement: Registro de mesa de examen
El sistema SHALL permitir registrar un acta de mesa de examen con materia, fecha, docentes evaluadores y alumnos inscriptos.

#### Scenario: Alta de acta con datos completos
- **WHEN** el personal de Secretaría Académica registra una mesa de examen con materia, fecha, docentes y alumnos inscriptos
- **THEN** el sistema crea el acta y la asocia al libro de actas correspondiente

### Requirement: Alcance del acta según la modalidad de acreditación de la materia
El sistema SHALL determinar si un acta de examen evalúa un tramo (año) de la materia o su ciclo completo, según la modalidad de acreditación configurada para esa materia (ver `secretaria-academica/materias`).

#### Scenario: Acta de un tramo de una materia "por tramo"
- **WHEN** se registra un acta para un año de una materia bianual o trianual configurada como "por tramo"
- **THEN** el acta evalúa únicamente ese tramo, sin requerir que estén cursados los demás años

#### Scenario: Acta del ciclo completo de una materia "al final del ciclo"
- **WHEN** se registra un acta para una materia bianual o trianual configurada como "al final del ciclo"
- **THEN** el sistema exige que el alumno haya cursado todos los años del ciclo antes de admitir el acta

### Requirement: Registro de calificación por alumno en el acta
El sistema SHALL permitir registrar, para cada alumno del acta, una calificación que determina si aprueba o desaprueba la materia.

#### Scenario: Carga de nota aprueba la materia
- **WHEN** se carga una nota igual o superior a la mínima de aprobación para un alumno del acta
- **THEN** el sistema marca la materia como acreditada para ese alumno en esa instancia

#### Scenario: Carga de nota desaprueba la materia
- **WHEN** se carga una nota inferior a la mínima de aprobación para un alumno del acta
- **THEN** el sistema marca la materia como no acreditada para ese alumno en esa instancia

### Requirement: Cierre de acta
El sistema SHALL permitir cerrar un acta una vez cargadas todas sus calificaciones, y SHALL impedir la edición directa de un acta cerrada.

#### Scenario: Intento de editar un acta cerrada
- **WHEN** un usuario intenta modificar directamente una calificación de un acta ya cerrada
- **THEN** el sistema rechaza la edición directa y exige un procedimiento de corrección auditado

### Requirement: Consulta de historial de actas
El sistema SHALL permitir consultar las actas en las que participó un alumno o en las que se evaluó una materia determinada.

#### Scenario: Consulta de actas por alumno
- **WHEN** se solicita el historial de actas de examen de un alumno
- **THEN** el sistema devuelve todas las actas donde el alumno participó, con materia, fecha y resultado
