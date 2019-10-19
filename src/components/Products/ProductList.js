import React from 'react';
import ProductItem from './ProductItem';
import ProductPagination from './ProductPagination';

function ProductList(props) {
  const nextToken = props.nextToken;

  return (
    <div className="product-container flex flex-column justify-center items-center">
      <div className=" flex flux-product-container w-100 grid_row ph0 ph3-ns items-end ">
        {props.products.map((item, index) => (
          <ProductItem item={item} key={index} />
        ))}
      </div>
      {nextToken &&
        <ProductPagination pagination={props.pagination} />
      }
    </div>
  );
};

export default ProductList;
