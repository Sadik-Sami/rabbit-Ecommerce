const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Helper function to get cart by userId or guestId
const getCart = async (userId, guestId) => {
	if (userId) {
		return await Cart.findOne({ userId: userId });
	} else if (guestId) {
		return await Cart.findOne({ guestId: guestId });
	} else return null;
};

// @route POST /api/cart
// @desc Add a product to the cart for a guest or logged-in user
// @access Public
router.post('/', async (req, res) => {
	const { productId, quantity, size, color, guestId, userId } = req.body;
	try {
		const product = await Product.findById(productId);
		if (!product) {
			return res.status(404).json({ message: 'Product not found' });
		}
		// Determine if the request is from a guest or a logged-in user
		let cart = await getCart(userId, guestId);

		// if the cart exists, update it; otherwise, create a new one
		if (cart) {
			const productIndex = cart.products.findIndex(
				(p) => p.productId.toString() === productId && p.size === size && p.color === color
			);
			if (productIndex > -1) {
				// if the product already exists in the cart, update the quantity
				cart.products[productIndex].quantity += quantity;
			} else {
				// add new product to the cart
				cart.products.push({
					productId,
					name: product.name,
					image: product.images[0].url,
					price: product.price,
					size,
					color,
					quantity,
				});
			}
			// Recalculate the total price
			cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
			await cart.save();
			return res.status(200).json(cart);
		} else {
			// Create a new cart for the guest or user
			const newCart = await Cart.create({
				userId: userId ? userId : undefined,
				guestId: guestId ? guestId : 'guest_' + new Date().getTime(),
				products: [
					{
						productId,
						name: product.name,
						image: product.images[0].url,
						price: product.price,
						size,
						color,
						quantity,
					},
				],
				totalPrice: product.price * quantity,
			});
			return res.status(201).json(newCart);
		}
	} catch (error) {
		console.error('Error adding product to cart:', error);
		return res.status(500).json({ message: 'Server error', error: error.message });
	}
});

// @route PUT /api/cart
// @desc Update a product quantity in the cart for a guest or logged-in user
// @access Public
router.put('/', async (req, res) => {
	const { productId, quantity, size, color, guestId, userId } = req.body;
	try {
		let cart = await getCart(userId, guestId);
		if (!cart) return res.status(404).json({ message: 'Cart not found' });

		const productIndex = cart.products.findIndex(
			(p) => p.productId.toString() === productId && p.size === size && p.color === color
		);
		if (productIndex > -1) {
			// update quantitiy
			if (quantity > 0) {
				cart.products[productIndex].quantity = quantity;
			} else {
				// Remove product if quantity is 0 [splice(start, deleteCount)]
				cart.products.splice(productIndex, 1);
			}
			cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
			await cart.save();
			return res.status(200).json(cart);
		} else {
			return res.status(404).json({ message: 'Product not found in cart' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server Error' });
	}
});

// @route Delete /api/cart
// @desc remove a product from the cart
// access Public
router.delete('/', async (req, res) => {
	const { productId, size, color, guestId, userId } = req.body;
	try {
		let cart = await getCart(userId, guestId);
		if (!cart) return res.status(404).json({ message: 'Cart not found' });
		const productIndex = cart.products.findIndex(
			(p) => p.productId.toString() === productId && p.size === size && p.color === color
		);
		if (productIndex > -1) {
			// Remove product from cart
			cart.products.splice(productIndex, 1);
			// Recalculate total price
			cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
			await cart.save();
			return res.status(200).json(cart);
		} else {
			return res.status(404).json({ message: 'Product not found in cart' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server Error' });
	}
});

// @route GET /api/cart
// @desc Get the cart for a guest or logged-in user
// @access Public
router.get('/', async (req, res) => {
	const { guestId, userId } = req.query;
	try {
		const cart = await getCart(userId, guestId);
		if (!cart) return res.status(404).json({ message: 'Cart not found' });
		return res.status(200).json(cart);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server Error' });
	}
});

module.exports = router;
