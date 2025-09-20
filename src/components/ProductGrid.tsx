import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  category: string;
  quantity: number;
}

interface ProductGridProps {
  selectedCategory?: string;
  searchTerm?: string;
  priceRange?: [number, number];
}

const ProductGrid = ({
  selectedCategory = "",
  searchTerm = "",
  priceRange = [0, 500],
}: ProductGridProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('sweets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Fallback to mock data if Supabase fails
      const mockProducts = [
        {
          id: "1",
          name: "Gulab Jamun",
          price: 120,
          image_url: "/images/Gulab Jamun.jpeg",
          category: "traditional",
          quantity: 25,
        },
        {
          id: "2",
          name: "Kaju Katli",
          price: 450,
          image_url: "/images/kaju katli.jpeg",
          category: "premium",
          quantity: 15,
        },
        {
          id: "3",
          name: "Rasmalai",
          price: 180,
          image_url: "/images/Rasmalai.jpeg",
          category: "milk-based",
          quantity: 0,
        },
        {
          id: "4",
          name: "Jalebi",
          price: 90,
          image_url: "/images/jalebi.jpeg",
          category: "crispy",
          quantity: 30,
        },
        {
          id: "5",
          name: "Rasgulla",
          price: 100,
          image_url: "/images/Rasgulla.jpeg",
          category: "spongy",
          quantity: 20,
        },
        {
          id: "6",
          name: "Motichur Ladoo",
          price: 150,
          image_url: "/images/Moti chur ladoo.jpeg",
          category: "ladoos",
          quantity: 12,
        },
        {
          id: "7",
          name: "Kalakand",
          price: 200,
          image_url: "/images/Kalakand.jpeg",
          category: "milk-based",
          quantity: 8,
        },
        {
          id: "8",
          name: "Chhena Poda",
          price: 250,
          image_url: "/images/Chhena Poda.jpeg",
          category: "baked",
          quantity: 5,
        },
      ];
      setProducts(mockProducts);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter products based on search term, category, and price range
  useEffect(() => {
    const filtered = products.filter((product) => {
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

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, priceRange]);

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DC143C]"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#FDEBD0] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
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
                  image={product.image_url || '/images/Gulab Jamun.jpeg'}
                  category={product.category}
                  quantity={product.quantity}
                  available={product.quantity > 0}
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