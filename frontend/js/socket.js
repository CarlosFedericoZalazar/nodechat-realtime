import { agregarMensaje, agregarMensajeSistema, renderUsers, mostrarMensajeTyping, eliminarMensajeTyping  } from "./ui.js";

export const socket = io("https://nodechat-realtime-server.onrender.com", {
  autoConnect: false
});

export function initSocket() {
  socket.on("receive_message", (data) => {
    agregarMensaje(data.message, data.user.nickname, data.socketId, socket.id);
  });


  socket.on("user_joined", (user) => {
    agregarMensajeSistema(`${user} se unió al chat`);
  });

  socket.on("user_left", (user) => {
    agregarMensajeSistema(`${user.nickname} se desconectó`);
  });

  socket.on("user_typing", (user) => {
    mostrarMensajeTyping(`${user.nickname} esta escribiendo...`);
  });

  socket.on("user_stop_typing", (user) => {
    eliminarMensajeTyping(`${user.nickname} a dejado de escribir`);
  });


  socket.on("users_list", (users) => {
    renderUsers(users);
  });
}