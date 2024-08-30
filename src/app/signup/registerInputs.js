export const inputs = [
  {
    id: 1,
    name: "username",
    label: "Nombre de usuario",
    type: "text",
    errorMessage:
      "¡El nombre de usuario debe tener entre 3 y 16 caracteres y no debe incluir ningún carácter especial!",
    pattern: "^[A-Za-z0-9]{3,16}$",
    required: true,
  },
  {
    id: 2,
    name: "email",
    label: "Email",
    type: "email",
    errorMessage: "¡Debe ser una dirección de correo electrónico válida!",
    pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
    required: true,
  },
  {
    id: 3,
    name: "password",
    label: "Contraseña",
    type: "password",
    errorMessage:
      "¡La contraseña debe tener entre 8 y 20 caracteres e incluir al menos 1 letra minúscula, otra mayúscula, 1 número y 1 carácter especial!",
    pattern: "^(?=.*[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,20}$",
    required: true,
  },
]

export const inputToken =
{
  id: 1,
  name: "code",
  type: "text",
  placeholder: "Código de autenticación",
  required: true,
};