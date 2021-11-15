import { Route, Switch, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CategoryCard from '../CategoryCard/CategoryCard';
import { categories } from '../../fakedata.js';
import Category from '../Category/Category';
import { Login } from '../Login';
import { CreateClient } from '../CreateClient';

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

  const categoriesMapped = categories.map(cat => {
    return <CategoryCard title={cat.name} key={cat.name} />;
  });

  return (
    <div className="col" style={{ height: '100%' }}>
      <Switch>
        <Route path="/login">
          {user ? <Redirect to="/" /> : <Login login={login} />}
        </Route>
        <Route path="/manager/:id"></Route>
        <Route path="/farmer/:id"></Route>
        <Route path="/product/:id"></Route>
        <Route path="/category/:id">
          <>
            <Category
              categories={categories}
              basketProducts={basketProducts}
              setBasketProducts={setBasketProducts}
              show={show}
              setShow={setShow}
            />
            ;
          </>
        </Route>
        <Route path="/categories">
          <>
            <div className="row">{categoriesMapped}</div>
          </>
        </Route>
        <Route path="/createClient">
          <CreateClient />
        </Route>
        <Route path="/">
          <Redirect to="/categories" />
        </Route>
      </Switch>
    </div>
  );
};

export default Main;
