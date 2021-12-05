import { useEffect, useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import API from '../../../API';
import { Spinner } from '../../misc';
import Breadcrumbs from '../../misc/Breadcrumbs';
import ProductCard from '../ProductCard/ProductCard';
import Select from 'react-select';

const product = {
  product_id: -1,
  ref_user: -1,
  name: 'Product name',
  price: 'Product price',
  description: 'Product description',
  category: 'Product category',
  unit: 'Product unit',
  img: 'Product img',
  availability: 'Product availability',
};

export const MyShop = ({ ...props }) => {
  const {} = props;
  const [products, setProducts] = useState([]);
  const [dirty, setDirty] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //useEffect è un hook che permette di usare i lyfecycle del component. Equivale alla componentDidMount, componentDidUpdate, componentWillUnmount.
  }, []);
  /* 
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
            image_path,
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
              img={image_path}
              availability={availability}
              basketProducts={basketProducts}
              setBasketProducts={setBasketProducts}
              setAnimateBasket={setAnimateBasket}
            />
          </Col>
        )
      )) ||
    []; */

  return (
    <div className="flex flex-column justify-start">
      <div className="flex flex-none justify-start pb-4">
        <Breadcrumbs />
      </div>
      <div className="flex flex-grow justify-between">
        <div className="col-8">
          <Card>
            <Card.Body className="items-center">
              <Form>
                <div
                  key={`inline-radio`}
                  className="d-flex items-center justify-between"
                >
                  <Form.Check
                    inline
                    label="Add a new product"
                    name="group1"
                    type="radio"
                    id={`inline-radio-1`}
                  />
                  <div className="d-flex items-center">
                    <Form.Check
                      inline
                      label="Select from past inventory"
                      name="group1"
                      type="radio"
                      id={`inline-radio-2`}
                    />
                    <Select
                      className="basic-single w-60"
                      classNamePrefix="select"
                      //defaultValue={colourOptions[0]}
                      isClearable={true}
                      isSearchable={true}
                      name="inventory"
                      //options={colourOptions}
                    />
                  </div>
                </div>
              </Form>
            </Card.Body>
          </Card>
          <Card className="mt-5">
            <Card.Body className="items-center">
              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>Address</Form.Label>
                  <Form.Control placeholder="1234 Main St" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress2">
                  <Form.Label>Address 2</Form.Label>
                  <Form.Control placeholder="Apartment, studio, or floor" />
                </Form.Group>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>State</Form.Label>
                    <Form.Select defaultValue="Choose...">
                      <option>Choose...</option>
                      <option>...</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" id="formGridCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>

                {/*                 <Button variant="primary" type="submit">
                  Submit
                </Button> */}
              </Form>
            </Card.Body>
          </Card>
        </div>
        <div className="col d-flex justify-content-center items-center">
          <ProductCard
            key={product.product_id}
            pid={product.product_id}
            fid={product.ref_user}
            name={product.name}
            price={product.price}
            description={product.description}
            category={product.category}
            unit={product.unit}
            img={product.img}
            availability={product.availability}
            basketProducts={[]}
            // setBasketProducts={()}
            //setAnimateBasket={()}
          />
        </div>
      </div>
    </div>
  );
};

export default MyShop;
