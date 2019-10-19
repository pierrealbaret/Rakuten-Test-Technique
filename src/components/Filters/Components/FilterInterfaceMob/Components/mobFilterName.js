import React from 'react';
import Chevron from './../../FilterName/Components/chevron';

const MobFilterName = ({ name, handleShowFilterList, isSelected, isDisable, filterValueSelected,filters }) => {
  const activeFilter = isSelected ? 'b' : '';
  const disableFilter = isDisable ? 'disableUniverseStyle' : '';

  const valueSelected = filters.length !==1 ? filterValueSelected :filters[0];

  return (
    <div className={`filter--${name.toLowerCase()} ${disableFilter} relative pointer f14 bg-white bt bb b--moon-gray ph3 mt4`} onClick={handleShowFilterList}>
      {!valueSelected &&
        <div className="titleFilter flex items-center justify-between" role="button" name={name}>
          <span name={name} className={`${activeFilter} db`} >
            {name}
          </span>
          <span name={name} className="chevron rightChevron db flex items-center justify-center">
            <Chevron name={name} />
          </span>
        </div>
      }
      {valueSelected &&
        <div className="titleFilter flex items-center justify-between" role="button" name={name}>
          <div name={name}>
            <span name={name} className={`f7 silver ${activeFilter} db`} >
              {name}
            </span>
            <span name={name} className="b">{valueSelected}</span>
          </div>
          <span name={name} className="chevron rightChevron db flex items-center justify-center">
            <Chevron name={name} />
          </span>
        </div>
      }
    </div>
  )
}
export default MobFilterName
