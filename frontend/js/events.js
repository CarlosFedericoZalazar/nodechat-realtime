import { socket, initSocket } from "./socket.js";
import { setUser, saveUser, getUser, delUser } from "./state.js";
import { resetUI, showChat, clearChat, agregarMensaje } from "./ui.js";

const btnMessage = document.getElementById("btnMessage");
const btnExit = document.getElementById("btnExit");
const btnListUsers = document.getElementById("btnUsers");
const inputMessage = document.getElementById("messageInput");
const inputName = document.getElementById("inputNik");
const btnNik = document.getElementById("btnNik");
const panel = document.getElementById("usersContainer");

export const initUserSession = (user) => {
  setUser(user);
  saveUser(user);

  initSocket();
  socket.connect();

  socket.emit("join", user);
  socket.emit("join_chat");

  socket.on("chat_history", (messages) => {
    clearChat();
    console.log("estoy en el chat history!");
    messages.forEach(msg => {
      agregarMensaje(
        msg.content,
        msg.nickname,
        msg.user_id,   
        getUser().id
      );
    });
  });
};


export function initEvents() {

  let typingTimeout;
  let isTyping = false;
  inputMessage.addEventListener("keypress", (e) => {
    if (e.key === "Enter") btnMessage.click();
  });

  inputMessage.addEventListener("input", () => {

    if (!isTyping) {
      socket.emit("typing", getUser());
      isTyping = true;
    }

    clearTimeout(typingTimeout);

    typingTimeout = setTimeout(() => {
      socket.emit("stop_typing", { user: getUser() });
      isTyping = false;
    }, 250);
  });

  inputName.addEventListener("keypress", (e) => {
    if (e.key === "Enter") btnNik.click();
  });

  btnListUsers.addEventListener("click", () => {
    panel.classList.toggle("active")
  })

  btnNik.addEventListener("click", () => {
    const nickname = inputName.value.trim();

    if (!nickname) return;

    const user = {
      id: crypto.randomUUID(),
      nickname
    };

    initUserSession(user);
    showChat();
  });

  btnMessage.addEventListener("click", () => {
    const mensaje = inputMessage.value;

    if (!mensaje) return;

    socket.emit("send_message", {
      message: mensaje,
      user: getUser(),
    });

    inputMessage.value = "";
  });

  btnExit.addEventListener("click", () => {
    delUser();
    resetUI();
  });
}