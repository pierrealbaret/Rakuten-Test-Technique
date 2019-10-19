import React from 'react';
import FilterCheckbox from './../FilterCheckbox/index';
import PropTypes from 'prop-types';

function FilterChoiceBox(props) {
  /**
   * Could be a factory ?
   */
  const name = props.name;
  const filters = props.filters || [];
  const updateFilter = props.updateFilter;
  const filterValueSelected = props.filterValueSelected;
  const boxOverflow = filters.length > 15 ? 'box-overflow' : '';
  const closeBox = props.closeBox;

  return (
    <div name={name} className={`flex flex-column absolute bg-white ${boxOverflow} box-choices w-100 z-1`}>
      {
        filters.map(filter =>
          <FilterCheckbox key={filter} item={filter} checked={filter === filterValueSelected} closeBox={(e) => closeBox(filterValueSelected, e)} updateFilter={updateFilter} />
        )
      }
    </div>
  )
}

FilterChoiceBox.propTypes = {
  checked: PropTypes.bool,
  item: PropTypes.string,
  onClick: PropTypes.func
}
FilterChoiceBox.defaultProps = {
  checked: false
}

export default FilterChoiceBox;
