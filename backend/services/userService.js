const users = {};

export function addUser(socketId, user) {
  users[socketId] = user;
}

export function removeUser(socketId) {
  const user = users[socketId];
  delete users[socketId];
  console.log(`En remover el user vale ${user.nickname}`)
  return user;
}

export function getUsersList() {
  return Object.values(users);
}