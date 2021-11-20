import { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { categories } from '../../fakedata.js';
import User from '../../content/User/User.js';
import { Login } from '../Login';
import Shop from '../Shop/Shop';
import Clients from '../../content/Clients/Clients.js';
import Farmers from '../../content/Farmers/Farmers.js';
import Order from '../../content/Order/Order.js';
import Orders from '../../content/Orders/Orders.js';
import Register from '../Register/Register.js';
import Alert from 'react-bootstrap/Alert';
import API from '../../../API';

export const Main = ({ ...props }) => {
  const {
    user,
    basketProducts,
    setBasketProducts,
    setAnimateBasket,
    login,
    isLogged,
    show,
    setShow,
  } = props;

  const [refresh, setRefresh] = useState(false);
  const [userType, setUserType] = useState(-1);

  const [alertWallet, setAlertWallet] = useState(false);

  const [products, setProducts] = useState([]);
  const [dirtyProd, setDirtyProd] = useState(true);
  const [loadingProd, setLoadingProd] = useState(true);

  useEffect(() => {
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
  }, [isLogged]);

  useEffect(() => {
    if (isLogged && user !== null && user !== undefined) {
      const getAllOrders = async () => {
        const orders = await API.getAllOrders();
        if (!loadingProd) {
          console.log('Orders : ', orders);
          const filteredOrders = orders.filter(
            o => o.ref_user === user.id && o.status === 'pending'
          );
          // Re-organizing orders:
          const order_ids_duplicated = filteredOrders.map(
            order => order.order_id
          );
          const order_ids = order_ids_duplicated.filter(function (item, pos) {
            return order_ids_duplicated.indexOf(item) === pos;
          });
          let tot_sum = 0;
          order_ids.forEach(id => {
            let sum = 0;
            filteredOrders.forEach(ord => {
              if (ord.order_id === id) {
                let current_product = products.find(
                  p => p.product_id === ord.ref_product
                );
                if (current_product === undefined) return false;
                sum += current_product.price * ord.quantity;
              }
            });
            tot_sum += sum;
          });

          if (tot_sum > user.wallet_balance) setAlertWallet(true);
          else setAlertWallet(false);
        }
      };

      getAllOrders().then(() => {
        setRefresh(true);
      });
    } else setAlertWallet(false);
  }, [isLogged, user]);

  return (
    <div className="row px-5">
      <Switch>
        <Route path="/login">
          {user ? <Redirect to="/" /> : <Login login={login} />}
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/user/:id">
          <User />
        </Route>
        <Route path="/orders/:id">
          <Order />
        </Route>
        <Route path="/orders/">
          <Orders />
        </Route>
        <Route path="/farmers/">
          <Farmers />
        </Route>
        <Route path="/clients/">
          <Clients />
        </Route>
        <Route path="/shop/:category">
          <Shop
            categories={categories}
            basketProducts={basketProducts}
            setBasketProducts={setBasketProducts}
            setAnimateBasket={setAnimateBasket}
            show={show}
            setShow={setShow}
          />
        </Route>
        <Route path="/shop">
          {alertWallet ? (
            <Alert className="text-center" variant="warning">
              <Alert.Heading>
                ⚠ You have orders pending but your{' '}
                <strong>balance is not enough</strong>! Top-up it! ⚠ ️
              </Alert.Heading>
            </Alert>
          ) : (
            <></>
          )}
          <Shop
            categories={categories}
            basketProducts={basketProducts}
            setBasketProducts={setBasketProducts}
            setAnimateBasket={setAnimateBasket}
            show={show}
            setShow={setShow}
          />
        </Route>

        <Route exact strict path="/">
          <Redirect to="/shop" />
        </Route>
      </Switch>
    </div>
  );
};

export default Main;
