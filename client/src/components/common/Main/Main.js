import { Route, Switch } from 'react-router-dom';
import CategoryCard from '../CategoryCard/CategoryCard';
import { categories } from '../../fakedata.js';
import Category from '../Category/Category';

export const Main = ({ ...props }) => {
  const { user, basketProducts, setBasketProducts, show, setShow } = props;

  const categoriesMapped = categories.map(cat => {
    return <CategoryCard title={cat.name} key={cat.name} />;
  });

  return (
    <div className="col" style={{ height: '100%' }}>
      <Switch>
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
        <Route path="/">
          <>
            <div className="row">{categoriesMapped}</div>
          </>
        </Route>
      </Switch>
    </div>
  );
};

export default Main;
