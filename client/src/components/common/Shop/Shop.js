import { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import Select from 'react-select';
import { TimeContext } from '../../../context/TimeContext';
import { UserContext } from '../../../context/UserContext';
import { categories } from '../../fakedata';
import { Spinner } from '../../misc';
import Breadcrumbs from '../../misc/Breadcrumbs';
import ProductCard from '../ProductCard/ProductCard';
import Sidebar from '../Sidebar/Sidebar';

export const Shop = ({ ...props }) => {
  const { basketProducts, setBasketProducts, setAnimateBasket } = props;
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { loadingProd } = useContext(TimeContext);
  const { dateProducts, loading } = useContext(UserContext);

  const { category } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (category) {
      const cleanCategory = category.replaceAll('-', ' ');
      setFilteredProducts(
        dateProducts
          ? dateProducts.filter(p => p.category === cleanCategory)
          : []
      );
    } else setFilteredProducts(dateProducts);
  }, [category, dateProducts]);

  const mappedProduct =
    (filteredProducts &&
      filteredProducts.map(
        (
          {
            product_id,
            ref_farmer,
            name,
            price,
            description,
            category,
            unit_of_measure,
            image_path,
            availability,
          },
          index
        ) => {
          return (
            <ProductCard
              key={index}
              pid={product_id}
              fid={ref_farmer}
              name={name}
              price={price}
              description={description}
              category={category}
              unit={unit_of_measure}
              img={image_path}
              availability={availability}
              basketProducts={basketProducts}
              setBasketProducts={setBasketProducts}
              setAnimateBasket={setAnimateBasket}
            />
          );
        }
      )) ||
    [];

  const redirect = value => {
    if (value !== 'All products') {
      history.push(`/shop/${value.replaceAll(' ', '-')}`);
    } else history.push('/shop');
  };

  const show = Array.from(Array(200).keys()).map(s => (
    <div className="snow"></div>
  ));

  return (
    <div className="flex flex-column justify-start px-10 mt-4">
      <div className="flex flex-none md:justify-start pb-4 justify-center">
        <Breadcrumbs />
      </div>
      <div className="flex flex-none md:justify-start md:hidden justify-center z-20">
        <Form className="striped-list text-black shadow w-80 mb-4">
          <div className="d-flex items-center justify-between striped-list">
            <div className="d-flex items-center">
              <Select
                className="basic-single w-80"
                classNamePrefix="select"
                placeholder="All Categories"
                onChange={value => redirect(value.name)}
                name="inventory"
                getOptionValue={option => option.name}
                getOptionLabel={option => option.name}
                options={categories}
              />
            </div>
          </div>
        </Form>
      </div>
      <div className="flex flex-grow justify-between">
        <div className="flex-none md:block hidden mr-10">
          <Sidebar
            basketProducts={basketProducts}
            setBasketProducts={setBasketProducts}
          />
        </div>
        <div className="flex-grow">
          <div className="w-full flex-column lg:flex lg:flex-row md:justify-start md:pl-8 items-center lg:items-end">
            <div className="flex justify-center">
              <span className="text-4xl font-bold">
                {category ? category.split('-').join(' ') : 'All Products'}
              </span>
            </div>
            <div className="flex justify-center">
              <span className="text-2xl lg:ml-4">
                {!loading &&
                  !loadingProd &&
                  mappedProduct &&
                  `(${mappedProduct.length || 0} products available)`}
              </span>
            </div>
          </div>
          {!loading && !loadingProd && mappedProduct ? (
            <div className="row md:ml-4 mt-4 gap-14 justify-center lg:justify-start">
              {mappedProduct}
            </div>
          ) : (
            <div className="vh-100 d-flex align-items-center">
              <Spinner />
            </div>
          )}
        </div>
      </div>
      {show}
    </div>
  );
};

export default Shop;
