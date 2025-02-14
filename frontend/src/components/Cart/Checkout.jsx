import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PayPalButton from './PayPalButton';
const cart = {
	products: [
		{
			name: 'Stylish Jacket',
			size: 'M',
			color: 'Black',
			price: 120,
			image: 'https://picsum.photos/150?randomm=1',
		},
		{
			name: 'Casual Sneakers',
			size: '42',
			color: 'White',
			price: 75,
			image: 'https://picsum.photos/150?randomm=2',
		},
	],
	totalPrice: 195,
};
const Checkout = () => {
	const navigate = useNavigate();
	const [checkoutId, setCheckoutId] = useState(null);
	const [shippingAddress, setShippingAddress] = useState({
		firstName: '',
		lastName: '',
		address: '',
		city: '',
		postalCode: '',
		country: '',
		phone: '',
	});

	const handleCreateCheckout = (e) => {
		e.preventDefault();
		setCheckoutId(123);
	};
	const handlePaymentSuccess = (details) => {
		console.log('Payment Successfull', details);
		navigate('/order-confirmation');
	};
	return (
		<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter'>
			{/* Left side */}
			<div className='bg-white rounded-lg p-6'>
				<h2 className='text-2xl uppercase mb-6'>Checkout</h2>
				<form onSubmit={handleCreateCheckout}>
					<h3 className='text-lg mb-4'>Contact Details</h3>
					<div className='mb-4'>
						<label className='block text-gray-700'>Email</label>
						<input
							type='email'
							name='email'
							id='email'
							value='user@example.com'
							className='w-full p-2 border rounded'
							disabled
						/>
					</div>
					<h3 className='text-lg mb-4'>Delivery</h3>
					<div className='mb-4 grid grid-cols-2 gap-4'>
						<div>
							<label className='block text-gray-700'>First Name</label>
							<input
								type='text'
								name='fName'
								id='fName'
								className='w-full p-2 border rounded'
								value={shippingAddress.firstName}
								onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })}
								required
							/>
						</div>
						<div>
							<label className='block text-gray-700'>Last Name</label>
							<input
								type='text'
								name='lName'
								id='lName'
								className='w-full p-2 border rounded'
								value={shippingAddress.lastName}
								onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })}
								required
							/>
						</div>
					</div>
					<div className='mb-4'>
						<label className='block text-gray-700'>Address</label>
						<input
							type='text'
							name='address'
							id='address'
							className='w-full p-2 border rounded'
							value={shippingAddress.address}
							onChange={(e) => setShippingAddress({ ...setShippingAddress, address: e.target.value })}
							required
						/>
					</div>
					<div className='mb-4 grid grid-cols-2 gap-4'>
						<div>
							<label className='block text-gray-700'>City</label>
							<input
								type='text'
								name='city'
								id='city'
								className='w-full p-2 border rounded'
								value={shippingAddress.city}
								onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
								required
							/>
						</div>
						<div>
							<label className='block text-gray-700'>Postal Code</label>
							<input
								type='text'
								name='postalCode'
								id='postalCode'
								className='w-full p-2 border rounded'
								value={shippingAddress.postalCode}
								onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
								required
							/>
						</div>
					</div>
					<div className='mb-4'>
						<label className='block text-gray-700'>Country</label>
						<input
							type='text'
							name='country'
							id='country'
							className='w-full p-2 border rounded'
							value={shippingAddress.country}
							onChange={(e) => setShippingAddress({ ...setShippingAddress, country: e.target.value })}
							required
						/>
					</div>
					<div className='mb-4'>
						<label className='block text-gray-700'>Phone</label>
						<input
							type='tel'
							name='phone'
							id='phone'
							className='w-full p-2 border rounded'
							value={shippingAddress.phone}
							onChange={(e) => setShippingAddress({ ...setShippingAddress, phone: e.target.value })}
							required
						/>
					</div>
					<div className='mt-6'>
						{!checkoutId ? (
							<button type='submit' className='w-full bg-black text-white py-3 rounded '>
								Continue to Payment
							</button>
						) : (
							<div>
								<h3 className='text-lg mb-4'>Pay with Paypal</h3>
								<PayPalButton
									amount={100}
									onSuccess={handlePaymentSuccess}
									onError={(err) => alert('Payment Failed. Try Again.')}
								/>
							</div>
						)}
					</div>
				</form>
			</div>
		</div>
	);
};
export default Checkout;
