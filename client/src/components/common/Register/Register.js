import { useState } from 'react';
import {
  Spinner,
  Form,
  Button as ButtonBootstrap,
  ButtonGroup,
  Alert,
  Card,
  Row,
  Col,
  Container,
} from 'react-bootstrap';
import Breadcrumbs from '../../misc/Breadcrumbs';
import API from '../../../API.js';
import { Redirect, Link } from 'react-router-dom';

const Register = ({ ...props }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [idUser, setIdUser] = useState();
  const [type, setType] = useState('Client');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [company, setCompany] = useState('');
  const [endRegister, setEndRegister] = useState(false);
  const [goingTo, setGoingTo] = useState('');

  const submit = async event => {
    event.preventDefault();
    if (password === confirmPassword) {
      setLoading(true);
      try {
        if (type === 'Client') {
          const hash = API.getHashedPWD(password);
          let user = {
            name: name,
            surname: surname,
            company: null,
            email: email,
            hash: hash,
            Type: type,
            address: address,
            phone: phone,
            country: country,
            city: city,
            zip_code: zip,
          };
          const res = await API.addUser(user);
          setIdUser(res.user_id);
          setLoading(false);
          setError('');
          setEndRegister(true);
        } else if (type === 'Farmer') {
          const hash = API.getHashedPWD(password);
          let user = {
            name: name,
            surname: surname,
            company: company,
            email: email,
            hash: hash,
            Type: type,
            address: address,
            phone: phone,
            country: country,
            city: city,
            zip_code: zip,
          };
          const res = await API.addUser(user);
          setIdUser(res.user_id);
          setLoading(false);
          setError('');
          setEndRegister(true);
        } else {
          setError('Select a user type');
          setLoading(false);
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setName('');
    setSurname('');
    setPassword('');
    setEmail('');
    setLoading(false);
    setError('');
    setIdUser('');
    setType('');
  };

  const handleBackToRegistration = async event => {
    await resetForm();
    setEndRegister(false);
    //window.location.reload();
    await setGoingTo('register');
    setGoingTo('');
  };

  const handleGoingToLogin = async event => {
    setGoingTo('login');
  };

  return (
    <>
      {goingTo === 'register' ? (
        <Redirect exact to="/register" />
      ) : goingTo === 'login' ? (
        <Redirect to="/login" />
      ) : (
        <div className="flex flex-column justify-start">
          <div className="flex flex-none justify-start">
            <Breadcrumbs />
          </div>
          <div className="flex flex-grow justify-between">
            <div className="flex w-100 h-100 p-3">
              <Card className="spg-box shadow py-0">
                <Card.Title className="flex items-center justify-center text-center w-100 text-3xl font-bold text-white spg-box-title">
                  Register
                </Card.Title>
                <Card.Body className="py-4 w-100 h-100">
                  <div className="flex flex-none flex-column justify-between ">
                    <div className="flex justify-center">
                      {error && <Alert variant={'danger'}>{error}</Alert>}
                      {idUser && (
                        <Alert variant={'success'} className="w-1/3">
                          <span className="font-bold h5 uppercase">
                            User Created!
                          </span>
                          <br />
                          <div className="">
                            <div>
                              <span className="font-bold">
                                {type === 'Client' ? 'Client ID' : 'Farmer ID'}
                              </span>
                              {idUser}
                            </div>
                            <div>
                              <span className="font-bold">Name: </span>
                              {name}
                            </div>
                            <div>
                              <span className="font-bold">Surname: </span>
                              {surname}
                            </div>
                            {type === 'Farmer' ? (
                              <div>
                                <span className="font-bold">Company: </span>
                                {company}
                              </div>
                            ) : (
                              <div />
                            )}
                            <div>
                              <span className="font-bold">Email: </span>
                              {email}
                            </div>
                            <div>
                              <span className="font-bold">Type: </span>
                              {type}
                            </div>
                          </div>
                          {error}
                        </Alert>
                      )}
                    </div>
                  </div>
                  {!endRegister ? (
                    <Container className="justify-content-center">
                      <Row style={{ 'margin-bottom': '3%' }}>
                        <ButtonGroup>
                          <ButtonBootstrap
                            ariaLabel="register-as-client"
                            className={
                              type === 'Client'
                                ? 'btn-type-selected'
                                : 'btn-type'
                            }
                            onClick={() => {
                              setType('Client');
                            }}
                          >
                            Register as a new Client
                          </ButtonBootstrap>
                          <ButtonBootstrap
                            ariaLabel="register-as-farmer"
                            className={
                              type === 'Farmer'
                                ? 'btn-type-selected'
                                : 'btn-type'
                            }
                            onClick={() => {
                              setType('Farmer');
                            }}
                          >
                            Register as a new Farmer
                          </ButtonBootstrap>
                        </ButtonGroup>
                      </Row>
                      <Row>
                        <Container className="flex flex-grow justify-center">
                          <Form className="w-1/2" onSubmit={submit}>
                            {/*<fieldset>
                              Radio buttons... // TODO: choose if use radio buttons or not --> if yes, then fix radios
                              <Form.Group
                                className="mb-3"
                                controlId="formRadioButtons"
                              >
                                <Form.Check
                                  inline
                                  type="radio"
                                  label="client-option"
                                  id="radio-client"
                                  name="form-radio-buttons"
                                >
                                  Register as a new Client
                                </Form.Check>
                                <Form.Check
                                  inline
                                  type="radio"
                                  label="farmer-option"
                                  id="radio-farmer"
                                  name="form-radio-buttons"
                                >
                                  Register as a new Farmer
                                </Form.Check>
                              </Form.Group>
                            </fieldset>*/}
                            <Form.Group className="my-2">
                              <h6 className="h6">Your name and surname</h6>
                              <Form.Label className="sr-only">Name</Form.Label>
                              <Form.Control
                                size="lg"
                                id="inputName"
                                type="text"
                                aria-label="reg-name"
                                placeholder="Name"
                                autoFocus={true}
                                required
                                value={name}
                                onChange={event => setName(event.target.value)}
                              />
                            </Form.Group>
                            <Form.Group className="my-2">
                              <Form.Label className="sr-only">
                                Surname
                              </Form.Label>
                              <Form.Control
                                size="lg"
                                id="inputSurname"
                                type="text"
                                aria-label="reg-surname"
                                placeholder="Surname"
                                required
                                value={surname}
                                onChange={event =>
                                  setSurname(event.target.value)
                                }
                              />
                            </Form.Group>
                            {type === 'Farmer' ? (
                              <Form.Group className="my-2">
                                <h6
                                  className="h6"
                                  style={{ 'margin-top': '5%' }}
                                >
                                  The name of your company or shop
                                </h6>
                                <Form.Label className="sr-only">
                                  Company name
                                </Form.Label>
                                <Form.Control
                                  size="lg"
                                  id="inputCompanyName"
                                  aria-label="reg-farmer-companyName"
                                  placeholder="Company name"
                                  required
                                  value={company}
                                  onChange={event =>
                                    setCompany(event.target.value)
                                  }
                                />
                              </Form.Group>
                            ) : (
                              <div />
                            )}
                            <Form.Group className="my-2">
                              <h6 className="h6" style={{ 'margin-top': '5%' }}>
                                Your favorite email address
                              </h6>
                              <Form.Label className="sr-only">
                                Email address
                              </Form.Label>
                              <Form.Control
                                size="lg"
                                id="inputEmail"
                                type="email"
                                aria-label="reg-email"
                                placeholder="Email address"
                                required
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                              />
                            </Form.Group>
                            <Form.Group className="my-2">
                              <h6 className="h6" style={{ 'margin-top': '5%' }}>
                                Your phone number
                              </h6>
                              <Form.Label className="sr-only">
                                Phone number
                              </Form.Label>
                              <Form.Control
                                size="lg"
                                id="inputPhone"
                                type="text"
                                aria-label="reg-phone"
                                placeholder="Phone number"
                                required
                                value={phone}
                                onChange={event => setPhone(event.target.value)}
                              />
                            </Form.Group>
                            <Form.Group className="my-2">
                              <h6 className="h6" style={{ 'margin-top': '5%' }}>
                                Your complete address
                              </h6>
                              <Form.Label className="sr-only">
                                Country
                              </Form.Label>
                              <Form.Control
                                size="lg"
                                id="inputCountry"
                                type="text"
                                aria-label="reg-country"
                                placeholder="Country"
                                required
                                value={country}
                                onChange={event =>
                                  setCountry(event.target.value)
                                }
                              />
                            </Form.Group>
                            <Form.Group className="my-2">
                              <Form.Label className="sr-only">City</Form.Label>
                              <Form.Control
                                size="lg"
                                id="inputCity"
                                type="text"
                                aria-label="reg-city"
                                placeholder="City"
                                required
                                value={city}
                                onChange={event => setCity(event.target.value)}
                              />
                            </Form.Group>
                            <Form.Group className="my-2">
                              <Form.Label className="sr-only">
                                Zip code
                              </Form.Label>
                              <Form.Control
                                size="lg"
                                id="inputZipCode"
                                type="number"
                                aria-label="reg-zip-code"
                                placeholder="Zip code"
                                required
                                value={zip}
                                onChange={event => setZip(event.target.value)}
                              />
                            </Form.Group>
                            <Form.Group className="my-2">
                              <h6 className="h6" style={{ 'margin-top': '3%' }}>
                                Choose a secure password
                              </h6>
                              <Form.Label className="sr-only">
                                Password
                              </Form.Label>
                              <Form.Control
                                size="lg"
                                id="inputPassword"
                                type="password"
                                aria-label="reg-psw"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={event =>
                                  setPassword(event.target.value)
                                }
                              />
                            </Form.Group>
                            <Form.Group className="my-2">
                              <Form.Label className="sr-only">
                                Confirm password
                              </Form.Label>
                              <Form.Control
                                size="lg"
                                id="inputConfirmPassword"
                                type="password"
                                aria-label="reg-psw-confirmation"
                                placeholder="Confirm password"
                                required
                                value={confirmPassword}
                                onChange={event =>
                                  setConfirmPassword(event.target.value)
                                }
                                isValid={
                                  confirmPassword.length > 0 &&
                                  confirmPassword === password
                                }
                                isInvalid={
                                  confirmPassword.length > 0 &&
                                  confirmPassword !== password
                                }
                              />
                            </Form.Group>
                            <Form.Group className="flex justify-center">
                              <ButtonBootstrap
                                size="lg"
                                aria-label="btn-create"
                                className="bg-primary flex justify-center mt-4 w-1/3"
                                type="submit"
                                disabled={loading}
                              >
                                <span className="flex items-center">
                                  {loading && (
                                    <Spinner
                                      animation="border"
                                      size="sm"
                                      className="mr-2"
                                    />
                                  )}
                                  Register
                                </span>
                              </ButtonBootstrap>
                            </Form.Group>
                            <div className="text-center mt-4 mb-3 text-muted">
                              <span>Copyright &copy; SPG</span>
                            </div>
                          </Form>
                        </Container>
                      </Row>
                    </Container>
                  ) : (
                    <div className="flex flex-grow justify-center">
                      <Row>
                        <Col>
                          <ButtonBootstrap
                            className="btn-register-again"
                            size="lg"
                            onClick={() => handleBackToRegistration()}
                          >
                            Back to registration
                          </ButtonBootstrap>
                        </Col>
                        <Col />
                        <Col>
                          <ButtonBootstrap
                            className="btn-go-to-login"
                            size="lg"
                            onClick={() => handleGoingToLogin()}
                          >
                            Go to Login
                          </ButtonBootstrap>
                        </Col>
                      </Row>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
