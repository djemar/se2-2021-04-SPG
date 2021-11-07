import ProductCard from '../ProductCard/ProductCard';
import { useRouteMatch } from 'react-router-dom';
import API from '../../../API';
import { useEffect, useState } from 'react';

export const Category = ({ ...props }) => {
  const { basketProducts, setBasketProducts } = props;

  const [products, setProducts] = useState([]);
  const id = useRouteMatch().params.id;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //useEffect è un hook che permette di usare i lyfecycle del component. Equivale alla componentDidMount, componentDidUpdate, componentWillUnmount.
    const getAllProducts = async () => {
      const newProducts = await API.getAllProducts();
      setProducts(newProducts);
    };

    const getAllProductsByCategory = async idCategory => {
      const newProducts = await API.getAllProductsByCategory(idCategory);
      setProducts(newProducts);
    };

    let idWithSpaces = id.replaceAll('-', ' ');
    setLoading(true);
    if (idWithSpaces === 'All products') {
      getAllProducts().then(() => {
        console.log('success');
        setLoading(false);
      });
    } else {
      getAllProductsByCategory(idWithSpaces).then(() => {
        console.log('success');
        setLoading(false);
      });
    }
  }, []);

  function mapProducts() {
    if (products && products.length > 0) {
      return products.map(prod => (
        <ProductCard
          key={prod.product_id}
          pid={prod.product_id}
          fid={prod.ref_user}
          name={prod.name}
          price={prod.price}
          description={prod.description}
          category={prod.category}
          unit={prod.unit_of_measure}
          availability={prod.availability}
          basketProducts={basketProducts}
          setBasketProducts={setBasketProducts}
        />
      ));
    } else {
      return (
        <div className="h2 my-5 font-weight-bold text-dark text-uppercase flex justify-center">
          There are no products available for this category.
        </div>
      );
    }
  }

  return (
    <div className="row p-10">
      {loading ? (
        <>
          <br></br>
          <br></br>
          <br></br>
          <h3>🕗 Please wait, loading your products... 🕗</h3>
        </>
      ) : (
        mapProducts()
      )}
    </div>
  );
};

export default Category;
