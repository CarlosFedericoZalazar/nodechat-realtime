const users = {};

export function addUser(socketId, user) {
  users[socketId] = user;
}

export function removeUser(socketId) {
  const user = users[socketId];
  delete users[socketId];
  return user;
}

export function getUsersList() {
  return Object.values(users);
}