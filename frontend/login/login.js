import {validateEmail, validatePassword } from './valildates.js';
import { supabase } from '../supabase/supabaseClient.js';

const DOM = {
    form: document.getElementById('login-form'),
    email: document.getElementById('email'),
    password: document.getElementById('password'),
    error: document.getElementById('login-error'),
};

DOM.form.addEventListener('submit', async (event) => {
    event.preventDefault();
    DOM.error.textContent = '';

    const email = DOM.email.value.trim();
    const password = DOM.password.value;

    if (!validateEmail(email)) {
        DOM.error.textContent = 'Invalid email';
        return;
    }

    if (!validatePassword(password)) {
        DOM.error.textContent = 'Invalid password';
        return;
    }
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            console.error('Error during login:', error);
            DOM.error.textContent = 'Login failed. Please try again.';
        }
        else{
            window.location.href = '/'
        }
    } catch (error) {
        console.error('Error during login:', error);
        DOM.error.textContent = 'Login failed. Please try again.';
    }
});