import { useContext, useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';
import API from '../../../API';
import { UserContext } from '../../../context/UserContext';
import img from '../../../img/undraw_profile.svg';
import Breadcrumbs from '../../misc/Breadcrumbs';
import OrderRow from '../Orders/OrderRow';
import './User.css';

export const User = ({ ...props }) => {
  const { user } = props;
  const { name, surname } = user;
  const [key, setKey] = useState('orders');
  const { orders, loading } = useContext(UserContext);

  const mappedOrders = orders.map((order, index) => (
    <OrderRow
      index={index}
      order_id={order.order_id}
      ref_user={order.ref_user}
      date_order={order.date_order}
      products_and_qnt={order.products_and_qnt}
      tot_price={order.tot_price}
      status={order.status}
      isManager={false}
    />
  ));

  return (
    <div className="flex flex-column justify-start">
      <div className="flex flex-none justify-start pb-4">
        <Breadcrumbs latestField={`${name} ${surname}`} />
      </div>
      <div className="flex flex-grow justify-between">
        <div className="flex w-100 h-100 px-3">
          <Card className="user-box shadow py-0">
            <Card.Title className="flex items-center justify-center text-center w-100 text-3xl font-bold text-white user-box-title">
              Account
            </Card.Title>
            <Card.Body className="py-4 w-100 h-100">
              <div className="row">
                <div className="col-3 flex flex-column justify-center py-4">
                  <img
                    alt=""
                    className="img-profile rounded-circle h-36 mb-6"
                    src={img}
                  />
                  <Card.Text className="text-xl text-primary font-bold flex justify-center text-dark mb-2">
                    {`${String(user.name)} ${String(user.surname)}`}
                  </Card.Text>
                  <Card.Text className="text-md flex justify-center text-dark mb-2 flex items-center">
                    <span className="font-bold">Wallet Balance:</span>
                    <span className="ml-2 px-3 py-0.5 order-status bg-secondary">
                      {user.wallet_balance} €
                    </span>
                  </Card.Text>
                  <Card.Text className="text-md  flex justify-center text-dark mb-2">
                    <span className="font-bold">User Type:</span>
                    <span className="ml-2">{user.userType}</span>
                  </Card.Text>
                  <Card.Text className="text-md flex justify-center text-dark mb-2">
                    <span className="font-bold">User ID:</span>
                    <span className="ml-2">{user.id}</span>
                  </Card.Text>
                </div>
                <div className="col-9 flex flex-column justify-start user-divider items-center">
                  <span className="font-bold text-2xl">Orders</span>
                  <Table borderless striped>
                    <thead>
                      <tr>
                        <th className="text-center">Order ID</th>
                        <th className="text-center">Ordering user</th>
                        <th className="text-center">Date and time</th>
                        <th className="text-center">Ordered products</th>
                        <th className="text-center">TOT price</th>
                        <th className="text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <h3>Please wait, we're loading your orders...</h3>
                      ) : (
                        mappedOrders
                      )}
                    </tbody>
                  </Table>
                  {/* <Tabs
                    activeKey={key}
                    onSelect={k => setKey(k)}
                    className="mb-3"
                  >
                    <Tab
                      tabClassName="no-underline text-primary"
                      eventKey="orders"
                      title="Orders"
                    ></Tab>
                    <Tab
                      tabClassName="no-underline text-primary"
                      eventKey="wallet"
                      title="Wallet"
                    >
                      {user.wallet_balance}
                    </Tab>
                  </Tabs> */}
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default User;
