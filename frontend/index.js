const socket = io();

const btnMessage = document.getElementById("btnMessage");
const inputMessage = document.getElementById("messageInput");
const inputName = document.getElementById("inputNik");
const chat = document.getElementById("chat");
const containerNik = document.getElementById("container-nik");
const btnNik = document.getElementById("btnNik");
const title = document.getElementById("title");

let user = "user";

btnNik.addEventListener("click", ()=>{
  //HACEMOS ALGO
  containerNik.style.display = "none";
  title.textContent =  `${title.textContent} (${inputName.value})`;
  user = inputName.value;
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
  agregarMensaje(data.message, data.user);
});

// función para renderizar mensajes
function agregarMensaje(mensaje, name) {
  const p = document.createElement("p");
  p.textContent = `${name} dice: ${mensaje}`;
  chat.appendChild(p);

  // auto scroll
  chat.scrollTop = chat.scrollHeight;
}