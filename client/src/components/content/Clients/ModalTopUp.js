import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import API from '../../../API';

export const ModalTopUp = ({ ...props }) => {
  const [amount, setAmount] = useState(0.0);
  const { currAmount, user_id, name, surname } = props;

  const handleClose = () => {
    props.setShow(false);

    setAmount(0.0);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    let val = parseFloat(amount).toFixed(2);
    try {
      const res = await API.updateClientWallet(props.user_id, amount);
      console.log(res);
      props.setDirty(true);
      handleClose();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <Modal
        centered
        dialogClassName="modal-40w"
        show={props.show}
        onHide={handleClose}
      >
        <Modal.Header closeButton className="mx-3">
          <h1 className="h3 my-3 font-medium">
            <FontAwesomeIcon icon={faCoins} className="mx-3" />
            Top-up wallet
          </h1>
        </Modal.Header>
        <Modal.Body className="">
          <Row className="m-5 mb-10">
            <Col sm={6} className="font-medium">
              {name} {surname} (ID: {user_id})
            </Col>
            <Col sm={6}>
              Balance: <span className="font-medium">{currAmount} € </span>
            </Col>
          </Row>

          <Form
            onSubmit={ev => {
              handleSubmit(ev);
            }}
          >
            <Form.Group
              as={Row}
              className="m-5"
              controlId="formHorizontalEmail"
            >
              <Form.Label column sm={6}>
                Top-up amount
              </Form.Label>
              <Col sm={6}>
                <Form.Select
                  required
                  aria-label="topup-label"
                  onChange={ev => setAmount(ev.target.value)}
                >
                  <option value="10">10 €</option>
                  <option value="20">20 €</option>
                  <option value="30">30 €</option>
                  <option value="40">40 €</option>
                  <option value="50">50 €</option>
                  <option value="100">100 €</option>
                </Form.Select>
              </Col>
            </Form.Group>
            <Modal.Footer>
              <>
                <Button variant="outline-danger mr-5" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  className="bg-secondary"
                  aria-label={'submit-' + props.user_id}
                  type="onSubmit"
                >
                  Top-up
                </Button>
              </>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalTopUp;
