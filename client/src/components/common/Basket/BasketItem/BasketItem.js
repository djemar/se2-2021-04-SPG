import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { BsTrashFill } from 'react-icons/bs';
import { IoStorefrontOutline } from 'react-icons/io5';
import API from '../../../../API';
import '../../../../App.css';
import QuantitySelector from '../../../misc/QuantitySelector';
import './basketItem.css';

const BasketItem = ({ ...props }) => {
  const { product, basketProducts, setBasketProducts } = props;
  const { pid, name, quantity, unit, price, availability } = product;
  const [totUnitPrice, setTotUnitPrice] = useState(price * quantity);
  const [qnt, setQnt] = useState(quantity);
  const [users, setUsers] = useState([]);
  const [dirty, setDirty] = useState(true);
  const [farmerName, setFarmerName] = useState('');
  const handleRemoveItem = (pid, fid) => {
    let newBasket = [...basketProducts];
    newBasket = newBasket.filter(
      item => !(item.pid === pid && item.fid === fid)
    );
    setBasketProducts(newBasket);
  };

  useEffect(() => {
    setTotUnitPrice(price * qnt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basketProducts, qnt]);

  useEffect(() => {
    let p = basketProducts.find(x => x.pid === pid);
    if (p.orderQuantity === undefined) setQnt(quantity);
    else setQnt(p.orderQuantity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basketProducts]);

  useEffect(() => {
    const getAllUsers = async () => {
      const users = await API.getAllUsers();
      setUsers(users);
    };

    if (dirty) {
      getAllUsers().then(() => {
        setDirty(false);
      });
    }

    users.forEach(x => {
      if (x.user_id === product.fid) setFarmerName(x.name);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dirty]);
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
              <IoStorefrontOutline className="mr-2 text-lg" /> {farmerName}
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
