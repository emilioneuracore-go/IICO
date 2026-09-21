# Design

## Context

Primer change que expone contenido generado por estudiantes (menores de edad) a otros estudiantes, con moderación reactiva (reporte + revisión) en lugar de aprobación previa. Se apoya en `secretaria-academica/cursos-divisiones`, `identity/access-control` y, para consecuencias disciplinarias, `convivencia/sanciones`. Ver `proposal.md - Why`.

## Goals / Non-Goals

**Goals:**
- Minimizar el riesgo de contenido inapropiado sin frenar la participación: avatar predefinido (riesgo cero) + foto de perfil y foro moderados de forma reactiva pero con supervisión pasiva permanente de personal autorizado.
- Un modelo de puntaje simple y trazable: cada punto de la tabla de posiciones se puede rastrear hasta el desafío y el docente que lo asignó.
- Créditos como hecho histórico inmutable, independiente de la fluctuación del ranking en vivo.

**Non-Goals:**
- No se define en este change qué se puede canjear con los créditos.
- No se implementa moderación automática por palabras clave o imágenes (ej. IA de detección de contenido); la salvaguarda de este change es humana (reporte + revisión).
- No se define mensajería privada entre alumnos; el foro es siempre de curso completo, no de a dos.

## Decisions

### Avatar predefinido como salvaguarda de diseño, no de proceso
Elegir avatares de un catálogo cerrado elimina por completo el riesgo de contenido inapropiado en esa pieza específica del perfil, sin depender de que alguien lo revise a tiempo. Es la misma lógica de "seguro por diseño" que ya se aplicó en otras partes del sistema (por ejemplo, roles con permisos explícitos en lugar de acceso abierto por defecto).

### Supervisión pasiva permanente además del reporte
Docentes del curso, preceptores, Orientación y Dirección pueden ver el contenido del foro en cualquier momento, no solo cuando hay un reporte. Esto da una segunda capa de resguardo (alguien puede notar un problema antes de que se reporte) sin convertir el foro en un espacio de aprobación previa, que la dirección descartó por ser más lento para los estudiantes.

### Eliminación de contenido desacoplada de sanción disciplinaria
Eliminar una publicación o foto reportada es una acción de `alumnos/foro-curso` / `alumnos/perfil`; generar una sanción por ese contenido es una acción aparte en `convivencia/sanciones`, a discreción de quien modera. No se fusionan porque no toda eliminación amerita una sanción formal (por ejemplo, contenido simplemente fuera de lugar vs. contenido que amerita un proceso disciplinario).

### Puntaje con techo por desafío, sin fórmula automática de conversión
El docente asigna el puntaje de cada resolución dentro de un máximo fijado al crear el desafío, en lugar de que el sistema calcule el puntaje automáticamente (por ejemplo, por corrección de una respuesta de opción múltiple). Esto mantiene el modelo simple y flexible para cualquier tipo de consigna (no todos los desafíos son de corrección automática), a costa de depender del criterio del docente para la asignación.

### Créditos como registro histórico separado del ranking en vivo
El ranking se recalcula continuamente, pero otorgar créditos es una acción discreta ("cierre de período") disparada por personal autorizado, no algo que ocurra automáticamente cada vez que alguien entra al top 10. Esto evita que una persona reciba créditos repetidamente solo por fluctuar dentro y fuera del top 10 en cuestión de minutos, y deja en manos de la escuela decidir la cadencia de los cierres (ver Open Questions).

## Risks / Trade-offs

- [Riesgo] La moderación reactiva permite que contenido inapropiado sea visible hasta que alguien lo reporte o el personal de supervisión lo note → Mitigación: aceptado explícitamente por la dirección (se descartó aprobación previa); la supervisión pasiva permanente reduce la ventana de exposición.
- [Riesgo] Depender del criterio del docente para el puntaje de un desafío introduce subjetividad entre distintos docentes → Mitigación: aceptable para el alcance actual; el máximo por desafío acota el impacto de esa subjetividad.
- [Riesgo] Un ranking público de "toda la escuela" podría exponer a alumnos con puntaje bajo a comparación negativa entre pares → Mitigación: fuera del alcance técnico de este change; es una decisión pedagógica de la escuela, no de diseño del sistema.

## Open Questions

- Con qué cadencia se cierran los períodos de la tabla de posiciones (trimestral, anual, u otra) — no bloquea este change, que modela el cierre como una acción manual disparada por personal autorizado, sin fijar una periodicidad automática.
- Si las familias deben poder ver la tabla de posiciones (no se pidió explícitamente) — no bloquea este change, que la definió visible para alumnos y personal; se puede sumar como un ajuste de acceso si se pide.
- Qué se puede canjear con los créditos — explícitamente fuera de alcance, a definir en un change futuro.
