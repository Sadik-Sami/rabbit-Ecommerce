---

# Rabbit MERN eCommerce Backend

Welcome to the backend for the Rabbit eCommerce platform!  
This Node.js/Express/MongoDB API powers user authentication, product management, and shopping cart features for a modern eCommerce app.

---

## Table of Contents

1. [Features](#features)
2. [Project Structure](#project-structure)
3. [Models](#models)
4. [API Routes & Examples](#api-routes--examples)
5. [Installation](#installation)
6. [Environment Variables](#environment-variables)
7. [Contributing](#contributing)
8. [License](#license)

---

## Features

- User registration, login, and JWT authentication
- Admin/user roles
- Product CRUD (admin only for create/update/delete)
- Product filtering, search, and sorting
- Shopping cart for guests and logged-in users
- MongoDB/Mongoose integration
- CORS support

---

## Project Structure

```
backend/
├── config/           # Database connection
├── data/             # Seed data (products)
├── middleware/       # Auth middleware
├── models/           # Mongoose models (User, Product, Cart)
├── routes/           # Express routes (users, products, cart)
├── server.js         # App entry point
├── seeder.js         # DB seeder script
├── package.json
└── .env
```

---

## Models

### User

```js
{
  name: String,         // required
  email: String,        // required, unique
  password: String,     // required (hashed)
  role: String,         // 'customer' (default) or 'admin'
  createdAt, updatedAt
}
```

### Product

```js
{
  name: String,             // required
  description: String,      // required
  price: Number,            // required
  discountPrice: Number,
  countInStock: Number,     // required
  sku: String,              // required, unique
  category: String,         // required
  brand: String,
  sizes: [String],          // required
  colors: [String],         // required
  collections: String,      // required
  material: String,
  gender: String,           // 'Men', 'Women', 'Unisex'
  images: [{ url, altText }],
  isFeatured: Boolean,
  isPublished: Boolean,
  rating: Number,
  numReviews: Number,
  tags: [String],
  user: ObjectId,           // admin who created
  metaTitle, metaDescription, metaKeywords,
  dimensions: { length, width, height },
  weight: Number,
  createdAt, updatedAt
}
```

### Cart

```js
{
  userId: ObjectId,      // for logged-in users
  guestId: String,       // for guests
  products: [
    {
      productId: ObjectId,
      name: String,
      image: String,
      price: Number,
      size: String,
      color: String,
      quantity: Number
    }
  ],
  totalPrice: Number,
  createdAt, updatedAt
}
```

---

## API Routes & Examples

### Root

- **GET /**  
  _Welcome message_
  ```json
  { "message": "Welcome to Rabbit API" }
  ```

---

### User Routes

#### Register

- **POST /api/users/register**
  - Request:
    ```json
    { "name": "John", "email": "john@example.com", "password": "123456" }
    ```
  - Response:
    ```json
    {
      "user": { "_id": "...", "name": "John", "email": "john@example.com", "role": "customer" },
      "token": "JWT_TOKEN"
    }
    ```

#### Login

- **POST /api/users/login**
  - Request:
    ```json
    { "email": "john@example.com", "password": "123456" }
    ```
  - Response:
    ```json
    {
      "user": { "_id": "...", "name": "John", "email": "john@example.com", "role": "customer" },
      "token": "JWT_TOKEN"
    }
    ```

#### Profile

- **GET /api/users/profile**  
  _Requires Bearer token_
  - Response:
    ```json
    {
      "_id": "...",
      "name": "John",
      "email": "john@example.com",
      "role": "customer",
      "createdAt": "...",
      "updatedAt": "..."
    }
    ```

---

### Product Routes

#### Create Product (Admin only)

- **POST /api/products**  
  _Requires Bearer token (admin)_
  - Request: (see Product model above)
  - Response:
    ```json
    { "createdProduct": { ...productFields } }
    ```

#### Update Product (Admin only)

- **PUT /api/products/:id**  
  _Requires Bearer token (admin)_
  - Request: (fields to update)
  - Response:  
    Updated product object

#### Delete Product (Admin only)

- **DELETE /api/products/:id**  
  _Requires Bearer token (admin)_
  - Response:
    ```json
    { "message": "Product Removed" }
    ```

#### Get All Products

- **GET /api/products?query=...**
  - Query params:  
    `collection`, `size`, `color`, `gender`, `minPrice`, `maxPrice`, `sortBy`, `search`, `category`, `material`, `brand`, `limit`
  - Response:  
    Array of products

#### Get Best Seller

- **GET /api/products/best-seller**
  - Response:  
    Single product with highest rating

#### Get New Arrivals

- **GET /api/products/new-arrivals**
  - Response:  
    Latest 8 products

#### Get Product by ID

- **GET /api/products/:id**
  - Response:  
    Product object

#### Get Similar Products

- **GET /api/products/similar/:id**
  - Response:  
    Up to 4 similar products (same gender & category)

---

### Cart Routes

#### Add to Cart

- **POST /api/cart**
  - Request:
    ```json
    {
      "productId": "...",
      "quantity": 2,
      "size": "M",
      "color": "Red",
      "guestId": "guest_123",   // or userId if logged in
      "userId": "..."           // optional
    }
    ```
  - Response:  
    Cart object

#### Update Cart Item

- **PUT /api/cart**
  - Request:
    ```json
    {
      "productId": "...",
      "quantity": 3,
      "size": "M",
      "color": "Red",
      "guestId": "guest_123",   // or userId if logged in
      "userId": "..."           // optional
    }
    ```
  - Response:  
    Updated cart object

#### Remove Product from Cart

- **DELETE /api/cart**
  - Request:
    ```json
    {
      "productId": "...",
      "size": "M",
      "color": "Red",
      "guestId": "guest_123",   // or userId if logged in
      "userId": "..."           // optional
    }
    ```
  - Response:  
    Updated cart object

#### Get Cart

- **GET /api/cart**
  - Query params:
    - `guestId` (for guests)
    - `userId` (for logged-in users)
  - Example:
    ```
    /api/cart?guestId=guest_123
    ```
  - Response:  
    Cart object

#### Merge Guest Cart with User Cart

- **POST /api/cart/merge**
  - _Requires Bearer token (user must be logged in)_
  - Request:
    ```json
    {
      "guestId": "guest_123"
    }
    ```
  - Response:  
    Merged cart object

---

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sadik-Sami/rabbit-Ecommerce.git
   cd rabbit-Ecommerce/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**  
   Create a `.env` file:
   ```
   PORT=5000
   MONGO_URI=your-mongodb-uri
   JWT_SECRET=your-secret
   ```

4. **Seed the database** (optional)
   ```bash
   npm run seed
   ```

5. **Start the server**
   ```bash
   npm start
   # or for development:
   npm run dev
   ```

---

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT signing

---

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push to the branch.
4. Submit a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---