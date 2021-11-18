import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import API from '../../../API';
import ProductCard from '../ProductCard/ProductCard';
import Sidebar from '../Sidebar/Sidebar';
import { Spinner } from '../../misc';
import Breadcrumbs from '../../misc/Breadcrumbs';

export const Shop = ({ ...props }) => {
  const { categories, basketProducts, setBasketProducts, show } = props;
  const [idCategory, setIdCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [dirty, setDirty] = useState(false);
  const [loading, setLoading] = useState(false);

  const { category } = useParams();
  console.log(category);

  /* useEffect(() => {
    if (id) {
      setIdCategory(id);
    }
  }, [id]); */

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

    if (category) {
      const idClean = category.replaceAll('-', ' ');
      setLoading(true);
      getAllProductsByCategory(idClean).then(() => {
        setLoading(false);
        //setDirty(false);
      });
    } else {
      setLoading(true);
      getAllProducts().then(() => {
        setLoading(false);
        //setDirty(false);
      });
    }
  }, [category]);

  const mappedProduct =
    (products &&
      products.map(
        (
          {
            product_id,
            ref_user,
            name,
            price,
            description,
            category,
            unit_of_measure,
            availability,
          },
          index
        ) => (
          <Col key={index} className="pl-10 pr-0 pt-5 pb-5 flex-none w-auto">
            <ProductCard
              key={product_id}
              pid={product_id}
              fid={ref_user}
              name={name}
              price={price}
              description={description}
              category={category}
              unit={unit_of_measure}
              availability={availability}
              basketProducts={basketProducts}
              setBasketProducts={setBasketProducts}
            />
          </Col>
        )
      )) ||
    [];

  return (
    <div className="flex flex-column justify-start">
      <div className="flex flex-none justify-start py-8">
        <Breadcrumbs />
      </div>
      <div className="flex flex-grow justify-between">
        <div className="col-2">
          <Sidebar
            basketProducts={basketProducts}
            setBasketProducts={setBasketProducts}
            setDirty={setDirty}
          />
        </div>
        <div className="col">
          <div className="flex flex-none justify-start px-8 items-end">
            <span className="text-4xl font-bold">
              {category ? category.split('-').join(' ') : 'All Products'}
            </span>
            <span className="text-2xl ml-8">
              {!loading &&
                mappedProduct &&
                `(${mappedProduct.length || 0} products available)`}
            </span>
          </div>
          {!loading && mappedProduct ? (
            <Row>{mappedProduct}</Row>
          ) : (
            <div className="vh-100 d-flex align-items-center">
              <Spinner />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
