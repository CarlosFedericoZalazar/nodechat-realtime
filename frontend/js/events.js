import { socket} from "./socket.js";
import {getUser, delUser, getRoom } from "./state.js";
import {resetUI, showChat, showError } from "./ui.js";
import {initUserSession} from "./user.js"

const btnMessage = document.getElementById("btnMessage");
const btnExit = document.getElementById("btnExit");
const inputMessage = document.getElementById("messageInput");
const inputName = document.getElementById("inputNik");
const btnNik = document.getElementById("btnNik");

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

  inputName.addEventListener("keypress", (e) => {
    if (e.key === "Enter") btnNik.click();
  });


  btnNik.addEventListener("click", () => {
    const nickname = inputName.value.trim();
    console.log(`Click en Btn NikName -> ${nickname}`);
    if (!nickname) return;

    if (!socket.connected) {
      socket.connect();
      console.log(`conexion al socket`);
    }
    
    socket.emit("check_nickname", nickname, (response) => {
      console.log(`- Emitimos el ${nickname} y respuesta ${response.exists}` )
      if (response.exists) {
        showError("Ese nickname ya está en uso");
        return;
      }
      
      const user = {
        id: crypto.randomUUID(),
        nickname
      };
      
      initUserSession(user);
      showChat();
    });
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

  btnExit.addEventListener("click", () => {
    delUser();
    resetUI();
    socket.disconnect();
  });
}
