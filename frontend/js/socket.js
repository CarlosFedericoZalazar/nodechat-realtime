import { agregarMensaje, agregarMensajeSistema, renderUsers } from "./ui.js";

export const socket = io();

export function initSocket() {
  socket.on("receive_message", (data) => {
    agregarMensaje(data.message, data.user, data.socketId, socket.id);
  });

  socket.on("user_joined", (user) => {
    agregarMensajeSistema(`${user} se unió al chat`);
  });

  socket.on("user_left", (user) => {
    agregarMensajeSistema(`${user} se desconectó`);
  });

  socket.on("users_list", (users) => {
    renderUsers(users);
  });
}