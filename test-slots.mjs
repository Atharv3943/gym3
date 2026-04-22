import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://xqibevfwcwyikgqarbmb.supabase.co', 'sb_publishable_0F528bYakBzQ0aGQ7EcAXQ_5FFAlndT')

async function fetchSlots() {
  const { data, error } = await supabase.from('slots').select('*')
  if (error) {
    console.error('Error:', error)
  } else {
    console.log('Slots in DB:', data)
  }
}
fetchSlots()
