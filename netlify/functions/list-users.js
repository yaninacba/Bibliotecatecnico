// netlify/functions/list-users.js

const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  const supabaseAdmin = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { data, error } = await supabaseAdmin.auth.admin.listUsers();

  if (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message })
    };
  }

  // Solo devolver email, id y fecha de creación (sin datos sensibles)
  const users = data.users.map(u => ({
    id: u.id,
    email: u.email,
    created_at: u.created_at
  }));

  return {
    statusCode: 200,
    body: JSON.stringify({ users })
  };
};