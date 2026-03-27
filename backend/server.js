import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static("../frontend"));

const server = createServer(app);

const users = {};

// conectar socket.io
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // 👉 cuando el usuario define su nombre
  socket.on("set_user", (username) => {
    users[socket.id] = username;

    io.emit("user_joined", username);

    io.emit("users_list", getUsersList());
  });

  // 👉 cuando manda mensaje
  socket.on("send_message", (data) => {
    console.log("Mensaje recibido:", data);

    io.emit("receive_message", {
      message: data.message,
      user: data.user,
      socketId: socket.id
    });
  });

  // 👉 cuando se desconecta (ACÁ VA ESTO)
  socket.on("disconnect", () => {
    const username = users[socket.id];

    if (username) {
      io.emit("user_left", username);
      delete users[socket.id];
    }

    console.log("User disconnected:", socket.id);
    io.emit("users_list", getUsersList());
  });

  function getUsersList() {
    return Object.values(users);
  }
});

server.listen(3000, () => {
  console.log("Server running");
});