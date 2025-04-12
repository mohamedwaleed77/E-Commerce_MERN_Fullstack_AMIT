'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import Checkout from './checkout';
import { useSelector } from 'react-redux';
import { ip_adress } from '../layout';

export default function Cart() {
  const toggleLanguage = useSelector((state) => state.toggle.value);
  const { t } = useTranslation();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get('token');

  const fetchCart = async () => {
    try {
      const res = await fetch(`http://${ip_adress}:3001/`, {
        method: 'GET',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (data.cart)
      setCartItems(data.cart.items || []);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, method) => {
    try {
      // Optimistically remove from UI if deleting with quantity === 1
      if (method === 'DELETE') {
        const item = cartItems.find(item => item.product._id === productId);
        if (item && item.quantity === 1) {
          setCartItems(prev => prev.filter(i => i.product._id !== productId));
        }
      }
  
      await fetch(`http://${ip_adress}:3001/${productId}`, {
        method,
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });
  
      await fetchCart(); // still refresh to sync with backend
    } catch (error) {
      console.error(`${method} request failed for product ${productId}:`, error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const getTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price, 0);

  if (loading) return <div className="text-center mt-10">Loading cart...</div>;

  return (
    <div className='flex flex-col items-center'>
      <Checkout/>
    <div className="text-center flex flex-col content-center gap-10 p-6 w-1/2">
      <h1 className="text-2xl font-bold">{t('YourCart')}</h1>

      {cartItems.length === 0 ? (
        <div className='flex flex-col justify-center items-center gap-5'>
        <p>{t('empty_cart')}</p>
        <img src='empty_cart.png' className='w-40'></img>
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.product._id} className="flex flex-col items-center border p-4 rounded shadow gap-2">
              <img
                src={`http://${ip_adress}:3003/uploads/${item.product._id}`}
                alt={item.product.name}
                className="w-32 h-32 object-cover"
              />
              <h2 className="text-lg font-semibold">{item.product.name}</h2>
              <p>{t('Quantity')}: {item.quantity}</p>
              <div className="flex gap-4">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded"
                  onClick={() => updateQuantity(item.product._id, 'POST')}
                >
                  +
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => updateQuantity(item.product._id, 'DELETE')}
                >
                  -
                </button>
              </div>
              <p className="text-gray-700">{t('Price')}: ${item.price.toFixed(2)}</p>
            </div>
          ))}

          <div className="mt-6 text-xl font-bold">
            {t('Total')}: ${getTotal().toFixed(2)}
          </div>
        </>
      )}
    </div>
    </div>
  );
}
