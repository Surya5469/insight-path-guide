
-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

-- Create subjects table
CREATE TABLE public.subjects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create lessons table
CREATE TABLE public.lessons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject_id UUID REFERENCES public.subjects NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  duration INTEGER, -- in minutes
  difficulty TEXT CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_progress table
CREATE TABLE public.user_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  lesson_id UUID REFERENCES public.lessons NOT NULL,
  status TEXT CHECK (status IN ('not-started', 'in-progress', 'completed')) DEFAULT 'not-started',
  progress_percentage INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

-- Create quizzes table
CREATE TABLE public.quizzes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject_id UUID REFERENCES public.subjects NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  questions JSONB NOT NULL,
  total_questions INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create quiz_attempts table
CREATE TABLE public.quiz_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  quiz_id UUID REFERENCES public.quizzes NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  answers JSONB NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create peer_rooms table
CREATE TABLE public.peer_rooms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  subject_id UUID REFERENCES public.subjects,
  created_by UUID REFERENCES auth.users NOT NULL,
  max_participants INTEGER DEFAULT 10,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create room_participants table
CREATE TABLE public.room_participants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID REFERENCES public.peer_rooms NOT NULL,
  user_id UUID REFERENCES auth.users NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(room_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.peer_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_participants ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Subjects policies (public read)
CREATE POLICY "Anyone can view subjects" ON public.subjects FOR SELECT USING (true);

-- Lessons policies (public read)
CREATE POLICY "Anyone can view lessons" ON public.lessons FOR SELECT USING (true);

-- User progress policies
CREATE POLICY "Users can view their own progress" ON public.user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own progress" ON public.user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own progress" ON public.user_progress FOR UPDATE USING (auth.uid() = user_id);

-- Quizzes policies (public read)
CREATE POLICY "Anyone can view quizzes" ON public.quizzes FOR SELECT USING (true);

-- Quiz attempts policies
CREATE POLICY "Users can view their own quiz attempts" ON public.quiz_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own quiz attempts" ON public.quiz_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Peer rooms policies
CREATE POLICY "Anyone can view active peer rooms" ON public.peer_rooms FOR SELECT USING (is_active = true);
CREATE POLICY "Users can create peer rooms" ON public.peer_rooms FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Room creators can update their rooms" ON public.peer_rooms FOR UPDATE USING (auth.uid() = created_by);

-- Room participants policies
CREATE POLICY "Anyone can view room participants" ON public.room_participants FOR SELECT USING (true);
CREATE POLICY "Users can join rooms" ON public.room_participants FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can leave rooms" ON public.room_participants FOR DELETE USING (auth.uid() = user_id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample subjects
INSERT INTO public.subjects (name, description, icon, color) VALUES
('Mathematics', 'Algebra, Geometry, Calculus', 'Calculator', 'from-blue-500 to-blue-600'),
('Science', 'Physics, Chemistry, Biology', 'Atom', 'from-green-500 to-green-600'),
('History', 'World History, Ancient Civilizations', 'Globe', 'from-purple-500 to-purple-600'),
('Art', 'Drawing, Painting, Design', 'Palette', 'from-pink-500 to-pink-600'),
('Literature', 'Poetry, Novels, Essays', 'BookOpen', 'from-indigo-500 to-indigo-600'),
('Music', 'Theory, Composition, Practice', 'Music', 'from-orange-500 to-orange-600');

-- Insert sample lessons
INSERT INTO public.lessons (subject_id, title, content, duration, difficulty)
SELECT 
  s.id,
  lesson_data.title,
  lesson_data.content,
  lesson_data.duration,
  lesson_data.difficulty
FROM public.subjects s
CROSS JOIN (
  VALUES 
    ('Introduction to Algebra', 'Learn the basics of algebraic expressions and equations', 15, 'Beginner'),
    ('Linear Equations', 'Solve linear equations with one and two variables', 20, 'Beginner'),
    ('Quadratic Functions', 'Understand quadratic functions and their graphs', 25, 'Intermediate')
) AS lesson_data(title, content, duration, difficulty)
WHERE s.name = 'Mathematics'

UNION ALL

SELECT 
  s.id,
  lesson_data.title,
  lesson_data.content,
  lesson_data.duration,
  lesson_data.difficulty
FROM public.subjects s
CROSS JOIN (
  VALUES 
    ('Atomic Structure', 'Explore the structure of atoms and their components', 22, 'Beginner'),
    ('Chemical Bonding', 'Learn about ionic and covalent bonds', 18, 'Intermediate'),
    ('Newton''s Laws', 'Understand the three laws of motion', 30, 'Advanced')
) AS lesson_data(title, content, duration, difficulty)
WHERE s.name = 'Science';
