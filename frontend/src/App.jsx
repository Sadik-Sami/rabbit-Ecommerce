import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import UserLayout from './components/Layout/UserLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CollectionPage from './pages/CollectionPage';
import ProductDetails from './components/Products/ProductDetails';
import Checkout from './components/Cart/Checkout';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import MyOrdersPage from './pages/MyOrdersPage';
import AdminLayout from './components/Admin/AdminLayout';
import AdminHome from './pages/AdminHome';
import UserManagement from './components/Admin/UserManagement';

const App = () => {
	return (
		<BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
			<Toaster position='top-right' />
			<Routes>
				<Route path='/' element={<UserLayout />}>
					<Route index element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/profile' element={<Profile />} />
					<Route path='/collections/:collection' element={<CollectionPage />} />
					<Route path='/product/:id' element={<ProductDetails />} />
					<Route path='/Checkout' element={<Checkout />} />
					<Route path='/order-confirmation' element={<OrderConfirmationPage />} />
					<Route path='/order/:id' element={<OrderDetailsPage />} />
					<Route path='/my-orders' element={<MyOrdersPage />} />
				</Route>
				<Route path='/admin' element={<AdminLayout />}>
					<Route index element={<AdminHome />} />
					<Route path='users' element={<UserManagement />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
