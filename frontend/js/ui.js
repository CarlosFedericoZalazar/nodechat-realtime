import { changeRoom } from "./room.js";

const containerNick = document.getElementById("container-nik");
const sidebarUsers = document.getElementById("usersContainer");
const inputMessage = document.getElementById("input-area");
const divButtonsHeader = document.getElementById("buttonsHeader");
const chatHead = document.getElementById("chat-head");
const messageError = document.getElementById("nickError");
const textRoom = document.getElementById("title-room");
const inputNik = document.getElementById("inputNik");

const chat = document.getElementById("chat");
const usersList = document.getElementById("usersList");

export function agregarMensaje(mensaje, name, socketId, myId) {
  const p = document.createElement("p");
  const esMio = socketId === myId;

  p.classList.add(esMio ? "my-message" : "other-message");
  p.innerHTML = `
    <span class="name">${esMio ? "YO" : name}:</span>
    ${mensaje}
  `;

  chat.appendChild(p);
  chat.scrollTop = chat.scrollHeight;
}

export function agregarMensajeSistema(texto) {
  const p = document.createElement("p");
  p.textContent = texto;
  p.style.textAlign = "center";
  p.style.opacity = "0.5";
  p.style.fontStyle = "italic";

  chat.appendChild(p);
}

let typingElement = null;

export function mostrarMensajeTyping(texto) {
  if (!typingElement) {
    typingElement = document.createElement("p");
    typingElement.id = "typing";
    chat.appendChild(typingElement);
  }
  typingElement.textContent = texto;
}

export function eliminarMensajeTyping() {
  if (typingElement) {
    typingElement.remove();
    typingElement = null;
  }
}

export function renderUsers(users) {
  const list = document.getElementById("usersList");
  list.innerHTML = "";

  users.forEach(user => {
    const li = document.createElement("li");
    li.textContent = user.nickname;
    list.appendChild(li);
  });
}

export function renderRooms(rooms) {
  const list = document.getElementById("roomsList");
  list.innerHTML = "";

  rooms.forEach(room => {
    const li = document.createElement("li");
    li.textContent = room;

    li.addEventListener("click", () => {
      // 1. Limpiamos el chat localmente (sin necesidad de importar clearChat en room.js)
      clearChat();
      // 2. Cambiamos la sala usando la función importada de room.js
      changeRoom(room);
    });

    list.appendChild(li);
  });
}

export function showChat(){
  containerNick.classList.add("hidden");
  chat.classList.remove("hidden");
  sidebarUsers.classList.remove("hidden");
  inputMessage.classList.remove("hidden");
  divButtonsHeader.classList.remove("hidden");
  chatHead.classList.remove("centered");
  chatHead.classList.add("active");
  textRoom.classList.remove("hidden");
}

export function updateRoom(room){
  textRoom.textContent = `ROOM: ${room}`;
}

export function resetUI(){
  containerNick.classList.remove("hidden");
  chat.classList.add("hidden");
  sidebarUsers.classList.add("hidden");
  inputMessage.classList.add("hidden");
  divButtonsHeader.classList.add("hidden");
  chatHead.classList.remove("active");
  chatHead.classList.add("centered");
  textRoom.classList.add("hidden");
  inputNik.value = "";
}

export function showError(message){
  if (!messageError) return;
  messageError.textContent = message;
  messageError.classList.remove("hidden");
}

export function clearChat(){
  chat.innerHTML= "";
  eliminarMensajeTyping();
}