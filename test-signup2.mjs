import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://xqibevfwcwyikgqarbmb.supabase.co', 'sb_publishable_0F528bYakBzQ0aGQ7EcAXQ_5FFAlndT')

async function testSignup() {
  const email = 'testuser2_' + Date.now() + '@ritindia.edu'
  console.log('Testing signup with', email)
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: 'password123',
  })
  if (error) {
    console.error('Error:', error)
  } else {
    console.log('Success:', data)
  }
}
testSignup()
