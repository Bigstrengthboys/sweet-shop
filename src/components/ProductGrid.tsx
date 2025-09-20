import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  available: boolean;
}

interface ProductGridProps {
  products?: Product[];
  searchTerm?: string;
  selectedCategory?: string;
  priceRange?: [number, number];
}

const ProductGrid = ({
  products = [
    {
      id: "1",
      name: "Strawberry Cupcake",
      price: 3.99,
      image:
        "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800&q=80",
      category: "Cupcakes",
      available: true,
    },
    {
      id: "2",
      name: "Chocolate Truffle",
      price: 2.49,
      image:
        "https://images.unsplash.com/photo-1548907040-4d5e3d59b7cb?w=800&q=80",
      category: "Chocolates",
      available: true,
    },
    {
      id: "3",
      name: "Vanilla Macarons",
      price: 4.99,
      image:
        "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=800&q=80",
      category: "Cookies",
      available: false,
    },
    {
      id: "4",
      name: "Rainbow Lollipop",
      price: 1.99,
      image:
        "https://images.unsplash.com/photo-1575224300306-1b8da36134ec?w=800&q=80",
      category: "Candy",
      available: true,
    },
    {
      id: "5",
      name: "Blueberry Donut",
      price: 2.99,
      image:
        "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80",
      category: "Donuts",
      available: true,
    },
    {
      id: "6",
      name: "Caramel Fudge",
      price: 3.49,
      image:
        "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=800&q=80",
      category: "Candy",
      available: true,
    },
    {
      id: "7",
      name: "Red Velvet Cake",
      price: 5.99,
      image:
        "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=800&q=80",
      category: "Cakes",
      available: true,
    },
    {
      id: "8",
      name: "Mint Chocolate Chip Cookie",
      price: 2.29,
      image:
        "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80",
      category: "Cookies",
      available: false,
    },
  ],
  searchTerm = "",
  selectedCategory = "",
  priceRange = [0, 10],
}: ProductGridProps) => {
  // Filter products based on search term, category, and price range
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Animation variants for each item
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="bg-[#FDEBD0] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-[#DC143C] mb-8 text-center">
          Our Sweet Delights
        </h2>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              No products found matching your criteria.
            </p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  available={product.available}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
