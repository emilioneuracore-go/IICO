# Proposal

## Why

Los docentes necesitan pedir autorización institucional para llegar tarde, retirarse antes, faltar o tomar una licencia, y hoy ese trámite es informal (de palabra o por fuera del sistema). Sin un registro, Dirección no tiene forma sistemática de aprobar/rechazar estos pedidos ni de entender por qué la asistencia de un docente (`secretaria-academica/asistencia-docente`) no coincide con lo esperado un día determinado.

## What Changes

- Un docente puede **solicitar autorización** para: llegada tarde, retiro anticipado, falta, o licencia, indicando fecha/turno afectado, un **motivo de texto libre** y, opcionalmente, un **archivo adjunto** de respaldo (por ejemplo, un certificado).
- La solicitud puede hacerse **antes** del día que afecta (pedido anticipado) o **después** (justificación de algo que ya ocurrió).
- **Dirección** aprueba o rechaza cada solicitud.
- El docente puede **consultar el estado** de sus propias solicitudes.
- Una solicitud **aprobada** queda vinculada al registro de `secretaria-academica/asistencia-docente` del turno/día correspondiente, como explicación de una llegada tarde, un retiro anticipado o una falta.

Fuera de alcance de este change: un catálogo cerrado de tipos de licencia con reglas propias (días permitidos, documentación obligatoria según el Estatuto del Docente) — por ahora el motivo es genérico; y cualquier efecto sobre haberes/liquidación de sueldo.

## Capabilities

### New Capabilities
- `secretaria-academica/licencias-docentes`: solicitud de autorización de llegada tarde, retiro anticipado, falta o licencia por parte de un docente, aprobación/rechazo por Dirección, y vínculo con el registro de asistencia docente correspondiente.

### Modified Capabilities
(ninguna — se vincula con `secretaria-academica/asistencia-docente` sin modificar sus requisitos)

## Impact

- **Datos**: nueva entidad de Solicitud de Autorización Docente (docente, tipo: llegada tarde/retiro anticipado/falta/licencia, fecha/turno afectado, motivo, adjunto opcional, estado: pendiente/aprobada/rechazada, quién la resolvió).
- **Roles**: se apoya en los roles ya existentes (docente, Dirección); no se agrega ningún rol nuevo.
- **Dependencias funcionales**: una solicitud aprobada se vincula al registro correspondiente de `secretaria-academica/asistencia-docente`, sin modificar sus requisitos.
