import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import AdminSidebar from './AdminSidebar';
import { Outlet } from 'react-router-dom';
const AdminLayout = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};
	return (
		<div className='min-h-screen flex flex-col md:flex-row relative'>
			{/* Mobile Toggle Button */}
			<div className='flex md:hidden p-4 bg-gray-900 text-white z-20'>
				<button onClick={toggleSidebar}>
					<FaBars size={24} />
				</button>
				<h1 className='text-xl ml-4 font-medium'>Admin Dashboard</h1>
			</div>
			{/* Overlay for mobile sidebar */}
			{isSidebarOpen && (
				<div onClick={toggleSidebar} className='fixed inset-0 bg-black z-10 bg-opacity-50 md:hidden'></div>
			)}
			{/* sidebar */}
			<div
				className={`bg-gray-900 w-64 min-h-screen text-white absolute md:relative transform ${
					isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
				} transition-transform duration-300 md:translate-x-0 md:static md:block z-20`}>
				{/* sidebar */}
				<AdminSidebar />
			</div>
			{/* Main Content */}
			<div className='flex-grow p-6 overflow-auto'>
				<Outlet />
			</div>
		</div>
	);
};
export default AdminLayout;
