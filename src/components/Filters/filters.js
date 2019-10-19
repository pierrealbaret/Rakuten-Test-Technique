import React from 'react';
import DesktopFilters from './desktopFilters';
import MobFilters from './mobFilters';

function Filters(props) {
    const {mobProps, commonProps, category} = props

    return (
      <div>
          <MobFilters
            category ={category}
            commonProps={commonProps}
            mobProps={mobProps}
          />
          <DesktopFilters
            category ={category}
            commonProps={commonProps}
          />
      </div>
    );
}

export default Filters;
