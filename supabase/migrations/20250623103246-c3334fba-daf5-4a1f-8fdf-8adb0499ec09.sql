
-- First, let's drop existing policies that might be causing conflicts
DROP POLICY IF EXISTS "Quiz creators can manage their quizzes" ON public.quizzes;
DROP POLICY IF EXISTS "Students can view active quizzes" ON public.quizzes;
DROP POLICY IF EXISTS "Quiz creators can manage questions" ON public.quiz_questions;
DROP POLICY IF EXISTS "Students can view questions for active quizzes" ON public.quiz_questions;
DROP POLICY IF EXISTS "Admins can view their schools" ON public.schools;
DROP POLICY IF EXISTS "Admins can create schools" ON public.schools;
DROP POLICY IF EXISTS "Admins can update their schools" ON public.schools;

-- Create a function to get current user's role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Update schools policies for admins/teachers only
CREATE POLICY "Teachers can view their schools" ON public.schools
  FOR SELECT USING (
    auth.email() = admin_email AND 
    public.get_current_user_role() = 'admin'
  );

CREATE POLICY "Teachers can create schools" ON public.schools
  FOR INSERT WITH CHECK (
    auth.email() = admin_email AND 
    public.get_current_user_role() = 'admin'
  );

CREATE POLICY "Teachers can update their schools" ON public.schools
  FOR UPDATE USING (
    auth.email() = admin_email AND 
    public.get_current_user_role() = 'admin'
  );

-- Update quizzes policies - only teachers can create, students can view active ones
CREATE POLICY "Teachers can manage their quizzes" ON public.quizzes
  FOR ALL USING (
    auth.uid() = created_by AND 
    public.get_current_user_role() = 'admin'
  );

CREATE POLICY "Students can view active quizzes" ON public.quizzes
  FOR SELECT USING (
    is_active = true AND 
    public.get_current_user_role() = 'student'
  );

-- Update quiz_questions policies
CREATE POLICY "Teachers can manage questions for their quizzes" ON public.quiz_questions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.quizzes 
      WHERE quizzes.id = quiz_questions.quiz_id 
      AND quizzes.created_by = auth.uid()
      AND public.get_current_user_role() = 'admin'
    )
  );

CREATE POLICY "Students can view questions for active quizzes" ON public.quiz_questions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.quizzes 
      WHERE quizzes.id = quiz_questions.quiz_id 
      AND quizzes.is_active = true
    ) AND public.get_current_user_role() = 'student'
  );

-- Ensure students can only create attempts, teachers can view attempts for their quizzes
DROP POLICY IF EXISTS "Students can view their own attempts" ON public.quiz_attempts;
DROP POLICY IF EXISTS "Students can create their own attempts" ON public.quiz_attempts;
DROP POLICY IF EXISTS "Quiz creators can view attempts for their quizzes" ON public.quiz_attempts;

CREATE POLICY "Students can create their own attempts" ON public.quiz_attempts
  FOR INSERT WITH CHECK (
    auth.uid() = student_id AND 
    public.get_current_user_role() = 'student'
  );

CREATE POLICY "Students can view their own attempts" ON public.quiz_attempts
  FOR SELECT USING (
    auth.uid() = student_id AND 
    public.get_current_user_role() = 'student'
  );

CREATE POLICY "Teachers can view attempts for their quizzes" ON public.quiz_attempts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.quizzes 
      WHERE quizzes.id = quiz_attempts.quiz_id 
      AND quizzes.created_by = auth.uid()
      AND public.get_current_user_role() = 'admin'
    )
  );
