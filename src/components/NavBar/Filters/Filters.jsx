import React from 'react';
import ClearFilters from './ClearFilters';
import { useLocation } from 'react-router-dom';

const Filters = ({ handleSearch, searchValues, setSearchValues }) => {
  const location = useLocation();

  return (
    <div className="container">
      <form onSubmit={(e) => handleSearch(e)} className="product-filters">
        <div>
          {searchValues.priceFrom ? <span className="dollar" /> : ''}
          <input
            placeholder="Price from (USD)"
            name="priceFrom"
            type="number"
            min="0"
            step="any"
            value={searchValues.priceFrom}
            onChange={(e) => setSearchValues({ ...searchValues, priceFrom: e.target.value })}
          />
        </div>
        <hr className="price-between" />
        <div>
          {searchValues.priceTo ? <span className="dollar" /> : ''}
          <input
            placeholder="Price to (USD)"
            name="priceTo"
            type="number"
            min="1"
            step="any"
            value={searchValues.priceTo}
            onChange={(e) => setSearchValues({ ...searchValues, priceTo: e.target.value })}
          />
          <button type="submit" className="filter-btn">
            Filter
          </button>
        </div>
      </form>
      {location.search && <ClearFilters />}
    </div>
  );
};

export default Filters;
