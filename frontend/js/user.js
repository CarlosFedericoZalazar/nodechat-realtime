import {updateRoom, clearChat, agregarMensaje} from "./ui.js"
import { setUser, saveUser } from "./state.js";

export const initUserSession = (user) => {
  setUser(user);
  saveUser(user);

  updateRoom(getRoom());
  socket.emit("join", user);
  socket.emit("join_room", getRoom());

  socket.off("chat_history");
  socket.on("chat_history", (messages) => {
    clearChat();
    console.log("estoy en el chat history!");
    messages.forEach(msg => {
      agregarMensaje(
        msg.content,
        msg.nickname,
        msg.user_id,
        getUser().id
      );
    });
  });
};