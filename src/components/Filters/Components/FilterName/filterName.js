import React from 'react';
import Chevron from './Components/chevron';

function FilterName(props) {
    const {
      name,
      onClick,
      isSelected,
      isDisable,
      filterValueSelected,
    } = props || {};

    const activeFilter = isSelected ? 'b' : '';
    const disableFilter = isDisable ? 'disableUniverseStyle' : '';
    const toggleChevron = isSelected ? 'bottomChevron' : 'topChevron';

    return (
      <div className={`filters filter--${name.toLowerCase()} ${disableFilter} flex relative pointer bg-white ba b--moon-gray br2 ph4 pv3 mt4 mt0-ns w-100`} name={name} onClick={onClick} >
      {!filterValueSelected &&
          <div name={name} className="titleFilter flex items-center justify-between w-100" role="button" >
            <span name={name} className={`${activeFilter} db`} >
                {name}
            </span>
            <span name={name} className={`chevron ${toggleChevron} db flex items-center justify-center`}>
                <Chevron name={name} />
            </span>
          </div>
      }
      {filterValueSelected &&
        <div name={name} className="flex items-center justify-between w-100">
          <div name={name} className="titleFilter flex flex-column" role="button" >
            <span name={name} className={`${activeFilter} db f7 silver`} >
                {name}
            </span>
            <div name={name}>
              {filterValueSelected}
            </div>
          </div>
          <span name={name} className={`chevron ${toggleChevron} db flex items-center justify-center`}>
              <Chevron name={name} />
          </span>
        </div>
      }
    </div>
    )
};

export default FilterName;