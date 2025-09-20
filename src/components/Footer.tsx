import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [showAnimation, setShowAnimation] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setShowAnimation(true);
      setEmail('');
      
      // Hide animation after 3 seconds
      setTimeout(() => {
        setShowAnimation(false);
      }, 3000);
    }
  };

  return (
    <footer className="bg-gradient-to-r from-sweet-primary to-sweet-secondary text-white relative overflow-hidden">
      {/* Subscription Animation */}
      {showAnimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 text-center shadow-2xl transform animate-bounce">
            <div className="w-16 h-16 bg-gradient-to-r from-sweet-primary to-sweet-secondary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Heart className="h-8 w-8 text-white animate-ping" />
            </div>
            <h3 className="text-2xl font-bold text-sweet-primary mb-2">Thank You!</h3>
            <p className="text-gray-600 text-lg">Thanks for subscribing to our sweet updates! 🍭</p>
            <div className="flex justify-center mt-4 space-x-2">
              <div className="w-3 h-3 bg-sweet-primary rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-sweet-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-sweet-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-white/5 rounded-full animate-bounce-gentle"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white/10 rounded-full animate-pulse-soft"></div>
        <div className="absolute bottom-10 right-1/3 w-18 h-18 bg-white/5 rounded-full animate-bounce-gentle"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Heart className="h-5 w-5 text-sweet-primary" />
              </div>
              <h3 className="text-xl font-bold">Sweet Shop</h3>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Bringing you the finest traditional and modern sweets, crafted with love and the highest quality ingredients.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Products</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 mt-1 text-white/80" />
                <div>
                  <p className="text-white/80">Town CRPF, BBSR</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-white/80" />
                <p className="text-white/80">+91-9556078099</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-white/80" />
                <p className="text-white/80">sggghhf130@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Stay Sweet!</h4>
            <p className="text-white/80 text-sm">
              Subscribe to get updates on new sweets and special offers.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 focus:border-white/50"
                required
              />
              <Button 
                type="submit"
                className="w-full bg-white text-sweet-primary hover:bg-white/90 font-medium transition-all duration-200 transform hover:scale-105"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/80 text-sm">
              © 2024 Sweet Shop. All rights reserved. Made with ❤️ for sweet lovers.
            </p>
            <div className="flex items-center space-x-6 text-sm text-white/80">
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}