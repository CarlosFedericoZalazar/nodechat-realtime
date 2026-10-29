import { Server } from "socket.io";
import { addUser, removeUser, getUsersList, getUser } from "../services/userService.js";
import { saveMessage, getMessages } from "../services/messageService.js";

const rooms = ["General", "Dev", "Random"];

export function initSocket(server) {

  const io = new Server(server, {
  cors: {
    origin: [
      "https://nodechat-realtime-client.vercel.app", // Tu cliente en Vercel
      "http://localhost:3000"
    ],
    methods: ["GET", "POST"],
    credentials: true
  }
});

  console.log("init socket");

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    let currentRoom = null;

    // revisamos si existe nik
    socket.on("check_nickname", (nickname, callback) => {
      const exists = nicknameExists(nickname);

      callback({ exists });
    });

    socket.on("join", (user) => {
      if (nicknameExists(user.nickname)) {
        socket.emit("nickname_error", "Nombre en uso");
        return;
      }

      addUser(socket.id, user);

      socket.emit("room_list", rooms);
      console.log(`Console desde "join, emit room_list ${rooms}`);
      io.emit("users_list", getUsersList());
    });

    // manejo de rooms
    socket.on("join_room", async (roomName) => {
      if (currentRoom === roomName) return;
      console.log("ESTOY EN JOIN_ROOM");

      const user = getUser(socket.id);

      console.log("SOCKET ID:", socket.id);
      console.log("USER FOUND:", user.nickname);


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
      console.log(`mensaje ${data.message}`);
      console.log(`room recibido en mensaje ${data.room}`)
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
      console.log(`El usuario con socket id ${socket.id} se ha desconectado`);
      const username = removeUser(socket.id);

      if (username) {
        console.log(`El usuario ${username.nickname} se desconectó`);
      }

      if (username && currentRoom) {
        socket.to(currentRoom).emit("user_left", {
          nickname: username.nickname,
          room: currentRoom,
        });
      }

      io.emit("users_list", getUsersList());

      console.log("User disconnected:", socket.id);
    });
  });
}

function nicknameExists(nickname) {
  return getUsersList().some(
    (user) => user.nickname.toLowerCase() === nickname.toLowerCase()
  );
}
