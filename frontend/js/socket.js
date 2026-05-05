import { agregarMensaje, agregarMensajeSistema, renderUsers, renderRooms, mostrarMensajeTyping, eliminarMensajeTyping, showError} from "./ui.js";
import { getUser } from "./state.js";

export const socket = io("https://nodechat-realtime-server.onrender.com", {
  autoConnect: false
});

// export const socket = io("http://localhost:3000", {
//   autoConnect: false
// });

export function initSocket() {

  socket.off(); // 🔥 limpia TODOS los listeners

  socket.on("nickname_error", message =>{
    showError(message);
  })

  socket.on("receive_message", (data) => {
    agregarMensaje(
      data.message,
      data.user.nickname,
      data.user.id,
      getUser().id
    );
  });

  socket.on("user_joined", (user) => {
    agregarMensajeSistema(`${user} se unió al chat`);
  });

  socket.on("user_left", (user) => {
    agregarMensajeSistema(`${user} se desconectó`);
  });

  socket.on("user_typing", (user) => {
    mostrarMensajeTyping(`${user.nickname} esta escribiendo...`);
  });

  socket.on("user_stop_typing", () => {
    eliminarMensajeTyping();
  });

  socket.on("users_list", (users) => {
    renderUsers(users);
  });

  socket.on("room_list", (rooms) => {
    renderRooms(rooms);
  });
}