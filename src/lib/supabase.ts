import { createClient } from "@supabase/supabase-js";

// Supabase setup
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_API_KEY!;
export const client = createClient(supabaseUrl, supabaseKey);
