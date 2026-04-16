import { Server } from "socket.io";
import { addUser, removeUser, getUsersList } from "../services/userService.js";
import { saveMessage } from "../services/messageService.js";

export function initSocket(server) {
  const io = new Server(server, {
    cors: { origin: "*" }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join", (user) => {
      addUser(socket.id, user);

      io.emit("user_joined", user.nickname);
      io.emit("users_list", getUsersList());
    });

    socket.on("send_message", async (data) => {
      try {
        await saveMessage(data);

        io.emit("receive_message", {
          message: data.message,
          user: data.user,
          socketId: socket.id,
        });
      } catch (e) {
        console.error("Error guardando mensaje:", e);

        socket.emit("message_error", {
          message: "No se pudo enviar el mensaje."
        });
      }
    });
    socket.on("typing", (user) => {
      socket.broadcast.emit("user_typing", user);
    });

    socket.on("stop_typing", ({ user }) => {
      socket.broadcast.emit("user_stop_typing", { user });
    });

    socket.on("disconnect", () => {
      const username = removeUser(socket.id);

      if (username) {
        io.emit("user_left", username);
      }

      io.emit("users_list", getUsersList());
      console.log("User disconnected:", socket.id);
    });
  });
}
