import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X, ShoppingBag, User, LogOut } from 'lucide-react';

interface NavbarProps {
  isAuthenticated?: boolean;
  user?: { name: string; isAdmin: boolean };
  onLogout?: () => void;
}

export default function Navbar({ 
  isAuthenticated = false, 
  user = { name: 'John Doe', isAdmin: false },
  onLogout = () => console.log('Logout clicked')
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

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
            <Link
              to="/shop"
              className={`font-medium transition-colors duration-200 hover:text-sweet-primary ${
                isActive('/shop') ? 'text-sweet-primary' : 'text-gray-700'
              }`}
            >
              Shop
            </Link>
            
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
                    to="/inventory"
                    className={`font-medium transition-colors duration-200 hover:text-sweet-primary ${
                      isActive('/inventory') ? 'text-sweet-primary' : 'text-gray-700'
                    }`}
                  >
                    Inventory
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
              <Link
                to="/shop"
                className={`font-medium py-2 px-3 rounded-lg transition-colors duration-200 ${
                  isActive('/shop') ? 'bg-sweet-accent text-sweet-primary' : 'text-gray-700 hover:bg-sweet-accent/50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              
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
                      to="/inventory"
                      className={`font-medium py-2 px-3 rounded-lg transition-colors duration-200 ${
                        isActive('/inventory') ? 'bg-sweet-accent text-sweet-primary' : 'text-gray-700 hover:bg-sweet-accent/50'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Inventory
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
    </nav>
  );
}