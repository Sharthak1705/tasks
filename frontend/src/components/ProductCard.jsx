import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CartItem = ({ image, title, price, quantity, onRemove }) => {
  return (
    <div className="flex items-center justify-between p-4 mb-3 bg-white rounded-lg shadow-md">
      <img className="w-16 h-16 object-cover rounded mr-4" src={image} alt={title} />
      <div className="flex-grow">
        <div className="font-bold text-lg text-gray-800">{title}</div>
        <p className="text-gray-600">Price: ${price}</p>
      </div>
      <div className="text-gray-900 font-semibold text-lg mr-4">
        Qty: {quantity}
      </div>
      <button
        onClick={onRemove}
        className="text-red-500 hover:text-red-700 font-bold py-1 px-2 rounded transition-colors duration-300"
      >
        Remove
      </button>
    </div>
  );
};
const ProductCard = ({ product, onAddToCart }) => {
  const { image, title, description, price } = product;
  const navigate = useNavigate();

  const handleAddToCartClick = () => {
    onAddToCart(product);
  };

  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 m-4 bg-white">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-2xl mb-2 text-gray-800">{title}</div>
        <p className="text-gray-600 text-base mb-2 line-clamp-3">{description}</p>
        <p className="text-gray-900 font-semibold text-xl mt-2">${price}</p>
      </div>
      <div className="px-6 pt-4 pb-6">
        <button
          onClick={handleAddToCartClick}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          ➕ Add to Cart
        </button>
      </div>
    </div>
  );
};
const ProductManager = () => {
  
  const [newImage, setNewImage] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPrice, setNewPrice] = useState('');
  
  const [products, setProducts] = useState([]);
  
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  
    const storedProducts = JSON.parse(localStorage.getItem('availableProducts')) || [];
    setProducts(storedProducts);
   
    const storedCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    setCartItems(storedCart);
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0).toFixed(2);
  };

  
  const handleProductSubmit = (e) => {
    e.preventDefault();

    const newItem = { 
      image: newImage, 
      title: newTitle, 
      description: newDescription, 
      price: newPrice 
    };

    const updatedProducts = [...products, newItem];
    setProducts(updatedProducts)
    localStorage.setItem('availableProducts', JSON.stringify(updatedProducts));

    setNewImage('');
    setNewTitle('');
    setNewDescription('');
    setNewPrice('');
  };

  const handleAddToCart = (productToAdd) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.title === productToAdd.title
    );

    let updatedCart;
    if (existingItemIndex > -1) {
     
      updatedCart = cartItems.map((item, index) =>
        index === existingItemIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
   
      updatedCart = [...cartItems, { ...productToAdd, quantity: 1 }];
    }

    setCartItems(updatedCart);
    localStorage.setItem('shoppingCart', JSON.stringify(updatedCart));
    alert(`${productToAdd.title} added to cart!`);
  };

  const handleRemoveFromCart = (titleToRemove) => {
    const updatedCart = cartItems.filter(item => item.title !== titleToRemove);
    setCartItems(updatedCart);
    localStorage.setItem('shoppingCart', JSON.stringify(updatedCart));
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCheckout = () => {

    navigate('/checkout', { state: { total: calculateTotal(), cart: cartItems } });
  };


  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-extrabold mb-8 text-gray-800">🛍️ Product Inventory & Shopping Cart</h2>

      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Add New Product to Inventory</h3>
          <form onSubmit={handleProductSubmit} className="bg-white p-6 rounded-xl shadow-lg">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">Image Upload</label>
              <input
                type="file"
                id="image"
                onChange={handleImageChange}
                className="shadow border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Product:</label>
              <input
                type="text"
                id="title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="shadow border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description:</label>
              <textarea
                id="description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="shadow border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Price:</label>
              <input
                type="number"
                id="price"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                className="shadow border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
            >
              ➕ Create Item
            </button>
          </form>
        </div>

        <div className="w-full md:w-1/2 bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Shopping Cart ({cartItems.length} items)</h3>
          {cartItems.length === 0 ? (
            <p className="text-gray-500 italic">Your cart is empty. Add some products!</p>
          ) : (
            <>
              {cartItems.map((item, index) => (
                <CartItem
                  key={index}
                  image={item.image}
                  title={item.title}
                  price={item.price}
                  quantity={item.quantity}
                  onRemove={() => handleRemoveFromCart(item.title)}
                />
              ))}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between font-bold text-xl text-gray-900">
                  <span>Total:</span>
                  <span>${calculateTotal()}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="mt-4 w-full bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="w-full max-w-6xl mt-12">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Available Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((item, index) => (
            <ProductCard
              key={index}
              product={item}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductManager;