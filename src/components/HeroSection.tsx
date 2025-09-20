import { Button } from './ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-sweet-bg via-sweet-accent/30 to-sweet-bg min-h-[80vh] flex items-center overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-sweet-secondary/20 rounded-full animate-bounce-gentle"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-sweet-primary/20 rounded-full animate-pulse-soft"></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-sweet-accent/40 rounded-full animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-24 h-24 bg-sweet-secondary/15 rounded-full animate-pulse-soft" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left fade-in">
            <div className="flex items-center justify-center lg:justify-start mb-4">
              <Sparkles className="h-6 w-6 text-sweet-primary mr-2" />
              <span className="text-sweet-primary font-medium">Premium Quality Sweets</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Welcome to
              <span className="block bg-gradient-to-r from-sweet-primary to-sweet-secondary bg-clip-text text-transparent">
                Sweet Paradise
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Discover our handcrafted collection of premium chocolates, candies, and confections. 
              Each sweet treat is made with love and the finest ingredients to bring joy to your day.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/shop">
                <Button className="bg-sweet-primary hover:bg-sweet-primary/90 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="border-2 border-sweet-secondary text-sweet-secondary hover:bg-sweet-secondary hover:text-white px-8 py-4 text-lg rounded-xl transition-all duration-300"
              >
                View Collection
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-sweet-accent/30">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-sweet-primary">500+</div>
                <div className="text-sm text-gray-600">Sweet Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-sweet-primary">10K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-sweet-primary">5★</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative slide-up">
            <div className="relative">
              {/* Main hero image */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=80"
                  alt="Delicious sweets and candies"
                  className="w-full h-80 object-cover rounded-2xl"
                />
              </div>
              
              {/* Floating cards */}
              <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-lg p-4 transform -rotate-12 hover:rotate-0 transition-transform duration-300">
                <img
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=150&q=80"
                  alt="Chocolate"
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <p className="text-xs font-medium mt-2 text-center">Premium Chocolate</p>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-lg p-4 transform rotate-12 hover:rotate-0 transition-transform duration-300">
                <img
                  src="https://images.unsplash.com/photo-1582716401301-b2407dc7563d?w=150&q=80"
                  alt="Gummy bears"
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <p className="text-xs font-medium mt-2 text-center">Gummy Treats</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}