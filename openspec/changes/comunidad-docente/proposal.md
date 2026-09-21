# Proposal

## Why

Los docentes no tienen hoy un espacio propio dentro de IICO para compartir experiencias, materiales de estudio, bibliografía y material audiovisual entre pares, ni una forma de comunicarse directamente entre ellos dentro del sistema. Un espacio equivalente al ya definido para estudiantes (`comunidad-estudiantil`), pero de alcance institucional y para personal, fomenta el intercambio profesional sin depender de herramientas externas.

## What Changes

- Se crea un **foro de docentes**, de alcance para toda la escuela (no por curso), donde pueden publicar experiencias, materiales de estudio, bibliografía y material audiovisual.
- El foro de docentes se modera con el mismo esquema de **reporte + revisión manual** que el foro de alumnos, pero a cargo de **Dirección**.
- Se crean **chats entre docentes**: mensajería directa **uno a uno** y **chats grupales** (por ejemplo, para un área o un Proyecto Integrado).
- Cualquier docente puede **reportar** una publicación del foro o un mensaje de un chat que considere inapropiado; Dirección lo revisa y decide.

Fuera de alcance de este change: revisión previa de todo contenido antes de publicarse (se mantiene el esquema de reporte + revisión, igual que en el foro de alumnos), y chats con roles distintos de docente (por ejemplo, con familias o alumnos) — este change es exclusivamente entre docentes.

## Capabilities

### New Capabilities
- `docentes/foro`: foro institucional de docentes para compartir experiencias, materiales, bibliografía y material audiovisual, con reporte y revisión por Dirección.
- `docentes/chats`: mensajería directa uno a uno y chats grupales entre docentes, con reporte de mensajes y revisión por Dirección.

### Modified Capabilities
(ninguna)

## Impact

- **Datos**: nuevas entidades de Publicación de Foro Docente, Reporte de Contenido Docente, Chat (directo o grupal), Participante de Chat y Mensaje.
- **Roles**: se apoya en los roles ya existentes (docente, Dirección); no se agrega ningún rol nuevo.
- **Dependencias funcionales**: ninguna hacia otras capabilities ya especificadas más allá de `identity/access-control` para roles.
