
-- Enum for health conditions
CREATE TYPE public.health_condition AS ENUM (
  'Migraine', 'Lupus', 'Arthritis', 'Diabetes', 'Asthma',
  'Heart Disease', 'Depression', 'Anxiety', 'Other'
);

-- Enum for gender
CREATE TYPE public.gender_type AS ENUM (
  'female', 'male', 'non-binary', 'prefer-not'
);

-- Enum for persona
CREATE TYPE public.persona_type AS ENUM ('patient', 'caregiver');

-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  display_name TEXT,
  persona persona_type NOT NULL DEFAULT 'patient',
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Health submissions table
CREATE TABLE public.health_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  age INTEGER NOT NULL,
  gender gender_type,
  condition health_condition NOT NULL,
  symptoms TEXT NOT NULL,
  duration TEXT,
  medications TEXT,
  triggers TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Migraine-specific data table
CREATE TABLE public.migraine_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID REFERENCES public.health_submissions(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  frequency_per_month INTEGER,
  severity INTEGER CHECK (severity BETWEEN 1 AND 10),
  aura BOOLEAN DEFAULT false,
  trigger_type TEXT,
  treatment_effectiveness INTEGER CHECK (treatment_effectiveness BETWEEN 1 AND 10),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Lupus-specific data table
CREATE TABLE public.lupus_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID REFERENCES public.health_submissions(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  flare_frequency_per_month NUMERIC(3,1),
  organ_involvement TEXT,
  uv_trigger BOOLEAN DEFAULT false,
  quality_of_life_score INTEGER CHECK (quality_of_life_score BETWEEN 1 AND 100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.migraine_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lupus_data ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- Health submissions policies (users can read all for data exploration, but only insert/update/delete their own)
CREATE POLICY "Anyone authenticated can view submissions" ON public.health_submissions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can insert their own submissions" ON public.health_submissions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own submissions" ON public.health_submissions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own submissions" ON public.health_submissions FOR DELETE USING (auth.uid() = user_id);

-- Migraine data policies
CREATE POLICY "Anyone authenticated can view migraine data" ON public.migraine_data FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can insert their own migraine data" ON public.migraine_data FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own migraine data" ON public.migraine_data FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own migraine data" ON public.migraine_data FOR DELETE USING (auth.uid() = user_id);

-- Lupus data policies
CREATE POLICY "Anyone authenticated can view lupus data" ON public.lupus_data FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can insert their own lupus data" ON public.lupus_data FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own lupus data" ON public.lupus_data FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own lupus data" ON public.lupus_data FOR DELETE USING (auth.uid() = user_id);

-- Timestamp trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Trigger for profiles
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
