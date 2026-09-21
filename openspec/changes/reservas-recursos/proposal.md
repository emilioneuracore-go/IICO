# Proposal

## Why

Los docentes necesitan usar espacios (laboratorio, gimnasio, SUM, aulas especiales) y elementos (proyectores, notebooks, herramientas de taller) compartidos por toda la escuela. Sin un sistema de reservas, la coordinación se hace informalmente (de palabra, por grupos de mensajería) y termina en superposiciones: dos docentes esperando usar el mismo laboratorio a la misma hora. Un módulo de reservas simple, con confirmación automática, resuelve la coordinación sin agregar burocracia.

## What Changes

- Se crea un **catálogo de espacios y elementos reservables**, administrado por cualquier cuenta con rol directivo o de Secretaría (alta, baja, marcado como fuera de servicio).
- Los docentes pueden **reservar** un espacio o elemento para una franja horaria, con **confirmación automática** si está disponible en ese momento — no requiere aprobación de nadie.
- El sistema **rechaza una reserva que se superpone** con otra ya confirmada para el mismo espacio/elemento.
- Los docentes pueden **consultar sus propias reservas** y **cancelarlas**.
- Un espacio o elemento marcado **fuera de servicio** no puede reservarse mientras dure esa condición.

Fuera de alcance de este change: aprobación manual de reservas (se descartó: la reserva es automática), límites de cantidad de reservas por docente, y reserva de recursos con múltiples unidades idénticas (cada espacio/elemento del catálogo se trata como una unidad reservable individual).

## Capabilities

### New Capabilities
- `recursos/catalogo`: alta, baja y marcado fuera de servicio de espacios y elementos reservables de la escuela.
- `recursos/reservas`: reserva de un espacio o elemento por parte de un docente para una franja horaria, con confirmación automática, prevención de superposición horaria, y consulta/cancelación de reservas propias.

### Modified Capabilities
(ninguna)

## Impact

- **Datos**: nuevas entidades de Espacio/Elemento Reservable y Reserva (docente, recurso, franja horaria, estado).
- **Roles**: se apoya en los roles ya existentes (directivo, Secretaría, docente); no se agrega ningún rol nuevo.
- **Dependencias funcionales**: ninguna hacia otras capabilities ya especificadas; es un módulo independiente que solo depende de `identity/access-control` para roles.
