import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Eye, EyeOff, Sparkles, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/lib/supabase';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const hashPassword = async (password: string): Promise<string> => {
    // Simple hash function for demo - in production use proper bcrypt
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Hash the input password
      const hashedPassword = await hashPassword(formData.password);

      // Get user from database
      const { data: user, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('email', formData.email)
        .eq('password_hash', hashedPassword)
        .single();

      if (fetchError || !user) {
        setError('Invalid email or password');
        setIsLoading(false);
        return;
      }

      // Store user data in localStorage
      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.is_admin
      };

      localStorage.setItem('authToken', 'authenticated');
      localStorage.setItem('userData', JSON.stringify(userData));
      
      navigate('/dashboard');

    } catch (error: any) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDEBD0] via-[#F7CAC9]/20 to-[#FDEBD0] flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 bg-[#F75270]/20 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-[#DC143C]/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-[#F7CAC9]/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-14 h-14 bg-[#F75270]/15 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <Card className="border-2 border-[#F7CAC9] shadow-2xl bg-white">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-[#DC143C] to-[#F75270] p-3 rounded-full">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#DC143C] to-[#F75270] bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-gray-600">
              Sign in to your Sweet Shop account
            </CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert className="mb-4 border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-600">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#DC143C]" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 border-[#F7CAC9]/50 focus:border-[#DC143C] focus:ring-[#DC143C]/20"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pr-10 border-[#F7CAC9]/50 focus:border-[#DC143C] focus:ring-[#DC143C]/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#DC143C] hover:text-[#F75270] transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#DC143C] hover:bg-[#DC143C]/90 text-white py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg mt-6"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>

              {/* Register Link */}
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link 
                    to="/register" 
                    className="text-[#DC143C] hover:text-[#F75270] font-medium transition-colors duration-200"
                  >
                    Create account
                  </Link>
                </p>
              </div>

              {/* Demo Credentials */}
              <div className="mt-6 p-3 bg-[#F7CAC9]/20 rounded-lg">
                <p className="text-xs text-gray-600 text-center mb-2">Demo Credentials:</p>
                <div className="text-xs text-gray-600 space-y-1">
                  <p><strong>User:</strong> user@demo.com / password123</p>
                  <p><strong>Admin:</strong> admin@demo.com / admin123</p>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}