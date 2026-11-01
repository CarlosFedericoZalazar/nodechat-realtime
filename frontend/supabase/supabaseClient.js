import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = 'https://ldxxgqtwmwqawtevhixe.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_9IniAXxe9_NaLrQuFoaftA_Uo2BdmF5';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);