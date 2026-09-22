# Tasks

## 1. Setup del proyecto

- [x] 1.1 Crear el repositorio backend NestJS + TypeScript (estructura de módulos) y verificar que `npm run start` levanta un servidor vacío sin errores
- [x] 1.2 Configurar PostgreSQL + Prisma, definir `schema.prisma` inicial y verificar que `prisma migrate dev` corre sin errores contra una base local/cloud de desarrollo
- [x] 1.3 Crear el proyecto frontend (React, responsive) con layout base y verificar que renderiza una pantalla de login en desktop y en un viewport móvil
- [x] 1.4 Configurar pipeline mínimo de build/test (lint + test runner) y verificar que corre en CI o localmente con un test de ejemplo en verde

## 2. Identity & Access Control (`identity/access-control`)

- [x] 2.1 Modelar en Prisma las entidades Usuario, Rol y Permiso, y verificar con una migración aplicada exitosamente
- [x] 2.2 Implementar autenticación (login con credenciales, emisión de sesión/token) y verificar con un test que credenciales válidas autentican y credenciales inválidas son rechazadas
- [x] 2.3 Implementar guard/verificación de rol en los endpoints protegidos y verificar con un test que un usuario sin rol autorizado recibe acceso denegado
- [x] 2.4 Implementar alta de nuevos roles sin tocar los roles existentes y verificar con un test que agregar un rol no altera los permisos de los roles ya definidos
- [x] 2.5 Implementar registro de auditoría (usuario, acción, fecha/hora) sobre consultas/modificaciones de legajo y verificar que cada acceso queda persistido

## 3. Materias del plan de estudios (`secretaria-academica/materias`)

- [x] 3.1 Modelar en Prisma la entidad Materia con duración (anual/bianual/trianual) y modalidad de acreditación (por tramo/al final del ciclo), y verificar con migración aplicada
- [x] 3.2 Implementar alta de materia bianual/trianual vinculando sus años intermedios a un único registro de Materia, y verificar con un test que ambos años refieren a la misma materia
- [x] 3.3 Implementar la configuración de modalidad de acreditación por materia y verificar con tests los casos "por tramo" y "al final del ciclo"
- [x] 3.4 Modelar áreas de una materia compuesta (relación Materia-Área con docente propio) y verificar con un test el alta de UTP con sus tres áreas (Dibujo Técnico, Taller, Educación Tecnológica)
- [x] 3.5 Implementar la escala de calificación configurable por etapa (cualitativa en tramos intermedios, cuantitativa en el cierre) y verificar con un test el caso de UTP
- [x] 3.6 Modelar el vínculo Materia-Materia para Proyectos Integrados y verificar con un test que ambas materias conservan su acreditación y notas independientes

## 4. Legajos de alumnos (`secretaria-academica/legajos-alumnos`)

- [x] 4.1 Modelar en Prisma la entidad Alumno/Legajo con datos personales y de contacto, y verificar con migración aplicada
- [x] 4.2 Implementar alta de legajo con validación de datos obligatorios y verificar con tests los casos de alta exitosa y de rechazo por datos faltantes
- [x] 4.3 Implementar edición de legajo dejando registro de quién y cuándo modificó, y verificar con un test que el historial de cambio queda registrado
- [x] 4.4 Modelar y implementar el alta de responsables/familiares asociados a un alumno, y verificar con un test que un alumno puede tener uno o más responsables
- [x] 4.5 Restringir consulta/edición de legajo por rol autorizado y verificar con un test que un usuario sin permiso no puede acceder

## 5. Libro matriz (`secretaria-academica/libro-matriz`)

- [x] 5.1 Modelar en Prisma la entidad Inscripción de Libro Matriz (libro, año, número correlativo, alumno) y verificar con migración aplicada
- [x] 5.2 Implementar asignación automática de número correlativo por libro/año y verificar con un test que inscripciones sucesivas reciben números consecutivos
- [x] 5.3 Implementar la restricción de unicidad de inscripción activa por período y verificar con un test que una segunda inscripción en el mismo período es rechazada
- [x] 5.4 Implementar consulta de inscripciones filtrando por año/libro y verificar con un test que devuelve el listado esperado

