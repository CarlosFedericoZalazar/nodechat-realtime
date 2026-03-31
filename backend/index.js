import express from "express";
import cors from "cors";
import { createServer } from "http";
import { initSocket } from "./config/socket.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static("../frontend"));

const server = createServer(app);

// 👉 inicializar sockets
initSocket(server);

server.listen(3000, () => {
  console.log("Server running");
});