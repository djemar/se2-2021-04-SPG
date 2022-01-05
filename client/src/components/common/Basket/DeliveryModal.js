import { useContext, useEffect, useState } from 'react';
import {
  Col,
  Button as ButtonBS,
  Form,
  Modal,
  Row,
  Card,
  Container,
  Alert,
} from 'react-bootstrap';
import '../../../App.css';
import './basket.css';
import { TimeContext } from '../../../context/TimeContext';
//import * as dayjs from 'dayjs';
import dayjs from 'dayjs';
import API from '../../../API';
import { Spinner } from '../../misc';

export const DeliveryModal = ({ ...props }) => {
  const {
    user,
    sum,
    mShow,
    computeConfirmationModal,
    handleMClose,
    handleAddOrder,
    wantDelivery,
    setWantDelivery,
    setDeliveryDate,
    deliveryDate,
    setDeliveryTime,
    deliveryTime,
    setDeliveryAddress,
    deliveryAddress,
    setDeliveryCountry,
    deliveryCountry,
    setDeliveryCity,
    deliveryCity,
    setDeliveryZipCode,
    deliveryZipCode,
  } = props;

  const { dateState } = useContext(TimeContext);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [date, setDate] = useState(dayjs(dateState));
  const [day, setDay] = useState(dayjs(dateState).get('date'));
  const [month, setMonth] = useState(dayjs(dateState).get('month') + 1);
  const [year, setYear] = useState(dayjs(dateState).get('year'));
  const [hours, setHours] = useState(dayjs(dateState).get('hours'));
  const [minutes, setMinutes] = useState(dayjs(dateState).get('minutes'));

  const [defaultDateValue, setDefaultDateValue] = useState();
  const [defaultTimeValue, setDefaultTimeValue] = useState();

  const [userAddress, setUserAddress] = useState();
  const [userCountry, setUserCountry] = useState();
  const [userCity, setUserCity] = useState();
  const [userZipCode, setUserZipCode] = useState();

  const [fieldsOkay, setFieldsOkay] = useState(false);

  useEffect(() => {
    setDate(dayjs(dateState));
    setDay(dayjs(dateState).get('date'));
    setMonth(dayjs(dateState).get('month') + 1);
    setYear(dayjs(dateState).get('year'));
    setHours(dayjs(dateState).get('hours'));
    setMinutes(dayjs(dateState).get('minutes'));
  }, [dateState]);

  useEffect(() => {
    const tomorrow = day + 1;
    const value = year + '-' + month + '-' + tomorrow;
    setDefaultDateValue(value);
  }, [date, day, month, year]);

  useEffect(() => {
    const value = hours + ':' + minutes;
    setDefaultTimeValue(value);
  }, [hours, minutes]);

  useEffect(() => {
    const getAllUsers = async () => {
      const users = await API.getAllUsers();
      setUsers(users);
    };

    setLoading(true);
    getAllUsers().then(() => {
      setLoading(false);

      const currentUser = users.find(u => u.user_id === user.id);
      if (currentUser !== undefined && user.userType !== 'Employee') {
        setUserAddress(currentUser.address);
        setDeliveryAddress(currentUser.address);
        setUserCountry(currentUser.country);
        setDeliveryCountry(currentUser.country);
        setUserCity(currentUser.city);
        setDeliveryCity(currentUser.city);
        setUserZipCode(currentUser.zip_code);
        setDeliveryZipCode(currentUser.zip_code);
      } else {
        console.error('Current user not found!');
      }
    });
  }, [computeConfirmationModal]);

  const handleRadioButton = () => {
    setWantDelivery(!wantDelivery);
  };

  useEffect(() => {
    if (
      wantDelivery &&
      (deliveryDate === '' ||
        deliveryDate === undefined ||
        deliveryTime === '' ||
        deliveryTime === undefined ||
        deliveryAddress === '' ||
        deliveryAddress === undefined ||
        deliveryCity === '' ||
        deliveryCity === undefined ||
        deliveryCountry === '' ||
        deliveryCountry === undefined ||
        deliveryZipCode === undefined)
    ) {
      setFieldsOkay(false);
    } else setFieldsOkay(true);
  }, [
    wantDelivery,
    deliveryDate,
    deliveryTime,
    deliveryAddress,
    deliveryCity,
    deliveryCountry,
    deliveryZipCode,
  ]);

  return (
    <>
      {loading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <Modal
          centered
          dialogClassName="modal-40w"
          size="lg"
          show={mShow}
          onHide={handleMClose}
        >
          <Modal.Header
            closeButton
            label="order-confirmation"
            className="h5 mx-3 font-medium"
          >
            Order confirmation
          </Modal.Header>

          <Modal.Body>
            {user && user.userType !== 'Employee' && (
              <Row className="text-center" style={{ marginBottom: '5%' }}>
                <Col sm={4}>
                  {'User ID: '}
                  <strong>{user.id}</strong>
                </Col>
                <Col sm={4}>
                  {'Username: '}
                  <strong>{user.username}</strong>
                </Col>
                <Col sm={4}>
                  {'Tot. amount: '}
                  <strong>{sum + '€'}</strong>
                </Col>
              </Row>
            )}

            <Row className="m-5 mb-8">
              <Col sm={6} label="schedule-delivery">
                Schedule a delivery?
              </Col>
              <Col sm={6}>
                <Form className="justify-between">
                  <Form.Group>
                    <Form.Check
                      inline
                      checked={wantDelivery}
                      style={{ marginTop: '0px' }}
                      type="radio"
                      label="Yes"
                      name="group1"
                      id="inline-radio-2"
                      onClick={handleRadioButton}
                    />
                    <Form.Check
                      inline
                      checked={!wantDelivery}
                      style={{ marginTop: '0px' }}
                      type="radio"
                      label="No"
                      name="group1"
                      id="inline-radio-2"
                      onClick={handleRadioButton}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            {wantDelivery ? (
              <Form>
                <Form.Group as={Row} className="m-5">
                  <Form.Label column sm={6}>
                    Select Date for delivery
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control
                      size="lg"
                      type="date"
                      placeholder="Select date"
                      onChange={e => {
                        setDeliveryDate(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="m-5">
                  <Form.Label column sm={6}>
                    Select Time for delivery
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control
                      size="lg"
                      type="time"
                      placeholder="Select time"
                      onChange={e => {
                        setDeliveryTime(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="m-5">
                  <Form.Label column sm={6}>
                    Address
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control
                      defaultValue={userAddress}
                      size="lg"
                      type="text"
                      placeholder="Address for delivery"
                      onChange={e => {
                        setDeliveryAddress(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="m-5">
                  <Form.Label column sm={6}>
                    ZIP Code
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control
                      defaultValue={userZipCode}
                      size="lg"
                      type="text"
                      label="zip"
                      placeholder="Zip code for delivery"
                      onChange={e => {
                        setDeliveryZipCode(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="m-5">
                  <Form.Label column sm={6}>
                    City
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control
                      defaultValue={userCity}
                      size="lg"
                      type="text"
                      placeholder="City for delivery"
                      onChange={e => {
                        setDeliveryCity(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="m-5">
                  <Form.Label column sm={6}>
                    Country
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control
                      defaultValue={userCountry}
                      size="lg"
                      type="text"
                      placeholder="Country for delivery"
                      onChange={e => {
                        setDeliveryCountry(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>
              </Form>
            ) : (
              <Alert
                className="text-center align-content-center m-8 mb-8"
                style={{
                  'background-color': '#f8e7c6',
                  'border-color': '#e68935',
                  color: '#e68935',
                }}
              >
                <u>
                  Let's check your order status and pick it up before Friday!
                </u>
              </Alert>
            )}
          </Modal.Body>
          <Modal.Footer>
            <>
              <ButtonBS variant="outline-danger mr-5" onClick={handleMClose}>
                Undo
              </ButtonBS>
              <ButtonBS
                className="bg-success border-0"
                onClick={handleAddOrder}
                disabled={!fieldsOkay}
                type="onSubmit"
              >
                Place order
              </ButtonBS>
            </>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default DeliveryModal;