## 6. Actas de examen (`secretaria-academica/actas-examen`)

- [x] 6.1 Modelar en Prisma Libro de Actas, Acta y Calificación por alumno, y verificar con migración aplicada
- [x] 6.2 Implementar alta de acta con materia, fecha, docentes evaluadores y alumnos inscriptos, y verificar con un test la creación completa
- [x] 6.3 Implementar la determinación de alcance del acta (tramo o ciclo completo) según la modalidad de acreditación de la materia, y verificar con tests ambos casos, incluyendo el rechazo de un acta de ciclo completo si faltan años por cursar
- [x] 6.4 Implementar carga de calificación por alumno y el cálculo de aprobado/desaprobado, y verificar con tests ambos casos (nota igual/superior y nota inferior a la mínima)
- [x] 6.5 Implementar el cierre de acta y bloquear la edición directa de un acta cerrada, y verificar con un test que la edición directa post-cierre es rechazada
- [x] 6.6 Implementar consulta de historial de actas por alumno y por materia, y verificar con un test que devuelve las actas correctas

## 7. Materias previas (`secretaria-academica/materias-previas`)

- [x] 7.1 Modelar en Prisma Materia Adeudada y Plan de Acompañamiento, y verificar con migración aplicada
- [x] 7.2 Implementar el alta automática de materia adeudada cuando un acta marca una materia como no acreditada, y verificar con un test integrado con el módulo de actas
- [x] 7.3 Implementar el registro de materia adeudada por tramo específico para materias plurianuales "por tramo", y verificar con un test que no acreditar un año no bloquea cursar el siguiente
- [x] 7.4 Implementar que los años intermedios de una materia "al final del ciclo" no generen materia adeudada, y verificar con un test sobre un año intermedio no acreditado aún
- [x] 7.5 Modelar la tabla de configuración de normativa (tope de materias, condiciones de excepción) y verificar que un cambio de configuración se aplica sin deploy de código
- [x] 7.6 Implementar el cálculo de habilitación a promoción según el tope configurado, y verificar con tests los casos dentro y fuera del tope
- [x] 7.7 Implementar la exigencia de plan de acompañamiento al registrar la tercera materia adeudada, y verificar con un test que el registro queda incompleto sin el plan asociado
- [x] 7.8 Implementar la baja de materia adeudada cuando se acredita, y verificar con un test integrado con el módulo de actas

## 8. Pases de estudiantes (`secretaria-academica/pases-estudiantes`)

- [ ] 8.1 Modelar en Prisma Pase de Estudiante (tipo ingreso/egreso, institución origen/destino, estado) y verificar con migración aplicada
- [ ] 8.2 Implementar registro de pase de ingreso, creando o vinculando el legajo del alumno, y verificar con un test el caso completo
- [ ] 8.3 Implementar registro de pase de egreso con generación de documentación de pase, y verificar con un test que se genera la documentación esperada
- [ ] 8.4 Implementar el seguimiento de estado del pase (pendiente/en proceso/completo) y verificar con un test la consulta de estado

## 9. Frontend por capability

- [ ] 9.1 Implementar pantalla de login conectada a Identity & Access Control y verificar manualmente el flujo de inicio de sesión exitoso y fallido
- [ ] 9.2 Implementar las pantallas de alta/consulta de legajo, libro matriz, materias, actas de examen, materias previas y pases, y verificar manualmente cada flujo end-to-end en desktop y en viewport móvil
- [ ] 9.3 Adaptar la navegación para mostrar solo las secciones habilitadas según el rol del usuario autenticado, y verificar manualmente con al menos dos roles distintos

## 10. Verificación integral

- [ ] 10.1 Ejecutar la suite completa de tests automatizados de este change y verificar que todos pasan
- [ ] 10.2 Validar los artefactos de OpenSpec con `openspec validate --strict` para este change y verificar que no reporta errores
