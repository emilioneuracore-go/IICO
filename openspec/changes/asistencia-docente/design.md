# Design

## Context

Sistema hosteado en la nube (ver `changes/secretaria-academica/design.md`), consumido desde el celular del docente. "Gateado por red institucional" significa que el backend, corriendo fuera de la escuela, necesita alguna forma de confirmar que la solicitud de check-in salió físicamente desde la red de la escuela. Ver `proposal.md - Why`.

## Goals / Non-Goals

**Goals:**
- Confirmar la conexión a la red institucional sin depender de geolocalización ni de una app nativa con permisos de sistema.
- Modelo simple de dos turnos por día, independientes entre sí, sin asumir una estructura de horario por franja más fina que eso.

**Non-Goals:**
- No se implementa detección de ubicación (GPS) como mecanismo de validación; se descartó explícitamente por privacidad.
- No se define en este change el efecto administrativo/laboral de esta asistencia (liquidación de haberes, etc.).

## Decisions

### Validación por IP de salida de la red institucional
Dado que el backend está en la nube, la señal más simple y disponible de "el dispositivo está conectado a la red de la escuela" es la **dirección IP pública de salida** con la que llega la solicitud de check-in: si la escuela tiene una conexión a internet con IP pública fija (o un rango conocido), el backend acepta el check-in solo cuando la IP de origen de la solicitud coincide con esa IP/rango configurado. Alternativa considerada: verificar el SSID de la red WiFi desde el dispositivo — se descarta porque los navegadores y apps móviles modernos restringen fuertemente el acceso a esa información por privacidad, haciendo la implementación frágil o directamente inviable en varios sistemas operativos.

### Rango de red configurable, no hardcodeado
La IP/rango de la red institucional se guarda como configuración editable (similar al tope normativo de materias adeudadas), no como valor fijo en código, porque el proveedor de internet de la escuela puede cambiar la IP pública con el tiempo.

### Turno como concepto simple de dos valores
Se modela "turno" como un enum de dos valores (mañana, tarde) definidos por un horario de corte configurable (por ejemplo, antes/después de las 13hs), sin necesidad de vincularlo al horario de clases de `institucional/horarios`. Esto alcanza para el objetivo de "asistencia del docente en el edificio ese turno", que es más simple que "asistencia a cada clase específica" (explícitamente descartado en la conversación con la dirección).

## Risks / Trade-offs

- [Riesgo] La validación por IP de salida asume una única red/salida a internet para todo el edificio; si la escuela tiene más de una sede o más de un proveedor de internet, un docente en una sede no configurada no podría hacer check-in → Mitigación: el rango de IPs autorizadas admite más de un valor, pensado para ese caso; si aparece una sede nueva, se agrega su IP a la configuración sin cambios de código.
- [Riesgo] Una IP pública dinámica (sin contratación de IP fija) haría fallar la validación de forma intermitente → Mitigación: se recomienda a la escuela contratar una IP fija para este uso; si no es posible, el mecanismo necesitaría revisarse (ver Open Questions).
- [Riesgo] Alguien podría intentar falsear la IP de origen (por ejemplo, con una VPN que termine en la red de la escuela) → Mitigación: aceptado como riesgo residual bajo para el objetivo de este change (evitar el olvido/registro remoto casual, no un control de seguridad estricto).

## Open Questions

- Si la escuela no tiene o no puede contratar una IP pública fija, qué mecanismo alternativo usar (por ejemplo, un punto de acceso institucional que firme la solicitud) — no bloquea este change, que asume que se puede identificar la red por IP; se revisaría si en la práctica no es viable.
- Si en el futuro se necesita asistencia por franja horaria específica en lugar de por turno completo — no bloquea este change, que fue explícitamente acotado a turno mañana/tarde.
