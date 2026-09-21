# Design

## Context

Este change se apoya en la base técnica definida en `changes/secretaria-academica/design.md` (monolito modular Node.js/TypeScript con NestJS, PostgreSQL + Prisma, un único frontend React responsive, `identity/access-control` como módulo transversal de roles). Ver `proposal.md - Why` para la motivación de negocio. Ninguna decisión de esa base se revisa acá; este documento cubre solo lo específico de Portal de Familias.

## Goals / Non-Goals

**Goals:**
- Extender `identity/access-control` con los roles Familia y Alumno sin modificar el comportamiento de los roles existentes.
- Que la nueva libreta de calificaciones, sanciones, calendario/comunicados, horarios y certificados queden modeladas como capabilities independientes y reutilizables por el futuro módulo de Departamento de Orientación (que también va a necesitar consultar información compartida del alumno).
- Un modelo de notificaciones simple (basado en lectura por cuenta, no por alumno) que sea correcto cuando dos responsables comparten un alumno.
- Modelar curso/división como entidad base única, para que horarios, libreta de calificaciones y comunicados con alcance por curso no dupliquen ese concepto cada uno a su manera.

**Non-Goals:**
- No se diseña en este change el envío de notificaciones por canales externos (email/SMS/push) — se implementa primero como bandeja dentro del sistema; el canal externo queda como extensión futura.
- No se diseña el modelo de datos de Departamento de Orientación (su propio change), aunque se deja el terreno preparado para que consuma `familias/situacion-academica`-style de solo lectura sobre el mismo alumno.
- No se define aquí el detalle de firma digital o validez legal de los certificados emitidos.

## Decisions

### Rol Familia como extensión de `identity/access-control`, sin tocar sus requisitos
Se agrega el rol "Familia" usando la extensibilidad de roles ya prevista (`identity/access-control - Requirement: Extensibilidad de roles para módulos futuros`). No se declara como capability modificada porque no cambia ningún requisito existente de esa spec; el vínculo cuenta-responsable-alumno específico de Familia se modela en la nueva capability `familias/cuenta-familiar`.

### Todos los responsables comparten permisos, pero las alertas se marcan por cuenta
Dado que "todos ven lo mismo" para un mismo alumno, el modelo de permisos no distingue entre responsables. Sin embargo, el estado de lectura de una notificación (`familias/notificaciones`) se guarda por cuenta de usuario, no por alumno, para que un responsable marcando algo como leído no oculte esa alerta al otro responsable (ver requirement correspondiente). Alternativa considerada: estado de lectura compartido por alumno — se descarta porque ocultaría alertas a un responsable que aún no la vio.

### Libreta de calificaciones periódicas como capability separada de actas de examen
`secretaria-academica/libreta-calificaciones` se modela como entidad propia (no reutiliza la tabla de Calificación de `actas-examen`), porque conceptualmente son cosas distintas: notas periódicas de cursada vs. resultado de una mesa de examen. Comparten alumno y materia como referencia, pero no el ciclo de vida (una nota periódica se corrige, un acta cerrada no se edita directamente).

### Notificaciones como capability derivada, no como tabla poblada manualmente
`familias/notificaciones` se genera a partir de eventos de las capabilities fuente (evaluación próxima en `libreta-calificaciones`, alta de sanción en `convivencia/sanciones`, publicación de comunicado en `institucional/calendario-comunicados`). Se implementa como listener/handler de esos eventos dentro del mismo monolito modular (no un servicio de mensajería separado), consistente con la decisión de monolito modular ya tomada para Secretaría Académica.

### Solicitudes de trámite como capa fina sobre capacidades existentes
`familias/tramites` no reimplementa la emisión de certificados ni la gestión de pases: crea una solicitud que Secretaría Académica resuelve usando `secretaria-academica/certificados` o `secretaria-academica/pases-estudiantes` (esta última ya especificada en el change `secretaria-academica`). Esto evita duplicar reglas de negocio de esas capacidades dentro del módulo de familias.

### Rol Alumno espeja al rol Familia, con acceso acotado al propio legajo
`alumnos/cuenta` reutiliza el mismo mecanismo de extensibilidad de roles que Familia, pero sin el concepto de "responsable" — la cuenta se vincula directamente a un único legajo. Todas las capabilities de consulta de este change (`situacion-academica`, `institucional/horarios`, `institucional/calendario-comunicados`, `familias/notificaciones`) están pensadas para aceptar tanto una cuenta Familia (resuelve el alumno vinculado) como una cuenta Alumno (resuelve su propio legajo), sin duplicar la lógica de consulta.

### Curso/división como entidad base compartida
Se agrega `secretaria-academica/cursos-divisiones` en este change porque `institucional/horarios`, la libreta de calificaciones y los comunicados con alcance "por curso" necesitan un concepto único y consistente de curso/división; sin esto cada capability hubiera tenido que inventar su propio agrupamiento. Se ubica en el dominio `secretaria-academica` (no `institucional`) porque la asignación de un alumno a un curso/división es un dato académico-administrativo, no institucional en sentido amplio.

## Risks / Trade-offs

- [Riesgo] `familias/tramites` depende de `secretaria-academica/pases-estudiantes`, que pertenece a otro change (`secretaria-academica`) todavía no archivado → Mitigación: no se declara como capability modificada de ese change (evita conflicto de archivado); la integración se resuelve a nivel de implementación cuando ambos changes estén aplicados, y las tasks de este change lo dejan explícito.
- [Riesgo] Multiplicar dominios nuevos (`convivencia`, `institucional`) en un solo change aumenta el tamaño de este change → Mitigación: se agrupan aquí porque las pidió la dirección como parte del mismo portal y están débilmente acoplados entre sí (cada uno es una capability independiente), por lo que se pueden implementar y probar por separado dentro de este mismo change.
- [Riesgo] El estado de lectura por cuenta (no por alumno) puede confundir si se espera que "alguien ya lo vio" alcance para toda la familia → Mitigación: documentado explícitamente en la spec y en este design; se puede revisar si la escuela lo pide tras el primer uso.
- [Riesgo] La actualización de datos de contacto propuesta por la familia (mencionada en el proposal) requiere validación de Secretaría Académica, pero el flujo de aprobación/rechazo no está especificado en detalle → Mitigación: se deja como pregunta abierta; no bloquea el resto de las capabilities de este change.

## Open Questions

- Flujo exacto de validación cuando una familia propone una actualización de datos de contacto (¿queda pendiente de aprobación, se aplica y se audita, quién puede rechazarla?) — a resolver antes de implementar esa funcionalidad puntual dentro de `tasks.md` o en un ajuste posterior.
- Canales externos de notificación (email/SMS/push) y si la escuela los va a pagar/operar — no bloquea este change, que entrega notificaciones dentro del sistema.
- Quiénes exactamente pueden cargar sanciones (¿solo directivos, también preceptores?) — se deja parametrizable por rol en la implementación; no cambia la spec, que ya lo declara como "personal con rol autorizado".
- Edad mínima o criterio para habilitar cuenta propia de Alumno (¿todos los años, o solo ciclo superior?) — no cambia el diseño de `alumnos/cuenta`, se resuelve como política institucional al momento de emitir credenciales.
