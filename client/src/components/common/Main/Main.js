import { Route, Switch } from 'react-router-dom';
import CategoryCard from '../CategoryCard/CategoryCard';
import ProductCard from '../Product/ProductCard';

export const Main = ({ ...props }) => {
  return (
    <div className="col" style={{ height: '100%' }}>
      <Switch>
        <Route path="/manager/:id"></Route>
        <Route path="/farmer/:id"></Route>
        <Route path="/product/:id"></Route>
        <Route path="/category/:id">
          <>
            <div className="row p-10">
              <ProductCard title="product 1" />
              <ProductCard title="product 2" />
              <ProductCard title="product 3" />
              <ProductCard title="product 4" />
              <ProductCard title="product 5" />
              <ProductCard title="product 6" />
            </div>
          </>
        </Route>
        <Route path="/">
          <>
            <div className="row">
              <CategoryCard title="Category 1" />
              <CategoryCard title="Category 2" />
              <CategoryCard title="Category 3" />
              <CategoryCard title="Category 4" />
              <CategoryCard title="Category 5" />
              <CategoryCard title="Category 6" />
            </div>
          </>
        </Route>
      </Switch>
    </div>
  );
};

export default Main;
