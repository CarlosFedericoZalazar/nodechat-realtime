import supabase from "../db/supabaseClient.js";

export async function saveMessage(data) {
   try{
    const { error } =
      await supabase
        .from("messages")
        .insert({
          user_id: data.user.id,
          nickname : data.user.nickname,
          content : data.message,
        });
        if (error) throw error;
    }catch(e){   
        console.error("Error saving message:", e);
        throw e;
    }
}

export async function getMessages() {
  try {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(50);
      
    if (error) throw error

    return data
  } catch (e) {
    console.error(e)
    return []
  }
}