import { socket } from "./socket.js";
import { getRoom, setRoom } from "./state.js";

let currentRoom = getRoom();

const textRoom = document.getElementById("title-room");

export const updateRoom = (room) => {
  if (textRoom) {
    textRoom.textContent = `ROOM: ${room}`;
  }
};

export const changeRoom = (roomName) => {
  console.log(`Console desde changeRoom ${roomName}`)
  setRoom(roomName);
  console.log(getRoom());
  updateRoom(roomName);
  
  if (typeof socket !== "undefined") {
    socket.emit("join_room", roomName);
  }
};