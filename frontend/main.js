import { initEvents, initUserSession } from "./js/events.js";
import { loadUser } from "./js/state.js";
import {showChat} from "./js/ui.js";
import { initSocket, socket } from "./js/socket.js";

initSocket();
socket.connect();

initEvents();

// 🔥 AUTO LOGIN
const savedUser = loadUser();

if (savedUser) {
  initUserSession(savedUser);
  showChat();
}