import React from 'react';

function ProductPagination(props) {
    return (
      <div className="pagination-product-container ba b--moon-gray br2 flex justify-center w-100 pointer" onClick={props.pagination}>
            <p className="f14">Voir plus d'offres</p>
      </div>
    );
};

export default ProductPagination;
