import { socket} from "./socket.js";
import {getUser, getRoom } from "./state.js";
import { supabase } from "../supabase/supabaseClient.js";

const btnMessage = document.getElementById("btnMessage");
const btnExit = document.getElementById("btnExit");
const inputMessage = document.getElementById("messageInput");

// Declaramos las referencias una sola vez y de forma limpia
const btnToggleSidebar = document.getElementById('btnToggleSidebar');
const usersContainer = document.getElementById('usersContainer');

export function initEvents() {
  let typingTimeout;
  let isTyping = false;

  inputMessage.addEventListener("keypress", (e) => {
    if (e.key === "Enter") btnMessage.click();
  });

  // Lógica del botón toggle para el sidebar en celular
  if (btnToggleSidebar && usersContainer) {
    btnToggleSidebar.addEventListener('click', () => {
      usersContainer.classList.toggle('active');
    });
  }

  inputMessage.addEventListener("input", () => {
    if (!isTyping) {
      socket.emit("typing", {
        user: getUser(),
        room: getRoom()
      });
      isTyping = true;
      console.log(`estoy en event input ${getUser()} y ${getRoom()}`);
    }

    clearTimeout(typingTimeout);

    typingTimeout = setTimeout(() => {
      socket.emit("stop_typing", {
        user: getUser(),
        room: getRoom()
      });
      isTyping = false;
    }, 250);
  });

  btnMessage.addEventListener("click", () => {
    const mensaje = inputMessage.value;

    if (!mensaje) return;

    socket.emit("send_message", {
      room: getRoom(),
      message: mensaje,
      user: getUser(),
    });

    inputMessage.value = "";
  });

  btnExit.addEventListener("click", async () => {
  socket.disconnect();

  const { error } = await supabase.auth.signOut({ scope: 'local' });

  if (error) {
    console.error("Error during logout:", error);
    return;
  }

  window.location.href = '/login/login.html';
  });
}
