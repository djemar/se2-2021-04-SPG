import { Button, Modal, Form, Alert } from 'react-bootstrap';
import { useState } from 'react';
import API from '../../../API';

export const ModalTopUp = ({ ...props }) => {
  const [amount, setAmount] = useState(0.0);

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
      alert(err.message);
    }
  };

  return (
    <>
      <Modal size="lg" show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h1 className="h3 text-primary my-3 font-weight-normal font-bold">
            Insert the amount you want to top-up
          </h1>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
          <Form
            onSubmit={ev => {
              handleSubmit(ev);
            }}
          >
            <Form.Control
              name="name"
              required
              value={amount}
              aria-label="top-up-amount"
              type="number"
              step="any"
              onChange={ev => setAmount(ev.target.value)}
            />

            <hr></hr>
            <Modal.Footer className="justify-content-center ">
              <>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  className="bg-primary"
                  ariaLabel={'submit-' + props.user_id}
                  type="onSubmit"
                >
                  Submit
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
