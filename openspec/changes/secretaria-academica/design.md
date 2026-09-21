# Design

## Context

IICO parte de cero (repo vacío salvo README). Este change no solo implementa Secretaría Académica: fija la base técnica sobre la que se van a montar, en changes posteriores, el portal de Padres/Madres (multiusuario, responsive) y el módulo de Departamento de Orientación (registros compartidos + registros privados por profesional). Ver `proposal.md - Why` para la motivación de negocio.

Decisiones ya tomadas por la dirección del proyecto:
- Backend en **Node.js + TypeScript**.
- Hosting en **la nube** (no on-premise), porque las familias deben poder acceder desde afuera de la institución.

## Goals / Non-Goals

**Goals:**
- Definir una arquitectura que permita agregar Padres/Madres y Departamento de Orientación como módulos nuevos sin rehacer lo construido para Secretaría Académica.
- Un único modelo de identidad de alumno (legajo) referenciado por libro matriz, actas de examen, materias previas y pases, para no duplicar datos del alumno en cada capability.
- Base de roles y permisos (`identity/access-control`) lista para diferenciar personal de Secretaría, y más adelante familiares y profesionales de Orientación.
- Reglas de negocio cambiantes (tope de materias adeudadas, excepciones normativas) parametrizables sin deploy de código.

**Non-Goals:**
- No se diseña en este change el modelo de datos de Padres/Madres ni de Departamento de Orientación (quedan para sus propios changes).
- No se define proveedor específico de hosting en la nube (Railway/Render/AWS/etc.) ni presupuesto — es una decisión operativa, no de arquitectura de la aplicación.
- No se implementa el flujo detallado de "corrección auditada" de un acta cerrada (solo se deja el requisito en la spec).

## Decisions

### Arquitectura: monolito modular (no microservicios)
Un único backend Node.js/TypeScript organizado en módulos por capability (`secretaria-academica/*`, `identity/access-control`, y a futuro `padres`, `orientacion`). Alternativa considerada: microservicios por módulo. Se descarta por ahora: la escuela es una sola institución con carga moderada, y separar en servicios independientes desde el día uno agrega complejidad operativa (deploys, red, observabilidad) sin un beneficio claro en este tamaño de proyecto. Si un módulo (por ejemplo Orientación, por sus requisitos de privacidad) necesita aislarse más adelante, el límite de módulo ya existe y facilita esa extracción.

### Framework backend: NestJS
Sobre Node.js/TypeScript, se elige **NestJS** en lugar de Express "a mano". Nest da estructura modular (un módulo de Nest por capability), inyección de dependencias y guards/decorators que encajan naturalmente con el modelo de roles de `identity/access-control`. Express sería más liviano pero dejaría la organización por módulos y el control de acceso por rol como convención informal, más frágil a medida que se suman módulos (Padres, Orientación).

### Base de datos: PostgreSQL + Prisma
Los datos de Secretaría Académica son intrínsecamente relacionales y con reglas de integridad fuertes (un alumno, un libro matriz, actas que referencian alumno+materia+docente, materias previas que referencian actas). Se elige **PostgreSQL** por sobre una base NoSQL para poder garantizar estas relaciones y consistencia (por ejemplo, unicidad de inscripción en el libro matriz). **Prisma** como ORM por su tipado end-to-end en TypeScript y su sistema de migraciones versionadas, útil dado que el modelo va a crecer con cada módulo nuevo.

### Frontend único, responsive, para todos los roles
En lugar de una app separada para el personal y otra para familias, se construye **una sola aplicación web responsive** (React) cuya interfaz se adapta por rol: pantallas más densas para Secretaría Académica (uso de escritorio) y vistas simplificadas para el futuro portal de Padres/Madres (uso mayormente móvil). Alternativa considerada: apps nativas para familias. Se descarta por ahora por el costo de mantener tiendas de aplicaciones (App Store/Play Store) para un sistema institucional de una sola escuela; una web responsive cubre el requisito sin esa carga operativa.

### Identidad y control de acceso como módulo transversal desde el inicio
`identity/access-control` se implementa como módulo compartido (no como parte de Secretaría Académica) precisamente porque Padres/Madres y Orientación van a depender de él. Los roles de Orientación (Psicología, Psicopedagogía) van a necesitar, además del acceso compartido a información del alumno, un espacio de registros propios por profesional — el modelo de permisos debe soportar "compartido" y "privado por usuario/rol" desde el diseño de esta base, aunque las tablas de registros propios de Orientación se agreguen en su propio change.

