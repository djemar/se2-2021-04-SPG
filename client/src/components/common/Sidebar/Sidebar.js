import { useEffect, useState } from 'react';
import { InputGroup, FormControl, Alert, CloseButton } from 'react-bootstrap';
import { Button } from '../../misc/';
import SidebarItem from './SidebarItem/SidebarItem';
import API from '../../../API';
import '../../../App.css';

export const Sidebar = ({ ...props }) => {
  const { basketProducts, setBasketProducts, show, setShow } = props;
  const [clientId, setClientId] = useState('');
  //const [show, setShow] = useState(false);
  const [somma, setSomma] = useState(0);

  useEffect(() => {
    let sum = 0;
    basketProducts.forEach(x => {
      sum = sum + x.price * x.quantity;
    });
    setSomma(sum);
    if (show) setShow(false);
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
      setShow(true);
    }
  };

  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark vh-100 overflow-y-scroll">
      <div className="sidebar-brand d-flex align-items-center justify-between">
        <div className="sidebar-brand-text mx-3">YOUR BASKET</div>
        <InputGroup size="sm" className="mx-5" hasValidation>
          <FormControl
            required
            isInvalid={clientId === '' ? true : false}
            onInput={e => handleInputClientId(e.target.value)}
            value={clientId}
            aria-label="client-input"
            placeholder={'Client ID'}
            aria-describedby="inputGroup-sizing-sm"
          />
        </InputGroup>
      </div>

      <hr className="sidebar-divider my-0" />
      <Alert
        className="m-5"
        show={show}
        onClick={() => setShow(false)}
        variant="success"
        dismissible
        aria-label="alert-order"
      >
        Order confirmed!
      </Alert>

      {basketProducts.length > 0 ? (
        basketProducts.map((p, index) => (
          <SidebarItem
            key={p.pid + index}
            product={p}
            basketProducts={basketProducts}
            setBasketProducts={setBasketProducts}
          />
        ))
      ) : (
        <></>
      )}
      <div className="h-100 d-flex flex-column justify-content-end mb-5">
        <hr className="sidebar-divider my-0" />
        <div className="d-flex justify-between mx-5 my-5 text-light font-weight-bold">
          <div className="totLabel">TOT</div>
          <div className="priceTotLabel">{'€ ' + somma}</div>
        </div>
        <div className="d-flex justify-content-center mx-5 my-5">
          <Button
            text={'Confirm'}
            type={'success'}
            ariaLabel="btn-confirm-order"
            onClick={handleAddOrder}
            disabled={
              clientId === '' || basketProducts.length === 0 ? true : false
            }
          />
        </div>
      </div>
    </ul>
  );
};

export default Sidebar;
