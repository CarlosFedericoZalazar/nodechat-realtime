import { socket } from "./socket.js";

let currentRoom = localStorage.getItem("room") || "General";

const textRoom = document.getElementById("title-room");

export const setRoom = (room) => {
  currentRoom = room;
  localStorage.setItem("room", room);
};

export const updateRoom = (room) => {
  if (textRoom) {
    textRoom.textContent = `ROOM: ${room}`;
  }
};

export const changeRoom = (roomName) => {
  setRoom(roomName);
  updateRoom(roomName);
  
  if (typeof socket !== "undefined") {
    socket.emit("join_room", roomName);
  }
};