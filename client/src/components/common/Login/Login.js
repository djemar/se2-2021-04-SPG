import { useState } from 'react';
import {
  Alert,
  Button as ButtonBootstrap,
  Form,
  Spinner,
} from 'react-bootstrap';
import API from '../../../API.js';
import Page from '../../misc/Page.js';

export function Login({ ...props }) {
  const { login } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async event => {
    event.preventDefault();
    setLoading(true);
    const credentials = { email: email, password: password };

    try {
      const user = await API.login(credentials);
      login(user);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return (
    <Page title="Login">
      <div className="flex flex-column justify-between">
        <div className="flex flex-none flex-column justify-between items-center">
          <h1 className="h3 my-3 font-weight-normal font-bold text-primary">
            Welcome in SPG!
          </h1>
          {error && <Alert variant={'danger'}>{error}</Alert>}
        </div>
        <div className="flex flex-grow justify-center">
          <Form className="w-72 sm:w-96 " onSubmit={event => submit(event)}>
            <Form.Group className="my-2">
              <Form.Label className="sr-only">Email address</Form.Label>
              <Form.Control
                size="lg"
                id="inputEmail"
                type="email"
                placeholder="Email address"
                autoFocus={true}
                aria-label="login-email"
                required
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="my-2">
              <Form.Label className="sr-only">Password</Form.Label>
              <Form.Control
                size="lg"
                id="inputPassword"
                type="password"
                placeholder="Password"
                required
                value={password}
                aria-label="login-password"
                onChange={event => setPassword(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="flex justify-center">
              <ButtonBootstrap
                size="lg"
                className="bg-primary d-flex align-items-center justify-content-center"
                type="submit"
                disabled={loading}
              >
                {loading && (
                  <Spinner animation="border" size="sm" className="mr-2" />
                )}
                Sign in
              </ButtonBootstrap>
            </Form.Group>
            <div className="text-center mt-4 mb-3 text-muted">
              <span>Copyright &copy; SPG</span>
            </div>
          </Form>
        </div>
      </div>
    </Page>
  );
}

export default Login;
