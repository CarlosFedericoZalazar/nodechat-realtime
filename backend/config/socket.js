import { Server } from "socket.io";
import { addUser, removeUser, getUsersList } from "../services/userService.js";
import { saveMessage, getMessages } from "../services/messageService.js";

const rooms = ["General", "Dev", "Random"];
let currentRoom = null;

export function initSocket(server) {
  const io = new Server(server, {
    cors: { origin: "*" }
  });
  console.log("init socket");

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join", (user) => {
      addUser(socket.id, user);

      const defaultRoom = "Dev";

      socket.join(defaultRoom);
      currentRoom = defaultRoom;

      socket.emit("room_list", rooms);

      io.emit("user_joined", user.nickname);
      io.emit("users_list", getUsersList());
    }); 
    
    socket.on("join", (user) => {
      addUser(socket.id, user);

      const defaultRoom = "General";

      socket.join(defaultRoom);
      currentRoom = defaultRoom;

      socket.emit("room_list", rooms);

      io.emit("user_joined", user.nickname);
      io.emit("users_list", getUsersList());
    });

    socket.on("join_chat", async () => {
      console.log("JOIN CHAT recibido");
      const messages = await getMessages();

      socket.emit("chat_history", messages);
    });

    socket.on("join_room", async (roomName) => {
      if (currentRoom) {
        socket.leave(currentRoom);
      }
      socket.join(roomName);
      currentRoom = roomName;
      const messages = await getMessages(roomName);

      socket.emit("chat_history", messages);
    });

    socket.on("send_message", async (data) => {
      try {
        const { room, message, user } = data;

        if (!room) return;

        await saveMessage({ room, message, user });
        console.log(`${room}`);
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

    socket.on("typing", ({ user, room }) => {
      socket.to(room).emit("user_typing", user);
    });

    socket.on("stop_typing", ({ user, room }) => {
      socket.to(room).emit("user_stop_typing", { user });
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
