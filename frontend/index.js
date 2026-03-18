const socket = io();

const boton = document.getElementById("btnMessage");
const input = document.getElementById("messageInput");
const chat = document.getElementById("chat");

// enviar mensaje
boton.addEventListener("click", () => {
  const mensaje = input.value;

  if (!mensaje) return;

  socket.emit("send_message", {
    message: mensaje
  });

  input.value = "";
});

// recibir mensaje
socket.on("receive_message", (data) => {
  agregarMensaje(data.message);
});

// función para renderizar mensajes
function agregarMensaje(mensaje) {
  const p = document.createElement("p");
  p.textContent = mensaje;
  chat.appendChild(p);

  // auto scroll
  chat.scrollTop = chat.scrollHeight;
}