import React from 'react';
import PropTypes from 'prop-types';
import './checkbox.css';

const Checkbox = ({ name, checked }) => (
  <div className="container-checkbox db relative pointer mr3">
    <input className="checkbox absolute z-1 pointer o-0 w-100 h-100"
      type="checkbox"
      readOnly
      name={name}
      checked={checked}
    />
    <span className="checkmark absolute ba w-100 h-100 b--moon-gray"></span>
  </div>
);

Checkbox.propTypes = {
  checked: PropTypes.bool,
  name: PropTypes.string.isRequired
}

Checkbox.defaultProps = {
  checked: false,
}

export default Checkbox;
