import { Col, Container, Modal, Row } from 'react-bootstrap';
import ProductsList from './ProductsList';

export const ProductsModal = ({ ...props }) => {
  const { order_id, ref_user, date_order, products_and_qnt, status } = props;

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
          <Container>
            <Row>
              <Col>Ordering user ID: {ref_user}</Col>
              <Col>Date and time: {date_order}</Col>
              <Col>
                Status:{' '}
                <span
                  className={`text-white text-center px-3 py-0.5 order-status ${styleFromStatus[status]}`}
                >
                  {status}
                </span>
              </Col>
            </Row>
            <Container style={{ 'margin-top': '5%' }}>
              <ProductsList products_and_qnt={products_and_qnt} />
            </Container>
          </Container>
          <Modal.Footer className="justify-content-center "></Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductsModal;