### Parametrización de reglas normativas (materias previas)
El tope de materias adeudadas (hoy 3) y las condiciones de excepción se guardan como configuración editable (tabla de reglas), no como constantes en código, dado que ya cambiaron por normativa provincial reciente (Resolución 11/2025) y pueden volver a cambiar.

### Materia como entidad propia, con duración y modalidad de acreditación configurables
Se modela `Materia` como entidad independiente (no como texto libre en cada acta), con un campo de duración (anual/bianual/trianual) y un campo de modalidad de acreditación (por tramo / al final del ciclo) configurable por materia — la dirección confirmó que esto varía caso a caso, no hay una regla única. Los años intermedios de una materia plurianual referencian la misma fila de `Materia`, para que actas, previas y libreta de calificaciones puedan consultar su historial continuo. Alternativa considerada: modelar cada tramo como una materia distinta sin vínculo formal (ej. "Taller I", "Taller II" como materias no relacionadas) — se descarta porque perdería la trazabilidad de que son parte del mismo ciclo, necesaria para decidir si una materia "al final del ciclo" ya puede evaluarse.

### Materias compuestas por áreas y escala de calificación por etapa (caso UTP)
El caso real de la Unidad Técnica Pedagógica (UTP: trianual, compuesta por Dibujo Técnico, Taller y Educación Tecnológica, calificación cualitativa hasta el cierre de 3er año y cuantitativa recién en el cierre) confirma dos necesidades del modelo de `Materia`: (1) una materia puede componerse de áreas, cada una con su propio docente, cuyas notas de área se registran junto a una nota integrada de la materia; (2) la escala de calificación (cualitativa/cuantitativa) puede variar por etapa dentro del mismo ciclo plurianual, no solo la modalidad de acreditación. Ambos campos se modelan en `Materia` (áreas como relación 1-N, escala como configuración por etapa) en lugar de crear una tabla especial solo para UTP, para que cualquier otra materia futura con el mismo patrón (compuesta y/o de escala mixta) lo reutilice sin cambios de esquema.

### Proyecto Integrado como vínculo entre materias, no como fusión
A diferencia de UTP (una sola materia compuesta por áreas), un Proyecto Integrado vincula **dos materias independientes**, cada una con su propia acreditación, notas y materia previa. Se modela como una relación (tabla de vínculo Materia-Materia), no como una nueva entidad de acreditación compartida. Lo único compartido es la franja horaria (ver `institucional/horarios`), que se resuelve en el módulo de horarios marcando una franja como común a ambas materias. Esto evita mezclar dos conceptos distintos del plan de estudios (materia compuesta por áreas vs. dos materias que comparten aula/horario) bajo el mismo mecanismo.

## Risks / Trade-offs

- [Riesgo] El monolito modular podría acoplarse de más entre Secretaría Académica e Identity a medida que se suman módulos → Mitigación: mantener los límites de módulo de Nest estrictos (sin imports cruzados directos a los repositorios de datos de otro módulo) desde este primer change.
- [Riesgo] Los registros privados por profesional de Orientación tienen requisitos de confidencialidad más estrictos que el resto del sistema → Mitigación: el modelo de permisos de `identity/access-control` ya distingue "compartido" de "privado por usuario/rol"; el detalle de aislamiento de datos de Orientación se valida en su propio change antes de implementarse.
- [Riesgo] Elegir NestJS/Prisma/PostgreSQL ahora, sin equipo de desarrollo aún confirmado, podría no ajustarse a quien mantenga el sistema después → Mitigación: decisión tomada en etapa de diseño, sin código escrito todavía; es reversible y queda documentada aquí para que se confirme o corrija antes de pasar a `tasks.md`.
- [Riesgo] El flujo de "corrección auditada" de actas cerradas no está definido y podría bloquear la implementación de esa funcionalidad → Mitigación: se deja como pregunta abierta; las tareas de este change cubren el registro y cierre de actas, no la corrección posterior.

## Open Questions

- Proveedor concreto de hosting en la nube (Railway, Render, AWS, otro) y presupuesto disponible — no cambia el diseño de la aplicación, se resuelve al momento de desplegar.
- Flujo exacto de corrección de un acta cerrada (¿quién autoriza, se genera un acta rectificativa, queda vinculada a la original?) — a definir antes de implementar esa funcionalidad puntual, no bloquea el resto de `tasks.md`.
- Alcance final de "otras tareas que iremos definiendo" de Secretaría Académica mencionadas en la propuesta — se incorporarán como changes adicionales sobre esta misma base.
