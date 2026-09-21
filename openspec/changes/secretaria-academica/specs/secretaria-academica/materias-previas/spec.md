# Spec Delta

## Purpose

Hacer seguimiento de las materias adeudadas (previas) de cada alumno y aplicar el régimen normativo vigente de promoción y acompañamiento institucional.

## ADDED Requirements

### Requirement: Registro de materia adeudada
El sistema SHALL registrar una materia como adeudada para un alumno cuando este no la acredita en la instancia correspondiente.

#### Scenario: Alta de materia previa tras acta desaprobada
- **WHEN** un acta de examen marca una materia como no acreditada para un alumno y no existe otra instancia pendiente de acreditación en el período
- **THEN** el sistema registra esa materia como adeudada para el alumno

### Requirement: Materia previa de un tramo específico en materias plurianuales por tramo
El sistema SHALL registrar la materia adeudada referida al tramo/año específico cuando la materia no acreditada es bianual o trianual con modalidad "por tramo".

#### Scenario: No acreditación de un tramo de una materia bianual "por tramo"
- **WHEN** un alumno no acredita el primer año de una materia bianual configurada como "por tramo"
- **THEN** el sistema registra como adeudado ese tramo específico de la materia, sin afectar la posibilidad de cursar el segundo año

### Requirement: Sin materia previa a mitad de ciclo en materias "al final del ciclo"
El sistema SHALL NOT registrar una materia adeudada por los años intermedios de una materia bianual o trianual configurada como "al final del ciclo"; solo puede quedar adeudada una vez evaluada al término del último año.

#### Scenario: Año intermedio de una materia trianual "al final del ciclo"
- **WHEN** un alumno cursa un año intermedio de una materia trianual configurada como "al final del ciclo"
- **THEN** el sistema no genera una materia adeudada por ese año intermedio

### Requirement: Control del tope de materias adeudadas para promoción
El sistema SHALL calcular la cantidad total de materias adeudadas de un alumno (previas de años anteriores más las del último período) para determinar si puede promocionar al curso siguiente.

#### Scenario: Alumno dentro del tope es habilitado a promocionar
- **WHEN** un alumno tiene 3 o menos materias adeudadas en total al cierre del período
- **THEN** el sistema lo marca como habilitado para promocionar al curso inmediato superior

#### Scenario: Alumno fuera del tope no es habilitado a promocionar
- **WHEN** un alumno tiene más de 3 materias adeudadas en total al cierre del período
- **THEN** el sistema lo marca como no habilitado para promocionar, sujeto a las excepciones vigentes

### Requirement: Plan de acompañamiento obligatorio para la tercera materia adeudada
El sistema SHALL exigir el registro de un plan de acompañamiento/fortalecimiento institucional cuando una materia adeudada es la tercera del alumno.

#### Scenario: Registro de la tercera materia adeudada exige plan de acompañamiento
- **WHEN** se registra una materia adeudada que constituye la tercera materia previa del alumno
- **THEN** el sistema exige asociar un plan de acompañamiento (docente responsable y modalidad) antes de dar por completo el registro

### Requirement: Baja de materia previa al acreditarse
El sistema SHALL dar de baja una materia adeudada cuando el alumno la acredita.

#### Scenario: Alumno aprueba materia previa
- **WHEN** un acta de examen posterior marca como acreditada una materia que figuraba como adeudada
- **THEN** el sistema quita esa materia del listado de materias adeudadas del alumno

### Requirement: Parametrización de la normativa de acreditación
El sistema SHALL permitir configurar el tope de materias adeudadas y las condiciones de excepción sin requerir cambios de código, dado que la normativa provincial puede modificarse.

#### Scenario: Actualización del tope normativo
- **WHEN** un administrador actualiza el valor del tope de materias adeudadas o las condiciones de excepción vigentes
- **THEN** el sistema aplica el nuevo criterio a las evaluaciones de promoción posteriores a la actualización
