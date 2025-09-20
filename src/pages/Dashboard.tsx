import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  ShoppingCart, 
  User, 
  LogOut, 
  Package,
  TrendingUp,
  Users,
  IndianRupee
} from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import SearchFilterBar from '@/components/SearchFilterBar';

interface Sweet {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [filteredSweets, setFilteredSweets] = useState<Sweet[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Mock data for sweets
  const mockSweets: Sweet[] = [
    {
      id: "1",
      name: "Gulab Jamun",
      category: "traditional",
      price: 120,
      quantity: 25,
      image: "/images/Gulab Jamun.jpeg"
    },
    {
      id: "2", 
      name: "Kaju Katli",
      category: "premium",
      price: 450,
      quantity: 15,
      image: "/images/kaju katli.jpeg"
    },
    {
      id: "3",
      name: "Rasmalai",
      category: "milk-based",
      price: 180,
      quantity: 0,
      image: "/images/Rasmalai.jpeg"
    },
    {
      id: "4",
      name: "Jalebi",
      category: "crispy",
      price: 90,
      quantity: 30,
      image: "/images/jalebi.jpeg"
    },
    {
      id: "5",
      name: "Rasgulla",
      category: "spongy",
      price: 100,
      quantity: 20,
      image: "/images/Rasgulla.jpeg"
    },
    {
      id: "6",
      name: "Motichur Ladoo",
      category: "ladoos",
      price: 150,
      quantity: 12,
      image: "/images/Moti chur ladoo.jpeg"
    },
    {
      id: "7",
      name: "Kalakand",
      category: "milk-based",
      price: 200,
      quantity: 8,
      image: "/images/Kalakand.jpeg"
    },
    {
      id: "8",
      name: "Chhena Poda",
      category: "baked",
      price: 250,
      quantity: 5,
      image: "/images/Chhena Poda.jpeg"
    }
  ];

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
      
      // Simulate API call to fetch sweets
      setTimeout(() => {
        setSweets(mockSweets);
        setFilteredSweets(mockSweets);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      navigate('/login');
    }
  }, [navigate]);

  // Filter sweets based on search and filters
  useEffect(() => {
    let filtered = sweets.filter(sweet => {
      const matchesSearch = sweet.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === '' || selectedCategory === 'all' || sweet.category === selectedCategory;
      const matchesPrice = sweet.price >= priceRange[0] && sweet.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
    
    setFilteredSweets(filtered);
  }, [sweets, searchTerm, selectedCategory, priceRange]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  const handlePurchase = async (sweetId: string) => {
    try {
      // Simulate API call to POST /api/sweets/:id/purchase
      const response = await fetch(`/api/sweets/${sweetId}/purchase`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Update local state
        setSweets(prev => prev.map(sweet => 
          sweet.id === sweetId 
            ? { ...sweet, quantity: Math.max(0, sweet.quantity - 1) }
            : sweet
        ));
      }
    } catch (error) {
      // For demo, just update local state
      setSweets(prev => prev.map(sweet => 
        sweet.id === sweetId 
          ? { ...sweet, quantity: Math.max(0, sweet.quantity - 1) }
          : sweet
      ));
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
        // Simulate API call to DELETE /api/sweets/:id
        const response = await fetch(`/api/sweets/${sweetId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        });

        if (response.ok) {
          setSweets(prev => prev.filter(sweet => sweet.id !== sweetId));
        }
      } catch (error) {
        // For demo, just update local state
        setSweets(prev => prev.filter(sweet => sweet.id !== sweetId));
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-sweet-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sweet-primary"></div>
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
    <div className="min-h-screen bg-sweet-bg">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-sweet-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-sweet-primary to-sweet-secondary p-2 rounded-lg">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-sweet-primary">Sweet Shop Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {user.name}!</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="border-sweet-primary text-sweet-primary">
                {user.isAdmin ? 'Admin' : 'Customer'}
              </Badge>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-sweet-primary text-sweet-primary hover:bg-sweet-primary hover:text-white"
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
                <Package className="h-8 w-8 text-sweet-primary" />
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
                className="bg-sweet-primary hover:bg-sweet-primary/90 text-white"
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
              onCategoryChange={setSelectedCategory}
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
                    image={sweet.image}
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
                <CardHeader>
                  <CardTitle>Admin Panel</CardTitle>
                  <CardDescription>
                    Manage your sweet inventory and view analytics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button 
                      onClick={handleAddSweet}
                      className="bg-sweet-primary hover:bg-sweet-primary/90 text-white h-20"
                    >
                      <Plus className="h-6 w-6 mr-2" />
                      Add New Sweet
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-sweet-primary text-sweet-primary hover:bg-sweet-primary hover:text-white h-20"
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