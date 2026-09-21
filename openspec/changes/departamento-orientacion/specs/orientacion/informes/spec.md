# Spec Delta

## Purpose

Permitir que el Departamento de Orientación elabore informes generales sobre un alumno, independientes de una reunión puntual, con el mismo nivel de confidencialidad que sus registros propios.

## ADDED Requirements

### Requirement: Elaboración de informe sobre un alumno
El sistema SHALL permitir a una cuenta con rol Orientación crear un informe sobre un alumno, con fecha, autor y contenido.

#### Scenario: Alta de informe
- **WHEN** un profesional de Orientación elabora un informe sobre un alumno
- **THEN** el sistema lo registra asociado a ese alumno, con autor y fecha

### Requirement: Vínculo opcional a una reunión
El sistema SHALL permitir asociar un informe a una o más reuniones de `orientacion/reuniones` cuando el informe se origina en ellas, sin exigir ese vínculo para informes independientes.

#### Scenario: Informe elaborado a partir de una reunión
- **WHEN** un profesional de Orientación elabora un informe y lo vincula a una reunión ya registrada
- **THEN** el sistema conserva la referencia entre el informe y esa reunión

### Requirement: Visibilidad restringida a Orientación y Dirección
El sistema SHALL denegar el acceso a un informe de Orientación a cualquier cuenta sin rol Orientación o Dirección.

#### Scenario: Docente intenta acceder a un informe de Orientación
- **WHEN** una cuenta con rol docente intenta consultar un informe de Orientación sobre un alumno
- **THEN** el sistema deniega el acceso
