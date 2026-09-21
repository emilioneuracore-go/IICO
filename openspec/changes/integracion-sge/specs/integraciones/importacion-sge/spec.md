# Spec Delta

## Purpose

Importar a IICO los datos de calificaciones e inasistencias que ya están cargados oficialmente en el SGE (Sistema de Gestión de Estudiantes) del Ministerio de Educación de Córdoba, evitando la doble carga manual y manteniendo al SGE como fuente de verdad.

## ADDED Requirements

### Requirement: Carga de archivo exportado del SGE
El sistema SHALL permitir a personal autorizado de Secretaría Académica subir un archivo exportado del SGE conteniendo calificaciones y/o inasistencias.

#### Scenario: Subida de archivo válido
- **WHEN** personal autorizado sube un archivo exportado del SGE con formato reconocido
- **THEN** el sistema lo acepta y comienza a procesarlo

#### Scenario: Subida de archivo con formato no reconocido
- **WHEN** se sube un archivo que no coincide con el formato esperado del SGE
- **THEN** el sistema rechaza la importación e indica el motivo

### Requirement: Identificación de alumno, materia y fecha por registro
El sistema SHALL identificar, para cada registro del archivo importado, a qué alumno, materia y fecha corresponde, antes de aplicar el valor.

#### Scenario: Registro no identificable
- **WHEN** un registro del archivo no puede asociarse a un alumno o materia existente en IICO
- **THEN** el sistema lo excluye de la aplicación automática y lo reporta como error en el resumen de la importación

### Requirement: El SGE como fuente de verdad ante conflictos
El sistema SHALL reemplazar el valor cargado manualmente en IICO por el valor importado del SGE cuando ambos refieren al mismo alumno, materia y fecha.

#### Scenario: Calificación importada reemplaza a una cargada manualmente
- **WHEN** el archivo importado trae una calificación para un alumno/materia/período que ya tenía una nota cargada manualmente en IICO
- **THEN** el sistema reemplaza el valor vigente por el importado del SGE

#### Scenario: Inasistencia importada reemplaza a una cargada manualmente
- **WHEN** el archivo importado trae una inasistencia para un alumno/materia/fecha que ya estaba registrada manualmente en IICO
- **THEN** el sistema reemplaza el registro por el importado del SGE

### Requirement: Trazabilidad del origen tras la importación
El sistema SHALL dejar constancia, en cada calificación o inasistencia aplicada por importación, de que su origen es el SGE y en qué importación se aplicó.

#### Scenario: Consulta del origen de una calificación importada
- **WHEN** se consulta el historial de una calificación que fue reemplazada por una importación del SGE
- **THEN** el sistema muestra que el valor vigente proviene del SGE y a qué importación corresponde

### Requirement: Resumen de resultados de la importación
El sistema SHALL generar, al finalizar el procesamiento de un archivo, un resumen con la cantidad de registros aplicados, reemplazados y con error.

#### Scenario: Consulta del resumen de una importación
- **WHEN** personal autorizado consulta una importación ya procesada
- **THEN** el sistema muestra cuántos registros se aplicaron, cuántos reemplazaron un valor existente y cuántos quedaron en error

### Requirement: Restricción de acceso a la importación
El sistema SHALL permitir ejecutar y consultar importaciones del SGE únicamente a personal de Secretaría Académica autorizado.

#### Scenario: Usuario sin autorización intenta importar
- **WHEN** un usuario sin rol autorizado intenta subir un archivo del SGE
- **THEN** el sistema rechaza la operación
