import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import {
  Spinner,
  Form,
  Button as ButtonBootstrap,
  Container,
  Alert,
  Row,
  Col,
} from 'react-bootstrap';
import API from '../../../API.js';

export function CreateClient({ ...props }) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [idClient, setIdClient] = useState();

  const submit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      const hash = API.getHashedPWD(password);
      const id = await API.addClient(name, surname, email, hash);
      setIdClient(id);
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
          <h1 className="h3 text-primary my-3 font-weight-normal font-bold">
            Create new Client
          </h1>
          <div className="flex justify-center">
            {error && <Alert variant={'danger'}>{error}</Alert>}
            {idClient && (
              <Alert variant={'success'} className="w-1/3">
                <span className="font-bold h5 uppercase">Client Created!</span>
                <br />
                <div className="">
                  <div>
                    <span className="font-bold">Client ID: </span>
                    {idClient}
                  </div>
                  <div>
                    <span className="font-bold">Name: </span>
                    {name}
                  </div>
                  <div>
                    <span className="font-bold">Surname: </span>
                    {surname}
                  </div>
                  <div>
                    <span className="font-bold">Email: </span>
                    {email}
                  </div>
                </div>

                {error}
              </Alert>
            )}
          </div>
        </div>
        <div className="flex flex-grow justify-center">
          <Form className="w-1/2" onSubmit={submit}>
            <Form.Group className="my-2">
              <Form.Label className="sr-only">Name</Form.Label>
              <Form.Control
                size="lg"
                id="inputNamd"
                type="text"
                aria-label="reg-client-name"
                placeholder="Name"
                autoFocus={true}
                required
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="my-2">
              <Form.Label className="sr-only">Surname</Form.Label>
              <Form.Control
                size="lg"
                id="inputSurname"
                type="text"
                aria-label="reg-client-surname"
                placeholder="Surname"
                autoFocus={true}
                required
                value={surname}
                onChange={event => setSurname(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="my-2">
              <Form.Label className="sr-only">Email address</Form.Label>
              <Form.Control
                size="lg"
                id="inputEmail"
                type="email"
                aria-label="reg-client-email"
                placeholder="Email address"
                autoFocus={true}
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
                aria-label="reg-client-psw"
                placeholder="Password"
                required
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="flex justify-center">
              <ButtonBootstrap
                variant="primary"
                size="lg"
                aria-label="btn-create-client"
                className="btn-block flex justify-center mt-4 w-1/3"
                type="submit"
                disabled={loading}
              >
                <span className="flex items-center">
                  {loading && (
                    <Spinner animation="border" size="sm" className="mr-2" />
                  )}
                  Create Client
                </span>
              </ButtonBootstrap>
            </Form.Group>
            <div className="text-center mt-4 mb-3 text-muted">
              <span>Copyright &copy; SPG</span>
            </div>
          </Form>
        </div>
      </div>
    </Container>
  );
}

export default CreateClient;
