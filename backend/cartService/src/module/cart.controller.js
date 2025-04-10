import { secret_key } from "../../index.js";
import { cartModel } from "../../database/cart.model.js";
import { erroHandler } from "../middlewares/errorHandler.js";

import jwt from "jsonwebtoken"
import { productModel } from "../../database/product.model.js";
export const getCart = erroHandler(async (req, res) => {
  const { token } = req.headers;
  let decoded;
  
  try {
      decoded = jwt.verify(token, secret_key);
  } catch (err) {
      return res.status(400).json({ err });
  }
  
  const userId = decoded.user._id;

  const cart = await cartModel.findOne({ owner: userId })
      .populate({
          path: 'items.product',  // Populate the 'product' field within the 'items' array
          select: 'name'          // Only select the 'name' field from the 'Product' model
      });

  if (cart && cart.items && cart.items.length > 0) {
      return res.json({ cart: cart });
  }

  return res.status(404).json({ msg: "Cart is empty" });
});


export const addItem = erroHandler(async (req, res) => {
    const { item } = req.params;
    const { token } = req.headers;
    
    let decoded;
    try {
      decoded = jwt.verify(token, secret_key);
    } catch (err) {
      return res.status(400).json({ err });
    }
  
    const userId = decoded.user._id;
    const cart = await cartModel.findOne({ owner: userId });
    const product = await productModel.findById(item);
  
    if (!product || product.quantity == 0) return res.status(404).json({ msg: "Product out of stock or not found" });
  
    if (cart) {
      const existingItem = cart.items.find(i => i.product.toString() === item);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.price = existingItem.quantity * product.price;
      } else {
        cart.items.push({ product: item, quantity: 1, price: product.price });
      }
      await cart.save();
    } else {
      await cartModel.create({ owner: userId, items: [{ product: item, quantity: 1, price: product.price }] });
    }
  
    product.quantity--;
    await product.save();
  
    res.json({ msg: cart ? "Cart is updated" : "Cart is created", cart });
  });


export const deleteItem = erroHandler(async (req, res) => {
    const { item } = req.params;
    const { token } = req.headers;

    // Verify token
    const decoded = jwt.verify(token, secret_key);
    const userId = decoded.user._id;

    // Find cart and product
    const cart = await cartModel.findOne({ owner: userId });
    const product = await productModel.findById(item);

    if (!cart || !product) {
        return res.status(404).json({ message: "Cart or product not found" });
    }

    // Find item index in cart
    const itemIndex = cart.items.findIndex(i => 
        i.product.toString() === item
    );

    if (itemIndex === -1) {
        return res.status(404).json({ message: "Item not in cart" });
    }

    // Decrease quantity
    const cartItem = cart.items[itemIndex];
    cartItem.quantity -= 1;
    
    // Restock product
    product.quantity += 1;

    // Update price
    cartItem.price = cartItem.quantity * product.price;

    // Remove item if quantity reaches 0
    if (cartItem.quantity === 0) {
        cart.items.splice(itemIndex, 1);
    }

    // Save changes
    await cart.save();
    await product.save();

    return res.json({ 
        message: "Quantity decreased",
        cart: cart 
    });
});