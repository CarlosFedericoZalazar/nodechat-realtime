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
  usersList.innerHTML = "";

  users.forEach((u) => {
    const li = document.createElement("li");
    li.textContent = u;
    usersList.appendChild(li);
  });
}