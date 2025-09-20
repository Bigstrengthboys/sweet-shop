import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-sweet-accent/20 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-sweet-primary to-sweet-secondary p-2 rounded-lg">
                <div className="h-6 w-6 bg-white rounded-sm"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-sweet-primary to-sweet-secondary bg-clip-text text-transparent">
                Sweet Shop
              </span>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Your favorite destination for the sweetest treats! We offer premium quality candies, 
              chocolates, and confections that bring joy to every moment.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="bg-sweet-accent p-2 rounded-lg hover:bg-sweet-secondary hover:text-white transition-colors duration-200"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="bg-sweet-accent p-2 rounded-lg hover:bg-sweet-secondary hover:text-white transition-colors duration-200"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="bg-sweet-accent p-2 rounded-lg hover:bg-sweet-secondary hover:text-white transition-colors duration-200"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-600">
                <MapPin className="h-4 w-4 text-sweet-primary" />
                <span className="text-sm">123 Sweet Street, Candy City, CC 12345</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Phone className="h-4 w-4 text-sweet-primary" />
                <span className="text-sm">+1 (555) 123-SWEET</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Mail className="h-4 w-4 text-sweet-primary" />
                <span className="text-sm">hello@sweetshop.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-gray-600 hover:text-sweet-primary transition-colors duration-200">
                About Us
              </a>
              <a href="#" className="block text-sm text-gray-600 hover:text-sweet-primary transition-colors duration-200">
                Our Products
              </a>
              <a href="#" className="block text-sm text-gray-600 hover:text-sweet-primary transition-colors duration-200">
                Shipping Info
              </a>
              <a href="#" className="block text-sm text-gray-600 hover:text-sweet-primary transition-colors duration-200">
                Returns Policy
              </a>
              <a href="#" className="block text-sm text-gray-600 hover:text-sweet-primary transition-colors duration-200">
                Contact Support
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-sweet-accent/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            © 2024 Sweet Shop. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-600 hover:text-sweet-primary transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-sweet-primary transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-sweet-primary transition-colors duration-200">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}