import { Modal, Button as ButtonBS } from 'react-bootstrap';

export const ConfirmModal = ({ ...props }) => {
  return (
    <Modal
      {...props}
      dialogClassName="modal-40w"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.body}</Modal.Body>
      <Modal.Footer>
        <ButtonBS variant="danger" className="mr-5" onClick={props.onHide}>
          No
        </ButtonBS>
        <ButtonBS variant="success" onClick={props.onConfirm}>
          Yes
        </ButtonBS>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
