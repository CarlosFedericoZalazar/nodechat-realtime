
export const validateUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
}

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
//validaciones no menos de 6 caracteres y maximo 72, al menos una letra y un número
export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,72}$/;
  return passwordRegex.test(password);
}