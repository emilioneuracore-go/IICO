# Spec Delta

## Purpose

Permitir la comunicación directa entre docentes mediante mensajería uno a uno y chats grupales, con la misma salvaguarda de reporte y revisión que el foro de docentes.

## ADDED Requirements

### Requirement: Chat directo uno a uno
El sistema SHALL permitir a una cuenta docente iniciar un chat directo con otra cuenta docente y enviarle mensajes.

#### Scenario: Inicio de un chat directo
- **WHEN** un docente inicia un chat directo con otro docente y le envía un mensaje
- **THEN** el sistema entrega el mensaje al destinatario y lo conserva en el historial del chat

### Requirement: Chat grupal entre docentes
El sistema SHALL permitir a una cuenta docente crear un chat grupal e incluir a otras cuentas docentes como participantes.

#### Scenario: Creación de un chat grupal
- **WHEN** un docente crea un chat grupal e incluye a varios docentes como participantes
- **THEN** el sistema los agrega al chat y les permite enviar y recibir mensajes en ese grupo

### Requirement: Acceso restringido a los participantes del chat
El sistema SHALL permitir consultar los mensajes de un chat únicamente a las cuentas docentes que participan de él.

#### Scenario: Docente ajeno al chat intenta acceder
- **WHEN** una cuenta docente que no participa de un chat intenta consultar sus mensajes
- **THEN** el sistema deniega el acceso

### Requirement: Reporte de un mensaje
El sistema SHALL permitir a un participante de un chat reportar un mensaje que considere inapropiado.

#### Scenario: Reporte de un mensaje de chat
- **WHEN** un docente participante reporta un mensaje de un chat
- **THEN** el sistema registra el reporte y lo deja disponible para revisión de Dirección

### Requirement: Revisión de un mensaje reportado por Dirección
El sistema SHALL permitir a una cuenta con rol Dirección revisar un mensaje reportado, incluyendo el contexto necesario del chat, y decidir si lo elimina, quedando registrada la decisión.

#### Scenario: Eliminación de un mensaje reportado
- **WHEN** Dirección revisa un mensaje reportado de un chat y decide eliminarlo
- **THEN** el sistema lo retira del chat para los participantes y conserva un registro de la decisión

### Requirement: Restricción de revisión al rol Dirección
El sistema SHALL denegar la revisión o eliminación de un mensaje reportado a cualquier cuenta sin rol Dirección.

#### Scenario: Un docente participante intenta eliminar un mensaje reportado
- **WHEN** una cuenta docente sin rol Dirección intenta eliminar un mensaje reportado
- **THEN** el sistema deniega la operación
