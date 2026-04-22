
const containerNick = document.getElementById("container-nik");
const sidebarUsers = document.getElementById("usersContainer");
const inputMessage = document.getElementById("input-area");
const btnExit = document.getElementById("btnExit");
const chatHead = document.getElementById("chat-head");

const chat = document.getElementById("chat");
const usersList = document.getElementById("usersList");

export function agregarMensaje(mensaje, name, socketId, myId) {
  const p = document.createElement("p");

  console.log("MY ID:", socketId);
  console.log("MSG ID:", myId);

  const esMio = socketId === myId;

  console.log(esMio);

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
    li.textContent = user.nickname; // ✅ clave
    list.appendChild(li);
  });
}

export function showChat(){
  containerNick.classList.add("hidden");
  chat.classList.remove("hidden");
  sidebarUsers.classList.remove("hidden");
  inputMessage.classList.remove("hidden");
  btnExit.classList.remove("hidden");
  chatHead.classList.remove("centered");
  chatHead.classList.add("active");
}


export function resetUI(){
  containerNick.classList.remove("hidden");
  chat.classList.add("hidden");
  sidebarUsers.classList.add("hidden");
  inputMessage.classList.add("hidden");
  btnExit.classList.add("hidden"); 
  chatHead.classList.add("centered");
}

export function clearChat(){
  chat.innerHTML= "";
}