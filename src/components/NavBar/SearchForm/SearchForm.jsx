import React from 'react';
import { Icon } from 'src/components/CustomComponents/Icon/Icon';
import './search.css';

const Search = ({ searchValues, setSearchValues, handleSearch }) => {
	return (
		<div className="container">
			<form className="search-form" onSubmit={(e) => handleSearch(e)}>
				<div id="search-input">
					<Icon name="search" height="18" width="17" id="search-icon" />
					<input
						placeholder="Search product by name"
						name="keyword"
						onChange={(e) => setSearchValues({ ...searchValues, keyword: e.target.value })}
						value={searchValues.keyword}
					/>
				</div>
				<div id="location-input">
					<Icon name="location" width="13" height="19" id="location-icon" />
					<input
						placeholder="Location"
						name="location"
						onChange={(e) => setSearchValues({ ...searchValues, location: e.target.value })}
						value={searchValues.location}
					/>
				</div>
				<div>
					<button className="search-btn" type="submit">
						Search
					</button>
				</div>
			</form>
		</div>
	);
};

export default Search;
