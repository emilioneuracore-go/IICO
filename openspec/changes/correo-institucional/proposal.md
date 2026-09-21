# Proposal

## Why

Hoy la creación de cuentas de correo institucional (@iico.edu.ar) para alumnos matriculados y docentes dados de alta se haría manualmente en la consola de Google Workspace, duplicando trabajo administrativo y con riesgo de inconsistencias en el formato del nombre de usuario. Automatizar esta generación desde IICO, apoyándose en los permisos de administrador de Google Workspace ya disponibles, evita esa carga manual y garantiza un criterio uniforme.

## What Changes

- Al **matricular a un alumno** (`administracion/matriculacion`) o **dar de alta a un docente** (cuenta con rol Docente), el sistema **genera automáticamente** una cuenta de correo institucional en Google Workspace.
- El nombre de usuario del correo sigue el formato **`nombreapellido@iico.edu.ar`** (nombre y apellido concatenados, sin separador, en minúscula, sin acentos ni "ñ").
- Ante una **colisión** (otra persona ya tiene el mismo nombreapellido), el sistema **desambigua agregando un número incremental** (`nombreapellido2`, `nombreapellido3`, etc.).
- La generación del correo es una integración con la **API de administración de Google Workspace** (Google Admin/Directory API); si falla, **no bloquea** la matriculación ni el alta del docente, y queda marcada para reintentar.
- El correo generado queda **registrado y consultable** desde el legajo del alumno o del docente en IICO.

Fuera de alcance de este change: baja o suspensión automática del correo ante egreso/pase de un alumno o baja de un docente, gestión de contraseñas/políticas de seguridad de las cuentas de Google, y creación de grupos de correo o alias adicionales — todo esto queda como pregunta abierta o para un change futuro si se pide.

## Capabilities

### New Capabilities
- `integraciones/correo-institucional`: generación automática de una cuenta de correo institucional en Google Workspace al matricular a un alumno o dar de alta a un docente, con el formato de usuario y la desambiguación por colisión ya definidos, y registro consultable del correo generado.

### Modified Capabilities
(ninguna — se dispara a partir de eventos de `administracion/matriculacion` e `identity/access-control` sin modificar sus requisitos)

## Impact

- **Integración externa**: requiere credenciales de administrador de Google Workspace para el dominio @iico.edu.ar (ya disponibles) y uso de la API de Google Admin/Directory.
- **Datos**: nueva entidad de Cuenta de Correo Institucional (persona, dirección generada, estado: creada/pendiente/error).
- **Dependencias funcionales**: se dispara a partir de eventos de `administracion/matriculacion` (matriculación confirmada) e `identity/access-control` (alta de cuenta con rol Docente).
- **Riesgo de normalización**: nombres compuestos, apellidos compuestos y caracteres especiales necesitan una regla de normalización clara (ver `design.md`).
