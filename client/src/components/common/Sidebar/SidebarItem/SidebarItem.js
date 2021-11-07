import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '../../../../App.css';

const SidebarItem = ({ ...props }) => {
  const { product, basketProducts, setBasketProducts } = props;
  const { name, description, quantity, unit, price } = product;
  const [totUnitPrice, setTotUnitPrice] = useState(price * quantity);

  const handleRemoveItem = (pid, fid) => {
    let newBasket = [...basketProducts];
    console.log(pid + ' ' + fid);
    newBasket = newBasket.filter(
      item => !(item.pid === pid && item.fid === fid)
    );
    console.log(newBasket);
    setBasketProducts(newBasket);
  };

  useEffect(() => {
    setTotUnitPrice(price * quantity);
  }, [basketProducts]);

  return (
    <>
      <hr className="sidebar-divider" />

      <div className="product-heading d-flex justify-between align-items-center">
        <div>
          <FontAwesomeIcon
            icon={faTrash}
            aria-hidden="false"
            aria-label={'remove-basket-' + product.pid}
            className="btn-trash mx-2"
            onClick={() => handleRemoveItem(product.pid, product.fid)}
          />
          {name} x {quantity} - {unit}
        </div>
        <span className="product-unit my-auto">{'€ ' + totUnitPrice}</span>
      </div>

      <li className="flex justify-between">
        <span className="ml-1 product-item">{description}</span>
      </li>
    </>
  );
};

export default SidebarItem;
