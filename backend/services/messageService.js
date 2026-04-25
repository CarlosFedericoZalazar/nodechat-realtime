import supabase from "../db/supabaseClient.js";

export async function saveMessage({ room, message, user }) {
  try {
    const { error } = await supabase
      .from("messages")
      .insert({
        user_id: user.id,
        nickname: user.nickname,
        content: message,
        room: room,
      });

    if (error) throw error;

  } catch (e) {   
    console.error("Error saving message:", e);
    throw e;
  }
}

export async function getMessages(room) {
  try {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("room", room) // 🔥 filtro clave
      .order("created_at", { ascending: true })
      .limit(50);

    if (error) throw error;

    return data;

  } catch (e) {
    console.error(e);
    return [];
  }
}