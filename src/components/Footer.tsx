
import { Mail, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white/5 backdrop-blur-sm border-t border-white/20 py-8 px-4 font-poppins">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">QuizIQ</h3>
            <p className="text-gray-300 text-sm">
              The ultimate quiz platform for schools and students. Create engaging assessments with ease.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-semibold text-white mb-2">About</h4>
            <div className="space-y-1">
              <p className="text-gray-300 text-sm">Modern Quiz Platform</p>
              <p className="text-gray-300 text-sm">Built for Education</p>
              <p className="text-gray-300 text-sm">Student-Friendly Design</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-md font-semibold text-white mb-2">Contact Us</h4>
            <div className="space-y-3">
              <a 
                href="mailto:anjaliagarwal230705@gmail.com" 
                className="flex items-center justify-center md:justify-start gap-3 text-gray-300 hover:text-white transition-colors duration-200 group"
              >
                <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-200">
                  <Mail className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">anjaliagarwal230705@gmail.com</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/anjali230705/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-start gap-3 text-gray-300 hover:text-white transition-colors duration-200 group"
              >
                <div className="p-2 rounded-full bg-blue-600/20 group-hover:bg-blue-600/30 transition-colors duration-200">
                  <Linkedin className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">LinkedIn Profile</span>
              </a>
              <a 
                href="https://github.com/anjali-codes2305" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-start gap-3 text-gray-300 hover:text-white transition-colors duration-200 group"
              >
                <div className="p-2 rounded-full bg-gray-700/30 group-hover:bg-gray-700/50 transition-colors duration-200">
                  <Github className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">GitHub Profile</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-6 text-center">
          <p className="text-gray-300 text-sm">
            © 2024 QuizIQ. Developed by Anjali Agarwal
          </p>
          <p className="text-gray-400 text-xs mt-2">
            Thank you for using QuizIQ! 🎓
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
