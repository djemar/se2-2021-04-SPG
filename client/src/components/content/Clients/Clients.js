import { Card, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Breadcrumbs from '../../misc/Breadcrumbs';
import { ClientRow } from '.';
import './Clients.css';
import API from '../../../API';
import Page from '../../misc/Page';

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
            phone={user.phone}
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
    <>
      <Page
        title="Clients"
        subtitle={`(#${users.filter(u => u.Type === 'Client').length})`}
      >
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
              <th className="hidden md:table-cell">Telephone</th>
              <th className="hidden md:table-cell">Email</th>
              <th className="hidden sm:table-cell">Wallet</th>
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
      </Page>
    </>
  );
};

export default Clients;
