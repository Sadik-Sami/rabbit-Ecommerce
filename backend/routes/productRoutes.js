const express = require('express');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// @route POST /api/products
// @desc Create a new Product
// @access Private/Admin
router.post('/', protect, admin, async (req, res) => {
	try {
		const {
			name,
			description,
			price,
			discountPrice,
			countInStock,
			category,
			brand,
			sizes,
			colors,
			collections,
			material,
			gender,
			images,
			isFeatured,
			isPublished,
			tags,
			dimensions,
			weight,
			sku,
		} = req.body;

		const product = new Product({
			name,
			description,
			price,
			discountPrice,
			countInStock,
			category,
			brand,
			sizes,
			colors,
			collections,
			material,
			gender,
			images,
			isFeatured,
			isPublished,
			tags,
			dimensions,
			weight,
			sku,
			user: req.user._id, //Reference to the admin user who created the product
		});

		const createdProduct = await product.save();
		res.status(201).json({ createdProduct });
	} catch (error) {
		console.log(error);
		res.status(500).send('Server Error');
	}
});

// @router PUT /api/products/:id
// @desc Update an existing product by it's id
// @access Private/admin
router.put('/:id', protect, admin, async (req, res) => {
	try {
		const {
			name,
			description,
			price,
			discountPrice,
			countInStock,
			category,
			brand,
			sizes,
			colors,
			collections,
			material,
			gender,
			images,
			isFeatured,
			isPublished,
			tags,
			dimensions,
			weight,
			sku,
		} = req.body;

		// Find product by ID
		const product = await Product.findById(req.params.id);
		if (product) {
			// update product field
			product.name = name || product.name;
			product.description = description || product.description;
			product.price = price || product.price;
			product.discountPrice = discountPrice || product.discountPrice;
			product.countInStock = countInStock || product.countInStock;
			product.category = category || product.category;
			product.brand = brand || product.brand;
			product.sizes = sizes || product.sizes;
			product.colors = colors || product.colors;
			product.collections = collections || product.collections;
			product.material = material || product.material;
			product.gender = gender || product.gender;
			product.images = images || product.images;
			product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
			product.isPublished = isPublished !== undefined ? isPublished : product.isPublished;
			product.tags = tags || product.tags;
			product.dimensions = dimensions || product.dimensions;
			product.weight = weight || product.weight;
			product.sku = sku || product.sku;

			// save the updated product
			const updatedProduct = await product.save();
			res.json(updatedProduct);
		} else {
			res.status(404).json({ message: 'Product Not Found' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).send('Server Error');
	}
});

// @router Delete /api/products/:id
// @desc Delete a product by it's id
// @access Private/admin
router.delete('/:id', protect, admin, async (req, res) => {
	try {
		// Find product by ID
		const product = await Product.findById(req.params.id);
		if (product) {
			// remove from database
			await product.deleteOne();
			res.json({ message: 'Product Removed' });
		} else {
			res.status(404).json({ message: 'Product Not Found' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).send('Server Error');
	}
});
module.exports = router;
