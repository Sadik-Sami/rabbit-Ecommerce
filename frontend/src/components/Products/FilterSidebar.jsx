import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const FilterSidebar = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [filters, setFilters] = useState({});
	return <div>FilterSidebar</div>;
};
export default FilterSidebar;
