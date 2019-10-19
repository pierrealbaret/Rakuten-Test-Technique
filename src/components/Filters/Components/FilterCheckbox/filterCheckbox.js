import React from 'react';
import Checkbox from './Components/checkbox';
import PropTypes from 'prop-types';

function FilterCheckbox(props) {
    const item = props.item;
    const handleClick = (e) => {
      props.updateFilter(e);
      props.closeBox(e)
    }

    return (
          <div key={item} name={item} className="checkbox-categorie pointer flex items-center pv4 pl4 pa3-ns hover-bg-light-gray w-100" onClick={handleClick}>
            <Checkbox name={item} checked={props.checked} />
            <label key={item} name={item} className="flex items-center pointer">
              {item}
            </label>
          </div>
    );
}

FilterCheckbox.propTypes = {
  checked: PropTypes.bool,
  name: PropTypes.string,
  updateFilter: PropTypes.func.isRequired
}
FilterCheckbox.defaultProps ={
  checked:false,
}



export default FilterCheckbox;

