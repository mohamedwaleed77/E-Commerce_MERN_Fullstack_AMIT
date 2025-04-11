# 🛍️ Full-Stack eCommerce Website (MERN Stack)

This is a full-featured eCommerce platform built with the **MERN stack** (MongoDB, Express.js, React, Node.js). The app allows users to browse and purchase products, while admins can manage the catalog, view orders, and handle user accounts.

---

## 🚀 Features

### 🌟 Supports Arabic | English Languages
- Using I18next library to translate 
- State of language is passed to all components using redux

### ✅ User Authentication & Authorization
- JWT-based user authentication.
- Role-based access for Admin and regular users.
- Profile view and update for authenticated users.
- Middle-wares to check authorization and tokens status.
- If user's Role is not admin configuration paths will render 404
- If user was able to reach the admin configuration paths somehow he can't really do anything there.

### 🛒 Product Catalog
- Browse products with images,descriptions, prices.
- Filter products by category, and price.
- Stock availability and user reviews.
- Pagination exists in this project but as Admin may want to see everything it's not use properly.

### 🧺 Shopping Cart
- Add, remove, or update quantities of items in the cart.
- Cart summary with total price calculation.
- Cart brought from the database using the token to show only user's cart.

### 📦 Order Management
- Checkout process with shipping information and payment method selection.
- Order summary showing products, quantities, and total price.
- Payment integration (interface only) with Stripe .
- Logged-in users can view their past orders.

### 🛠️ Admin Dashboard
- Admins can add, edit, and delete products.
- Track product stock and manage inventory.
- Manage user accounts (e.g., delete users).

### 📱 Responsive Design
- Mobile-friendly interface using Bootstrap or Material-UI.
- Optimized layout across desktops, tablets, and smartphones.

### 🔐 Security and Best Practices
- Secure JWT authentication.
- Passwords encrypted with bcrypt.
- CSRF protection via headers and tokens.

### 🤏 Microservices Architecture (YES I couldn't find better emoji)
- Each service is Isolated in a docker container.
- If a service failed it will be restarted.
 
### 📊 Monitoring metrics Using Promethues | Grafana | cAdvisor
![alt text](backend/metrics.png)