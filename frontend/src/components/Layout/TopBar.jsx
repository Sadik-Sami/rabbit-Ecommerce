import { TbBrandMeta } from 'react-icons/tb';
import { IoLogoInstagram } from 'react-icons/io';
import { RiTwitterXLine } from 'react-icons/ri';
const TopBar = () => {
	return (
		<div className='bg-rabbit-red text-white'>
			<div className='container mx-auto flex justify-between items-center py-3 px-4'>
				<div className='items-center space-x-4 hidden md:flex'>
					<a href='#' className='hover:text-gray-300'>
						<TbBrandMeta className='h-5 w-5' />
					</a>
					<a href='#' className='hover:text-gray-300'>
						<IoLogoInstagram className='h-5 w-5' />
					</a>
					<a href='#' className='hover:text-gray-300'>
						<RiTwitterXLine className='h-5 w-5' />
					</a>
				</div>
				<div className='text-sm text-center flex-grow'>
					<span>We ship worldwide - Fast and reliable shipping!</span>
				</div>
				<div className='text-sm hidden md:block'>
					<a href='tel:+8801318446398' className='hover:text-gray-300'>
						+880 {13} 1844-6398
					</a>
				</div>
			</div>
		</div>
	);
};

export default TopBar;
