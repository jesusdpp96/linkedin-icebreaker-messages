export const TEMPLATES = [
  {
    id: 1,
    title: 'Pregunta sobre un post',
    instruction:
      'Ingresa a la actividad de la persona y busca un post que te interese. Escribe un mensaje comenzando por lo que te generó ese post y realiza una pregunta.',
    example:
      'Hola #nombre, acabo de leer tu post sobre #tema. También creo que {#énfasis en lo que la persona haya dicho y tu estés de acuerdo}... pero al leerlo me surgió una duda... {#pregunta concreta sobre algo del post}',
    category: 'Pregunta',
  },
  {
    id: 2,
    title: 'Mencionar que comentaste su post',
    instruction:
      'Ingresa a la actividad de la persona y busca un post que te interese. Comenta ese post y luego cuando inicies un mensaje, comienza diciendo que comentaste ese post.',
    example: 'Hola #nombre, soy el que te comentó el post sobre #tema...',
    category: 'Mención',
  },
  {
    id: 3,
    title: 'Mencionar que fuiste el primero en likear su post',
    instruction:
      'Ingresa a la actividad de la persona y busca un post que te interese y que aún no tenga likes. Dale like a ese post y luego di que fuiste el primero en darle like.',
    example: 'Hola #nombre, soy el que hizo el primer like en el post sobre #tema :)',
    category: 'Mención',
  },
  {
    id: 4,
    title: 'Preguntar sobre un curso',
    instruction:
      'Ingresa al perfil de la persona y fíjate si hizo algún curso que te interese. Comenzá comentando que viste que hizo ese curso y preguntá si lo recomienda.',
    example:
      'Hola #nombre, vi que hiciste {#nombre de curso} en {#nombre de instituto}, me da curiosidad saber qué te pareció y si lo recomiendas...',
    category: 'Pregunta',
  },
  {
    id: 5,
    title: 'Felicitar por nuevo rol',
    instruction:
      'Entrá al perfil de la persona y fijate si asumió un nuevo rol o cambió de trabajo recientemente. Enviá un mensaje felicitándola y conectando con tu propuesta.',
    example:
      'Hola #nombre, vi que empezaste en #nuevo_rol en #empresa, ¡felicitaciones! Seguro es un gran paso. Justo estoy trabajando en temas vinculados a #tema y pensé que podríamos conectar.',
    category: 'Felicitación',
  },
  {
    id: 6,
    title: 'Comentar sobre una charla o evento',
    instruction:
      'Buscá si la persona fue speaker, asistió o comentó sobre un evento. Escribí un mensaje mencionando eso y conectá desde ahí.',
    example:
      'Hola #nombre, vi que participaste en #evento. Me interesó mucho lo que comentaste sobre #tema. Estoy metido en algo similar y pensé que podríamos intercambiar ideas.',
    category: 'Mención',
  },
  {
    id: 7,
    title: 'Referencia a contacto en común',
    instruction:
      'Identificá si tienen un contacto en común que pueda ser relevante. Mencioná eso como punto de partida para iniciar la charla.',
    example:
      'Hola #nombre, veo que ambos conocemos a #nombre_común. Justo estábamos hablando de #tema y me pareció interesante contactarte.',
    category: 'Conexión',
  },
  {
    id: 8,
    title: 'Compartir artículo o recurso útil',
    instruction:
      'Si la persona está interesada en un tema que dominás, mandale un recurso (artículo, video, paper, etc.) que pueda aportarle valor.',
    example:
      'Hola #nombre, vi que te interesa #tema. Justo leí este artículo y pensé que podría interesarte también 👉 [link]. ¿Qué opinás del enfoque que plantea?',
    category: 'Aporte de valor',
  },
  {
    id: 9,
    title: 'Felicitar por logro o publicación destacada',
    instruction:
      'Buscá publicaciones donde comparta un logro, premio, colaboración o hitos personales/profesionales. Felicitá y sumá una propuesta liviana.',
    example:
      'Hola #nombre, felicitaciones por #logro. ¡Muy inspirador! Justo estoy trabajando en una línea parecida y pensé que podríamos conectar.',
    category: 'Felicitación',
  },
]
