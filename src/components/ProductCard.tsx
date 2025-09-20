import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  onBuy: (id: string) => void;
}

const ProductCard = ({
  id = "1",
  name = "Strawberry Cupcake",
  price = 3.99,
  image = "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400&q=80",
  category = "Cupcakes",
  inStock = true,
  onBuy = () => {},
}: ProductCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden rounded-xl border-2 border-[#F7CAC9] bg-white shadow-md transition-all hover:shadow-lg">
        <div className="relative">
          <img src={image} alt={name} className="h-48 w-full object-cover" />
          <Badge
            variant="secondary"
            className="absolute right-2 top-2 bg-[#F75270] text-white"
          >
            {category}
          </Badge>
        </div>
        <CardContent className="flex flex-col gap-3 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#DC143C] line-clamp-1">
              {name}
            </h3>
            <p className="font-bold text-[#DC143C]">${price.toFixed(2)}</p>
          </div>

          <Button
            onClick={() => onBuy(id)}
            disabled={!inStock}
            className="mt-auto w-full bg-[#DC143C] text-white hover:bg-[#F75270] disabled:bg-gray-300"
          >
            {inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
