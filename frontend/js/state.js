let user = null;
let currentRoom = localStorage.getItem("room") || "General";

export const setUser = (newUser) => {
  user = newUser;
};

export const setRoom = (room) => {
  currentRoom = room;
  localStorage.setItem("room", room);
};

export const getUser = () => user;
export const getRoom = () => currentRoom;

// 🔥 NUEVO: persistencia
export const saveUser = (user) => {
  localStorage.setItem("chatUser", JSON.stringify(user));
};

export const loadUser = () => {
  const stored = localStorage.getItem("chatUser");
  return stored ? JSON.parse(stored) : null;
};

  export const delUser = () => {
    localStorage.removeItem("chatUser");
    user = null;
  };