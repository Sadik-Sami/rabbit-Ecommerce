const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');
const products = require('./data/products');

dotenv.config();

// connect to mongoDB
mongoose.connect(process.env.MONGO_URI);

// Function to seed data
const seedData = async () => {
	try {
		// Clear existing data
		await Product.deleteMany();
		await User.deleteMany();

		// create default admin User
		const createdUser = await User.create({
			name: 'Admin User',
			email: 'admin@rabbit.com',
			password: '123456',
			role: 'admin',
		});
		// assign the default user ID to each product
		const userID = createdUser._id;
		const sampleProducts = products.map((product) => {
			return { ...product, user: userID };
		});
		// insert the products into the database
		await Product.insertMany(sampleProducts);
		console.log('product data seeded successfully!');
		process.exit();
	} catch (error) {
		console.error('Error Seeding data:', error);
		process.exit(1);
	}
};
seedData();
