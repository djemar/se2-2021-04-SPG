import { useContext, useEffect, useState } from 'react';
import {
  Alert,
  FormControl,
  InputGroup,
  Offcanvas,
  Col,
  Button as ButtonBS,
  Form,
  Modal,
  Row,
  Card,
} from 'react-bootstrap';
import API from '../../../API';
import '../../../App.css';
import { TimeContext } from '../../../context/TimeContext';
import { ReactComponent as CartLogo } from '../../../img/cart-logo.svg';
import { Button } from '../../misc';
import ConfirmModal from '../../misc/ConfirmModal';
import './basket.css';
import BasketItem from './BasketItem/BasketItem';
import { UserContext } from '../../../context/UserContext';
import dayjs from 'dayjs';
import DeliveryModal from './DeliveryModal';

export const Basket = ({ ...props }) => {
  const { basketProducts, setBasketProducts, show, onHide, user, isLogged } =
    props;
  const { setDirty } = useContext(UserContext);
  const [clientId, setClientId] = useState('');
  const [sum, setSum] = useState(0);
  const [showOrderAlert, setShowOrderAlert] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const { orderEnabled } = useContext(TimeContext);
  const { dateState } = useContext(TimeContext);
  const [mShow, setMShow] = useState(false);

  const [computeConfirmationModal, setComputeConfirmationModal] =
    useState(false);
  const [wantDelivery, setWantDelivery] = useState(true);
  const [deliveryDate, setDeliveryDate] = useState();

  const [deliveryTime, setDeliveryTime] = useState();

  const [deliveryAddress, setDeliveryAddress] = useState();
  const [deliveryCountry, setDeliveryCountry] = useState();
  const [deliveryCity, setDeliveryCity] = useState();
  const [deliveryZipCode, setDeliveryZipCode] = useState();

  useEffect(() => {
    if (user !== undefined && user !== null) {
      if (isLogged && user.userType === 'Client') setClientId(user.id);
    }
    setComputeConfirmationModal(false);
  }, [isLogged, user]);

  useEffect(() => {
    let sum = 0;
    basketProducts.forEach(x => {
      if (x.orderQuantity === undefined) sum = sum + x.price * x.quantity;
      else sum = sum + x.price * x.orderQuantity;
    });
    setSum(sum);
  }, [basketProducts]);

  const handleInputClientId = value => {
    setClientId(value);
  };
  const handleMClose = () => {
    setMShow(false);
    setComputeConfirmationModal(false);
  };

  const handleMShow = () => {
    setMShow(true);
    setComputeConfirmationModal(true);
  };
  const handleAddOrder = async () => {
    const date = dayjs(dateState).format('DD/MM/YYYY');
    let result;
    if (wantDelivery) {
      console.log(deliveryTime);
      result = await API.addScheduledOrder(
        clientId,
        basketProducts,
        date,
        sum,
        deliveryAddress,
        deliveryCountry,
        deliveryCity,
        deliveryZipCode,
        deliveryDate,
        deliveryTime
      );
    } else {
      result = await API.addOrder(clientId, basketProducts, date, sum);
    }
    if (result) {
      // clear basket
      setBasketProducts([]);
      setDirty(true);
      setShowOrderAlert(true);
      setMShow(false);
      setTimeout(() => {
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
          {user && user.userType === 'Employee' && (
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
              {sum + ' €'}
            </div>
          </div>
          <Alert
            show={
              clientId === '' || basketProducts.length === 0 || !orderEnabled
            }
            variant="warning"
            className="mx-4"
          >
            Orders are not Available:
            <ul class="list-disc list-inside">
              {user && user.userType === 'Farmer' && (
                <li>Farmers can't create orders</li>
              )}
              {clientId === '' && <li>Client ID is not defined</li>}
              {!orderEnabled && (
                <li>Orders are available from Saturday 9AM to Sunday 11PM</li>
              )}
              {!basketProducts.length && (
                <li>Basket is empty, fill it with something</li>
              )}
            </ul>
          </Alert>
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
              onClick={handleMShow}
              disabled={
                clientId === '' || basketProducts.length === 0 || !orderEnabled
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
      <DeliveryModal
        user={user}
        sum={sum}
        mShow={mShow}
        computeConfirmationModal={computeConfirmationModal}
        handleMClose={handleMClose}
        handleAddOrder={handleAddOrder}
        wantDelivery={wantDelivery}
        setWantDelivery={setWantDelivery}
        setDeliveryDate={setDeliveryDate}
        deliveryDate={deliveryDate}
        setDeliveryTime={setDeliveryTime}
        deliveryTime={deliveryTime}
        setDeliveryAddress={setDeliveryAddress}
        deliveryAddress={deliveryAddress}
        setDeliveryCountry={setDeliveryCountry}
        deliveryCountry={deliveryCountry}
        setDeliveryCity={setDeliveryCity}
        deliveryCity={deliveryCity}
        setDeliveryZipCode={setDeliveryZipCode}
        deliveryZipCode={deliveryZipCode}
      />
    </>
  );
};

export default Basket;
