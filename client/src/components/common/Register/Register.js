import { useState } from 'react';
import {
  Alert,
  Button as ButtonBootstrap,
  ButtonGroup,
  Col,
  Form,
  Row,
  Spinner,
} from 'react-bootstrap';
import API from '../../../API.js';
import Page from '../../misc/Page';
import { Redirect } from 'react-router-dom';
import './../../../style/custom.css';

function Register(props) {
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
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [page, setPage] = useState('');

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
        } else {
          setError('Select a user type');
          setLoading(false);
        }
        setAlreadyRegistered(true);
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
    setConfirmPassword('');
    setEmail('');
    setPhone('');
    setLoading(false);
    setError('');
    setIdUser('');
    setType('Client');
    setAddress('');
    setCountry('');
    setZip('');
    setCity('');
    setCompany('');
    setPage('');
  };

  const backToRegister = () => {
    setPage('/register');
    setAlreadyRegistered(false);
    resetForm();
  };

  const goToLogin = () => {
    resetForm();
    setPage('/login');
  };

  if (page === '/register' || page === '/login') return <Redirect to={page} />;

  return (
    <Page title="Register">
      <div className="flex flex-none flex-column justify-between">
        <div className="flex flex-none flex-column justify-between items-center">
          <h1 className="h3 my-3 font-weight-normal font-bold text-primary">
            Welcome in SPG!
          </h1>
          {error && (
            <Alert
              aria-label="alert-wrong-email"
              variant={'danger'}
              className="text-center"
            >
              <strong>Something in the form is wrong</strong>
              <br />
              {error}
            </Alert>
          )}
        </div>
        <div className="flex justify-center">
          {idUser && (
            <Alert variant={'success'} className="w-96 text-center">
              <span
                aria-label="user-successfully-created"
                className="h6 text-center"
              >
                User successfully created with ID: <b>{idUser}</b>
              </span>
            </Alert>
          )}
        </div>
      </div>
      <div className="flex flex-grow justify-center">
        {!alreadyRegistered ? (
          <Form className="w-72 sm:w-full px-2" onSubmit={submit}>
            <div className="flex flex-column justify-center items-center my-2 w-72 sm:w-full">
              <h6 className="h6 text-left">Register as: </h6>
              <ButtonGroup className="w-72 sm:w-96">
                <ButtonBootstrap
                  aria-label="register-as-client"
                  className={
                    type === 'Client' ? 'btn-type-selected' : 'btn-type'
                  }
                  onClick={() => {
                    setType('Client');
                  }}
                >
                  Client
                </ButtonBootstrap>
                <ButtonBootstrap
                  aria-label="register-as-farmer"
                  className={
                    type === 'Farmer' ? 'btn-type-selected' : 'btn-type'
                  }
                  onClick={() => {
                    setType('Farmer');
                  }}
                >
                  Farmer
                </ButtonBootstrap>
              </ButtonGroup>
            </div>
            <Row>
              <Col
                xl={{ span: 4, offset: 2 }}
                lg={{ span: 5, offset: 1 }}
                md={{ span: 5, offset: 1 }}
                xs={{ span: 12 }}
                align={'center'}
                className="px-0"
              >
                <Form.Group
                  className="my-2 w-72 sm:w-96 md:w-72 lg:w-96"
                  sm={6}
                >
                  <h6 className="h6 text-left">Your name and surname</h6>
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
                <Form.Group className="my-2 w-72 sm:w-96 md:w-72 lg:w-96">
                  <Form.Label className="sr-only">Surname</Form.Label>
                  <Form.Control
                    size="lg"
                    id="inputSurname"
                    type="text"
                    aria-label="reg-surname"
                    placeholder="Surname"
                    required
                    value={surname}
                    onChange={event => setSurname(event.target.value)}
                  />
                </Form.Group>

                <Form.Group className="my-2 w-72 sm:w-96 md:w-72 lg:w-96">
                  <h6 className="h6 text-left" style={{ 'margin-top': '5%' }}>
                    Your complete address
                  </h6>
                  <Form.Label className="sr-only">Address</Form.Label>
                  <Form.Control
                    size="lg"
                    id="inputAddress"
                    type="text"
                    aria-label="reg-address"
                    placeholder="Address"
                    required
                    value={address}
                    onChange={event => setAddress(event.target.value)}
                  />
                </Form.Group>
                <Form.Group className="my-2 w-72 sm:w-96 md:w-72 lg:w-96">
                  <Form.Label className="sr-only">Country</Form.Label>
                  <Form.Control
                    size="lg"
                    id="inputCountry"
                    type="text"
                    aria-label="reg-country"
                    placeholder="Country"
                    required
                    value={country}
                    onChange={event => setCountry(event.target.value)}
                  />
                </Form.Group>
                <Form.Group className="my-2 w-72 sm:w-96 md:w-72 lg:w-96">
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
                <Form.Group className="my-2 w-72 sm:w-96 md:w-72 lg:w-96">
                  <Form.Label className="sr-only">Zip code</Form.Label>
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
              </Col>
              <Col
                xl={{ span: 4 }}
                lg={{ span: 5 }}
                md={{ span: 5 }}
                xs={{ span: 12 }}
                align={'center'}
                className="px-0"
              >
                {type === 'Farmer' && (
                  <Form.Group className="my-2 w-72 sm:w-96 md:w-72 lg:w-96">
                    <h6 className="h6 text-left">
                      The name of your company or shop
                    </h6>
                    <Form.Label className="sr-only">Company name</Form.Label>
                    <Form.Control
                      size="lg"
                      id="inputCompanyName"
                      aria-label="reg-farmer-companyName"
                      placeholder="Company name"
                      required
                      value={company}
                      onChange={event => setCompany(event.target.value)}
                    />
                  </Form.Group>
                )}
                <Form.Group className="my-2 w-72 sm:w-96 md:w-72 lg:w-96">
                  <h6
                    className={`h6 text-left ${
                      type === 'Farmer' ? 'pt-2' : ''
                    }`}
                  >
                    Your email address
                  </h6>
                  <Form.Label className="sr-only">Email address</Form.Label>
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
                <Form.Group className="my-2 w-72 sm:w-96 md:w-72 lg:w-96">
                  <h6 className="h6 text-left" style={{ 'margin-top': '5%' }}>
                    Your phone number
                  </h6>
                  <Form.Label className="sr-only">Phone number</Form.Label>
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
                <Form.Group className="my-2 w-72 sm:w-96 md:w-72 lg:w-96">
                  <h6 className="h6 text-left" style={{ 'margin-top': '3%' }}>
                    Choose a secure password
                  </h6>
                  <Form.Label className="sr-only">Password</Form.Label>
                  <Form.Control
                    size="lg"
                    id="inputPassword"
                    type="password"
                    aria-label="reg-psw"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                  />
                  <Form.Label className="sr-only">Confirm password</Form.Label>
                  <Form.Control
                    size="lg"
                    id="inputConfirmPassword"
                    type="password"
                    aria-label="reg-psw-confirmation"
                    placeholder="Confirm password"
                    style={{ 'margin-top': '2px' }}
                    required
                    value={confirmPassword}
                    onChange={event => setConfirmPassword(event.target.value)}
                    isValid={
                      confirmPassword.length > 0 && confirmPassword === password
                    }
                    isInvalid={
                      confirmPassword.length > 0 && confirmPassword !== password
                    }
                  />
                </Form.Group>
                <Form.Group className="my-2 w-72 sm:w-96 md:w-72 lg:w-96" />
              </Col>
            </Row>
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
                    <Spinner animation="border" size="sm" className="mr-2" />
                  )}
                  Register
                </span>
              </ButtonBootstrap>
            </Form.Group>
            <div className="text-center mt-4 mb-3 text-muted">
              <span>Copyright &copy; SPG</span>
            </div>
          </Form>
        ) : (
          <div>
            <div style={{ 'margin-top': '25%' }} />
            <ButtonBootstrap
              size="lg"
              aria-label="btn-back-to-register"
              className="btn-back-to-register p-3 m-12"
              onClick={() => backToRegister()}
            >
              Back to register
            </ButtonBootstrap>
            <ButtonBootstrap
              size="lg"
              aria-label="btn-go-to-login"
              className="btn-go-to-login p-3 m-12"
              onClick={() => goToLogin()}
            >
              Go to Login
            </ButtonBootstrap>
          </div>
        )}
      </div>
    </Page>
  );
}

export default Register;
