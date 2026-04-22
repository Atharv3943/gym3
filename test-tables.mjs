import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://xqibevfwcwyikgqarbmb.supabase.co', 'sb_publishable_0F528bYakBzQ0aGQ7EcAXQ_5FFAlndT')

async function checkTables() {
  const tables = ['profiles', 'slots', 'bookings', 'classes', 'trainers', 'membership_plans'];
  for (const t of tables) {
      const { error } = await supabase.from(t).select('*').limit(1);
      console.log(`Table ${t}:`, error ? error.message : "Exists!");
  }
}
checkTables()
