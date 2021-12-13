import { useEffect, useState, useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import API from '../../../API';
import { Spinner } from '../../misc';
import Breadcrumbs from '../../misc/Breadcrumbs';
import ProductCard from '../ProductCard/ProductCard';
import Sidebar from '../Sidebar/Sidebar';
import { TimeContext } from '../../../context/TimeContext';
import dayjs from 'dayjs';

export const Shop = ({ ...props }) => {
  const { basketProducts, setBasketProducts, setAnimateBasket } = props;
  const [products, setProducts] = useState([]);
  const [dirty, setDirty] = useState(false);
  const [loading, setLoading] = useState(false);
  const { dateState, setDateState } = useContext(TimeContext);

  const { category } = useParams();

  function getTimeframe() {
    let today = dayjs(dateState).get('day');
    // db format: YYYY-MM-DD
    // Saturday = 6, sunday = 0
    // today will be equal to saturday, and end date sunday
    let startDate;

    switch (today) {
      case 1:
        startDate = dayjs(dateState).add(5, 'day').format('YYYY-MM-DD');
        break;
      case 2:
        startDate = dayjs(dateState).add(4, 'day').format('YYYY-MM-DD');
        break;
      case 3:
        startDate = dayjs(dateState).add(3, 'day').format('YYYY-MM-DD');
        break;
      case 4:
        startDate = dayjs(dateState).add(2, 'day').format('YYYY-MM-DD');
        break;
      case 5:
        startDate = dayjs(dateState).add(1, 'day').format('YYYY-MM-DD');
        break;
      case 6:
        startDate = dayjs(dateState).format('YYYY-MM-DD');
        break;
      case 0:
        startDate = dayjs(dateState).add(6, 'day').format('YYYY-MM-DD');
        break;
    }

    let endDate = dayjs(startDate).add(1, 'day').format('YYYY-MM-DD');

    const dates = { startDate, endDate };

    console.log(dates);
    return dates;
  }

  useEffect(() => {
    //useEffect è un hook che permette di usare i lyfecycle del component. Equivale alla componentDidMount, componentDidUpdate, componentWillUnmount.
    const getAllProductsBetweenDate = async () => {
      const dates = getTimeframe();

      const newProducts = await API.getProductsBetweenDates(
        dates.startDate,
        dates.endDate
      );
      setProducts(newProducts);
    };

    const getAllProductsByCategoryBetweenDates = async idCategory => {
      const dates = getTimeframe();

      const newProducts = await API.getAllProductsByCategoryAndDates(
        idCategory,
        dates.startDate,
        dates.endDate
      );
      setProducts(newProducts);
    };

    if (category) {
      const idClean = category.replaceAll('-', ' ');
      setLoading(true);
      getAllProductsByCategoryBetweenDates(idClean).then(() => {
        setLoading(false);
        //setDirty(false);
      });
    } else {
      setLoading(true);
      getAllProductsBetweenDate().then(() => {
        setLoading(false);
        //setDirty(false);
      });
    }
  }, [category, dateState]);

  const mappedProduct =
    (products &&
      products.map(
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
        ) => (
          <Col key={index} className="pl-10 pr-0 pt-5 pb-5 flex-none w-auto">
            <ProductCard
              key={product_id}
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
          </Col>
        )
      )) ||
    [];

  return (
    <div className="flex flex-column justify-start">
      <div className="flex flex-none justify-start pb-4">
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
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
      <div className="snow"></div>
    </div>
  );
};

export default Shop;
