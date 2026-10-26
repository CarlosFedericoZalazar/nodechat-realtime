
let user = null;
let currentRoom = localStorage.getItem("room") || "General";

const textRoom = document.getElementById("title-room");

export const setRoom = (room) => {
  currentRoom = room;
  localStorage.setItem("room", room);
};

export const updateRoom = (room) => {
  textRoom.textContent = `ROOM: ${room}`;
};

export const changeRoom = (roomName) => {
  setRoom(roomName);
  updateRoom(roomName);
  clearChat();
  socket.emit("join_room", roomName);
};