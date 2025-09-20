import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminSweetForm from './pages/AdminSweetForm';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; isAdmin: boolean } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    // Check authentication status
    const authToken = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (authToken && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setIsAuthenticated(true);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUser(null);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-[#FDEBD0] flex flex-col">
      <Routes>
        <Route path="/" element={
          <>
            <Navbar 
              isAuthenticated={isAuthenticated}
              user={user || undefined}
              onLogout={handleLogout}
              onCategorySelect={handleCategorySelect}
            />
            <main className="flex-1">
              <Home />
            </main>
          </>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/dashboard" 
          element={
            <Dashboard 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          } 
        />
        <Route path="/admin/add-sweet" element={<AdminSweetForm />} />
        <Route path="/admin/edit-sweet/:id" element={<AdminSweetForm />} />
      </Routes>
    </div>
  );
}

export default App;