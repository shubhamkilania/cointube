import { createClient }
from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl =
"https://mpjtrrothusmeyukmdyk.supabase.co";

const supabaseKey =
"YOUR_FULL_PUBLISHABLE_KEY";

export const supabase =
createClient(
  supabaseUrl,
  supabaseKey
);
