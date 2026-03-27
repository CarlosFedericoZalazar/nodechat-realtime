import { socket } from "./socket.js";
import { user, setUser } from "./state.js";

const btnMessage = document.getElementById("btnMessage");
const inputMessage = document.getElementById("messageInput");
const inputName = document.getElementById("inputNik");
const containerNik = document.getElementById("container-nik");
const btnNik = document.getElementById("btnNik");
const title = document.getElementById("title");

export function initEvents() {
  inputMessage.addEventListener("keypress", (e) => {
    if (e.key === "Enter") btnMessage.click();
  });

  inputName.addEventListener("keypress", (e) => {
    if (e.key === "Enter") btnNik.click();
  });

  btnNik.addEventListener("click", () => {
    const newUser = inputName.value;

    setUser(newUser);
    socket.emit("set_user", newUser);

    containerNik.style.display = "none";
    title.textContent += ` (${newUser})`;

    btnNik.disabled = true;
  });

  btnMessage.addEventListener("click", () => {
    const mensaje = inputMessage.value;

    if (!mensaje) return;

    socket.emit("send_message", {
      message: mensaje,
      user: user,
    });

    inputMessage.value = "";
  });
}