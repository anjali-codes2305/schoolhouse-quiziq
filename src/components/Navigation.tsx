
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/components/AuthContext';
import { Brain, Moon, Sun, Menu, X, LogOut, User } from 'lucide-react';

interface NavigationProps {
  schoolName?: string;
  schoolLogo?: string;
}

const Navigation = ({ schoolName, schoolLogo }: NavigationProps) => {
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            {schoolLogo ? (
              <img src={schoolLogo} alt={schoolName} className="h-8 w-8 rounded-full" />
            ) : (
              <div className="bg-gradient-to-r from-cyan-500 to-purple-500 p-2 rounded-full group-hover:scale-110 transition-transform duration-300">
                <Brain className="h-6 w-6 text-white" />
              </div>
            )}
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {schoolName || 'QuizIQ'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link 
              to="/" 
              className={`text-white hover:text-cyan-400 transition-colors duration-200 font-medium text-sm lg:text-base ${
                isActive('/') ? 'text-cyan-400' : ''
              }`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`text-white hover:text-cyan-400 transition-colors duration-200 font-medium text-sm lg:text-base ${
                isActive('/about') ? 'text-cyan-400' : ''
              }`}
            >
              About
            </Link>
            <Link 
              to="/demo-quiz" 
              className={`text-white hover:text-cyan-400 transition-colors duration-200 font-medium text-sm lg:text-base ${
                isActive('/demo-quiz') ? 'text-cyan-400' : ''
              }`}
            >
              Demo
            </Link>
            {user ? (
              <>
                <Link 
                  to="/create-quiz" 
                  className={`text-white hover:text-cyan-400 transition-colors duration-200 font-medium text-sm lg:text-base ${
                    isActive('/create-quiz') ? 'text-cyan-400' : ''
                  }`}
                >
                  Create Quiz
                </Link>
                <Link 
                  to="/student-access" 
                  className={`text-white hover:text-cyan-400 transition-colors duration-200 font-medium text-sm lg:text-base ${
                    isActive('/student-access') ? 'text-cyan-400' : ''
                  }`}
                >
                  Take Quiz
                </Link>
                <div className="hidden lg:flex items-center space-x-2">
                  <User className="h-4 w-4 text-white" />
                  <span className="text-white text-sm max-w-32 truncate">{user.email}</span>
                </div>
                <Button
                  onClick={handleSignOut}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-red-400 hover:bg-red-500/10 text-sm"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  <span className="hidden lg:inline">Sign Out</span>
                </Button>
              </>
            ) : (
              <Link 
                to="/auth" 
                className={`text-white hover:text-cyan-400 transition-colors duration-200 font-medium text-sm lg:text-base ${
                  isActive('/auth') ? 'text-cyan-400' : ''
                }`}
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Theme Toggle and Mobile Menu */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="text-white hover:text-cyan-400 hover:bg-white/10"
            >
              {theme === 'light' ? <Moon className="h-4 w-4 md:h-5 md:w-5" /> : <Sun className="h-4 w-4 md:h-5 md:w-5" />}
            </Button>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white hover:text-cyan-400 hover:bg-white/10"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/10 backdrop-blur-sm rounded-lg mt-2 mb-4 p-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)}
                className={`text-white hover:text-cyan-400 transition-colors duration-200 font-medium ${
                  isActive('/') ? 'text-cyan-400' : ''
                }`}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                onClick={() => setIsMenuOpen(false)}
                className={`text-white hover:text-cyan-400 transition-colors duration-200 font-medium ${
                  isActive('/about') ? 'text-cyan-400' : ''
                }`}
              >
                About
              </Link>
              <Link 
                to="/demo-quiz" 
                onClick={() => setIsMenuOpen(false)}
                className={`text-white hover:text-cyan-400 transition-colors duration-200 font-medium ${
                  isActive('/demo-quiz') ? 'text-cyan-400' : ''
                }`}
              >
                Demo Quiz
              </Link>
              {user ? (
                <>
                  <Link 
                    to="/create-quiz" 
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-white hover:text-cyan-400 transition-colors duration-200 font-medium ${
                      isActive('/create-quiz') ? 'text-cyan-400' : ''
                    }`}
                  >
                    Create Quiz
                  </Link>
                  <Link 
                    to="/student-access" 
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-white hover:text-cyan-400 transition-colors duration-200 font-medium ${
                      isActive('/student-access') ? 'text-cyan-400' : ''
                    }`}
                  >
                    Take Quiz
                  </Link>
                  <div className="flex items-center space-x-2 text-white py-2 border-t border-white/20">
                    <User className="h-4 w-4" />
                    <span className="text-sm truncate">{user.email}</span>
                  </div>
                  <Button
                    onClick={handleSignOut}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:text-red-400 hover:bg-red-500/10 justify-start p-0"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Link 
                  to="/auth" 
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-white hover:text-cyan-400 transition-colors duration-200 font-medium ${
                    isActive('/auth') ? 'text-cyan-400' : ''
                  }`}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
