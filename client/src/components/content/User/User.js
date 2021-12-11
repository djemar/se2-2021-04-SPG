import { useContext } from 'react';
import { Card, Table } from 'react-bootstrap';
import { UserContext } from '../../../context/UserContext';
import img from '../../../img/undraw_profile.svg';
import Page from '../../misc/Page';
import './User.css';
import UserOrderRow from './UserOrderRow';

export const User = ({ ...props }) => {
  const { user } = props;
  const { orders, loading } = useContext(UserContext);

  const mappedOrders = orders.map((order, index) => (
    <UserOrderRow
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
    <Page title="Account">
      <div className="row">
        <div className="col-md-3 flex flex-column justify-center py-4">
          <img
            alt=""
            className="img-profile rounded-circle h-36 mb-6"
            src={img}
          />
          <Card.Text className="text-xl text-primary font-bold flex justify-center text-dark mb-2">
            {`${String(user.name)} ${String(user.surname)}`}
          </Card.Text>
          <Card.Text className="text-md flex justify-center text-dark mb-2 flex items-center">
            <span className="font-bold">Wallet:</span>
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
        <div className="col-md-9 flex flex-column justify-start user-divider-top md:border-t-0 md:border-l md:user-divider-left  items-center pt-2">
          <span className="font-bold text-2xl">Orders</span>
          <Table borderless striped>
            <thead>
              <tr>
                <th className="text-center">Order ID</th>
                <th className="text-center md:table-cell hidden">Date</th>
                <th className="text-center lg:table-cell hidden"># Products</th>
                <th className="text-center">Total Price</th>
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
        </div>
      </div>
    </Page>
  );
};

export default User;
