const errorMessages: { [key: string]: string } = {
  bad_request:
    "Esta ingresando datos incorrectos. Por favor, revise la información y vuelva a intentarlo. Revise los enlaces de LinkedIn.",
  domain: "No se pudo procesar la solicitud. Intenténtelo de nuevo más tarde.",
  linkedin_issue:
    "No se pudo obtener los datos de LinkedIn. Por favor, revise los enlaces proporcionados.",
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
