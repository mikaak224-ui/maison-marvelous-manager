
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yfaajfmaqtojgfjvqmxk.supabase.co';
const supabaseAnonKey = 'sb_publishable_hjOQYfi0K-gs7OWQm0uXKA_eq7c2HUj';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
