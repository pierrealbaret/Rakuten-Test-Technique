import React from 'react';
import Checkbox from './../../FilterCheckbox/Components/checkbox';
import PropTypes from 'prop-types';

function MobFilterCheckbox(props) {
  const item = props.item;

  return (
    <div key={`mob-${item}`} name={item} className="checkbox-categorie f14 pointer flex items-center pv4 pl4 pa3-ns w-100" onClick={props.onClick}>
      <Checkbox name={item} checked={props.checked} />
      <label key={`mob-${item}`} name={item} className="flex items-center pointer">
        {item}
      </label>
    </div>
  );
}

MobFilterCheckbox.propTypes = {
  checked: PropTypes.bool,
  name: PropTypes.string,
  onClick: PropTypes.func.isRequired
}
MobFilterCheckbox.defaultProps = {
  checked: false,
}
export default MobFilterCheckbox;
