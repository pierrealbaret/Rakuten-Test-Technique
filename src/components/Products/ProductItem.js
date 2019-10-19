import React from 'react';
import PropTypes from 'prop-types';
import './style-products.css';

const ProductItem = ({ item, index }) => {
    /**
     * Could be a factory
     */
  const titleProduct = item.title ? item.title : '';
  const checkImg = item.imageUrl.split('/')[2]
  const imgUrl = item.imageUrl ? 'https://pmcdn.priceminister.com' + item.imageUrl + '_ML.jpg' : null;
  const buybackUrl = item.buybackUrl ? item.buybackUrl : '';
  const bestOffer = item.bestOffer ? item.bestOffer : '';
  const formatedBestOffer = bestOffer.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });


  const Item = () => (
    <div className="filter-product grid_col-2 grid_col-3-BelowMax grid_col-4-BelowDesktop grid_col-12-BelowLandscape col_nogutter">
      <a className="filter-product-link flex flex-column-ns ph4 pv3 pa4-ns ma3-ns bg-white b--moon-gray no-underline mid-gray relative" href={buybackUrl}>
        <div className="filter-product-picture relative">
          <div className="filter-product-container-img pv3-ns flex items-center">
            {checkImg !== "0" ?
              <img className="filter-product-img center" src={imgUrl} alt={titleProduct} />
              : <p className ="pl3 pv6">Photo non disponible</p>}
          </div>
        </div>
        <div className="filter-product-description flex flex-column justify-center justify-top-ns pl3 pv3 pv0-ns">

          <p className="filter-product-title f14 fixed-height-40">{titleProduct}</p>
          <p className="f14 pv3">
            <span>Jusqu'à <span className="green b">{formatedBestOffer} &#8364;</span></span>
          </p>
          <p className="f14 underline">Revendez le vôtre</p>
        </div>
      </a>
    </div>
  );

  return <Item />
};

ProductItem.propTypes = {
  item: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
}

export default ProductItem;
