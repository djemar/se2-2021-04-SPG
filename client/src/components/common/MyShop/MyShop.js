import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Button as ButtonBS,
  Card,
  Col,
  Form,
  Modal,
  Row,
} from 'react-bootstrap';
import { IoAdd } from 'react-icons/io5';
import { MdEdit } from 'react-icons/md';
import Select from 'react-select';
import API from '../../../API.js';
import { TimeContext } from '../../../context/TimeContext';
import { UserContext } from '../../../context/UserContext';
import { Spinner } from '../../misc';
import Page from '../../misc/Page';
import ProductCard from '../ProductCard/ProductCard';
import './myshop.css';

const product = {
  product_id: -1,
  ref_farmer: -1,
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
  const [myProduct, setMyProduct] = useState([]);
  const { dateState, addingProductsDays } = useContext(TimeContext);
  const { setDirty, loadingProd } = useContext(UserContext);
  const [start_date, setStart] = useState('');
  const [end_date, setEnd] = useState('');

  const [prod, setProd] = useState('');

  const insertProduct = () => {
    API.insertProduct(
      addedProduct.name,
      addedProduct.description,
      'Dairy',
      user.id,
      addedProduct.price + 0,
      addedProduct.availability,
      addedProduct.unit_of_measure,
      addedProduct.image_path,
      start_date,
      end_date
    ).then(setDirty(true));
  };

  //useEffect(() => {}, [loadingProd]);

  const handleClose = () => {
    API.editProduct(
      prod.pid,
      prod.name,
      prod.description,
      prod.category,
      prod.fid,
      prod.price,
      prod.availability,
      prod.unit,
      prod.img,
      start_date,
      end_date
    ).then(setDirty(true));
    setShow(false);
  };
  const handleShow = () => setShow(true);

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
      default:
        break;
    }

    let endDate = dayjs(startDate).add(1, 'day').format('YYYY-MM-DD');
    const dates = { startDate, endDate };
    return dates;
  }

  useEffect(() => {
    const dates = getTimeframe();
    setStart(dates.startDate);
    setEnd(dates.endDate);

    let prodF = [];
    //console.log(products);
    products.forEach(x => {
      if (x.ref_farmer === user.id) {
        prodF.push(x);
      }
    });
    //console.log(prodF);
    const mappedProduct =
      (prodF &&
        prodF.map(
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
              start_date,
              end_date,
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
                start_date={dates.start_date}
                end_date={dates.end_date}
                basketProducts={[]}
                setBasketProducts={[]}
                setAnimateBasket={0}
                flagAddOrEdit={1}
                handleShow={handleShow}
                setProd={setProd}
              />
            </Col>
          )
        )) ||
      [];
    setMyProduct(mappedProduct);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingProd]);

  const handleChange = (value, attr, flag) => {
    let tmpProd;
    if (flag === 0) tmpProd = { ...prod };
    else tmpProd = { ...addedProduct };

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
    if (flag === 0) setProd(tmpProd);
    else setAddedProduct(tmpProd);
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
          <MdEdit className="mr-2 text-lg font-medium" />
          Edit your product
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
                      value={prod.name}
                      onChange={e =>
                        handleChange(e.target.value, NEWVALUE.NAME, 0)
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
                      value={prod.price}
                      onChange={e =>
                        handleChange(e.target.value, NEWVALUE.PRICE, 0)
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
                      value={prod.availability}
                      onChange={e =>
                        handleChange(e.target.value, NEWVALUE.AVAILABILITY, 0)
                      }
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridQuantity">
                    <Form.Label className="font-medium font-ibmplex text-sm">
                      Quantity per-piece
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={prod.unit}
                      onChange={e =>
                        handleChange(e.target.value, NEWVALUE.UNIT, 0)
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
                    value={prod.description}
                    onChange={e =>
                      handleChange(e.target.value, NEWVALUE.DESCRIPTION, 0)
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
                  value={prod.img}
                  onChange={e =>
                    handleChange(e.target.value, NEWVALUE.IMAGE, 0)
                  }
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
      <Page title="My Shop">
        {addingProductsDays ? (
          <>
            <div className="flex flex-grow justify-between pt-4">
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
                            options={products.filter(
                              p => p.ref_farmer === user.id
                            )}
                          />
                          or add a new product below.
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
                                placeholder={addedProduct.name}
                                value={
                                  addedProduct.name != product.name
                                    ? addedProduct.name
                                    : ''
                                }
                                onChange={e =>
                                  handleChange(e.target.value, NEWVALUE.NAME, 1)
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
                                  handleChange(
                                    e.target.value,
                                    NEWVALUE.PRICE,
                                    1
                                  )
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
                                  handleChange(
                                    e.target.value,
                                    NEWVALUE.AVAILABILITY,
                                    1
                                  )
                                }
                              />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridQuantity">
                              <Form.Label className="font-medium font-ibmplex text-sm">
                                Quantity per-piece
                              </Form.Label>
                              <Form.Control
                                type="text"
                                aria-label="form-quantity"
                                placeholder={addedProduct.unit_of_measure}
                                value={
                                  addedProduct.unit_of_measure !=
                                  product.unit_of_measure
                                    ? addedProduct.unit_of_measure
                                    : ''
                                }
                                onChange={e =>
                                  handleChange(e.target.value, NEWVALUE.UNIT, 1)
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
                              aria-label="form-description"
                              placeholder={addedProduct.description}
                              value={
                                addedProduct.description != product.description
                                  ? addedProduct.description
                                  : ''
                              }
                              onChange={e =>
                                handleChange(
                                  e.target.value,
                                  NEWVALUE.DESCRIPTION,
                                  1
                                )
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
                              handleChange(e.target.value, NEWVALUE.IMAGE, 1)
                            }
                          />
                        </Form.Group>
                      </Row>
                    </Form>
                  </Card.Body>
                </Card>
              </div>
              <div className="col d-flex flex-column justify-content-center items-center">
                <ProductCard
                  key={addedProduct.product_id}
                  pid={addedProduct.product_id}
                  fid={user.id}
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
                <ButtonBS
                  className="d-flex items-center my-10 shadow-lg bg-secondary"
                  onClick={() => insertProduct()}
                >
                  <IoAdd className="text-white mr-3" />
                  Add to My Shop
                </ButtonBS>
              </div>
            </div>
          </>
        ) : (
          <div className="justify-content-center font-ibm mx-auto my-auto pt-4">
            <Alert variant="warning" className="mx-4">
              <strong>
                <i>Wuoops!</i>
              </strong>
              <br />
              Products for next week can not be added for now, come here{' '}
              <strong>after Tuesday, 9 AM</strong>
            </Alert>
          </div>
        )}
      </Page>
      <span className="mx-10 mt-10 text-4xl font-bold">Week Preview</span>
      <span className="text-2xl ml-10">
        {myProduct &&
          `${myProduct.length || 0} Products available until ${dayjs(
            getTimeframe().endDate
          ).format('DD/MM/YYYY')}`}
      </span>
      <div className="col">
        <div className="flex flex-none justify-start px-8 items-end">
          {myProduct ? (
            <Row>{myProduct}</Row>
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
