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

export const Main = ({ ...props }) => {
  const {
    user,
    basketProducts,
    setBasketProducts,
    login,
    isLogged,
    show,
    setShow,
  } = props;

  const [refresh, setRefresh] = useState(false);
  const [userType, setUserType] = useState(-1);

  useEffect(() => {
    if (isLogged) {
      setRefresh(true);
      setUserType(user.userType);
    }
  }, [isLogged]);

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
            show={show}
            setShow={setShow}
          />
        </Route>
        <Route path="/shop">
          <Shop
            categories={categories}
            basketProducts={basketProducts}
            setBasketProducts={setBasketProducts}
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
