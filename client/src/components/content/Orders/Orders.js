import { Card } from 'react-bootstrap';
import Breadcrumbs from '../../misc/Breadcrumbs';
import './Orders.css';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import OrderRow from './OrderRow';
import API from '../../../API';

export const Orders = ({ ...props }) => {
  const [orders, setOrders] = useState([]);
  const [dirty, setDirty] = useState(true);
  const [loading, setLoading] = useState(true);

  function mapOrders() {
    if (orders && orders.length > 0)
      return orders.map((order, index) => (
        <OrderRow
          index={index}
          order_id={order.order_id}
          ref_product={order.ref_product}
          ref_user={order.ref_user}
          date_order={order.date_order}
          quantity={order.quantity}
          status={order.status}
          setDirty={setDirty}
        />
      ));
  }

  useEffect(() => {
    const getAllOrders = async () => {
      const orders = await API.getAllOrders();
      console.log('Orders : ', orders);
      setOrders(orders);
    };

    if (dirty) {
      setLoading(true);
      getAllOrders().then(() => {
        setLoading(false);
        setDirty(false);
      });
    }
  }, [dirty]);

  return (
    <div className="flex flex-column justify-start">
      <div className="flex flex-none justify-start pb-8 pt-4">
        <Breadcrumbs />
      </div>
      <div className="flex flex-grow justify-between">
        <div className="flex w-100 h-100 px-3">
          <Card className="spg-box shadow py-0">
            <Card.Title className="flex items-center justify-center text-center w-100 text-3xl font-bold text-white spg-box-title">
              Orders
              <span className="font-normal text-xl flex items-end ml-2">
                (#{orders.length})
              </span>
            </Card.Title>
            <Card.Body className="w-100 h-100 p-0">
              <Table borderless responsive="md" striped>
                <thead>
                  <tr>
                    <th className="text-center">Order ID</th>
                    <th className="text-center">Ordered product</th>
                    <th className="text-center">Ordering user</th>
                    <th className="text-center">Date and time</th>
                    <th className="text-center">Quantity</th>
                    <th className="text-center">Status</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <h3>Please wait, we're loading your orders...</h3>
                  ) : (
                    mapOrders()
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

export default Orders;
