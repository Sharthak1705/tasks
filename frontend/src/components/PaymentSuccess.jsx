import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = Cookies.get('sessionId');
    console.log('Session ID from cookie:', sessionId);
  }, []);

  const handleBack = () => {
    navigate('/');
  };
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>🎉Thank you </h1>
      <p>Your payment was processed successfully.</p>

      <button
        onClick={handleBack}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        🔙 Back to Home
      </button>
    </div>
  );
};

export default PaymentSuccess;
