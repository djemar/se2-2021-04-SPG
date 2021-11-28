import { Button, Modal, Form, Alert, Container } from 'react-bootstrap';
import { useState } from 'react';
import API from '../../../API';

export const ModalConfirmation = ({ ...props }) => {
  const handleClose = () => {
    props.setShow(false);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const res = await API.setDeliveredOrder(props.order_id);
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
          <h3 className="h3 font-weight-normal font-bold">
            You want to change the status of the order {props.order_id} to{' '}
            <Container
              style={{
                borderRadius: 20,
                maxWidth: 180,
                background: '#198754',
              }}
              className="text-white text-center"
            >
              delievered?
            </Container>
          </h3>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
          <Form
            onSubmit={ev => {
              handleSubmit(ev);
            }}
          >
            <h2 className="h4 font-weight-normal font-bold">
              The operation can't be reversed.
            </h2>
            <Modal.Footer className="justify-content-center ">
              <>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  className="bg-primary"
                  ariaLabel={'change-status-' + props.order_id}
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
