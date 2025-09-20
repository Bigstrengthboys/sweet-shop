import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Edit, 
  Trash2, 
  LogOut, 
  Package,
  TrendingUp,
  Users,
  IndianRupee
} from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import SearchFilterBar from '@/components/SearchFilterBar';
import { supabase } from '@/lib/supabase';

interface Sweet {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image_url: string | null;
  description: string | null;
}

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface DashboardProps {
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}

export default function Dashboard({ selectedCategory = '', onCategoryChange = () => {} }: DashboardProps) {
  const [user, setUser] = useState<User | null>(null);
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [filteredSweets, setFilteredSweets] = useState<Sweet[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCategory, setCurrentCategory] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    const authToken = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (!authToken || !userData) {
      navigate('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      // Fetch sweets from Supabase
      fetchSweets();
    } catch (error) {
      navigate('/login');
    }
  }, [navigate]);

  // Set selected category when prop changes
  useEffect(() => {
    if (selectedCategory) {
      setCurrentCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchSweets = async () => {
    try {
      const { data, error } = await supabase
        .from('sweets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setSweets(data || []);
      setFilteredSweets(data || []);
    } catch (error) {
      console.error('Error fetching sweets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter sweets based on search and filters
  useEffect(() => {
    let filtered = sweets.filter(sweet => {
      const matchesSearch = sweet.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = currentCategory === '' || currentCategory === 'all' || sweet.category === currentCategory;
      const matchesPrice = sweet.price >= priceRange[0] && sweet.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
    
    setFilteredSweets(filtered);
  }, [sweets, searchTerm, currentCategory, priceRange]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  const handlePurchase = async (sweetId: string) => {
    try {
      const sweet = sweets.find(s => s.id === sweetId);
      if (!sweet || sweet.quantity <= 0) return;

      // Update quantity in database
      const { error } = await supabase
        .from('sweets')
        .update({ quantity: sweet.quantity - 1 })
        .eq('id', sweetId);

      if (error) throw error;

      // Record purchase
      if (user) {
        await supabase
          .from('purchases')
          .insert([
            {
              user_id: user.id,
              sweet_id: sweetId,
              quantity: 1,
              total_price: sweet.price
            }
          ]);
      }

      // Update local state
      setSweets(prev => prev.map(sweet => 
        sweet.id === sweetId 
          ? { ...sweet, quantity: Math.max(0, sweet.quantity - 1) }
          : sweet
      ));
    } catch (error) {
      console.error('Error purchasing sweet:', error);
    }
  };

  const handleAddSweet = () => {
    navigate('/admin/add-sweet');
  };

  const handleEditSweet = (sweetId: string) => {
    navigate(`/admin/edit-sweet/${sweetId}`);
  };

  const handleDeleteSweet = async (sweetId: string) => {
    if (window.confirm('Are you sure you want to delete this sweet?')) {
      try {
        const { error } = await supabase
          .from('sweets')
          .delete()
          .eq('id', sweetId);

        if (error) throw error;

        setSweets(prev => prev.filter(sweet => sweet.id !== sweetId));
      } catch (error) {
        console.error('Error deleting sweet:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FDEBD0] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DC143C]"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const totalSweets = sweets.length;
  const totalValue = sweets.reduce((sum, sweet) => sum + (sweet.price * sweet.quantity), 0);
  const outOfStock = sweets.filter(sweet => sweet.quantity === 0).length;

  return (
    <div className="min-h-screen bg-[#FDEBD0]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-[#F7CAC9]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-[#DC143C] to-[#F75270] p-2 rounded-lg">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#DC143C]">Sweet Shop Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {user.name}!</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="border-[#DC143C] text-[#DC143C]">
                {user.isAdmin ? 'Admin' : 'Customer'}
              </Badge>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-[#DC143C] text-[#DC143C] hover:bg-[#DC143C] hover:text-white"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-[#DC143C]" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Sweets</p>
                  <p className="text-2xl font-bold text-gray-900">{totalSweets}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <IndianRupee className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Value</p>
                  <p className="text-2xl font-bold text-gray-900">₹{totalValue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">In Stock</p>
                  <p className="text-2xl font-bold text-gray-900">{totalSweets - outOfStock}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                  <p className="text-2xl font-bold text-gray-900">{outOfStock}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="sweets" className="space-y-6">
          <div className="flex justify-between items-center">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="sweets">All Sweets</TabsTrigger>
              {user.isAdmin && <TabsTrigger value="admin">Admin Panel</TabsTrigger>}
            </TabsList>
            
            {user.isAdmin && (
              <Button 
                onClick={handleAddSweet}
                className="bg-[#DC143C] hover:bg-[#DC143C]/90 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Sweet
              </Button>
            )}
          </div>

          <TabsContent value="sweets" className="space-y-6">
            {/* Search and Filter */}
            <SearchFilterBar
              onSearch={setSearchTerm}
              onCategoryChange={setCurrentCategory}
              onPriceRangeChange={setPriceRange}
            />

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredSweets.map((sweet) => (
                <div key={sweet.id} className="relative">
                  <ProductCard
                    id={sweet.id}
                    name={sweet.name}
                    price={sweet.price}
                    image={sweet.image_url || '/images/Gulab Jamun.jpeg'}
                    category={sweet.category}
                    quantity={sweet.quantity}
                    available={sweet.quantity > 0}
                    onBuy={handlePurchase}
                  />
                  
                  {user.isAdmin && (
                    <div className="absolute top-2 right-2 flex space-x-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                        onClick={() => handleEditSweet(sweet.id)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0 bg-white/90 hover:bg-white text-red-600 hover:text-red-700"
                        onClick={() => handleDeleteSweet(sweet.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredSweets.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-gray-600">No sweets found matching your criteria.</p>
              </div>
            )}
          </TabsContent>

          {user.isAdmin && (
            <TabsContent value="admin" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button 
                      onClick={handleAddSweet}
                      className="bg-[#DC143C] hover:bg-[#DC143C]/90 text-white h-20"
                    >
                      <Plus className="h-6 w-6 mr-2" />
                      Add New Sweet
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-[#DC143C] text-[#DC143C] hover:bg-[#DC143C] hover:text-white h-20"
                    >
                      <TrendingUp className="h-6 w-6 mr-2" />
                      View Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}