
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Brain, Users, Trophy, BookOpen, Zap, Target, Award, TrendingUp, Clock, Shield, Sparkles } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 font-poppins">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 animate-pulse"></div>
        <div className="max-w-7xl mx-auto text-center animate-fade-in relative z-10">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <Sparkles className="h-5 w-5 text-yellow-400" />
              <span className="text-white font-medium">Smart Learning Platform</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              QuizIQ
            </span>
          </h1>
          
          {/* Intro Text */}
          <div className="max-w-4xl mx-auto mb-8">
            <p className="text-2xl text-cyan-200 mb-3 font-medium">
              The ultimate quiz platform designed for schools and students
            </p>
            <p className="text-lg text-gray-200 leading-relaxed">
              Create engaging weekly assessments with timer features, track student progress, and celebrate achievements with beautiful certificates. Perfect for modern educational institutions.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <Button asChild size="lg" className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0 shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-110 text-lg px-8 py-6">
              <Link to="/student-access">
                <Brain className="mr-2 h-6 w-6" />
                Start Quiz Now
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white transition-all duration-300 hover:scale-110 text-lg px-8 py-6 bg-white/10 backdrop-blur-sm">
              <Link to="/auth">
                <Target className="mr-2 h-6 w-6" />
                Login as Student
              </Link>
            </Button>
          </div>

          {/* Quick Demo Link */}
          <div className="mt-6">
            <p className="text-sm text-gray-300 mb-2">Want to see it in action?</p>
            <Button asChild variant="ghost" className="text-cyan-300 hover:text-cyan-200 underline underline-offset-4">
              <Link to="/demo-quiz">
                Try Sample Quiz (No Login Required)
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Schools Choose QuizIQ?
            </h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Experience the future of educational assessments with our cutting-edge features
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover-scale animate-fade-in bg-white/10 backdrop-blur-sm border-purple-500/30 hover:border-cyan-400/50 transition-all duration-300">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Clock className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">
                Smart Timer System
              </h3>
              <p className="text-gray-200 leading-relaxed">
                Customizable time limits per question with auto-skip functionality. Keep students engaged and focused during assessments.
              </p>
            </Card>

            <Card className="p-8 text-center hover-scale animate-fade-in bg-white/10 backdrop-blur-sm border-purple-500/30 hover:border-cyan-400/50 transition-all duration-300">
              <div className="bg-gradient-to-br from-green-500 to-teal-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <TrendingUp className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">
                Real-time Analytics
              </h3>
              <p className="text-gray-200 leading-relaxed">
                Track performance with detailed analytics, progress charts, and comprehensive reporting features for better insights.
              </p>
            </Card>

            <Card className="p-8 text-center hover-scale animate-fade-in bg-white/10 backdrop-blur-sm border-purple-500/30 hover:border-cyan-400/50 transition-all duration-300">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">
                School Branding
              </h3>
              <p className="text-gray-200 leading-relaxed">
                Customize with your school's logo and colors. Create a branded experience that reflects your institution's identity.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* School Branding Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
            <div className="mb-8">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to Create Your School's Quiz Portal?
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
                Transform your educational assessments with a fully customized quiz platform featuring your school's logo, colors, and branding. Perfect for weekly subject tests and student engagement.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="bg-cyan-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="h-8 w-8 text-cyan-300" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Custom Branding</h4>
                <p className="text-sm text-gray-300">Add your school logo and colors</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Users className="h-8 w-8 text-purple-300" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Student Management</h4>
                <p className="text-sm text-gray-300">Easy student enrollment and tracking</p>
              </div>
              <div className="text-center">
                <div className="bg-green-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Trophy className="h-8 w-8 text-green-300" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Digital Certificates</h4>
                <p className="text-sm text-gray-300">Reward achievements automatically</p>
              </div>
            </div>

            <Button asChild size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 hover:scale-105 text-lg px-10 py-6 text-white font-semibold shadow-xl">
              <Link to="/auth">
                <Zap className="mr-2 h-6 w-6" />
                Get Started - Create School Portal
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              How QuizIQ Works
            </h2>
            <p className="text-xl text-gray-200">
              Simple steps to transform your educational experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                1
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Sign Up</h3>
              <p className="text-gray-200">Create your account as a teacher or student</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-cyan-500 to-teal-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                2
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Create/Join</h3>
              <p className="text-gray-200">Teachers create quizzes, students join with codes</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-teal-500 to-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                3
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Take Quiz</h3>
              <p className="text-gray-200">Engage with timed questions and real-time feedback</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-500 to-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                4
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Get Results</h3>
              <p className="text-gray-200">View detailed results and earn certificates</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Revolutionize Learning?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Join thousands of educators and students already using QuizIQ to enhance their learning experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 transition-all duration-200 hover:scale-105 text-lg px-8 py-6">
              <Link to="/auth">
                <Zap className="mr-2 h-6 w-6" />
                Get Started Free
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-purple-900 transition-all duration-200 hover:scale-105 text-lg px-8 py-6">
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
