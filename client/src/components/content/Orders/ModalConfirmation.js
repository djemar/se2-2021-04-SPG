import { Button, Modal, Form, Alert, Container } from 'react-bootstrap';
import { useState } from 'react';
import API from '../../../API';

export const ModalConfirmation = ({ ...props }) => {
  const { order_id, status } = props;

  let new_status = 'delivered';
  /*switch (status) {
    case 'pending':
      new_status = 'approved';
      break;
    case 'approved':
      new_status = 'delivered';
      break;
    case 'delivered':
      break;
    default:
      break;
  }*/

  const handleClose = () => {
    props.setShow(false);
  };

  const styleFromStatus = {
    pending: 'order-pending',
    delivered: 'order-delivered',
    approved: 'order-approved',
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const res = await API.setDeliveredOrder(order_id);
      console.log(res);
      props.setDirty(true);
      handleClose();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <Modal size="md" show={props.show} onHide={handleClose}>
        <Modal.Header closeButton style={{ textAlign: 'center' }}>
          Status updating
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
          <h4 className="h5 font-weight-normal">
            Do you want to update status of order {order_id} to{' '}
            <span
              className={`text-white text-center px-3 order-status ${styleFromStatus[new_status]}`}
            >
              {new_status}
            </span>
            ?
          </h4>
          <Form
            onSubmit={ev => {
              handleSubmit(ev).then();
            }}
          >
            <h6
              className="h6 font-weight-normal"
              style={{ 'margin-top': '5%' }}
            >
              Be careful: the operation can't be reversed.
            </h6>
            <Modal.Footer className="justify-content-center ">
              <>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  className="bg-primary"
                  ariaLabel={'change-status-' + order_id}
                  type="onSubmit"
                >
                  Change the status
                </Button>
              </>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalConfirmation;
