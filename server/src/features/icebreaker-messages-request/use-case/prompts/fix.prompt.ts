export function fixPrompt() {
  return `
  La respuesta anterior no está en el formato JSON esperado. Por favor, reformatea tu respuesta 
  para proporcionar exactamente 3 mensajes icebreaker en formato JSON array siguiendo esta estructura:
  
  [
    {
      "message": "El mensaje completo y personalizado",
      "templateTitle": "Título del template usado como inspiración",
      "templateCategory": "Categoría del template",
      "instruction": "Instrucciones del template",
      "sourcePosts": ["URLs de los posts que fueron usados como referencia"]
    },
    {...},
    {...}
  ]
  
  Asegúrate de que el JSON sea válido y pueda ser parseado correctamente.
  `
}
