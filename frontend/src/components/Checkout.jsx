import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, total } = location.state || {}; 

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
     if (!cart || cart.length === 0) {
      navigate('/');
    }
  }, [cart, navigate]);

const handlePayment = async (e) => {
  e.preventDefault();
  setError('');

  if (!email) {
    setError('Please enter your email');
    return;
  }

  setLoading(true);

  try {
    const response = await axios.post(
      'http://localhost:5000/api/stripe/create-checkout-session',
      {
        email,
        products: cart,
      }
    );

    window.location.href = response.data.url;
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      setError('Could not connect to the server. Please ensure the backend is running.');
    } else {
      console.error('Error creating checkout session:', err);
      setError(err.response?.data?.error || 'Failed to create checkout session.');
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-lg mx-auto p-6 shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Finalize Purchase</h2>
      {error && <p className="text-red-500">{error}</p>}

      {cart && (
        <div className="mb-4 p-3 border rounded bg-gray-50 max-h-48 overflow-y-auto">
          <h3 className="font-bold mb-2">Items:</h3>
          {cart.map((item, index) => (
            <p key={index} className="text-sm text-gray-700">
              {item.title} (x{item.quantity}) - ${parseFloat(item.price * item.quantity).toFixed(2)}
            </p>
          ))}
          <p className="font-bold mt-2 pt-2 border-t">Grand Total: ${total}</p>
        </div>
      )}

      <form onSubmit={handlePayment}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading || !cart || cart.length === 0}
          className={`w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${
            (loading || !cart || cart.length === 0) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        > 
          {loading ? 'Processing...' : `Pay $${total}`}
        </button>
      </form>
    </div>
  );
};

export default Checkout;