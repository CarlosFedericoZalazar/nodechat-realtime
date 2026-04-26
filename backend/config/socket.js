import { Server } from "socket.io";
import { addUser, removeUser, getUsersList } from "../services/userService.js";
import { saveMessage, getMessages } from "../services/messageService.js";

const rooms = ["General", "Dev", "Random"];

export function initSocket(server) {
  const io = new Server(server, {
    cors: { origin: "*" }
  });

  console.log("init socket");

  io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    let currentRoom = null;

    // revisamos si existe nik
    socket.on("check_nickname", (nickname, callback) => {
      const users = getUsersList();

      const exists = users.some(
        user => user.nickname.toLowerCase() === nickname.toLowerCase()
      );

      callback({ exists });
    });

    socket.on("join", (user) => {
      const exists = getUsersList().some(
        u => u.nickname.toLowerCase() === user.nickname.toLowerCase()
      );

      if (exists) {
        socket.emit("nickname_error", "Nombre en uso");
        return;
      }

      addUser(socket.id, user);

      socket.emit("room_list", rooms);

      socket.broadcast.emit("user_joined", user.nickname);

      io.emit("users_list", getUsersList());
    });

    // manejo de rooms
    socket.on("join_room", async (roomName) => {

      // evitamos re-join
      if (currentRoom === roomName) return;

      if (currentRoom) {
        socket.leave(currentRoom);
      }

      socket.join(roomName);
      currentRoom = roomName;

      const messages = await getMessages(roomName);

      socket.emit("chat_history", messages);
    });

    // ✅ mensajes
    socket.on("send_message", async (data) => {
      try {
        const { room, message, user } = data;

        if (!room) return;

        await saveMessage({ room, message, user });

        io.to(room).emit("receive_message", {
          message,
          user,
          userId: user.id
        });

      } catch (e) {
        console.error("Error guardando mensaje:", e);

        socket.emit("message_error", {
          message: "No se pudo enviar el mensaje."
        });
      }
    });

    // ✅ typing por room
    socket.on("typing", ({ user, room }) => {
      socket.to(room).emit("user_typing", user);
    });

    socket.on("stop_typing", ({ user, room }) => {
      socket.to(room).emit("user_stop_typing", { user });
    });

    // deconectamos
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