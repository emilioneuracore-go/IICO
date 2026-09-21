# Design

## Context

Primer change que integra IICO con un servicio externo de terceros con permisos de escritura (Google Workspace), a diferencia de `integraciones/importacion-sge` que era de solo lectura vía archivo. Se dispara a partir de eventos de `administracion/matriculacion` (matriculación confirmada) e `identity/access-control` (alta de cuenta con rol Docente). Ver `proposal.md - Why`.

## Goals / Non-Goals

**Goals:**
- Que la generación de correo sea un efecto asíncrono y desacoplado del trámite que la origina: matricular a un alumno o dar de alta a un docente nunca debe fallar ni demorarse por un problema de Google Workspace.
- Un criterio de normalización de nombre de usuario único, reutilizado tanto para alumnos como para docentes, en lugar de dos implementaciones separadas.

**Non-Goals:**
- No se diseña en este change la baja/suspensión automática del correo ante egreso, pase o baja de personal — ver Open Questions.
- No se define la política de contraseñas ni de seguridad de las cuentas de Google (queda del lado de la configuración de Google Workspace, fuera de IICO).
- No se generan alias, grupos de correo ni casillas compartidas.

## Decisions

### Generación como efecto asíncrono desacoplado (listener de eventos)
Siguiendo el mismo patrón ya usado para `familias/notificaciones` (listener de eventos dentro del monolito modular), la confirmación de matriculación y el alta de un docente emiten un evento que un módulo de aprovisionamiento de correo escucha de forma asíncrona. Si la llamada a la API de Google Workspace falla, el evento se reintenta sin afectar la transacción original de matriculación o alta. Alternativa considerada: llamar a la API de Google de forma síncrona dentro de la misma operación de matriculación — se descarta porque un problema transitorio de red o de la API de Google no debe poder bloquear un trámite académico/administrativo.

### Normalización de nombre de usuario como función pura y reutilizable
Se implementa una única función de normalización (quitar acentos y "ñ", pasar a minúscula, concatenar nombre+apellido, quitar espacios) usada tanto para alumnos como para docentes, en lugar de duplicar la lógica. La desambiguación por colisión se resuelve consultando las cuentas de correo institucional ya generadas (no las cuentas de Google directamente) antes de intentar crear la cuenta, para minimizar llamadas a la API externa.

### Idempotencia ante reintentos
Antes de reintentar la creación de una cuenta marcada en error, el sistema vuelve a verificar en Google Workspace si la cuenta ya existe (pudo haberse creado del lado de Google pero fallar la confirmación de vuelta a IICO), para no intentar crear una cuenta duplicada ni fallar por "ya existe" de forma confusa.

### Nombre compuesto y apellido compuesto: se usa el nombre y apellido completos tal como están cargados en el legajo
Para una persona con nombre compuesto (ej. "María José") o apellido compuesto (ej. "Pérez García"), se concatenan todos los componentes tal como figuran en el campo de nombre y en el campo de apellido del legajo (ej. "mariajoseperezgarcia"), sin intentar adivinar cuál es el "primer nombre". Esto evita reglas ambiguas y mantiene el comportamiento predecible a partir de los datos ya cargados. Si la escuela prefiere otro criterio (por ejemplo, usar solo el primer nombre), es un ajuste de la función de normalización, no un cambio de arquitectura.

## Risks / Trade-offs

- [Riesgo] Concatenar nombres/apellidos compuestos completos puede generar nombres de usuario largos → Mitigación: aceptable frente a la alternativa de adivinar cuál es el "primer nombre", que sería más propenso a error; se puede acotar con un largo máximo si Google Workspace lo requiere.
- [Riesgo] Un evento de generación de correo podría perderse si el proceso se reinicia entre la confirmación de matriculación y el procesamiento del evento → Mitigación: el evento se persiste como un registro de Cuenta de Correo Institucional en estado "pendiente" antes de intentar la llamada a Google, no solo en memoria, para poder reintentarlo aunque el proceso se reinicie.
- [Riesgo] Cambios de nombre/apellido de una persona después de generado el correo (por ejemplo, corrección de un error de carga) no se reflejan automáticamente en la casilla ya creada → Mitigación: fuera de alcance de este change; se trataría como una operación manual en Google Workspace si ocurre.

## Open Questions

- Si se debe suspender o dar de baja automáticamente el correo institucional cuando un alumno egresa/hace un pase de salida, o cuando se da de baja a un docente — no bloquea este change, que solo cubre la generación; se puede definir en un change posterior.
- Si conviene un largo máximo o una regla de acortamiento para nombres/apellidos muy largos o muy compuestos — no cambia el diseño, es un ajuste de la función de normalización cuando se confirme un límite real de Google Workspace.
