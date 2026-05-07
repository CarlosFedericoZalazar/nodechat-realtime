import { Server } from "socket.io";
import { addUser, removeUser, getUsersList, getUser } from "../services/userService.js";
import { saveMessage, getMessages } from "../services/messageService.js";

const rooms = ["General", "Dev", "Random"];

export function initSocket(server) {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  console.log("init socket");

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    let currentRoom = null;

    // revisamos si existe nik
    socket.on("check_nickname", (nickname, callback) => {
      const users = getUsersList();
      console.log(`Nickname a checkear ${nickname}`);
      const exists = users.some(
        (user) => user.nickname.toLowerCase() === nickname.toLowerCase(),
      );
      
      console.log(`Nick existente: ${exists}`);
      callback({ exists });
    });

    socket.on("join", (user) => {
      const exists = getUsersList().some(
        (u) => u.nickname.toLowerCase() === user.nickname.toLowerCase(),
      );

      if (exists) {
        socket.emit("nickname_error", "Nombre en uso");
        return;
      }
      console.log(`asi llega a Add ${user.nickname}`);
      addUser(socket.id, user);

      socket.emit("room_list", rooms);

      io.emit("users_list", getUsersList());
    });

    // manejo de rooms
    socket.on("join_room", async (roomName) => {
      if (currentRoom === roomName) return;
      console.log("ESTOY EN JOIN_ROOM");

      const user = getUser(socket.id);

      console.log("SOCKET ID:", socket.id);
      console.log("USER FOUND:", user);


      // 👉 avisar que se fue de la sala anterior
      if (currentRoom && user) {
        console.log("AHORA SI EMITE USER_LEFT!");
        socket.to(currentRoom).emit("user_left", {
          nickname: user.nickname,
          room: currentRoom
        });
        socket.leave(currentRoom);
      }
      
      socket.join(roomName);
      currentRoom = roomName;
      console.log(`Ahora current vale ${currentRoom}`);

      // 👉 avisar que se unió a la nueva
      if (user) {
        console.log("Estoy en user_joined");
        socket.to(roomName).emit("user_joined", {
          nickname: user.nickname,
          room: roomName
        });
      }

      const messages = await getMessages(roomName);
      socket.emit("chat_history", messages);
    });

    // ✅ mensajes
    socket.on("send_message", async (data) => {
      console.log(`asi llega a send_message ${data.user.nickname}`);
      try {
        const { room, message, user } = data;

        if (!room) return;

        // await saveMessage({ room, message, user });

        io.to(room).emit("receive_message", {
          message,
          user,
          userId: user.id,
        });
      } catch (e) {
        console.error("Error guardando mensaje:", e);

        socket.emit("message_error", {
          message: "No se pudo enviar el mensaje.",
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
      console.log(`El usuario ${username.nickname} se deconectó`)
      if (username && currentRoom) {
        socket.to(currentRoom).emit("user_left", {
          nickname: username.nickname,
          room: currentRoom
        });
      }

      io.emit("users_list", getUsersList());

      console.log("User disconnected:", socket.id);
    });
  });
}
