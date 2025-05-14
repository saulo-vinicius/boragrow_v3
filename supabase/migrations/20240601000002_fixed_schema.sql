-- Create profiles table to store user profile information
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT NOT NULL,
  name TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'free',
  subscription_start TIMESTAMP WITH TIME ZONE,
  subscription_end TIMESTAMP WITH TIME ZONE,
  is_admin BOOLEAN DEFAULT FALSE
);

-- Create plants table to store plant information
CREATE TABLE IF NOT EXISTS plants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  strain TEXT NOT NULL,
  stage TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  image_url TEXT
);

-- Create plant_metrics table to store plant metrics
CREATE TABLE IF NOT EXISTS plant_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  plant_id UUID NOT NULL REFERENCES plants(id) ON DELETE CASCADE,
  ph NUMERIC NOT NULL,
  ppm NUMERIC NOT NULL,
  temperature NUMERIC NOT NULL,
  humidity NUMERIC NOT NULL
);

-- Create recipes table to store nutrient recipes
CREATE TABLE IF NOT EXISTS recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  description TEXT,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  data JSONB NOT NULL
);

-- Create suggested_items table to store suggested products
CREATE TABLE IF NOT EXISTS suggested_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price TEXT NOT NULL,
  link TEXT NOT NULL,
  featured BOOLEAN DEFAULT FALSE
);

-- Set up Row Level Security (RLS)
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE plants ENABLE ROW LEVEL SECURITY;
ALTER TABLE plant_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE suggested_items ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles table
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create policies for plants table
DROP POLICY IF EXISTS "Users can view their own plants" ON plants;
CREATE POLICY "Users can view their own plants"
  ON plants FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own plants" ON plants;
CREATE POLICY "Users can insert their own plants"
  ON plants FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own plants" ON plants;
CREATE POLICY "Users can update their own plants"
  ON plants FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own plants" ON plants;
CREATE POLICY "Users can delete their own plants"
  ON plants FOR DELETE
  USING (auth.uid() = user_id);

-- Create policies for plant_metrics table
DROP POLICY IF EXISTS "Users can view metrics for their own plants" ON plant_metrics;
CREATE POLICY "Users can view metrics for their own plants"
  ON plant_metrics FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM plants
    WHERE plants.id = plant_metrics.plant_id
    AND plants.user_id = auth.uid()
  ));

DROP POLICY IF EXISTS "Users can insert metrics for their own plants" ON plant_metrics;
CREATE POLICY "Users can insert metrics for their own plants"
  ON plant_metrics FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM plants
    WHERE plants.id = plant_metrics.plant_id
    AND plants.user_id = auth.uid()
  ));

-- Create policies for recipes table
DROP POLICY IF EXISTS "Users can view their own recipes" ON recipes;
CREATE POLICY "Users can view their own recipes"
  ON recipes FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own recipes" ON recipes;
CREATE POLICY "Users can insert their own recipes"
  ON recipes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own recipes" ON recipes;
CREATE POLICY "Users can update their own recipes"
  ON recipes FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own recipes" ON recipes;
CREATE POLICY "Users can delete their own recipes"
  ON recipes FOR DELETE
  USING (auth.uid() = user_id);

-- Create policies for suggested_items table
DROP POLICY IF EXISTS "Anyone can view suggested items" ON suggested_items;
CREATE POLICY "Anyone can view suggested items"
  ON suggested_items FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Only admins can insert suggested items" ON suggested_items;
CREATE POLICY "Only admins can insert suggested items"
  ON suggested_items FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.is_admin = true
  ));

DROP POLICY IF EXISTS "Only admins can update suggested items" ON suggested_items;
CREATE POLICY "Only admins can update suggested items"
  ON suggested_items FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.is_admin = true
  ));

DROP POLICY IF EXISTS "Only admins can delete suggested items" ON suggested_items;
CREATE POLICY "Only admins can delete suggested items"
  ON suggested_items FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.is_admin = true
  ));

-- Create admin policies for all tables
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.is_admin = true
  ));

DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;
CREATE POLICY "Admins can update all profiles"
  ON profiles FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.is_admin = true
  ));

DROP POLICY IF EXISTS "Admins can view all plants" ON plants;
CREATE POLICY "Admins can view all plants"
  ON plants FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.is_admin = true
  ));

DROP POLICY IF EXISTS "Admins can view all plant metrics" ON plant_metrics;
CREATE POLICY "Admins can view all plant metrics"
  ON plant_metrics FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.is_admin = true
  ));

DROP POLICY IF EXISTS "Admins can view all recipes" ON recipes;
CREATE POLICY "Admins can view all recipes"
  ON recipes FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.is_admin = true
  ));

-- Enable realtime for all tables
alter publication supabase_realtime add table profiles;
alter publication supabase_realtime add table plants;
alter publication supabase_realtime add table plant_metrics;
alter publication supabase_realtime add table recipes;
alter publication supabase_realtime add table suggested_items;