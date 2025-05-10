const errorMessages: { [key: string]: string } = {
  bad_request:
    "Esta ingresando datos incorrectos. Por favor, revise la información y vuelva a intentarlo. Revise los enlaces de LinkedIn.",
  sender_profile:
    "No se pudo obtener el perfil del remitente. Por favor, revise el enlace de LinkedIn del remitente.",
  receiver_profile:
    "No se pudo obtener el perfil del destinatario. Por favor, revise el enlace de LinkedIn del destinatario.",
  sender_posts:
    "No se pudo obtener datos del perfil del remitente. Vuelva a intentarlo.",
  receiver_posts:
    "No se pudo obtener datos del perfil del destinatario. Vuelva a intentarlo.",
  sender_comments:
    "No se pudo obtener datos del perfil del remitente. Vuelva a intentarlo.",
  receiver_reactions:
    "No se pudo obtener datos del perfil del destinatario. Vuelva a intentarlo.",
  messages_template:
    "Parece que la herramienta tiene problemas con su configuración. Por favor, contacte a soporte.",
  ai_response:
    "Parece que la Inteligencia Artificial no está disponible en este momento. Por favor, vuelva a intentarlo más tarde.",
  unexpected_error:
    "Parece que la herramienta tiene problemas técnicos. Por favor, vuelva a intentarlo más tarde.",
  missing_app_configuration:
    "Lo sentimos, la app no está configurada correctamente. Por favor, contacte a soporte.",
};

export function getErrorMessage(errorName: string | null): string {
  if (!errorName) {
    return errorMessages["unexpected_error"];
  }

  return errorMessages[errorName] || errorMessages["unexpected_error"];
}
