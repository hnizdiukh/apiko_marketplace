import React, { useState, useEffect } from 'react';
import routes from 'src/routes/config';
import { useHistory, useLocation } from 'react-router-dom';
import { Icon } from 'src/components/CustomComponents/Icon/Icon';
import { Unquery, replaceLocationURL, stringify } from 'unquery';

const ClearFilters = () => {
  const [ filtersArray, setFiltersArray ] = useState({});
  const history = useHistory();
  const location = useLocation();

  const handleClearFilters = (e) => {
    e.preventDefault();
    history.push(routes.HOME);
  };

  const handleClearFilter = (filterKey) => {
    delete filtersArray[filterKey];
    history.push(routes.HOME + '?' + stringify(filtersArray));
  };

  useEffect(
    () => {
      let searchParams;
      if (location.search) {
        searchParams = Unquery(
          location.search,
          {
            keywords: Unquery.string(),
            location: Unquery.string(),
            priceFrom: Unquery.number(),
            priceTo: Unquery.number()
          },
          { skipNull: true }
        );
      }
      if (searchParams) {
        console.log(searchParams);
        setFiltersArray(searchParams);
      }
    },
    [ location ]
  );
  return (
    <div className="clear-filters-wrap">
      {Object.entries(filtersArray).map(([ key, value ]) => {
        return (
          <div className="selected-filter" key={`filter${key}`}>
            <span onClick={() => handleClearFilter(key)}>
              <Icon className="close-btn" name="close" width="34" height="34" fill="#349A89" />
            </span>
            <span>{value}</span>
          </div>
        );
      })}
      <button className="clear-filter-btn" onClick={(e) => handleClearFilters(e)}>
        <Icon name="clear_filters" height="18" width="18" fill="#FFFFFF" /> Clear all
      </button>
    </div>
  );
};
export default ClearFilters;
