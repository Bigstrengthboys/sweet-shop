import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Sweet {
  id?: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description: string;
  image_url: string;
}

export default function AdminSweetForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  
  const [formData, setFormData] = useState<Sweet>({
    name: '',
    category: '',
    price: 0,
    quantity: 0,
    description: '',
    image_url: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  const categories = [
    { value: 'traditional', label: 'Traditional' },
    { value: 'premium', label: 'Premium' },
    { value: 'milk-based', label: 'Milk Based' },
    { value: 'crispy', label: 'Crispy' },
    { value: 'spongy', label: 'Spongy' },
    { value: 'ladoos', label: 'Ladoos' },
    { value: 'baked', label: 'Baked' },
  ];

  useEffect(() => {
    if (isEditing && id) {
      fetchSweet();
    }
  }, [id, isEditing]);

  const fetchSweet = async () => {
    try {
      const { data, error } = await supabase
        .from('sweets')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      if (data) {
        setFormData({
          name: data.name,
          category: data.category,
          price: data.price,
          quantity: data.quantity,
          description: data.description || '',
          image_url: data.image_url || ''
        });
        setImagePreview(data.image_url || '');
      }
    } catch (error) {
      console.error('Error fetching sweet:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'quantity' ? parseFloat(value) || 0 : value
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      category: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setFormData(prev => ({
          ...prev,
          image_url: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isEditing && id) {
        // Update existing sweet
        const { error } = await supabase
          .from('sweets')
          .update({
            name: formData.name,
            category: formData.category,
            price: formData.price,
            quantity: formData.quantity,
            description: formData.description,
            image_url: formData.image_url,
            updated_at: new Date().toISOString()
          })
          .eq('id', id);

        if (error) throw error;
      } else {
        // Add new sweet
        const { error } = await supabase
          .from('sweets')
          .insert([
            {
              name: formData.name,
              category: formData.category,
              price: formData.price,
              quantity: formData.quantity,
              description: formData.description,
              image_url: formData.image_url
            }
          ]);

        if (error) throw error;
      }

      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving sweet:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestock = async () => {
    if (!isEditing || !id) return;
    
    try {
      const newQuantity = formData.quantity + 10;
      
      const { error } = await supabase
        .from('sweets')
        .update({ quantity: newQuantity })
        .eq('id', id);

      if (error) throw error;

      setFormData(prev => ({
        ...prev,
        quantity: newQuantity
      }));
    } catch (error) {
      console.error('Error restocking sweet:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDEBD0]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-[#F7CAC9]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button
              variant="ghost"
              onClick={() => navigate('/dashboard')}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-xl font-bold text-[#DC143C]">
              {isEditing ? 'Edit Sweet' : 'Add New Sweet'}
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="border-2 border-[#F7CAC9] shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#DC143C]">
              {isEditing ? 'Edit Sweet Details' : 'Add New Sweet'}
            </CardTitle>
            <CardDescription>
              {isEditing 
                ? 'Update the details of your sweet item'
                : 'Fill in the details to add a new sweet to your inventory'
              }
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="image">Sweet Image</Label>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="border-[#F7CAC9]/50 focus:border-[#DC143C]"
                    />
                  </div>
                  {imagePreview && (
                    <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-[#F7CAC9]">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Sweet Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter sweet name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border-[#F7CAC9]/50 focus:border-[#DC143C]"
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="border-[#F7CAC9]/50 focus:border-[#DC143C]">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price and Quantity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="border-[#F7CAC9]/50 focus:border-[#DC143C]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="quantity">Quantity in Stock</Label>
                    {isEditing && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleRestock}
                        className="border-[#DC143C] text-[#DC143C] hover:bg-[#DC143C] hover:text-white"
                      >
                        Restock +10
                      </Button>
                    )}
                  </div>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="border-[#F7CAC9]/50 focus:border-[#DC143C]"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter sweet description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="border-[#F7CAC9]/50 focus:border-[#DC143C] min-h-[100px]"
                  rows={4}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                  className="border-[#DC143C] text-[#DC143C] hover:bg-[#DC143C] hover:text-white"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#DC143C] hover:bg-[#DC143C]/90 text-white"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </div>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      {isEditing ? 'Update Sweet' : 'Add Sweet'}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}