import { useNavigate } from 'react-router-dom';
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
	return <div>Checkout</div>;
};
export default Checkout;
