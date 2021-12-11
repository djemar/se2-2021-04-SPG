import { Redirect, Route, Switch } from 'react-router-dom';
import Clients from '../../content/Clients/Clients.js';
import Orders from '../../content/Orders/Orders.js';
import User from '../../content/User/User.js';
import { categories } from '../../fakedata.js';
import { Login } from '../Login';
import MyShop from '../MyShop/MyShop';
import Register from '../Register/Register.js';
import Shop from '../Shop/Shop';

export const Main = ({ ...props }) => {
  const {
    user,
    basketProducts,
    setBasketProducts,
    setAnimateBasket,
    login,
    show,
    setShow,
  } = props;

  return (
    <div className="row px-5">
      <Switch>
        <Route path="/login">
          {user ? <Redirect to="/" /> : <Login login={login} />}
        </Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/user/">
          {user && user.userType === 'Client' ? (
            <User user={user} />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        {/* <Route path="/orders/:id">
          {user ? <Redirect to="/" /> : <Order />}
        </Route> */}
        <Route path="/orders/">
          {user && user.userType === 'Employee' ? (
            <Orders />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        {/* <Route path="/farmers/">
          {user ? <Redirect to="/" /> : <Register />}
          <Farmers />
        </Route> */}
        <Route path="/myShop/">
          {user && user.userType === 'Farmer' ? (
            <MyShop />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route path="/clients/">
          {user && user.userType === 'Employee' ? (
            <Clients />
          ) : (
            <Redirect to="/" />
          )}
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
          <Shop
            categories={categories}
            basketProducts={basketProducts}
            setBasketProducts={setBasketProducts}
            setAnimateBasket={setAnimateBasket}
            show={show}
            setShow={setShow}
          />
        </Route>

        <Route strict path="/">
          <Redirect to="/shop" />
        </Route>
      </Switch>
    </div>
  );
};

export default Main;
