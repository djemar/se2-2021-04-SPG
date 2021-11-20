import { useEffect, useState } from 'react';
import { Alert, FormControl, InputGroup, Offcanvas } from 'react-bootstrap';
import API from '../../../API';
import '../../../App.css';
import { ReactComponent as CartLogo } from '../../../img/cart-logo.svg';
import { Button } from '../../misc';
import ConfirmModal from '../../misc/ConfirmModal';
import './basket.css';
import BasketItem from './BasketItem/BasketItem';

export const Basket = ({ ...props }) => {
  const { basketProducts, setBasketProducts, show, onHide, user, isLogged } =
    props;
  const [clientId, setClientId] = useState('');
  const [somma, setSomma] = useState(0);
  const [showOrderAlert, setShowOrderAlert] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    if (user !== undefined && user !== null) {
      if (isLogged && user.userType === 'Client') setClientId(user.id);
    }
  }, [isLogged, user]);

  useEffect(() => {
    let sum = 0;
    basketProducts.forEach(x => {
      if (x.orderQuantity === undefined) sum = sum + x.price * x.quantity;
      else sum = sum + x.price * x.orderQuantity;
    });
    setSomma(sum);
  }, [basketProducts]);

  const handleInputClientId = value => {
    setClientId(value);
  };

  const handleAddOrder = async () => {
    const result = await API.addOrder(
      clientId,
      basketProducts,
      new Date(Date.now()).toLocaleDateString('it-IT')
    );
    if (result) {
      // clear basket
      setBasketProducts([]);
      setClientId('');
      setShowOrderAlert(true);
      window.setTimeout(() => {
        setShowOrderAlert(false);
      }, 4000);
    }
  };

  const clearBasket = () => {
    setBasketProducts([]);
    setModalShow(false);
  };

  const basket = basketProducts.map((p, index) => (
    <BasketItem
      key={p.pid + index}
      product={p}
      basketProducts={basketProducts}
      setBasketProducts={setBasketProducts}
    />
  ));

  return (
    <>
      <Offcanvas className="" show={show} onHide={onHide} placement="end">
        <Offcanvas.Header closeButton className="text-secondary font-ibm">
          <Offcanvas.Title className="d-flex items-center">
            <CartLogo className="mr-4" />
            Your Basket
          </Offcanvas.Title>
        </Offcanvas.Header>
        <InputGroup
          size="sm"
          className="d-flex justify-center w-40 my-2 mx-5"
          hasValidation
        >
          {user !== null &&
          user !== undefined &&
          isLogged &&
          user.userType === 'Client' ? (
            <>
              <h5 className="h5 font-weight-normal font-bold" />
            </>
          ) : (
            <FormControl
              required
              isInvalid={clientId === '' ? true : false}
              onInput={e => handleInputClientId(e.target.value)}
              value={clientId}
              aria-label="client-input"
              placeholder={'Client ID'}
              aria-describedby="inputGroup-sizing-sm"
            />
          )}
        </InputGroup>
        <Offcanvas.Body>{basket}</Offcanvas.Body>
        <Alert
          show={showOrderAlert}
          variant="success"
          className="m-4"
          onClose={() => setShowOrderAlert(false)}
          dismissible
        >
          Your order was confirmed! Hooray!
        </Alert>
        <div className="d-flex flex-column justify-content-end mb-5 font-ibm">
          <hr className="sidebar-divider my-0 mx-5 opacity-10" />
          <div className="d-flex justify-between mx-10 my-5 text-dark font-medium">
            <div className="totLabel text-xl">Total</div>
            <div className="priceTotLabel text-xl text-secondary">
              {somma + ' €'}
            </div>
          </div>
          <div className="d-flex justify-between mx-5 my-5">
            <Button
              text={'Clear Basket'}
              type={'outline-danger'}
              onClick={() => setModalShow(true)}
              disabled={basketProducts.length === 0}
            />
            <Button
              text={'Confirm Order'}
              type={'success'}
              ariaLabel="btn-confirm-order"
              onClick={handleAddOrder}
              disabled={
                clientId === '' || basketProducts.length === 0 ? true : false
              }
            />
          </div>
        </div>
      </Offcanvas>
      <ConfirmModal
        show={modalShow}
        title={'Clear Your Basket'}
        body={'Do you really want to clear your basket?'}
        onHide={() => setModalShow(false)}
        onConfirm={clearBasket}
      />
    </>
  );
};

export default Basket;
