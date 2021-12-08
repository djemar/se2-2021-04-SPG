import { useContext, useEffect, useState } from 'react';
import { Alert, Card, Col, Form, Row } from 'react-bootstrap';
import Breadcrumbs from '../../misc/Breadcrumbs';
import ProductCard from '../ProductCard/ProductCard';
import Select from 'react-select';
import { UserContext } from '../../../context/UserContext';
import { TimeContext } from '../../../context/TimeContext';
import * as dayjs from 'dayjs';

const product = {
  product_id: -1,
  ref_user: -1,
  name: 'Name',
  price: 0,
  description: 'Description',
  category: 'Category',
  unit_of_measure: 'Unit',
  img: 'Img',
  availability: 0,
};

const NEWVALUE = {
  NAME: 0,
  PRICE: 1,
  DESCRIPTION: 2,
  AVAILABILITY: 4,
  UNIT: 5,
  IMAGE: 6,
};

export const MyShop = ({ ...props }) => {
  const {} = props;
  const [addedProduct, setAddedProduct] = useState(product);
  const { products, user } = useContext(UserContext);
  const { dateState, addingProductsDays } = useContext(TimeContext);

  const handleChange = (value, attr) => {
    let tmpProd = { ...addedProduct };
    switch (attr) {
      case NEWVALUE.NAME:
        tmpProd.name = value;
        break;
      case NEWVALUE.PRICE:
        tmpProd.price = parseFloat(value).toFixed(2);
        break;
      case NEWVALUE.DESCRIPTION:
        tmpProd.description = value;
        break;
      case NEWVALUE.AVAILABILITY:
        tmpProd.availability = parseInt(value);
        break;
      case NEWVALUE.UNIT:
        tmpProd.unit_of_measure = value;
        break;
      case NEWVALUE.IMAGE:
        tmpProd.image_path = value;
        break;
      default:
        break;
    }
    setAddedProduct(tmpProd);
  };

  return (
    <div className="flex flex-column justify-start">
      <div className="flex flex-none justify-start pb-4">
        <Breadcrumbs />
      </div>
      <div className="flex flex-grow justify-between">
        <>
          {addingProductsDays ? (
            <>
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
                            getOptionValue={option => option.product_id}
                            getOptionLabel={option => `${option.name}`}
                            options={products.filter(
                              p => p.ref_farmer === user.id
                            )}
                          />
                        </div>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
                <Card className="mt-5">
                  <Card.Title className="px-5 pt-5 font-bold uppercase">
                    Insert product details
                  </Card.Title>
                  <Card.Body className="items-center p-8">
                    <Form>
                      <Row>
                        <Col>
                          <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridName">
                              <Form.Label>Product Name</Form.Label>
                              <Form.Control
                                type="text"
                                value={addedProduct.name}
                                onChange={e =>
                                  handleChange(e.target.value, NEWVALUE.NAME)
                                }
                              />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPrice">
                              <Form.Label>Price €</Form.Label>
                              <Form.Control
                                type="number"
                                pattern="[0-9]"
                                min={0}
                                step={0.05}
                                value={addedProduct.price}
                                onChange={e =>
                                  handleChange(e.target.value, NEWVALUE.PRICE)
                                }
                              />
                            </Form.Group>
                          </Row>
                          <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridPieces">
                              <Form.Label>Available pieces</Form.Label>
                              <Form.Control
                                type="number"
                                value={addedProduct.availability}
                                onChange={e =>
                                  handleChange(
                                    e.target.value,
                                    NEWVALUE.AVAILABILITY
                                  )
                                }
                              />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridQuantity">
                              <Form.Label>Quantity per-piece</Form.Label>
                              <Form.Control
                                type="text"
                                value={addedProduct.unit_of_measure}
                                onChange={e =>
                                  handleChange(e.target.value, NEWVALUE.UNIT)
                                }
                              />
                            </Form.Group>
                          </Row>
                        </Col>
                        <Col>
                          <Form.Group as={Col} controlId="formGridDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                              as="textarea"
                              type="text"
                              value={addedProduct.description}
                              onChange={e =>
                                handleChange(
                                  e.target.value,
                                  NEWVALUE.DESCRIPTION
                                )
                              }
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridImg">
                          <Form.Label>Image URL</Form.Label>
                          <Form.Control
                            type="text"
                            value={addedProduct.image_path}
                            onChange={e =>
                              handleChange(e.target.value, NEWVALUE.IMAGE)
                            }
                          />
                        </Form.Group>
                      </Row>

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
                  unit={addedProduct.unit_of_measure}
                  img={addedProduct.image_path}
                  availability={addedProduct.availability}
                  basketProducts={[]}
                  preview={true}
                  // setBasketProducts={()}
                  //setAnimateBasket={()}
                />
              </div>
            </>
          ) : (
            <>
              <div className="justify-content-center font-ibm mx-auto my-auto">
                <Alert variant="warning" className="mx-4">
                  <strong>
                    <i>Wuoops!</i>
                  </strong>
                  <br />
                  Products for next week can not be added for now, come here{' '}
                  <strong>after Tuesday, 9 AM</strong>
                </Alert>
              </div>
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default MyShop;
