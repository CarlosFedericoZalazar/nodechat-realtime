import { initEvents, initUserSession } from "./events.js";
import { loadUser } from "./state.js";
import {showChat} from "./ui.js";

initEvents();

// 🔥 AUTO LOGIN
const savedUser = loadUser();

if (savedUser) {
  initUserSession(savedUser);
  showChat();
}