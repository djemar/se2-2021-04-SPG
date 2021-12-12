import { useContext, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import API from '../../../API';
import { UserContext } from '../../../context/UserContext';
import Breadcrumbs from '../../misc/Breadcrumbs';
import OrderRow from './OrderRow';
import './Orders.css';

export const Orders = ({ ...props }) => {
  const { orders, products, loading } = useContext(UserContext);

  const [dirty, setDirty] = useState(true);
  const [dirtyProd, setDirtyProd] = useState(true);
  const [loadingProd, setLoadingProd] = useState(true);

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

  /* useEffect(() => {
    const getAllProducts = async () => {
      const products = await API.getAllProducts();
      setProducts(products);
    };

    if (dirtyProd) {
      setLoadingProd(true);
      getAllProducts().then(() => {
        setLoadingProd(false);
        setDirtyProd(false);
      });
    }
  }, [dirtyProd]);

  useEffect(() => {
    const getAllOrders = async () => {
      const orders = await API.getAllOrders();
      if (!loadingProd && products && orders) {
        const mappedOrders = API.mapOrders(orders, products);
        setOrders(mappedOrders);
      }
    };

    if (dirty || dirtyProd) {
      setLoading(true);
      getAllOrders().then(() => {
        setLoading(false);
        setDirty(false);
      });
    }
  }, [dirtyProd, dirty]); */

  return (
    <div className="flex flex-column justify-start">
      <div className="flex flex-none justify-start pb-4">
        <Breadcrumbs />
      </div>
      <div className="flex flex-grow justify-between">
        <div className="flex w-100 h-100 px-3">
          <Card className="spg-box shadow py-0">
            <Card.Title className="flex items-center justify-center text-center w-100 text-3xl font-bold text-white spg-box-title">
              Orders
              <span className="font-normal text-xl flex items-end ml-2">
                (#{orders ? orders.length : '0'})
              </span>
            </Card.Title>
            <Card.Body className="w-100 h-100 p-0">
              <Table borderless responsive="md" striped>
                <thead>
                  <tr>
                    <th className="text-center">Order ID</th>
                    <th className="text-center">Ordering user</th>
                    <th className="text-center">Date</th>
                    <th className="text-center">Ordered products</th>
                    <th className="text-center">TOT price</th>
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
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Orders;
