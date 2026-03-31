import express from "express";
import cors from "cors";
import { createServer } from "http";
import { initSocket } from "./config/socket.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static("../frontend")); // solo en desarrollo

const server = createServer(app);

// 👉 inicializar sockets
initSocket(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});