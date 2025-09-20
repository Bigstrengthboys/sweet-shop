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
  category?: string;
  available?: boolean;
  quantity?: number;
  onBuy?: (id: string) => void;
}

const ProductCard = ({
  id = "1",
  name = "Gulab Jamun",
  price = 3.99,
  image = "/images/Gulab Jamun.jpeg",
  category = "Traditional",
  available = true,
  quantity = 10,
  onBuy = () => {},
}: ProductCardProps) => {
  const isOutOfStock = quantity === 0 || !available;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden rounded-xl border-2 border-[#F7CAC9] bg-white shadow-md transition-all hover:shadow-lg">
        <div className="relative">
          <img src={image} alt={name} className="h-48 w-full object-cover sweet-card-image" />
          <Badge
            variant="secondary"
            className="absolute right-2 top-2 bg-[#F75270] text-white"
          >
            {category}
          </Badge>
          {quantity <= 5 && quantity > 0 && (
            <Badge
              variant="destructive"
              className="absolute left-2 top-2 bg-orange-500 text-white"
            >
              Only {quantity} left
            </Badge>
          )}
        </div>
        <CardContent className="flex flex-col gap-3 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#DC143C] line-clamp-1">
              {name}
            </h3>
            <p className="font-bold text-[#DC143C]">₹{price.toFixed(2)}</p>
          </div>

          <div className="text-sm text-gray-600">
            {isOutOfStock ? (
              <span className="text-red-500 font-medium">Out of Stock</span>
            ) : (
              <span className="text-green-600">In Stock ({quantity} available)</span>
            )}
          </div>

          <Button
            onClick={() => onBuy(id)}
            disabled={isOutOfStock}
            className="mt-auto w-full bg-[#DC143C] text-white hover:bg-[#F75270] disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isOutOfStock ? "Out of Stock" : "Purchase"}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;