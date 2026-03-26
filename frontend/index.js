const socket = io();

const btnMessage = document.getElementById("btnMessage");
const inputMessage = document.getElementById("messageInput");
const inputName = document.getElementById("inputNik");
const chat = document.getElementById("chat");
const containerNik = document.getElementById("container-nik");
const btnNik = document.getElementById("btnNik");
const title = document.getElementById("title");

let user = "user";

inputMessage.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    btnMessage.click();
  }
});

btnNik.addEventListener("click", ()=>{
  //HACEMOS ALGO
  user = inputName.value;
  socket.emit("set_user", user);

  containerNik.style.display = "none";
  title.textContent =  `${title.textContent} (${inputName.value})`;

  btnNik.disabled = true;
});

// enviar mensaje
btnMessage.addEventListener("click", () => {
  const mensaje = inputMessage.value;

  if (!mensaje) return;

  socket.emit("send_message", {
    message: mensaje,
    user: user
  });

  inputMessage.value = "";
});

// recibir mensaje
socket.on("receive_message", (data) => {
  agregarMensaje(data.message, data.user, data.socketId);
});

// función para renderizar mensajes
function agregarMensaje(mensaje, name, socketId) {
  const p = document.createElement("p");

  const esMio = socketId === socket.id;

  p.classList.add(esMio ? "my-message" : "other-message");

  p.innerHTML = `
    <span class="name">${esMio ? "YO" : name}:</span>
    ${mensaje}
  `;

  chat.appendChild(p);
  chat.scrollTop = chat.scrollHeight;
}

socket.on("user_joined", (user) => {
  agregarMensajeSistema(`${user} se unió al chat`);
});

socket.on("user_left", (user) => {
  agregarMensajeSistema(`${user} se desconectó`);
});

const usersList = document.getElementById("usersList");

socket.on("users_list", (users) => {
  renderUsers(users);
});

function renderUsers(users) {
  usersList.innerHTML = "";

  users.forEach((u) => {
    const li = document.createElement("li");
    li.textContent = u;
    usersList.appendChild(li);
  });
}

function agregarMensajeSistema(texto) {
  const p = document.createElement("p");

  p.textContent = texto;
  p.style.textAlign = "center";
  p.style.opacity = "0.6";

  chat.appendChild(p);
}