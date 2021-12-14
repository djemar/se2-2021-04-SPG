import { useContext } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import API from '../../../API';
import { UserContext } from '../../../context/UserContext';

export const ModalConfirmation = ({ ...props }) => {
  const { order_id, setShow, show } = props;
  const { setDirty } = useContext(UserContext);

  const handleClose = () => {
    setShow(false);
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
      if (res) {
        setDirty(true);
        handleClose();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <Modal size="md" show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{ textAlign: 'center' }}>
          Status updating
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
          <h4 className="h5 font-weight-normal">
            Do you want to update status of order {order_id} to{' '}
            <span
              className={`text-white text-center px-3 order-status ${styleFromStatus['delivered']}`}
            >
              delivered
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
                <Button
                  variant="secondary"
                  onClick={handleClose}
                  aria-label="form-cancel"
                >
                  Cancel
                </Button>
                <Button
                  className="bg-primary"
                  aria-label={'change-status-' + order_id}
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
