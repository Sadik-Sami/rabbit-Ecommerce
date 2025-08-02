const express = require('express');
const Checkout = require('../models/Checkout');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// @route POST /api/Checkout
// @desc Create a checkout session
// @access Private
router.post('/', protect, async (req, res) => {
	const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;
	if (!checkoutItems || checkoutItems.length === 0) {
		return res.status(400).json({ message: 'no items in checkout' });
	}

	try {
		// create a new checkout session
		const newCheckout = await Checkout.create({
			user: req.user._id,
			checkoutItems: checkoutItems,
			shippingAddress,
			paymentMethod,
			totalPrice,
			paymentStatus: 'Pending',
			isPaid: false,
		});
		console.log(`Checkout created for users: ${req.user._id}`);
		res.status(201).json(newCheckout);
	} catch (error) {
		console.error('Error Creating Checkout Session', error);
		res.status(500).json({ message: 'Server Error' });
	}
});

// @route PUT /api/checkout/:id/pay
// @desc Update checkout to mark as paid after successful payment
// @access Private
router.put('/:id/pay', protect, async (req, res) => {
	const { paymentStatus, paymentDetails } = req.body;
	try {
		const checkout = await Checkout.findById(req.params.id);

		if (!checkout) {
			return res.status(404).json({ message: 'Checkout not found' });
		}

		if (paymentStatus === 'Paid') {
			checkout.isPaid = true;
			checkout.paymentStatus = paymentStatus;
			checkout.paymentDetails = paymentDetails;
			checkout.paidAt = Date.now();
			await checkout.save();

			res.status(200).json(checkout);
		} else {
			res.status(400).json({ message: 'Invalid Payment Stauts' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server Error' });
	}
});
