import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://127.0.0.1:54321';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy_key_for_local_testing';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy_service_key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// ONLY use this on the server (API routes)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
