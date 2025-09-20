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
      name: "Gulab Jamun",
      price: 3.99,
      image: "/images/Gulab Jamun.jpeg",
      category: "Traditional",
      available: true,
    },
    {
      id: "2",
      name: "Kaju Katli",
      price: 5.49,
      image: "/images/kaju katli.jpeg",
      category: "Premium",
      available: true,
    },
    {
      id: "3",
      name: "Rasmalai",
      price: 4.99,
      image: "/images/Rasmalai.jpeg",
      category: "Milk Based",
      available: false,
    },
    {
      id: "4",
      name: "Jalebi",
      price: 2.99,
      image: "/images/jalebi.jpeg",
      category: "Crispy",
      available: true,
    },
    {
      id: "5",
      name: "Rasgulla",
      price: 3.49,
      image: "/images/Rasgulla.jpeg",
      category: "Spongy",
      available: true,
    },
    {
      id: "6",
      name: "Motichur Ladoo",
      price: 3.99,
      image: "/images/Moti chur ladoo.jpeg",
      category: "Ladoos",
      available: true,
    },
    {
      id: "7",
      name: "Kalakand",
      price: 4.99,
      image: "/images/Kalakand.jpeg",
      category: "Milk Based",
      available: true,
    },
    {
      id: "8",
      name: "Chhena Poda",
      price: 5.29,
      image: "/images/Chhena Poda.jpeg",
      category: "Baked",
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
          Our Traditional Indian Sweets
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