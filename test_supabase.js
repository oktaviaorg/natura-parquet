const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://vwnggirylzhafyqpcxsf.supabase.co',
  'sb_secret_J1vmclgNAjWUGaLThguSMg_E1Quzm75'
);

async function test() {
  // Test if tables exist
  const { data, error } = await supabase.from('articles').select('*').limit(1);
  if (error) {
    console.log('Error:', error.code, '-', error.message);
    if (error.code === '42P01') {
      console.log('>>> Tables need to be created via SQL Editor');
    }
  } else {
    console.log('Tables exist! Data:', data);
  }
}

test();
