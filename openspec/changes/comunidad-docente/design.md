# Design

## Context

Espejo de `changes/comunidad-estudiantil` pero para personal docente: mismo patrón de reporte + revisión manual, adaptado a un espacio institucional (no por curso) y moderado por Dirección en lugar de preceptor/Orientación. Ver `proposal.md - Why`.

## Goals / Non-Goals

**Goals:**
- Reutilizar el mismo patrón de moderación (reporte + revisión) ya validado en `comunidad-estudiantil`, en lugar de diseñar un mecanismo nuevo.
- Un modelo de chat simple que cubra 1 a 1 y grupal con la misma estructura (un chat con N participantes, N≥2), sin duplicar lógica entre ambos casos.

**Non-Goals:**
- No se implementa notificación push en tiempo real en este change; la entrega de mensajes puede resolverse con actualización al abrir/refrescar la conversación.
- No se define moderación proactiva de chats (revisión de todos los mensajes); solo reactiva por reporte, igual que el foro.
- No se permiten chats con roles distintos de docente en este change (familias, alumnos, Orientación quedan fuera).

## Decisions

### Chat directo como caso particular de chat grupal (2 participantes)
Se modela un único concepto de "Chat" con una lista de participantes; un chat directo es simplemente un chat con exactamente 2 participantes. Esto evita mantener dos modelos de datos y dos implementaciones de mensajería para lo que es, en el fondo, el mismo mecanismo de envío/consulta de mensajes.

### Dirección puede ver el contenido de un chat privado solo ante un mensaje reportado
A diferencia del foro (público entre docentes) y del foro de alumnos (con supervisión pasiva permanente por varios roles), un chat entre docentes es privado por defecto: Dirección solo accede a su contenido cuando hay un mensaje reportado, y únicamente al contexto necesario para revisar ese reporte, no a la conversación completa sin motivo. Se prioriza la privacidad de la comunicación entre pares, con la salvaguarda de reporte como único punto de entrada para Dirección.

### Reutilización del patrón de reporte + revisión del foro de alumnos
La entidad de Reporte de Contenido y el flujo de revisión/decisión siguen la misma forma que en `comunidad-estudiantil` (reportar → queda pendiente → rol autorizado decide eliminar o desestimar, con registro de la decisión), aplicado tanto a publicaciones del foro de docentes como a mensajes de chat, para no introducir un tercer modelo de moderación en el sistema.

## Risks / Trade-offs

- [Riesgo] Sin notificaciones en tiempo real, un docente podría no enterarse de un mensaje nuevo hasta que abre la app → Mitigación: aceptable para esta primera versión; se puede integrar con `familias/notificaciones`-style de alertas en un change posterior si se pide.
- [Riesgo] Limitar el acceso de Dirección al contexto de un chat reportado (y no a la conversación completa) podría dificultar evaluar un reporte fuera de contexto → Mitigación: se prioriza la privacidad por defecto; si en la práctica hace falta más contexto, se puede ajustar cuánto contexto alrededor del mensaje reportado se muestra, sin cambiar el principio de acceso solo ante reporte.

## Open Questions

- Cuánto contexto alrededor de un mensaje reportado debe ver Dirección (solo ese mensaje, unos pocos anteriores/posteriores, o el chat completo) — no bloquea este change; se puede ajustar como parámetro de implementación.
- Si conviene integrar notificaciones en tiempo real de mensajes/foro en un change futuro — no bloquea este change.
