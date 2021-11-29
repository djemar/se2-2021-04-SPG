import { Card } from 'react-bootstrap';
import Breadcrumbs from '../../misc/Breadcrumbs';
import './Orders.css';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import OrderRow from './OrderRow';
import API from '../../../API';

export const Orders = ({ ...props }) => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [dirty, setDirty] = useState(true);
  const [dirtyProd, setDirtyProd] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingProd, setLoadingProd] = useState(true);

  function mapOrders() {
    if (orders && orders.length > 0)
      return orders.map((order, index) => (
        <OrderRow
          index={index}
          order_id={order.order_id}
          ref_user={order.ref_user}
          date_order={order.date_order}
          products_and_qnt={order.products_and_qnt}
          tot_price={order.tot_price}
          status={order.status}
          setDirty={setDirty}
        />
      ));
  }

  useEffect(() => {
    const getAllProducts = async () => {
      const products = await API.getAllProducts();
      console.log('Products: ', products);
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
      if (!loadingProd) {
        console.log('Orders : ', orders);
        // Re-organizing orders:
        const order_ids_duplicated = orders.map(order => order.order_id);
        const order_ids = order_ids_duplicated.filter(function (item, pos) {
          return order_ids_duplicated.indexOf(item) === pos;
        });
        let reorganized_orders = [];
        order_ids.forEach(id => {
          let products_and_qnt = [];
          let sum = 0;
          orders.forEach(ord => {
            if (ord.order_id === id) {
              let current_product = products.find(
                p => p.product_id === ord.ref_product
              );
              if (current_product === undefined) return false;
              sum += current_product.price * ord.quantity;
              products_and_qnt.push({
                prod: ord.ref_product,
                qnt: ord.quantity,
                prod_name: current_product.name,
                price_per_unit: current_product.price,
              });
            }
          });
          let current_order = orders.find(o => o.order_id === id);
          let to_be_added = {
            order_id: id,
            ref_user: current_order.ref_user,
            date_order: current_order.date_order,
            products_and_qnt: products_and_qnt,
            tot_price: sum,
            status: current_order.status,
          };
          if (to_be_added.order_id !== 1)
            // JUST USED TO FILTER OUT TESTING ORDER
            reorganized_orders.push(to_be_added);
        });
        console.log('Reorganized orders: ', reorganized_orders);
        setOrders(reorganized_orders);
      }
    };

    if (dirty || dirtyProd) {
      setLoading(true);
      getAllOrders().then(() => {
        setLoading(false);
        setDirty(false);
      });
    }
  }, [dirtyProd, dirty]);

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
                    <th className="text-center">Ordering user</th>
                    <th className="text-center">Date and time</th>
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
