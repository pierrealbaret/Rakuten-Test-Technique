import React from 'react';
import FilterList from './Components/FilterList/index';
import './filters.css';

function DesktopFilters(props) {
  const {commonProps, category} = props

    return (
      <div>
        <FilterList
          category={category}
          commonProps={commonProps}
        />
      </div>
    )
};

export default DesktopFilters;
