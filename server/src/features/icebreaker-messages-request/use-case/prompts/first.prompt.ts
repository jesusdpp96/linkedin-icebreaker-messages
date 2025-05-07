export function firstPrompt(
  senderFirstName: string,
  senderLastName: string,
  senderHeadline: string,
  receiverFirstName: string,
  receiverLastName: string,
  receiverHeadline: string,
  problem: string,
  solution: string,
): string {
  return `
      Necesito que generes 3 mensajes tipo "icebreaker" personalizados para enviar a un perfil de LinkedIn.

      CONTEXTO:
      - Soy ${senderFirstName} ${senderLastName} (${senderHeadline})
      - Quiero contactar a ${receiverFirstName} ${receiverLastName} (${receiverHeadline})
      - El problema que resuelvo: ${problem}
      - La solución que ofrezco: ${solution}

      INSTRUCCIONES:
      1. Analiza toda la información proporcionada sobre ambos perfiles, sus publicaciones, comentarios y reacciones.
      2. Identifica puntos en común, intereses compartidos o temas relevantes.
      3. Encuentra conexiones significativas entre mi perfil/solución y las necesidades potenciales del destinatario.
      4. Genera 3 opciones diferentes de mensajes iniciales ("icebreakers") para abrir una conversación natural.
      5. Cada mensaje debe adaptarse al estilo de escritura que se observa en mis publicaciones y comentarios.
      6. Usa información específica y relevante del perfil del destinatario para personalizar cada mensaje.
      7. Sigue la estructura definida por los templates proporcionados, sin mencionar explícitamente que estás usando templates.

      FORMATO DE RESPUESTA:
      Devuelve exactamente 3 mensajes en formato JSON, donde cada mensaje siga la estructura del interface IcebreakerMessage:

      [
        {
          "message": "El mensaje completo y personalizado",
          "templateTitle": "Título del template usado como inspiración",
          "templateCategory": "Categoría del template",
          "instruction": "Instrucciones que me recomiendas seguir antes de enviar el mensaje (si es necesario dar un like o hacer un comentario en una publicación del destinatario, etc.)",
          "sourcePosts": ["URLs de los posts que fueron usados como referencia"]
        },
        {...},
        {...}
      ]

      Asegúrate de que cada mensaje:
      - Sea breve y directo (máximo 300 caracteres)
      - Suene natural y humano (debe tener mi estilo de escritura)
      - Invite a una respuesta
      - Esté personalizado para el destinatario específico
      - Incluya detalles relevantes encontrados en la información proporcionada
      - Tenga un tono profesional pero amigable
      `
}
