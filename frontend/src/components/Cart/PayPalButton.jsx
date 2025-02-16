import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
const PayPalButton = ({ amount, onSuccess, onError }) => {
	return (
		<PayPalScriptProvider
			options={{
				clientId: 'AaEZIgHhLI5OwqNu9DEwp688siDs2T1-ONRmdbwr9a-gwU6gV0mJ-02TZ6YIeDJYgt_UbgW0IUakJBi9',
			}}>
			<PayPalButtons
				style={{ layout: 'vertical' }}
				createOrder={(data, actions) => {
					return actions.order.create({
						purchase_units: [{ amount: { value: amount } }],
					});
				}}
				onApprove={(data, actions) => {
					return actions.order.capture().then(onSuccess);
				}}
				onError={onError}
			/>
		</PayPalScriptProvider>
	);
};
export default PayPalButton;
