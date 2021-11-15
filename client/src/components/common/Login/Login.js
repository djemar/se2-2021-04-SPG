import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import {
  Spinner,
  Form,
  Button as ButtonBootstrap,
  Container,
  Alert,
} from 'react-bootstrap';
import API from '../../../API.js';

export function Login({ ...props }) {
  /*   const { login } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async event => {
    event.preventDefault();
    setLoading(true);
    const credentials = { username: email, password: password };
    try {
      const user = await API.logIn(credentials);
      login(user);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <Container fluid className="login text-center">
      <div className="flex flex-column justify-between">
        <div className="flex flex-none flex-column justify-between ">
          <div className="flex justify-center">
            <FontAwesomeIcon
              icon={faShoppingCart}
              className={'mr-2 mb-0 h1 text-primary justify-center'}
              style={{ fontSize: '100pt' }}
            />
          </div>
          <h1 className="h3 my-3 font-weight-normal font-bold">
            Welcome in SPG!
          </h1>
          <p className="text-dark mb-3">Please, login</p>
          {error && <Alert variant={'danger'}>{error}</Alert>}
        </div>
        <div className="flex flex-grow justify-center">
          <Form className="form-signin" onSubmit={event => submit(event)}>
            <Form.Group>
              <Form.Label className="sr-only">Email address</Form.Label>
              <Form.Control
                size="lg"
                id="inputEmail"
                type="email"
                placeholder="Email address"
                autoFocus={true}
                required
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
              <Form.Label className="sr-only">Password</Form.Label>
              <Form.Control
                size="lg"
                id="inputPassword"
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
            </Form.Group>
            <ButtonBootstrap
              variant="primary"
              size="lg"
              className="btn-block d-flex align-items-center justify-content-center"
              type="submit"
              disabled={loading}
            >
              {loading && (
                <Spinner animation="border" size="sm" className="mr-2" />
              )}{' '}
              Sign in
            </ButtonBootstrap>
            <div className="text-center mt-4 mb-3 text-muted">
              <span>Copyright &copy; SPG</span>
            </div>
          </Form>
        </div>
      </div>
    </Container>
  ); */
}

export default Login;
