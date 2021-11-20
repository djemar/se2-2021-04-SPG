import { useState } from 'react';
import {
  Spinner,
  Form,
  Button as ButtonBootstrap,
  Alert,
  Card,
} from 'react-bootstrap';
import Breadcrumbs from '../../misc/Breadcrumbs';
import API from '../../../API.js';

const Register = ({ ...props }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [idUser, setIdUser] = useState();
  const [type, setType] = useState('');

  const submit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      if (type === 'Client' || type === 'Farmer') {
        const hash = API.getHashedPWD(password);
        let user = {
          name: name,
          surname: surname,
          email: email,
          hash: hash,
          Type: type,
          address: 'a',
          phone: 'p',
          country: 'c',
          city: 'ci',
          zip_code: 22,
        };
        const res = await API.addUser(user);
        setIdUser(res.user_id);
        setLoading(false);
        setError('');
      } else {
        setError('Select a user type');
        setLoading(false);
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-column justify-start">
      <div className="flex flex-none justify-start py-8">
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
                          <span className="font-bold">Client ID: </span>
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
              <div className="flex flex-grow justify-center">
                <Form className="w-1/2" onSubmit={submit}>
                  <Form.Group className="my-2">
                    <Form.Label className="sr-only">Name</Form.Label>
                    <Form.Control
                      size="lg"
                      id="inputNamd"
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
                    <Form.Label className="sr-only">Surname</Form.Label>
                    <Form.Control
                      size="lg"
                      id="inputSurname"
                      type="text"
                      aria-label="reg-surname"
                      placeholder="Surname"
                      autoFocus={true}
                      required
                      value={surname}
                      onChange={event => setSurname(event.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="my-2">
                    <Form.Label className="sr-only">Type</Form.Label>
                    <Form.Control
                      id="inputType"
                      type="type"
                      as="select"
                      aria-label="reg-client-type"
                      placeholder="Type"
                      required
                      value={type}
                      onChange={event => setType(event.target.value)}
                    >
                      <option hidden>User type</option>
                      <option value="Client">Client</option>
                      <option value="Farmer">Farmer</option>
                    </Form.Control>
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
                      aria-label="reg-psw"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={event => setPassword(event.target.value)}
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
                        Create Client
                      </span>
                    </ButtonBootstrap>
                  </Form.Group>
                  <div className="text-center mt-4 mb-3 text-muted">
                    <span>Copyright &copy; SPG</span>
                  </div>
                </Form>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
