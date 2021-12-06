import { useContext, useEffect, useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import Breadcrumbs from '../../misc/Breadcrumbs';
import ProductCard from '../ProductCard/ProductCard';
import Select from 'react-select';
import { UserContext } from '../../../context/UserContext';

const product = {
  product_id: -1,
  ref_user: -1,
  name: 'Name',
  price: 0,
  description: 'Description',
  category: 'Category',
  unit: 'Unit',
  img: 'Img',
  availability: 0,
};

export const MyShop = ({ ...props }) => {
  const {} = props;
  const [addedProduct, setAddedProduct] = useState(product);
  const { products, user } = useContext(UserContext);

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
                <div className="d-flex items-center justify-between">
                  <span> Add a new product below</span>
                  <div className="d-flex items-center">
                    or select one from your past inventory
                    <Select
                      className="basic-single w-80 mx-10"
                      classNamePrefix="select"
                      placeholder="Type to search..."
                      onChange={v => {
                        v ? setAddedProduct(v) : setAddedProduct(product);
                      }}
                      isClearable={true}
                      isSearchable={true}
                      name="inventory"
                      getOptionLabel={option => `${option.name}`}
                      options={products.filter(p => p.ref_farmer === user.id)}
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
            key={addedProduct.product_id}
            pid={addedProduct.product_id}
            fid={addedProduct.ref_user}
            name={addedProduct.name}
            price={addedProduct.price}
            description={addedProduct.description}
            category={addedProduct.category}
            unit={addedProduct.unit}
            img={addedProduct.image_path}
            availability={addedProduct.availability}
            basketProducts={[]}
            preview={true}
            // setBasketProducts={()}
            //setAnimateBasket={()}
          />
        </div>
      </div>
    </div>
  );
};

export default MyShop;
