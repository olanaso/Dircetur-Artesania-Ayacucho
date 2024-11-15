const bcrypt = require('bcryptjs');

const generatePassword = ({
  length = 12,
  includeUpperCase = true,
  includeLowerCase = true,
  includeNumbers = true,
  includeSymbols = true
} = {}) => {
  // Definir los conjuntos de caracteres
  const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  // Crear el conjunto de caracteres basado en las opciones
  let chars = '';
  if (includeLowerCase) chars += lowerCaseChars;
  if (includeUpperCase) chars += upperCaseChars;
  if (includeNumbers) chars += numberChars;
  if (includeSymbols) chars += symbolChars;

  // Validar que al menos un conjunto de caracteres esté seleccionado
  if (chars.length === 0) {
    throw new Error('Debe seleccionar al menos un tipo de caracteres');
  }

  // Asegurar que la longitud sea válida
  if (length < 8) {
    throw new Error('La longitud mínima recomendada es 8 caracteres');
  }

  let password = '';

  // Asegurar que al menos un carácter de cada tipo seleccionado esté presente
  if (includeUpperCase) {
    password += upperCaseChars.charAt(Math.floor(Math.random() * upperCaseChars.length));
  }
  if (includeLowerCase) {
    password += lowerCaseChars.charAt(Math.floor(Math.random() * lowerCaseChars.length));
  }
  if (includeNumbers) {
    password += numberChars.charAt(Math.floor(Math.random() * numberChars.length));
  }
  if (includeSymbols) {
    password += symbolChars.charAt(Math.floor(Math.random() * symbolChars.length));
  }

  // Completar el resto de la contraseña
  for (let i = password.length; i < length; i++) {
    const randomChar = chars.charAt(Math.floor(Math.random() * chars.length));
    password += randomChar;
  }

  // Mezclar los caracteres de la contraseña
  return password.split('').sort(() => Math.random() - 0.5).join('');
}

function encriptartexto (texto) {
  let textoEncripted = bcrypt.hashSync(texto, 10);
  return textoEncripted
}

function comprateTextEncripted (textoPlano, textoEcriptado) {
  return bcrypt.compareSync(textoPlano, textoEcriptado);
}



module.exports = { generatePassword, encriptartexto, comprateTextEncripted };