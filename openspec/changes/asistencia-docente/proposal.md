# Proposal

## Why

Hoy no hay un registro sistemático de la asistencia de los docentes; depende de que alguien lo anote manualmente en cada turno. Un check-in desde el celular del propio docente, validado porque su dispositivo está conectado a la red institucional, automatiza ese registro sin necesidad de vigilancia por ubicación ni intervención de un tercero en el momento.

## What Changes

- Cada docente puede hacer **check-in** desde su dispositivo móvil para marcar su presencia, **una vez por turno** (mañana y/o tarde, porque la escuela es de doble turno) y hasta 2 veces por día.
- El check-in solo se acepta si la solicitud llega **desde la red institucional** de la escuela (conexión obligatoria); una solicitud fuera de esa red se rechaza.
- Un docente puede asistir **solo a la mañana, solo a la tarde, o a ambos turnos**, de forma independiente.
- Si un docente **olvida hacer el check-in** habiendo estado presente, **Secretaría Académica o Dirección** pueden cargar o corregir manualmente su asistencia para ese turno.
- Se puede **consultar la asistencia** de un docente por turno, día o rango de fechas.

Fuera de alcance de este change: geolocalización o cualquier forma de seguimiento pasivo en segundo plano (se descartó explícitamente por privacidad y complejidad), y el uso de esta asistencia para liquidación de haberes u otro efecto administrativo/laboral (se deja como pregunta abierta si se pide en el futuro).

## Capabilities

### New Capabilities
- `secretaria-academica/asistencia-docente`: check-in de asistencia por turno gateado por red institucional, corrección manual por Secretaría Académica/Dirección, y consulta de asistencia de un docente.

### Modified Capabilities
(ninguna)

## Impact

- **Datos**: nueva entidad de Asistencia Docente (docente, fecha, turno, origen: check-in/manual, quién corrigió si aplica) y configuración de rangos de red institucional autorizados.
- **Roles**: se apoya en los roles ya existentes (docente, Secretaría Académica, Dirección); no se agrega ningún rol nuevo.
- **Infraestructura**: requiere identificar de forma confiable cuándo una solicitud proviene de la red institucional (ver `design.md`), lo que puede depender de la configuración de red de la escuela (IP pública de salida, posibles múltiples sedes/turnos con redes distintas).
