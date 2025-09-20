-- Insert demo users with hashed passwords
INSERT INTO users (id, name, email, password_hash, is_admin, created_at) VALUES 
(
  gen_random_uuid(),
  'Demo User',
  'user@demo.com',
  'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f',
  false,
  now()
) ON CONFLICT (email) DO NOTHING;

INSERT INTO users (id, name, email, password_hash, is_admin, created_at) VALUES 
(
  gen_random_uuid(),
  'Admin User',
  'admin@demo.com',
  '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9',
  true,
  now()
) ON CONFLICT (email) DO NOTHING;