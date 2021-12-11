import { useContext } from 'react';
import Table from 'react-bootstrap/Table';
import { UserContext } from '../../../context/UserContext';
import Page from '../../misc/Page';
import OrderRow from './OrderRow';
import './Orders.css';

export const Orders = ({ ...props }) => {
  const { orders, loading, setDirty } = useContext(UserContext);

  const mappedOrders = orders.map((order, index) => (
    <OrderRow
      index={index}
      order_id={order.order_id}
      ref_user={order.ref_user}
      date_order={order.date_order}
      products_and_qnt={order.products_and_qnt}
      tot_price={order.tot_price}
      status={order.status}
      setDirty={setDirty}
      isManager={true}
    />
  ));

  return (
    <Page title="Orders" subtitle={`(#${orders ? orders.length : '0'})`}>
      <Table borderless responsive="md" striped>
        <thead>
          <tr>
            <th className="text-center">Order ID</th>
            <th className="text-center">Client</th>
            <th className="text-center lg:table-cell hidden">Date</th>
            <th className="text-center">Ordered products</th>
            <th className="text-center md:table-cell hidden">TOT price</th>
            <th className="text-center">Status</th>
            <th />
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
    </Page>
  );
};

export default Orders;
