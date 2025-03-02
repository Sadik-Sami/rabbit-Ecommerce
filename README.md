
---

# MERN eCommerce Backend

This is the backend for a MERN (MongoDB, Express.js, React, Node.js) eCommerce application. It provides the necessary APIs for user authentication, product management, and other eCommerce functionalities.

---

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
4. [Environment Variables](#environment-variables)
5. [API Endpoints](#api-endpoints)
6. [Folder Structure](#folder-structure)
7. [User Model](#user-model)
8. [Contributing](#contributing)
9. [License](#license)

---

## Features

- **User Authentication**: Register, login, and manage user roles (customer/admin).
- **Password Hashing**: Secure password storage using `bcryptjs`.
- **MongoDB Integration**: Seamless connection to MongoDB for data storage.
- **CORS Support**: Enable cross-origin requests for frontend integration.
- **RESTful APIs**: Basic API structure for future eCommerce functionalities.

---

## Technologies Used

### Backend
- **Node.js**: JavaScript runtime for building the server.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing application data.
- **Mongoose**: MongoDB object modeling for Node.js.
- **bcryptjs**: Library for hashing passwords.
- **dotenv**: Load environment variables from a `.env` file.
- **cors**: Middleware to enable CORS.

---

## Installation

To set up and run the backend locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Sadik-Sami/rabbit-Ecommerce.git
   ```

2. **Navigate to the backend directory**:
   ```bash
   cd rabbit-Ecommerce/backend
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Set up environment variables**:
   Create a `.env` file in the root of the backend directory and add the following variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://your-database-connection-string
   ```

5. **Start the server**:
   ```bash
   npm start
   ```
   For development with auto-restart, use:
   ```bash
   npm run dev
   ```

6. **Verify the server is running**:
   Open your browser or Postman and navigate to `http://localhost:5000`. You should see the message: `Welcome to Rabbit API`.

---

## Environment Variables

The following environment variables are required for the backend to function properly:

- `PORT`: The port on which the server will run (default: `5000`).
- `MONGO_URI`: The connection string for your MongoDB database.

Example `.env` file:
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/ecommerce?retryWrites=true&w=majority
```

---

## API Endpoints

### Base URL
`http://localhost:5000`

### Available Endpoints
- **GET `/`**: Welcome message.
  ```json
  {
    "message": "Welcome to Rabbit API"
  }
  ```

### Future Endpoints (To be implemented)
- **User Authentication**:
  - `POST /api/auth/register`: Register a new user.
  - `POST /api/auth/login`: Login an existing user.
- **Product Management**:
  - `GET /api/products`: Get all products.
  - `POST /api/products`: Create a new product (admin only).
  - `GET /api/products/:id`: Get a single product by ID.
  - `PUT /api/products/:id`: Update a product (admin only).
  - `DELETE /api/products/:id`: Delete a product (admin only).

---

## Folder Structure

```
backend/
├── config/
│   └── db.js               # MongoDB connection setup
├── models/
│   └── User.js             # User schema and model
├── server.js               # Entry point for the backend
├── package.json            # Project dependencies and scripts
├── package-lock.json       # Lock file for dependencies
└── .env                    # Environment variables (not committed to Git)
```

---

## User Model

The `User` model defines the schema for user data in the MongoDB database. It includes fields for user information, password hashing, and role management.

### Schema Definition
```javascript
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
  },
  { timestamps: true }
);
```

### Features
1. **Password Hashing**:
   - Passwords are hashed using `bcryptjs` before saving to the database.
   - The `pre('save')` middleware ensures the password is hashed whenever a user is created or updated.

   ```javascript
   userSchema.pre("save", async function (next) {
     if (!this.isModified("password")) return next();
     const salt = await bcrypt.genSalt(10);
     this.password = await bcrypt.hash(this.password, salt);
     next();
   });
   ```

2. **Password Matching**:
   - The `matchPassword` method compares the entered password with the hashed password stored in the database.

   ```javascript
   userSchema.methods.matchPassword = async function (enteredPassword) {
     return await bcrypt.compare(enteredPassword, this.password);
   };
   ```

3. **Role Management**:
   - Users can have one of two roles: `customer` (default) or `admin`.

4. **Timestamps**:
   - The `timestamps` option automatically adds `createdAt` and `updatedAt` fields to the schema.

---

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push to the branch.
4. Submit a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---