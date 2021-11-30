import { Card, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Breadcrumbs from '../../misc/Breadcrumbs';
import { ClientRow } from '.';
import './Clients.css';
import API from '../../../API';

export const Clients = ({ ...props }) => {
  const [users, setUsers] = useState([]);
  const [dirty, setDirty] = useState(true);
  const [loading, setLoading] = useState(true);

  const mapClients = () => {
    return (
      users &&
      users.length &&
      users
        .filter(user => user.Type === 'Client')
        .map((user, index) => (
          <ClientRow
            key={user.user_id}
            index={index}
            user_id={user.user_id}
            name={user.name}
            surname={user.surname}
            email={user.email}
            type={user.Type}
            wallet_balance={user.wallet_balance}
            isClient={user.Type === 'Client'}
            setDirty={setDirty}
          ></ClientRow>
        ))
    );
  };

  useEffect(() => {
    //useEffect è un hook che permette di usare i lyfecycle del component. Equivale alla componentDidMount, componentDidUpdate, componentWillUnmount.
    const getAllUsers = async () => {
      const users = await API.getAllUsers();
      setUsers(users);
    };

    if (dirty) {
      setLoading(true);
      getAllUsers().then(() => {
        setLoading(false);
        setDirty(false);
      });
    }
  }, [dirty]);

  return (
    <div className="flex flex-column justify-start">
      <div className="flex flex-none justify-start pb-4">
        <Breadcrumbs />
      </div>
      <div className="flex flex-grow justify-between">
        <div className="flex w-100 h-100 px-3">
          <Card className="spg-box shadow py-0">
            <Card.Title className="flex items-center justify-center text-center w-100 text-3xl font-bold text-white spg-box-title">
              Clients
              <span className="font-normal text-xl flex items-end ml-2">
                (#{users.length})
              </span>
            </Card.Title>
            <Card.Body className="w-100 h-100 p-0">
              <Table
                borderless
                responsive="md"
                striped
                className="table-auto text-center"
              >
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Email</th>
                    <th>Wallet</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <h3>Please wait, we're loading your clients...</h3>
                  ) : (
                    mapClients()
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Clients;
