import React, { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';

const Login = ({ onLogin, onNavigateSignup }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (credentials) => {
    setIsLoading(true);
    try {
      await onLogin(credentials);
    } catch (error) {
      // Error handled in parent
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login to WareFlow
        </h2>
        <LoginForm onLogin={handleLogin} isLoading={isLoading} />
        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={onNavigateSignup}
            className="text-purple-600 hover:underline font-medium"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;