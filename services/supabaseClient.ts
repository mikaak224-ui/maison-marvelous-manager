
import { createClient } from 'https://esm.sh/@supabase/supabase-js@^2.48.1';

// Connection established using the provided credentials
// Public API key is used for client-side access. 
// Secret key is not included here for security reasons.
const supabaseUrl = 'https://yfaajfmaqtojgfjvqmxk.supabase.co';
const supabaseAnonKey = 'sb_publishable_hjOQYfi0K-gs7OWQm0uXKA_eq7c2HUj';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
