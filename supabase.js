import { createClient }
from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl =
"https://mpjtrrothusmeyukmdyk.supabase.co";

const supabaseKey = "sb_publishable_2km10..."

export const supabase =
createClient(
  supabaseUrl,
  supabaseKey
);
