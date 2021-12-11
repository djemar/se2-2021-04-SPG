import { useEffect, useState } from 'react';
import {
  Button as BSButton,
  Card,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import QuantitySelector from '../../misc/QuantitySelector';
import './productCard.css';
import Badge from 'react-bootstrap/Badge';
import { IoStorefrontOutline } from 'react-icons/io5';

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
    preview,
    flagAddOrEdit,
    handleShow,
  } = props;
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [availableQuantity, setAvailableQuantity] = useState(availability);

  useEffect(() => {
    const i = basketProducts.findIndex(item => item.pid === pid);
    console.log(props);
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
  //<span class="position-absolute top-5 badge rounded-pill d-flex text-dark bg-light align-items-center">
  return (
    <Card className="product-card shadow-lg py-0 h-auto">
      <div className="product-img-div">
        <Card.Img className="product-img" variant="top" src={img} />
      </div>
      <span class="position-absolute product-farmer badge rounded-pill d-flex text-dark bg-light align-items-center">
        <IoStorefrontOutline className="mr-2 text-lg" />
        {fid}
      </span>
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
            preview={preview}
          />
          <div className="text-xs">
            {availableQuantity} piece{availableQuantity > 1 ? 's' : ''}{' '}
            available
          </div>
        </div>
        <div className="pt-5 d-flex flex-row align-items-center">
          <div className="fg-primary font-medium text-lg mr-2">{price} €</div>
          <div className="font-light text-sm">{unit}</div>
        </div>
      </Card.Body>
      <Card.Footer className="w-100 text-end bg-white border-0 pb-3">
        {flagAddOrEdit ? (
          <BSButton onClick={handleShow} className="bg-primary" size="sm">
            Edit
          </BSButton>
        ) : (
          <BSButton
            className="bg-primary"
            size="sm"
            onClick={handleAddToBasket}
            disabled={availableQuantity === 0 || preview}
          >
            Add to Basket
          </BSButton>
        )}
      </Card.Footer>
    </Card>
  );
};

export default ProductCard;
