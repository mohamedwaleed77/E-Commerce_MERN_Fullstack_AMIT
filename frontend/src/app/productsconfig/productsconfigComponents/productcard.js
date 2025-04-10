import React, { useState, useRef } from 'react';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import i18n from '../../../../lib/lang';

export default function Productcard(props) {
  const { _id, name, category, price, quantity, image } = props.product;
  const t = useTranslation();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ 
    name, 
    category, 
    price, 
    quantity 
  });
  const [currentProduct, setCurrentProduct] = useState({ 
    name, 
    category, 
    price, 
    quantity 
  });
  const [isVisible, setIsVisible] = useState(true);
  const [newImage, setNewImage] = useState(null);
  const [imageVersion, setImageVersion] = useState(0); // For force reloading images
  const fileInputRef = useRef(null);

  const handleDelete = async () => {
    if (!window.confirm(i18n.t('confirm_delete_product', { product: currentProduct.name }))) return;

    try {
      const res = await fetch(`http://localhost:3003/${_id}`, {
        method: 'DELETE',
        headers: {
          token: Cookies.get('token'),
        },
      });
      if (res.ok) {
        alert(i18n.t('product_deleted'));
        setIsVisible(false);
      } else {
        alert(i18n.t('delete_failed'));
      }
    } catch (err) {
      console.error(err);
      alert(i18n.t('delete_error'));
    }
  };

  const handleEditClick = () => setIsEditing(true);

  const handleCancel = () => {
    setEditedProduct(currentProduct);
    setNewImage(null);
    setIsEditing(false);
  };

  const handleSubmit = async () => {
    try {
      // Update product details
      const res = await fetch(`http://localhost:3003/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: Cookies.get('token'),
        },
        body: JSON.stringify({
          ...editedProduct,
          price: parseFloat(editedProduct.price),
          quantity: parseInt(editedProduct.quantity)
        }),
      });
      
      if (!res.ok) {
        throw new Error(i18n.t('update_failed'));
      }

      // Upload new image if selected
      if (newImage) {
        const formData = new FormData();
        formData.append('image', newImage);

        const imageRes = await fetch(`http://localhost:3003/uploadImage/${_id}`, {
          method: 'POST',
          body: formData,
          headers: {
            token: Cookies.get('token'),
          },
        });

        if (!imageRes.ok) {
          throw new Error(i18n.t('image_upload_failed'));
        }

        // Force image refresh
        setImageVersion(Date.now());
      }

      alert(i18n.t('product_updated'));
      setCurrentProduct(editedProduct);
      setNewImage(null);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert(err.message || i18n.t('update_error'));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'quantity' ? Number(value) : value
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage(e.target.files[0]);
    }
  };

  if (!isVisible) return null;

  return (
    <div className='bg-white flex flex-col rounded-2xl p-5 w-100 shadow-lg'>
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="w-32 h-32 relative">
        <label className="cursor-pointer w-full h-full block">
          <img
            src={`http://localhost:3003/uploads/${_id}?v=${imageVersion}`}
            alt={name}
            className="w-full h-full object-contain border rounded"
            onError={(e) => {
              e.target.src = '/placeholder-product.png';
            }}
          />
          {isEditing && (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="hidden"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-40 rounded flex items-center justify-center text-white text-xs font-semibold">
                {i18n.t('click_to_change')}
              </div>
            </>
          )}
        </label>
        {newImage && (
          <div className="absolute bottom-0 right-0 bg-green-500 text-white px-2 py-1 rounded text-xs">
            {i18n.t('new_image_selected')}
          </div>
        )}
      </div>

        <div className="flex-1">
          <table className="w-full">
            <tbody>
              {/* Product Name */}
              <tr className="bg-white">
                <td colSpan="2">
                  {isEditing ? (
                    <input
                      className="text-xl w-full p-1 border rounded"
                      name="name"
                      value={editedProduct.name}
                      onChange={handleChange}
                    />
                  ) : (
                    <h3 className="text-xl font-semibold">{currentProduct.name}</h3>
                  )}
                </td>
              </tr>

              {/* Category */}
              <tr className="bg-gray-100">
                <td><strong>{i18n.t("Category")}:</strong></td>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      className="w-full p-1 border rounded"
                      name="category"
                      value={editedProduct.category}
                      onChange={handleChange}
                    />
                  ) : (
                    currentProduct.category
                  )}
                </td>
              </tr>

              {/* Price */}
              <tr className="bg-white">
                <td><strong>{i18n.t("Price")}:</strong></td>
                <td>
                  {isEditing ? (
                    <input
                      type="number"
                      className="w-full p-1 border rounded"
                      name="price"
                      value={editedProduct.price}
                      onChange={handleChange}
                      step="0.01"
                    />
                  ) : (
                    `$${currentProduct.price.toFixed(2)}`
                  )}
                </td>
              </tr>

              {/* Quantity */}
              <tr className="bg-gray-100">
                <td><strong>{i18n.t("Quantity")}:</strong></td>
                <td>
                  {isEditing ? (
                    <input
                      type="number"
                      className="w-full p-1 border rounded"
                      name="quantity"
                      value={editedProduct.quantity}
                      onChange={handleChange}
                    />
                  ) : (
                    currentProduct.quantity
                  )}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Action Buttons */}
          <div className="mt-4 flex gap-2 flex-wrap">
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              {i18n.t("Delete")}
            </button>

            {isEditing ? (
              <>
                <button
                  onClick={handleSubmit}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  {i18n.t("Save")}
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                >
                  {i18n.t("Cancel")}
                </button>
              </>
            ) : (
              <button
                onClick={handleEditClick}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                {i18n.t("Edit")}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}