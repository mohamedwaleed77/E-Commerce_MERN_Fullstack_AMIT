import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import i18n from '../../../lib/lang';
import { useSelector } from 'react-redux';
import { ip_adress } from '../layout';

export default function Productcard(props) {
  const toggleLanguage = useSelector((state) => state.toggle.value);
  const { _id, name, category, price, quantity } = props.product;
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);
  const [imageVersion] = useState(Date.now()); // For fresh image loading
  const [cartMessage, setCartMessage] = useState(""); // For displaying cart messages
  const [currentQuantity, setCurrentQuantity] = useState(quantity);

  const handleAddToCart = async () => {
    if (currentQuantity > 0) {
      try {
        const res = await fetch(`http://${ip_adress}:3001/${_id}`, {
          method: 'POST',
          headers: {
            token: Cookies.get('token'),
          },
        });

        const data = await res.json(); // Wait for the response to be parsed as JSON

        if (res.ok) {
          setCartMessage(t("Itemaddedtocart"));
          setCurrentQuantity(currentQuantity - 1); // Decrease quantity after adding to cart
        } else {
          setCartMessage(data.msg || data.err || data.error); // Use the parsed data
        }
      } catch (err) {
        console.error(err);
        setCartMessage(t("add_to_cart_error"));
      }
    } else {
      setCartMessage(t("Outofstock"));
    }
  };

  if (!isVisible) return null;

  return (
    <div className='bg-white flex flex-col rounded-2xl p-5 w-100 shadow-lg'>
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="w-32 h-32 relative">
          <img
            src={`http://${ip_adress}:3003/uploads/${_id}?v=${imageVersion}`}
            alt={name}
            className="w-full h-full object-contain border rounded"
            onError={(e) => {
              e.target.src = '/placeholder-product.png';
            }}
          />
        </div>

        <div className="flex-1">
          <table className="w-full">
            <tbody>
              <tr className="bg-white">
                <td colSpan="2">
                  <h3 className="text-xl font-semibold">{name}</h3>
                </td>
              </tr>
              <tr className="bg-gray-100">
                <td><strong>{t("Category")}:</strong></td>
                <td>{category}</td>
              </tr>
              <tr className="bg-white">
                <td><strong>{t("Price")}:</strong></td>
                <td>${price.toFixed(2)}</td>
              </tr>
              <tr className="bg-gray-100">
                <td><strong>{t("Quantity")}:</strong></td>
                <td>{currentQuantity}</td>
              </tr>
            </tbody>
          </table>

          <div className="mt-4">
            <button
              onClick={handleAddToCart}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
            >
              {t("Addtocart")}
            </button>
            {cartMessage && (
              <p className="mt-2 text-sm text-gray-600">{cartMessage}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
