import React from 'react';
import MobFilterCheckbox from './mobFilterCheckbox';
import MobChevron from './mobChevron';
import PropTypes from 'prop-types';

function MobFilterChoiceBox(props) {
    /**
     * Same as FilterChoiceBox => one factory
     */
  const name = props.name;
  const filters = props.filters;
  const updateFilter = props.updateFilter;
  const filterValueSelected =  props.filterValueSelected;
  const backToFilterList = props.handleShowFilterList;

  return (
    <div className="container-mobFilterChoiceBox w-100 z-1">
      <div className="relative text tc b f5 bg-white pv4 mb3 bb b--moon-gray pointer pl4" onClick={backToFilterList}>
        <span className="b absolute left-1">
          <MobChevron />
        </span>
        {name}
      </div>
      <div className="flex flex-column bg-white box-choices" onClick={backToFilterList}>
        {
          filters.map(filter =>
            <MobFilterCheckbox
              name={name}
              key={filter}
              item={filter}
              checked={filter === filterValueSelected}
              onClick={updateFilter}
            />
          )
        }
      </div>
    </div>
  )
}

MobFilterChoiceBox.propTypes = {
  checked: PropTypes.bool,
  item: PropTypes.string,
  onClick: PropTypes.func
}
MobFilterChoiceBox.defaultProps = {
  checked: false
}

export default MobFilterChoiceBox;
