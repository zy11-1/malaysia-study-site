import { createClient } from '@supabase/supabase-js'


const supabaseUrl = 'https://gawbhkyquegtbrhlmlhu.supabase.co' 

const supabaseKey = 'sb_publishable_p9L4F5a9cD1NDIDRTu6TVg_mLkIs6ro' 

export const supabase = createClient(supabaseUrl, supabaseKey)
