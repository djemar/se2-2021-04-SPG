import { useEffect, useState } from 'react';
import {
  Button as BSButton,
  Card,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import QuantitySelector from '../../misc/QuantitySelector';
import './productCard.css';

export const ProductCard = ({ ...props }) => {
  const {
    pid,
    fid,
    name,
    description,
    category,
    availability,
    price,
    unit,
    img,
    basketProducts,
    setBasketProducts,
    setAnimateBasket,
  } = props;
  console.log('imageee', img);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [availableQuantity, setAvailableQuantity] = useState(availability);

  useEffect(() => {
    const i = basketProducts.findIndex(item => item.pid === pid);
    if (i !== -1) {
      setAvailableQuantity(availableQuantity - basketProducts[i].quantity);
    }
  }, []);

  useEffect(() => {
    const i = basketProducts.findIndex(item => item.pid === pid);
    if (i === -1) {
      setAvailableQuantity(availability);
    }
  }, [basketProducts]);

  const handleAddToBasket = () => {
    const i = basketProducts.findIndex(item => item.pid === pid);
    if (orderQuantity >= 1) {
      if (i !== -1) {
        let newBasket = [...basketProducts];
        newBasket[i].quantity += orderQuantity;
        setBasketProducts(newBasket);
        setAvailableQuantity(availableQuantity - orderQuantity);
      } else {
        setAvailableQuantity(availableQuantity - orderQuantity);
        setBasketProducts([
          ...basketProducts,
          {
            pid: pid,
            fid: fid,
            name: name,
            description: description,
            category: category,
            quantity: orderQuantity,
            availability: availableQuantity,
            price: price,
            unit: unit,
            setAvailableQuantity: setAvailableQuantity,
          },
        ]);
      }
    }
    setAnimateBasket(true);
    setOrderQuantity(1);
  };

  return (
    <Card className="product-card shadow py-0">
      <Card.Img className="product-img" variant="top" src={img} />
      <Card.Body className="p-3 w-100">
        <Card.Title className="font-medium text-black">{name}</Card.Title>
        <OverlayTrigger
          placement={'top'}
          overlay={<Tooltip id={`tooltip-top`}>{description}</Tooltip>}
        >
          <Card.Text className="text-sm product-desc">{description}</Card.Text>
        </OverlayTrigger>
        <div className="noselect pt-4 d-flex flex-row justify-between align-items-center text-black">
          <QuantitySelector
            orderQuantity={orderQuantity}
            setOrderQuantity={setOrderQuantity}
            max={availableQuantity}
            location={'ProductCard'}
          />
          <div className="text-xs">
            {availableQuantity} piece{availableQuantity > 1 ? 's' : ''}{' '}
            available
          </div>
        </div>
        <div className="pt-5 d-flex flex-row justify-between align-items-center text-black">
          <div className="d-flex flex-row align-items-center">
            <div className="fg-primary font-medium text-lg mr-2">{price} €</div>
            <div className="font-light text-sm">{unit}</div>
          </div>
          <BSButton
            className="bg-primary"
            size="sm"
            onClick={handleAddToBasket}
            disabled={availableQuantity === 0}
          >
            Add to Basket
          </BSButton>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
