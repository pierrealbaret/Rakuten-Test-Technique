import React from 'react';
import FilterName from './../FilterName/index';
import FilterChoiceBox from './../FilterChoiceBox/index';

function FilterItem(props) {
    const filters = props.filters;
    const name = props.name;
    const key = props.name;
    const updateFilter = props.updateFilter;
    const filterValueSelected = filters.length !== 1 ? props.filterValueSelected : filters[0];
    const isDisable = props.isDisable;
    const isFilterSelected = props.isFilterSelected;
    const checkFilterIsSelected = props.checkFilterIsSelected;
    const closeBox = props.closeBox;

    return (
      <div className="relative flex flex-column filter-item w-25 f14 ma4-ns">
            <FilterName
              name={name}
              key={key}
              isDisable={isDisable}
              onClick={checkFilterIsSelected}
              isSelected={isFilterSelected}
              filterValueSelected={filterValueSelected}
            />
          { isFilterSelected && filters.length >1 &&
            <FilterChoiceBox
              name={name}
              filters={filters}
              updateFilter={updateFilter}
              filterValueSelected={filterValueSelected}
              isDisable={isDisable}
              isSelected={isFilterSelected}
              closeBox={closeBox}
            />
          }
      </div>
    )
};

export default FilterItem;