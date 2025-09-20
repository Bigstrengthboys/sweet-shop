import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X, ShoppingBag, User, LogOut, ChevronDown } from 'lucide-react';

interface NavbarProps {
  isAuthenticated?: boolean;
  user?: { name: string; isAdmin: boolean };
  onLogout?: () => void;
  onCategorySelect?: (category: string) => void;
}

export default function Navbar({ 
  isAuthenticated = false, 
  user = { name: 'John Doe', isAdmin: false },
  onLogout = () => console.log('Logout clicked'),
  onCategorySelect = () => {}
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const categories = [
    { 
      name: 'Ladoos', 
      value: 'ladoos', 
      image: '/images/Moti chur ladoo.jpeg',
      description: 'Traditional round sweets'
    },
    { 
      name: 'Kaju Katli', 
      value: 'premium', 
      image: '/images/kaju katli.jpeg',
      description: 'Premium cashew sweets'
    },
    { 
      name: 'Gulab Jamun', 
      value: 'traditional', 
      image: '/images/Gulab Jamun.jpeg',
      description: 'Classic milk-based sweets'
    },
    { 
      name: 'Jalebi', 
      value: 'crispy', 
      image: '/images/jalebi.jpeg',
      description: 'Crispy spiral sweets'
    },
    { 
      name: 'Rasmalai', 
      value: 'milk-based', 
      image: '/images/Rasmalai.jpeg',
      description: 'Creamy milk desserts'
    },
    { 
      name: 'Rasgulla', 
      value: 'spongy', 
      image: '/images/Rasgulla.jpeg',
      description: 'Spongy cottage cheese balls'
    }
  ];

  const handleCategoryClick = (category: string) => {
    onCategorySelect(category);
    navigate('/dashboard');
    setIsCategoryOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg border-b border-sweet-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-sweet-primary to-sweet-secondary p-2 rounded-lg group-hover:scale-105 transition-transform duration-200">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-sweet-primary to-sweet-secondary bg-clip-text text-transparent">
              Sweet Shop
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors duration-200 hover:text-sweet-primary ${
                isActive('/') ? 'text-sweet-primary' : 'text-gray-700'
              }`}
            >
              Home
            </Link>
            
            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex items-center space-x-1 font-medium text-gray-700 hover:text-sweet-primary transition-colors duration-200"
              >
                <span>Categories</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isCategoryOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-sweet-accent/20 py-2 z-50">
                  <div className="grid grid-cols-2 gap-2 p-2">
                    {categories.map((category) => (
                      <button
                        key={category.value}
                        onClick={() => handleCategoryClick(category.value)}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-sweet-accent/20 transition-colors duration-200 text-left"
                      >
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-12 h-12 rounded-lg object-cover border border-sweet-accent/30"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{category.name}</p>
                          <p className="text-xs text-gray-500">{category.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className={`font-medium transition-colors duration-200 hover:text-sweet-primary ${
                    isActive('/dashboard') ? 'text-sweet-primary' : 'text-gray-700'
                  }`}
                >
                  Dashboard
                </Link>
                {user.isAdmin && (
                  <Link
                    to="/admin/add-sweet"
                    className={`font-medium transition-colors duration-200 hover:text-sweet-primary ${
                      isActive('/admin/add-sweet') ? 'text-sweet-primary' : 'text-gray-700'
                    }`}
                  >
                    Admin
                  </Link>
                )}
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-sweet-primary" />
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                </div>
                <Button
                  onClick={onLogout}
                  variant="outline"
                  size="sm"
                  className="border-sweet-primary text-sweet-primary hover:bg-sweet-primary hover:text-white"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="outline" className="border-sweet-primary text-sweet-primary hover:bg-sweet-primary hover:text-white">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-sweet-primary hover:bg-sweet-primary/90 text-white">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-sweet-primary"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-sweet-accent/20 fade-in">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className={`font-medium py-2 px-3 rounded-lg transition-colors duration-200 ${
                  isActive('/') ? 'bg-sweet-accent text-sweet-primary' : 'text-gray-700 hover:bg-sweet-accent/50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              
              {/* Mobile Categories */}
              <div className="px-3">
                <p className="font-medium text-gray-700 mb-2">Categories</p>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => handleCategoryClick(category.value)}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-sweet-accent/20 transition-colors duration-200 text-left"
                    >
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-8 h-8 rounded object-cover border border-sweet-accent/30"
                      />
                      <span className="text-sm font-medium text-gray-700">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className={`font-medium py-2 px-3 rounded-lg transition-colors duration-200 ${
                      isActive('/dashboard') ? 'bg-sweet-accent text-sweet-primary' : 'text-gray-700 hover:bg-sweet-accent/50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  {user.isAdmin && (
                    <Link
                      to="/admin/add-sweet"
                      className={`font-medium py-2 px-3 rounded-lg transition-colors duration-200 ${
                        isActive('/admin/add-sweet') ? 'bg-sweet-accent text-sweet-primary' : 'text-gray-700 hover:bg-sweet-accent/50'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <div className="flex items-center space-x-2 py-2 px-3">
                    <User className="h-4 w-4 text-sweet-primary" />
                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  </div>
                  <Button
                    onClick={() => {
                      onLogout();
                      setIsMenuOpen(false);
                    }}
                    variant="outline"
                    className="border-sweet-primary text-sweet-primary hover:bg-sweet-primary hover:text-white mx-3"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </Button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 px-3">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full border-sweet-primary text-sweet-primary hover:bg-sweet-primary hover:text-white">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-sweet-primary hover:bg-sweet-primary/90 text-white">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Overlay for dropdown */}
      {isCategoryOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsCategoryOpen(false)}
        />
      )}
    </nav>
  );
}