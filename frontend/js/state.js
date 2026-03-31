let user = null;

export const setUser = (newUser) => {
  user = newUser;
};

export const getUser = () => user;

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