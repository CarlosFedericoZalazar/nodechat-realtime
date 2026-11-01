import { validateUsername, validateEmail, validatePassword } from './valildates.js';
import { supabase } from '../supabase/supabaseClient.js';


const DOM = {
  form: document.getElementById('register-form'),
  usernameInput: document.getElementById('nick'),
  emailInput: document.getElementById('email'),
  passwordInput: document.getElementById('password'),
  errorMessage: document.getElementById('register-error'),
};

DOM.form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = DOM.usernameInput.value.trim();
  const password = DOM.passwordInput.value;
  const email = DOM.emailInput.value.trim();
  const errorMessage = DOM.errorMessage;
  errorMessage.textContent = '';

  if (!validateUsername(username)) {
    errorMessage.textContent = 'Invalid username';
    return;
  }

  if (!validateEmail(email)) {
    errorMessage.textContent = 'Invalid email';
    return;
  }

  if (!validatePassword(password)) {
    errorMessage.textContent = 'Invalid password';
    return;
  }

  try {
    const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
              data: { nick: username },
              emailRedirectTo: 'login.html',   // la URL de tu página de login
          },
        });
        if (error) {
          console.error('Error during registration:', error);
          errorMessage.textContent = 'Registration failed. Nick or email already exists.';
          return;   
        }
        window.location.href = 'login.html';
  }catch (error) {
    console.error('Error during registration:', error);
    errorMessage.textContent = 'Registration failed. Please try again.';   
  }
});
