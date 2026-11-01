import { initEvents } from "./js/events.js";
import { initUserSession } from "./js/user.js";
import { initSocket, socket } from "./js/socket.js";
import { supabase } from "./supabase/supabaseClient.js";

const { data: { session } } = await supabase.auth.getSession();

if (!session) {
  window.location.href = '/login/login.html';
} else {
  const user = {
    id: session.user.id,
    nickname: session.user.user_metadata.nick
  };

  initSocket();
  socket.connect();
  initEvents();

  initUserSession(user);
}