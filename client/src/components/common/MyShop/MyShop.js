import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Button as ButtonBS,
  Card,
  Col,
  Form,
  InputGroup,
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
import MyShopImages from './MyShopImages.js';
import ConfirmModal from '../../misc/ConfirmModal';
import { categories } from '../../fakedata';

const product = {
  product_id: -1,
  ref_farmer: -1,
  ref_user: -1,
  name: 'Name',
  price: 0,
  description: 'Description',
  category: 'Choose category',
  unit_of_measure: 'Unit',
  image_path: '',
  availability: 0,
};

const NEWVALUE = {
  NAME: 0,
  PRICE: 1,
  DESCRIPTION: 2,
  CATEGORY: 3,
  AVAILABILITY: 4,
  UNIT: 5,
  IMAGE: 6,
};

export const MyShop = ({ ...props }) => {
  const [addedProduct, setAddedProduct] = useState(product);
  const { dateProducts, products, user } = useContext(UserContext);
  const [show, setShow] = useState(0);
  const [myProduct, setMyProduct] = useState([]);
  const { dateState, addingProductsDays } = useContext(TimeContext);
  const { setDirty, loadingProd } = useContext(UserContext);
  const [start_date, setStart] = useState('');
  const [end_date, setEnd] = useState('');
  const [showImages, setShowImages] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [prod, setProd] = useState({});
  const [compiled, setCompiled] = useState(false);

  const insertProduct = () => {
    API.insertProduct(
      addedProduct.name,
      addedProduct.description,
      addedProduct.category,
      user.id,
      addedProduct.price + 0,
      addedProduct.availability,
      addedProduct.unit_of_measure,
      addedProduct.image_path,
      start_date,
      end_date
    ).then(setDirty(true));
    setModalConfirm(false);
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
      prod.unit_of_measure,
      prod.image_path,
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
    dateProducts &&
      dateProducts.forEach(x => {
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
      case NEWVALUE.CATEGORY:
        tmpProd.category = value;
        break;
      case NEWVALUE.IMAGE:
        tmpProd.image_path = value;
        break;
      default:
        break;
    }
    if (flag === 0) setProd(tmpProd);
    else setAddedProduct(tmpProd);
    if (
      tmpProd.name === '' ||
      tmpProd.name === 'Name' ||
      tmpProd.price <= 0 ||
      tmpProd.description === '' ||
      tmpProd.description === 'Description' ||
      tmpProd.availability <= 0 ||
      tmpProd.unit == '' ||
      tmpProd.unit == 'Unit' ||
      tmpProd.category === '' ||
      tmpProd.category === 'Choose category' ||
      tmpProd.image_path === '' ||
      tmpProd.image_path === 'Img'
    )
      setCompiled(false);
    else setCompiled(true);
  };

  const setUrlFromArchive = url => {
    handleChange(url, NEWVALUE.IMAGE, 1);
  };
  return (
    <>
      <MyShopImages
        show={showImages}
        setShow={setShowImages}
        setUrl={setUrlFromArchive}
      />
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
                      value={prod.unit_of_measure}
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
                  value={prod.image_path}
                  onChange={e =>
                    handleChange(e.target.value, NEWVALUE.IMAGE, 0)
                  }
                />
              </Form.Group>
            </Row>
            <Form.Group as={Col} controlId="formGridCategory">
              <Form.Label className="font-medium font-ibmplex text-sm">
                Category
              </Form.Label>
              <Form.Select
                required
                value={prod.category}
                aria-label="form-category"
                onChange={ev =>
                  handleChange(ev.target.value, NEWVALUE.CATEGORY, 0)
                }
              >
                <option value="">Please choose an option</option>
                {categories.slice(1).map(c => (
                  <option value={c.name}>{c.name}</option>
                ))}
              </Form.Select>
            </Form.Group>

            {/*                 <ButtonBS variant="primary" type="submit">
                  Submit
                </ButtonBS> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <ButtonBS
            variant="outline-danger mr-5"
            onClick={() => setShow(false)}
          >
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
            <div className="flex flex-column lg:flex-row flex-grow justify-between p-4 lg:items-start items-center">
              <div className="w-full flex flex-column items-center lg:col-8">
                <Card className="w-full">
                  <Card.Body className="items-center">
                    <Form>
                      <div className="flex flex-column md:flex-row items-center justify-between">
                        <span className="text-center">
                          Select a product from your inventory
                        </span>
                        <Select
                          className="basic-single w-56 sm:w-80 md:mx-5 my-2"
                          classNamePrefix="select"
                          placeholder="Type to search..."
                          onChange={v => {
                            v ? setAddedProduct(v) : setAddedProduct(product);
                            setCompiled(true);
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
                        <span className="text-center">
                          or add a new product below.
                        </span>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
                <Card className="mt-4 w-full">
                  <Card.Title className="px-5 pt-5 font-medium uppercase font-ibmplex">
                    Insert product details
                  </Card.Title>
                  <Card.Body className="items-center p-4">
                    <Form>
                      <div className="flex flex-column md:flex-row">
                        <Col>
                          <Row className="mb-3">
                            <Form.Group
                              className="sm:w-1/2"
                              controlId="formGridName"
                            >
                              <Form.Label className="font-medium font-ibmplex text-sm">
                                Product Name
                              </Form.Label>
                              <Form.Control
                                type="text"
                                aria-label="form-name"
                                required
                                placeholder={addedProduct.name}
                                value={
                                  addedProduct.name !== product.name
                                    ? addedProduct.name
                                    : ''
                                }
                                onChange={e =>
                                  handleChange(e.target.value, NEWVALUE.NAME, 1)
                                }
                              />
                            </Form.Group>

                            <Form.Group
                              className="sm:w-1/2"
                              controlId="formGridPrice"
                            >
                              <Form.Label className="font-medium font-ibmplex text-sm">
                                Price €
                              </Form.Label>
                              <Form.Control
                                type="number"
                                aria-label="form-price"
                                pattern="[0-9]"
                                required
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
                            <Form.Group
                              className="sm:w-1/2"
                              controlId="formGridPieces"
                            >
                              <Form.Label className="font-medium font-ibmplex text-sm">
                                Available pieces
                              </Form.Label>
                              <Form.Control
                                type="number"
                                aria-label="form-pieces"
                                required
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

                            <Form.Group
                              className="sm:w-1/2"
                              controlId="formGridQuantity"
                            >
                              <Form.Label className="font-medium font-ibmplex text-sm">
                                Quantity per-piece
                              </Form.Label>
                              <Form.Control
                                type="text"
                                aria-label="form-quantity"
                                required
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
                          <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCategory">
                              <Form.Label className="font-medium font-ibmplex text-sm">
                                Category
                              </Form.Label>
                              <Form.Select
                                required
                                value={
                                  addedProduct.category !== product.category
                                    ? addedProduct.category
                                    : ''
                                }
                                aria-label="form-category"
                                onChange={ev =>
                                  handleChange(
                                    ev.target.value,
                                    NEWVALUE.CATEGORY,
                                    1
                                  )
                                }
                              >
                                <option value="">
                                  Please choose an option
                                </option>
                                {categories.slice(1).map(c => (
                                  <option value={c.name}>{c.name}</option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </Row>
                          <Row className="mb-3">
                            <Form.Group
                              as={Col}
                              controlId="formGridDescription"
                            >
                              <Form.Label className="font-medium font-ibmplex text-sm">
                                Description
                              </Form.Label>
                              <Form.Control
                                as="textarea"
                                type="text"
                                aria-label="form-description"
                                required
                                placeholder={addedProduct.description}
                                value={
                                  addedProduct.description !==
                                  product.description
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
                          </Row>
                        </Col>
                      </div>
                      <div className="flex flex-column md:flex-row">
                        <Col>
                          <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridImg">
                              <Form.Label className="font-medium font-ibmplex text-sm">
                                Image URL
                              </Form.Label>
                              <div className="flex flex-column sm:flex-row items-center">
                                <div className="flex-grow w-full">
                                  <Form.Control
                                    className="w-full"
                                    type="text"
                                    aria-label="form-img"
                                    required
                                    value={addedProduct.image_path}
                                    onChange={e =>
                                      handleChange(
                                        e.target.value,
                                        NEWVALUE.IMAGE,
                                        1
                                      )
                                    }
                                  />
                                </div>
                                <div className="flex-none w-30">
                                  <ButtonBS
                                    className="bg-primary mt-4 sm:mt-0 sm:ml-4"
                                    onClick={() => setShowImages(true)}
                                  >
                                    Choose from Archive
                                  </ButtonBS>
                                </div>
                              </div>
                            </Form.Group>
                          </Row>
                        </Col>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
                <ButtonBS
                  className="d-flex items-center mt-4 shadow-lg bg-secondary"
                  onClick={() => setModalConfirm(true)}
                  disabled={!compiled}
                >
                  <IoAdd className="text-white mr-3" />
                  Add to My Shop
                </ButtonBS>
                <ConfirmModal
                  show={modalConfirm}
                  title={'Confirm'}
                  body={'Do you want to add it in your shop?'}
                  onHide={() => setModalConfirm(false)}
                  onConfirm={() => insertProduct()}
                />
              </div>
              <div className="col-4 flex lg:w-full flex-column justify-content-center items-center lg:pr-0 pt-4 lg:pt-0">
                <span className="font-medium h5">Preview</span>
                <ProductCard
                  key={addedProduct.product_id}
                  pid={addedProduct.product_id}
                  fid={user.id}
                  name={addedProduct.name}
                  price={addedProduct.price}
                  description={addedProduct.description}
                  category={addedProduct.category}
                  unit={addedProduct.unit_of_measure}
                  img={addedProduct.image_path || './img/uploads/no_image.png'}
                  availability={addedProduct.availability}
                  basketProducts={[]}
                  preview={true}
                  // setBasketProducts={()}
                  //setAnimateBasket={()}
                />
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
      <div className="row px-10">
        <span className="mt-10 ml-4 text-4xl font-bold">Week Preview</span>
        <span className="text-2xl ml-4">
          {myProduct &&
            `${myProduct.length || 0} Products available until ${dayjs(
              getTimeframe().endDate
            ).format('DD/MM/YYYY')}`}
        </span>
        <div className="col">
          <div className="flex flex-none justify-start items-end">
            {myProduct ? (
              <Row>{myProduct}</Row>
            ) : (
              <div className="vh-100 d-flex align-items-center">
                <Spinner />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyShop;
