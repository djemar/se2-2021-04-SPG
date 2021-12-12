import { useContext, useEffect, useState } from 'react';
import {
  Card,
  Col,
  Modal,
  Form,
  Row,
  Button as ButtonBS,
} from 'react-bootstrap';
import Breadcrumbs from '../../misc/Breadcrumbs';
import ProductCard from '../ProductCard/ProductCard';
import { useContext, useState } from 'react';
import { Button as ButtonBS, Card, Col, Form, Row } from 'react-bootstrap';
import { IoAdd } from 'react-icons/io5';
import Select from 'react-select';
import { UserContext } from '../../../context/UserContext';
import Breadcrumbs from '../../misc/Breadcrumbs';
import ProductCard from '../ProductCard/ProductCard';
import './myshop.css';
import { Spinner } from '../../misc';

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
  const [addedProduct, setAddedProduct] = useState(product);
  const { products, user } = useContext(UserContext);
  const [show, setShow] = useState(0);
  useEffect(() => {
    console.log(products);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
              basketProducts={[]}
              setBasketProducts={[]}
              setAnimateBasket={0}
              flagAddOrEdit={1}
              handleShow={handleShow}
            />
          </Col>
        )
      )) ||
    [];

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
    <>
      <Modal
        dialogClassName="modal-40w"
        size="lg"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton className="mx-3">
          <Modal.Title>Edit your product</Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          <Form>
            <Row>
              <Col>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridName">
                    <Form.Label className="font-medium font-ibmplex text-sm">
                      Product Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={addedProduct.name}
                      onChange={e =>
                        handleChange(e.target.value, NEWVALUE.NAME)
                      }
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPrice">
                    <Form.Label className="font-medium font-ibmplex text-sm">
                      Price €
                    </Form.Label>
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
                    <Form.Label className="font-medium font-ibmplex text-sm">
                      Available pieces
                    </Form.Label>
                    <Form.Control
                      type="number"
                      value={addedProduct.availability}
                      onChange={e =>
                        handleChange(e.target.value, NEWVALUE.AVAILABILITY)
                      }
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridQuantity">
                    <Form.Label className="font-medium font-ibmplex text-sm">
                      Quantity per-piece
                    </Form.Label>
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
                  <Form.Label className="font-medium font-ibmplex text-sm">
                    Description
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    type="text"
                    value={addedProduct.description}
                    onChange={e =>
                      handleChange(e.target.value, NEWVALUE.DESCRIPTION)
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridImg">
                <Form.Label className="font-medium font-ibmplex text-sm">
                  Image URL
                </Form.Label>
                <Form.Control
                  type="text"
                  value={addedProduct.image_path}
                  onChange={e => handleChange(e.target.value, NEWVALUE.IMAGE)}
                />
              </Form.Group>
            </Row>

            {/*                 <ButtonBS variant="primary" type="submit">
                  Submit
                </ButtonBS> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <ButtonBS variant="outline-danger mr-5" onClick={handleClose}>
            Close
          </ButtonBS>
          <ButtonBS
            className="bg-secondary"
            onClick={handleClose}
            type="onSubmit"
          >
            Save Changes
          </ButtonBS>
        </Modal.Footer>
      </Modal>

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
                    <div className="d-flex items-center">
                      Select a product from your inventory
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
                        options={products.filter(p => p.ref_farmer === user.id)}
                      />
                      or add a new product below.
                    </div>
                  </div>
                </div>
              </Form>
            </Card.Body>
          </Card>
          <Card className="mt-5">
            <Card.Title className="px-5 pt-5 font-medium uppercase font-ibmplex">
              Insert product details
            </Card.Title>
            <Card.Body className="items-center p-8">
              <Form>
                <Row>
                  <Col>
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridName">
                        <Form.Label className="font-medium font-ibmplex text-sm">
                          Product Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          aria-label="form-name"
                          value={addedProduct.name}
                          onChange={e =>
                            handleChange(e.target.value, NEWVALUE.NAME)
                          }
                        />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridPrice">
                        <Form.Label className="font-medium font-ibmplex text-sm">
                          Price €
                        </Form.Label>
                        <Form.Control
                          type="number"
                          aria-label="form-price"
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
                        <Form.Label className="font-medium font-ibmplex text-sm">
                          Available pieces
                        </Form.Label>
                        <Form.Control
                          type="number"
                          aria-label="form-pieces"
                          value={addedProduct.availability}
                          onChange={e =>
                            handleChange(e.target.value, NEWVALUE.AVAILABILITY)
                          }
                        />
                      </Form.Group>

                        <Form.Group as={Col} controlId="formGridQuantity">
                          <Form.Label className="font-medium font-ibmplex text-sm">
                            Quantity per-piece
                          </Form.Label>
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
                        <Form.Label className="font-medium font-ibmplex text-sm">
                          Description
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          type="text"
                          aria-label="form-quantity"
                          value={addedProduct.unit_of_measure}
                          onChange={e =>
                            handleChange(e.target.value, NEWVALUE.DESCRIPTION)
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridImg">
                      <Form.Label className="font-medium font-ibmplex text-sm">
                        Image URL
                      </Form.Label>
                      <Form.Control
                        type="text"
                        aria-label="form-description"
                        value={addedProduct.description}
                        onChange={e =>
                          handleChange(e.target.value, NEWVALUE.IMAGE)
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridImg">
                    <Form.Label className="font-medium font-ibmplex text-sm">
                      Image URL
                    </Form.Label>
                    <Form.Control
                      type="text"
                      aria-label="form-img"
                      value={addedProduct.image_path}
                      onChange={e =>
                        handleChange(e.target.value, NEWVALUE.IMAGE)
                      }
                    />
                  </Form.Group>
                </Row>

                  {/*                 <ButtonBS variant="primary" type="submit">
                  Submit
                </ButtonBS> */}
                </Form>
              </Card.Body>
            </Card>
          </div>
          <div className="col d-flex flex-column justify-content-center items-center">
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
            <ButtonBS className="d-flex items-center my-10 shadow-lg bg-secondary">
              <IoAdd className="text-white mr-3" />
              Add to My Shop
            </ButtonBS>
          </div>
        </div>
        <span className="mx-10 text-4xl font-bold">My Shop</span>
        <span className="text-2xl ml-10">
          {mappedProduct && `(${mappedProduct.length || 0} products available)`}
        </span>
        <div className="col">
          <div className="flex flex-none justify-start px-8 items-end"></div>
          {mappedProduct ? (
            <Row>{mappedProduct}</Row>
          ) : (
            <div className="vh-100 d-flex align-items-center">
              <Spinner />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyShop;
