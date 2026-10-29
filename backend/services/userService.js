const users = {};

export function addUser(socketId, user) {
  users[socketId] = user;
}

export function removeUser(socketId) {
  const user = users[socketId];

  // Si el usuario no existe en el objeto, salimos de forma segura
  if (!user) {
    return null;
  }
  delete users[socketId];
  console.log(`En remover el user vale ${user.nickname}`)
  return user;
}

export function getUsersList() {
  return Object.values(users);
}

export function getUser(socketId) {
  return users[socketId];
}