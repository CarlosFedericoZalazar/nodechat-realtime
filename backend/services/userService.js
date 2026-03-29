const users = {};

export function addUser(socketId, username) {
  users[socketId] = username;
}

export function removeUser(socketId) {
  const username = users[socketId];
  delete users[socketId];
  return username;
}

export function getUsersList() {
  return Object.values(users);
}