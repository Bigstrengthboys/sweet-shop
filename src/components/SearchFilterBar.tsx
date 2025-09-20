import React, { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface SearchFilterBarProps {
  onSearch?: (searchTerm: string) => void;
  onCategoryChange?: (category: string) => void;
  onPriceRangeChange?: (priceRange: [number, number]) => void;
}

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  onSearch = () => {},
  onCategoryChange = () => {},
  onPriceRangeChange = () => {},
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    onCategoryChange(value);
  };

  const handlePriceRangeChange = (value: number[]) => {
    const newRange: [number, number] = [value[0], value[1] || value[0]];
    setPriceRange(newRange);
    onPriceRangeChange(newRange);
  };

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "cakes", label: "Cakes" },
    { value: "cookies", label: "Cookies" },
    { value: "candies", label: "Candies" },
    { value: "chocolates", label: "Chocolates" },
    { value: "pastries", label: "Pastries" },
  ];

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 mb-6 bg-opacity-90 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-grow">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            type="text"
            placeholder="Search for sweets..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10 border-[#F7CAC9] focus:border-[#F75270] rounded-full"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Select value={category} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full sm:w-[180px] rounded-full border-[#F7CAC9] focus:border-[#F75270]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 rounded-full border-[#F7CAC9] hover:bg-[#FDEBD0] hover:text-[#DC143C]"
              >
                <SlidersHorizontal size={16} />
                <span>
                  Price: ${priceRange[0]} - ${priceRange[1]}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium text-sm">Price Range</h4>
                <Slider
                  defaultValue={[0, 100]}
                  max={100}
                  step={1}
                  value={[priceRange[0], priceRange[1]]}
                  onValueChange={handlePriceRangeChange}
                  className="[&>span]:bg-[#F75270]"
                />
                <div className="flex items-center justify-between">
                  <p className="text-sm">${priceRange[0]}</p>
                  <p className="text-sm">${priceRange[1]}</p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default SearchFilterBar;
