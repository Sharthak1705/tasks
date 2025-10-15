import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ image, title, description, price }) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout', { state: { image, title, description, price } });
  };

  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 m-4 bg-white">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-2xl mb-2 text-gray-800">{title}</div>
        <p className="text-gray-600 text-base mb-2 line-clamp-3">{description}</p>
        <p className="text-gray-900 font-semibold text-lg mt-2">${price}</p>
      </div>
      <div className="px-6 pt-4 pb-6">
        <button 
          onClick={handleCheckout} 
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

const Form = () => {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setItems(storedItems);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = { image, title, description, price };

    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));

    setImage('');
    setTitle('');
    setDescription('');
    setPrice('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Add Product</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Image Upload
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Product: 
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Price: 
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          Create Item
        </button>
      </form>

      <div className="mt-8 text-gray-700">
        <h3 className="text-2xl font-bold">Total Items in Cart: {items.length}</h3>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {items.map((item, index) => (
          <Cart
            key={index}
            image={item.image}
            title={item.title}
            description={item.description}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Form;