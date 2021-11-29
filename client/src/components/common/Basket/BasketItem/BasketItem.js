import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { BsTrashFill } from 'react-icons/bs';
import { IoStorefrontOutline } from 'react-icons/io5';
import '../../../../App.css';
import QuantitySelector from '../../../misc/QuantitySelector';
import './basketItem.css';

const BasketItem = ({ ...props }) => {
  const { product, basketProducts, setBasketProducts, addSinglePrice } = props;
  const { pid, name, description, quantity, unit, price, availability, setAv } =
    product;
  const [totUnitPrice, setTotUnitPrice] = useState(price * quantity);
  const [qnt, setQnt] = useState(quantity);

  const handleRemoveItem = (pid, fid) => {
    let newBasket = [...basketProducts];
    newBasket = newBasket.filter(
      item => !(item.pid === pid && item.fid === fid)
    );
    setBasketProducts(newBasket);
  };

  useEffect(() => {
    setTotUnitPrice(price * qnt);
  }, [basketProducts, qnt]);

  useEffect(() => {
    let p = basketProducts.find(x => x.pid === pid);
    if (p.orderQuantity === undefined) setQnt(quantity);
    else setQnt(p.orderQuantity);
  }, [basketProducts]);

  return (
    <>
      <Card className="card-basket-item m-2 mb-4">
        <Card.Body>
          <Card.Title className="d-flex justify-between items-baseline">
            <div className="d-flex items-baseline">
              <BsTrashFill
                className="trash-btn mr-5 text-lg"
                onClick={() => handleRemoveItem(product.pid, product.fid)}
              />
              <span className="basket-item-title font-medium mr-4">{name}</span>
              <span className="text-sm"> {unit} </span>
            </div>
            <div>
              <span className="basket-item-price font-medium">
                {totUnitPrice + ' €'}
              </span>
            </div>
          </Card.Title>
          <Card.Text className="d-flex justify-between mt-5 items-center">
            <div className="ml-9 d-flex items-center">
              <IoStorefrontOutline className="mr-2 text-lg" /> Farmer
            </div>
            <QuantitySelector
              orderQuantity={qnt}
              setOrderQuantity={setQnt}
              max={availability}
              pid={product.pid}
              setBasketProducts={setBasketProducts}
              basketProducts={basketProducts}
              location={'Basket'}
              setAvailability={product.setAvailableQuantity}
            />
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default BasketItem;
