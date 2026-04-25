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

let currentRoom = localStorage.getItem("room") || "General";

export const initUserSession = (user) => {
  setUser(user);
  saveUser(user);

  socket.emit("join", user);

  socket.emit("join_room", currentRoom);

  socket.off("chat_history");
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
      socket.emit("typing", {
        user: getUser(),
        room: currentRoom
      });
      isTyping = true;
    }

    clearTimeout(typingTimeout);

    typingTimeout = setTimeout(() => {
      socket.emit("stop_typing", {
        user: getUser(),
        room: currentRoom
      });
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

  socket.emit("check_nickname", nickname, (response) => {

    if (response.exists) {
      alert("Ese nickname ya está en uso");
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
      room: currentRoom,
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

export function changeRoom(roomName) {
  currentRoom = roomName;
  localStorage.setItem("room", roomName);
  clearChat();
  socket.emit("join_room", roomName);
}