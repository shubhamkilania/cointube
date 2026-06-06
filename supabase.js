import { createClient }
from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl =
"https://mpjtrrothusmeyukmdyk.supabase.co";

const supabaseKey =
"sb_publishable_2km10GTUstXnzEEijhNN5A_5egc5wRO";

export const supabase =
createClient(
supabaseUrl,
supabaseKey,
{
auth: {
persistSession: true,
autoRefreshToken: true
}
}
);

