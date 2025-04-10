'use client';

import { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import i18n from '../../../lib/lang';
import { useSelector } from 'react-redux';
import Checkout from './checkout';

export default function Cart() {
  const t=useTranslation
  const [cartItems, setCartItems] = useState([]);
  const [msg, setMsg] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const intervals = useRef({});
  const toggleLanguage = useSelector((state) => state.toggle.value);
  const fetchCart = () => {
    fetch('http://localhost:3001/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'token': Cookies.get('token'),
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
 

        if (res.cart?.items) {
          setCartItems(res.cart.items);
          const total = res.cart.items.reduce((acc, item) => acc + item.price, 0);
          setTotalPrice(total);
        } else {
 
        }
      })
      .catch((err) => {
        console.error("Error fetching cart:", err);
 
      });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = (productId, type) => {
    const method = type === 'increase' ? 'POST' : 'DELETE';

    fetch(`http://localhost:3001/${productId}`, {
      method,
      headers: {
        'token': Cookies.get('token'),
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.err||res.error) alert(res.err||res.error)
        fetchCart();
      })
  };

  const handleMouseDown = (productId, type) => {
    updateQuantity(productId, type);
    const intervalId = setInterval(() => {
      updateQuantity(productId, type);
    }, 100);
    intervals.current[productId + type] = intervalId;
  };

  const handleMouseUp = (productId, type) => {
    clearInterval(intervals.current[productId + type]);
  };

  return (
    <div className='text-center'>
       <Checkout></Checkout>
    <div className="flex flex-col items-center gap-2">
            {cartItems.length > 0 && (
        <div className="text-2xl font-bold mt-4">{i18n.t("Total")}: {totalPrice} EGP</div>
      )}
      {msg && (
        <div className="text-xl text-red-500 flex flex-col items-center">
          <img src="empty_cart.png" alt="Empty Cart" />
          <p>{msg}</p>
        </div>
      )}

      {cartItems.map((item) => (
        <div
          key={item._id}
          className="flex items-center gap-5 border p-4 rounded-xl shadow-md w-full max-w-xl"
        >
          <img
            src={`http://localhost:3003/uploads/${item.product._id}`}
            alt={item.product.name}
            className="w-24 h-24 object-cover rounded"
          />
          <div className="flex-1">
            <h2 className="text-xl font-semibold">{item.product.name}</h2>
            <p>{i18n.t("Price")}: {item.price} EGP</p>
            <p>{i18n.t("Quantity")}: {item.quantity}</p>
          </div>
          <div className="flex flex-col gap-2">
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
              onMouseDown={() => handleMouseDown(item.product._id, 'increase')}
              onMouseUp={() => handleMouseUp(item.product._id, 'increase')}
              onMouseLeave={() => handleMouseUp(item.product._id, 'increase')}
            >
              +
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              onMouseDown={() => handleMouseDown(item.product._id, 'decrease')}
              onMouseUp={() => handleMouseUp(item.product._id, 'decrease')}
              onMouseLeave={() => handleMouseUp(item.product._id, 'decrease')}
            >
              -
            </button>
          </div>
        </div>
      ))}


    </div>
    </div>
  );
}
