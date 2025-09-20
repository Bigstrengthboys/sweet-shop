CREATE TABLE IF NOT EXISTS public.users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  address TEXT,
  password_hash TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.sweets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  sweet_id UUID REFERENCES public.sweets(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO public.sweets (name, category, price, quantity, description, image_url) VALUES
('Gulab Jamun', 'traditional', 120.00, 25, 'Soft, spongy balls made from milk solids, fried and soaked in sugar syrup.', '/images/Gulab Jamun.jpeg'),
('Kaju Katli', 'premium', 450.00, 15, 'Diamond-shaped cashew fudge, a premium sweet made from cashews and sugar.', '/images/kaju katli.jpeg'),
('Rasmalai', 'milk-based', 180.00, 20, 'Soft cottage cheese dumplings in sweetened, thickened milk flavored with cardamom.', '/images/Rasmalai.jpeg'),
('Jalebi', 'crispy', 90.00, 30, 'Crispy, spiral-shaped sweet soaked in sugar syrup, popular across India.', '/images/jalebi.jpeg'),
('Rasgulla', 'spongy', 100.00, 20, 'Spongy white balls made from cottage cheese and soaked in light sugar syrup.', '/images/Rasgulla.jpeg'),
('Motichur Ladoo', 'ladoos', 150.00, 12, 'Round sweets made from tiny gram flour balls, bound with sugar syrup.', '/images/Moti chur ladoo.jpeg'),
('Kalakand', 'milk-based', 200.00, 8, 'Milk-based sweet with a grainy texture, garnished with pistachios.', '/images/Kalakand.jpeg'),
('Chhena Poda', 'baked', 250.00, 5, 'Baked cottage cheese dessert from Odisha, caramelized to perfection.', '/images/Chhena Poda.jpeg');

alter publication supabase_realtime add table users;
alter publication supabase_realtime add table sweets;
alter publication supabase_realtime add table purchases;