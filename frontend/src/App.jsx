import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom'; 
import From from './components/ProductCard'
import Payment from './components/Checkout'
import PaymentSuccess from './components/PaymentSuccess';
import PaymentFailure from './components/PaymentFailure';
const App = () => {
  return (
   <BrowserRouter>
      <Routes>
         <Route path='/' element= {<From />} />
          <Route path="/checkout" element={<Payment />} /> 
          <Route path= "/success" element={<PaymentSuccess />}/>
          <Route path = "/cancel" element= {<PaymentFailure /> }/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

