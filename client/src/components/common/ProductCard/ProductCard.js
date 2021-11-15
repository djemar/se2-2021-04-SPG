import { Button } from '../../misc';

import { InputGroup, FormControl } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';

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
  } = props;
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
            price: price,
            unit: unit,
          },
        ]);
      }
    }
  };

  const handleQuantityChange = e => {
    setOrderQuantity(parseInt(e.target.value));
  };

  return (
    <div className="col-12 pb-4">
      <div className="card border-left-primary shadow h-100 py-0">
        <div className="card-body flex justify-between">
          <div className="flex flex-column justify-between w-100">
            <div className="no-gutters d-flex align-items-center mb-3 flex flex-none">
              <div className="h4 mb-0 font-weight-bold text-dark text-uppercase d-flex align-items-center mr-3">
                {name}
              </div>
              {category}
            </div>
            <div className="flex justify-between flex-grow">{description}</div>
          </div>
          <div className="row no-gutters d-flex align-items-center justify-content-between">
            <div className="flex flex-grow"></div>
            <div className="flex flex-none">
              <div className="flex flex-column justify-between">
                <div className="flex justify-end">
                  <div className="mr-9 flex flex-column justify-start pb-4">
                    <div className="text-xs text-uppercase mb-1 text-right">
                      Availability
                    </div>
                    <div className="h8 mb-0 text-right">
                      {availableQuantity}
                    </div>
                  </div>
                  <div className="mr-2 flex flex-column justify-start pb-4">
                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1 text-right">
                      Price
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-600 text-right">
                      €{price}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="product-unit my-auto mr-4">{unit}</span>
                  <div className="mr-2 flex flex-column justify-end">
                    <div className="h5 mb-0 font-weight-bold text-gray-800 text-center">
                      <InputGroup className="w-20">
                        <FormControl
                          type="number"
                          min={1}
                          max={availableQuantity}
                          isInvalid={orderQuantity < 1}
                          defaultValue={1}
                          onChange={handleQuantityChange}
                        />
                      </InputGroup>
                    </div>
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800 flex flex-column justify-end">
                    <Button
                      type="primary"
                      text="Add"
                      ariaLabel={'add-basket-' + pid}
                      onClick={handleAddToBasket}
                      disabled={availableQuantity === 0}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
