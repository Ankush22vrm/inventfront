import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Navbar from './components/layout/Navbar';
import Toast from './components/shared/Toast';
import api from './utils/api';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState(null);
  const [warehouses, setWarehouses] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentPage('dashboard');
      loadWarehouses();
    }
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const loadWarehouses = async () => {
    try {
      const data = await api.get('/warehouses');
      setWarehouses(data);
      if (data.length > 0 && !selectedWarehouse) {
        setSelectedWarehouse(data[0]);
        loadProducts(data[0]._id);
      }
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const loadProducts = async (warehouseId) => {
    try {
      const data = await api.get(`/products?warehouseId=${warehouseId}`);
      setProducts(data);
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const handleLogin = async (credentials) => {
    try {
      const data = await api.post('/login', credentials);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      showToast('Login successful!');
      setCurrentPage('dashboard');
      await loadWarehouses();
    } catch (error) {
      showToast(error.message, 'error');
      throw error;
    }
  };

  const handleSignup = async (formData) => {
    try {
      await api.post('/signup', formData);
      showToast('Signup successful! Please login.');
      setCurrentPage('login');
    } catch (error) {
      showToast(error.message, 'error');
      throw error;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setWarehouses([]);
    setProducts([]);
    setSelectedWarehouse(null);
    setCurrentPage('home');
    showToast('Logged out successfully!');
  };

  const handleDeleteAccount = async () => {
    try {
      await api.delete('/users/delete');
      handleLogout();
      showToast('Account deleted successfully!');
    } catch (error) {
      showToast(error.message, 'error');
      throw error;
    }
  };

  const handleRefresh = () => {
    loadWarehouses();
    if (selectedWarehouse) loadProducts(selectedWarehouse._id);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onGetStarted={() => setCurrentPage('login')} />;
      case 'login':
        return (
          <Login
            onLogin={handleLogin}
            onNavigateSignup={() => setCurrentPage('signup')}
          />
        );
      case 'signup':
        return (
          <Signup
            onSignup={handleSignup}
            onNavigateLogin={() => setCurrentPage('login')}
          />
        );
      case 'dashboard':
        return (
          <Dashboard
            warehouses={warehouses}
            products={products}
            selectedWarehouse={selectedWarehouse}
            onSelectWarehouse={(wh) => {
              setSelectedWarehouse(wh);
              loadProducts(wh._id);
            }}
            onRefresh={handleRefresh}
            showToast={showToast}
          />
        );
      default:
        return <Home onGetStarted={() => setCurrentPage('login')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        user={user}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onLogout={handleLogout}
        onDeleteAccount={handleDeleteAccount}
        showToast={showToast}
      />
      {renderPage()}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default App;