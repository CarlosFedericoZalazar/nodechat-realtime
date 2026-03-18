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

// conectar socket.io
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("send_message", (data) => {
    console.log("Mensaje recibido:", data);

    // reenviar a todos los clientes
    io.emit("receive_message", data);
  });
});

server.listen(3000, () => {
  console.log("Server running");
});