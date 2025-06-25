
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Brain, Users, Shield, Zap, Target, TrendingUp, Award, BookOpen } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center animate-fade-in">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <Brain className="h-5 w-5 text-cyan-400" />
              <span className="text-white font-medium">About QuizIQ</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Empowering Education Through{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Intelligence
            </span>
          </h1>
          
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            QuizIQ is revolutionizing the way educators create, share, and analyze quizzes. 
            Our platform combines cutting-edge technology with intuitive design to make learning more engaging and effective.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-lg text-gray-200 mb-6 leading-relaxed">
                We believe that every student deserves access to engaging, personalized learning experiences. 
                QuizIQ empowers educators to create meaningful assessments that not only test knowledge 
                but also inspire curiosity and foster deeper understanding.
              </p>
              <p className="text-lg text-gray-200 leading-relaxed">
                Our platform bridges the gap between traditional testing methods and modern educational needs, 
                providing tools that adapt to different learning styles and preferences.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 bg-white/10 backdrop-blur-sm border-purple-500/30 hover:border-cyan-400/50 transition-all duration-300">
                <Target className="h-8 w-8 text-cyan-400 mb-3" />
                <h3 className="font-semibold text-white mb-2">Focused Learning</h3>
                <p className="text-sm text-gray-200">Targeted assessments that identify knowledge gaps</p>
              </Card>
              
              <Card className="p-6 bg-white/10 backdrop-blur-sm border-purple-500/30 hover:border-cyan-400/50 transition-all duration-300">
                <Zap className="h-8 w-8 text-yellow-400 mb-3" />
                <h3 className="font-semibold text-white mb-2">Instant Feedback</h3>
                <p className="text-sm text-gray-200">Real-time results and performance insights</p>
              </Card>
              
              <Card className="p-6 bg-white/10 backdrop-blur-sm border-purple-500/30 hover:border-cyan-400/50 transition-all duration-300">
                <Shield className="h-8 w-8 text-green-400 mb-3" />
                <h3 className="font-semibold text-white mb-2">Secure Platform</h3>
                <p className="text-sm text-gray-200">Protected data and privacy-first design</p>
              </Card>
              
              <Card className="p-6 bg-white/10 backdrop-blur-sm border-purple-500/30 hover:border-cyan-400/50 transition-all duration-300">
                <Users className="h-8 w-8 text-purple-400 mb-3" />
                <h3 className="font-semibold text-white mb-2">Collaborative</h3>
                <p className="text-sm text-gray-200">Connect educators and students globally</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Deep Dive */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Powerful Features for Modern Education
            </h2>
            <p className="text-xl text-gray-200">
              Everything you need to create, manage, and analyze educational assessments
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 bg-white/10 backdrop-blur-sm border-purple-500/30 hover:border-cyan-400/50 transition-all duration-300 hover-scale">
              <BookOpen className="h-12 w-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Smart Quiz Builder</h3>
              <p className="text-gray-200 mb-4">
                Create professional quizzes with our intuitive builder. Add multiple choice questions, 
                set time limits, and customize difficulty levels.
              </p>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Drag-and-drop question builder</li>
                <li>• Multiple question types</li>
                <li>• Bulk import options</li>
                <li>• Question randomization</li>
              </ul>
            </Card>

            <Card className="p-8 bg-white/10 backdrop-blur-sm border-purple-500/30 hover:border-cyan-400/50 transition-all duration-300 hover-scale">
              <TrendingUp className="h-12 w-12 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Advanced Analytics</h3>
              <p className="text-gray-200 mb-4">
                Gain deep insights into student performance with comprehensive analytics and reporting tools.
              </p>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Real-time performance tracking</li>
                <li>• Detailed progress reports</li>
                <li>• Comparative analysis</li>
                <li>• Export capabilities</li>
              </ul>
            </Card>

            <Card className="p-8 bg-white/10 backdrop-blur-sm border-purple-500/30 hover:border-cyan-400/50 transition-all duration-300 hover-scale">
              <Award className="h-12 w-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Digital Certificates</h3>
              <p className="text-gray-200 mb-4">
                Motivate students with beautiful, customizable certificates that recognize their achievements.
              </p>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Custom certificate designs</li>
                <li>• School branding integration</li>
                <li>• Automatic generation</li>
                <li>• Digital verification</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Detailed */}
      <section className="py-20 px-4 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              How QuizIQ Transforms Learning
            </h2>
            <p className="text-xl text-gray-200">
              A streamlined process designed for educators and students
            </p>
          </div>
          
          <div className="space-y-12">
            {/* Step 1 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-purple-500 to-cyan-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                    1
                  </div>
                  <h3 className="text-2xl font-bold text-white">Sign Up & Set Up</h3>
                </div>
                <p className="text-gray-200 text-lg leading-relaxed">
                  Teachers and students create accounts with role-specific features. 
                  Set up your profile, choose your subjects, and customize your learning environment.
                </p>
              </div>
              <div className="order-1 md:order-2">
                <Card className="p-8 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border-purple-500/30">
                  <Users className="h-16 w-16 text-cyan-400 mx-auto mb-4" />
                  <div className="text-center text-white">
                    <div className="text-sm opacity-75">Quick Setup</div>
                    <div className="text-2xl font-bold">2 Minutes</div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Card className="p-8 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border-cyan-500/30">
                  <BookOpen className="h-16 w-16 text-teal-400 mx-auto mb-4" />
                  <div className="text-center text-white">
                    <div className="text-sm opacity-75">Quiz Creation</div>
                    <div className="text-2xl font-bold">5 Minutes</div>
                  </div>
                </Card>
              </div>
              <div>
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-cyan-500 to-teal-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                    2
                  </div>
                  <h3 className="text-2xl font-bold text-white">Create & Share</h3>
                </div>
                <p className="text-gray-200 text-lg leading-relaxed">
                  Build engaging quizzes with our intuitive editor. Add questions, set time limits, 
                  and generate unique quiz codes for easy sharing with students.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-teal-500 to-green-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                    3
                  </div>
                  <h3 className="text-2xl font-bold text-white">Interactive Learning</h3>
                </div>
                <p className="text-gray-200 text-lg leading-relaxed">
                  Students join quizzes using codes or links, answer questions in a beautiful interface, 
                  and receive instant feedback on their performance.
                </p>
              </div>
              <div className="order-1 md:order-2">
                <Card className="p-8 bg-gradient-to-br from-teal-500/20 to-green-500/20 border-teal-500/30">
                  <Brain className="h-16 w-16 text-green-400 mx-auto mb-4" />
                  <div className="text-center text-white">
                    <div className="text-sm opacity-75">Engagement Rate</div>
                    <div className="text-2xl font-bold">95%</div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Step 4 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Card className="p-8 bg-gradient-to-br from-green-500/20 to-yellow-500/20 border-green-500/30">
                  <Award className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                  <div className="text-center text-white">
                    <div className="text-sm opacity-75">Success Rate</div>
                    <div className="text-2xl font-bold">92%</div>
                  </div>
                </Card>
              </div>
              <div>
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-green-500 to-yellow-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                    4
                  </div>
                  <h3 className="text-2xl font-bold text-white">Results & Recognition</h3>
                </div>
                <p className="text-gray-200 text-lg leading-relaxed">
                  View detailed analytics, track progress over time, and celebrate achievements 
                  with personalized certificates. Teachers get insights to improve their teaching methods.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Teaching?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Join the QuizIQ community and discover how intelligent assessments can enhance learning outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 transition-all duration-200 hover:scale-105 text-lg px-8 py-6">
              <Link to="/auth">
                Start Creating Quizzes
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-purple-900 transition-all duration-200 hover:scale-105 text-lg px-8 py-6">
              <Link to="/student-access">
                Take a Demo Quiz
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
