import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Search, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ProductGrid from "./ProductGrid";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showSubscribeDialog, setShowSubscribeDialog] = useState(false);
  const [email, setEmail] = useState("");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  // Categories for the navbar - updated for Indian sweets
  const categories = [
    { name: "Ladoos", value: "ladoos" },
    { name: "Barfis", value: "premium" },
    { name: "Rasgullas", value: "spongy" },
    { name: "Jalebis", value: "crispy" },
    { name: "Kaju Katli", value: "premium" }
  ];

  const handleCategoryClick = (categoryValue: string) => {
    setSelectedCategory(categoryValue);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSubscribeDialog(true);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-[#FDEBD0] flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#F7CAC9] to-[#FDEBD0] py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            className="flex flex-col md:flex-row items-center justify-between"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="md:w-1/2 mb-8 md:mb-0"
              variants={itemVariants}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#DC143C] mb-4">
                Authentic Indian Sweets for Every Sweet Tooth
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8">
                Handcrafted with love, our traditional Indian sweets bring joy to every occasion.
                Discover our collection of ladoos, barfis, and classic mithai.
              </p>
              <Button className="bg-[#DC143C] hover:bg-[#F75270] text-white px-8 py-6 text-lg rounded-full">
                Shop Now
              </Button>
            </motion.div>
            <motion.div className="md:w-1/2 relative" variants={itemVariants}>
              <div className="relative">
                <img
                  src="/images/first.jpeg"
                  alt="Traditional Indian sweets"
                  className="rounded-2xl shadow-lg w-full"
                />

                {/* Animated sweet illustrations */}
                <motion.img
                  src="/images/Gulab Jamun.jpeg"
                  alt="Gulab Jamun"
                  className="absolute -top-10 -left-10 w-24 h-24 rounded-full shadow-md hidden md:block object-cover"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
                <motion.img
                  src="/images/jalebi.jpeg"
                  alt="Jalebi"
                  className="absolute -bottom-10 -right-10 w-28 h-28 rounded-full shadow-md hidden md:block object-cover"
                  animate={{
                    y: [0, 10, 0],
                    rotate: [0, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.5,
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-[#DC143C] mb-8">
            Our Traditional Indian Sweets
          </h2>
          <ProductGrid selectedCategory={selectedCategory} />
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16 bg-[#F7CAC9]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold text-[#DC143C] mb-4">
                Special Offers
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Enjoy our seasonal specials and limited-time offers. Perfect for
                festivals, celebrations, or treating yourself to authentic Indian mithai!
              </p>
              <Button className="bg-[#DC143C] hover:bg-[#F75270] text-white">
                View Specials
              </Button>
            </div>
            <div className="md:w-1/2">
              <img
                src="/images/mix sweet bg.jpeg"
                alt="Special offers on Indian sweets"
                className="rounded-2xl shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-[#DC143C] mb-12 text-center">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-[#FDEBD0] p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-[#F7CAC9] flex items-center justify-center mr-4">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${item}`}
                      alt="User avatar"
                      className="h-10 w-10 rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#DC143C]">
                      Happy Customer {item}
                    </h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-500">
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">
                  "The Indian sweets from this shop are absolutely amazing! The flavors
                  are authentic and the presentation is beautiful. Will
                  definitely order again!"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-[#F7CAC9]">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#DC143C] mb-4">
            Stay Updated
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for special offers, new product
            announcements, and sweet tips!
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row max-w-md mx-auto md:max-w-xl gap-2">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white border-[#F75270] focus-visible:ring-[#DC143C]"
              required
            />
            <Button type="submit" className="bg-[#DC143C] hover:bg-[#F75270] text-white">
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      {/* Subscribe Success Dialog */}
      <Dialog open={showSubscribeDialog} onOpenChange={setShowSubscribeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-[#DC143C]">
              🎉 Thank You for Subscribing! 🎉
            </DialogTitle>
            <DialogDescription className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="my-4"
              >
                <div className="text-6xl mb-4">🍬</div>
                <p className="text-lg">
                  Welcome to our sweet family! You'll receive the latest updates on our delicious Indian sweets and special offers.
                </p>
              </motion.div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button 
              onClick={() => setShowSubscribeDialog(false)}
              className="bg-[#DC143C] hover:bg-[#F75270] text-white"
            >
              Continue Shopping
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-[#DC143C] text-white py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Sweet Shop</h3>
              <p className="mb-4">
                Bringing sweetness to your life since 2010.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-[#FDEBD0] transition-colors">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
                <a href="#" className="hover:text-[#FDEBD0] transition-colors">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="#" className="hover:text-[#FDEBD0] transition-colors">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="hover:text-[#FDEBD0] transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#FDEBD0] transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#FDEBD0] transition-colors"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#FDEBD0] transition-colors"
                  >
                    Special Offers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#FDEBD0] transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Categories</h3>
              <ul className="space-y-2">
                {categories.map((category, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleCategoryClick(category.value)}
                      className="hover:text-[#FDEBD0] transition-colors text-left"
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <address className="not-italic">
                <p className="mb-2">Town CRPF, BBSR</p>
                <p className="mb-2">Phone: +91-9556078099</p>
                <p className="mb-2">Email: sggghhf130@gmail.com</p>
              </address>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p>
              &copy; {new Date().getFullYear()} Sweet Shop. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;