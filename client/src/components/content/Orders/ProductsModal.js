import { Col, Modal, Row } from 'react-bootstrap';
import ProductsList from './ProductsList';

export const ProductsModal = ({ ...props }) => {
  const {
    order_id,
    ref_user,
    date_order,
    products_and_qnt,
    status,
    tot_price,
  } = props;

  const styleFromStatus = {
    pending: 'order-pending',
    delivered: 'order-delivered',
    approved: 'order-approved',
  };

  const handleClose = () => {
    props.setShow(false);
  };

  return (
    <>
      <Modal
        size="lg"
        show={props.show}
        onHide={handleClose}
        style={{ 'margin-top': '10%' }}
      >
        <Modal.Header closeButton style={{ textAlign: 'center' }}>
          Order ID:<strong>&nbsp;{order_id}</strong>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
          <Row>
            <Col className="mb-4" xs={12} sm={6} lg={3}>
              <b>Client:</b> {ref_user}
            </Col>
            <Col className="mb-4" xs={12} sm={6} lg={3}>
              <b>Date:</b> {date_order}
            </Col>
            <Col className="mb-4" xs={12} sm={6} lg={3}>
              <b>Status:</b>{' '}
              <span
                className={`w-min px-3 py-0.5 inline text-sm rounded-xl text-white ${styleFromStatus[status]}`}
              >
                {status}
              </span>
            </Col>
            <Col className="mb-4" xs={12} sm={6} lg={3}>
              <b>Total Price:</b> € {tot_price}
            </Col>
          </Row>
          <ProductsList products_and_qnt={products_and_qnt} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductsModal;
