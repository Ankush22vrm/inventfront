import React, { useState } from 'react';
import SignupForm from '../components/auth/SignupForm';

const Signup = ({ onSignup, onNavigateLogin }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (formData) => {
    setIsLoading(true);
    try {
      await onSignup(formData);
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
          Sign Up for WareFlow
        </h2>
        <SignupForm onSignup={handleSignup} isLoading={isLoading} />
        <p className="text-center mt-4 text-gray-600">
          Already have an account?{' '}
          <button
            onClick={onNavigateLogin}
            className="text-purple-600 hover:underline font-medium"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;