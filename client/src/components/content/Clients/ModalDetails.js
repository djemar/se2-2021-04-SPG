import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Modal, Table, Button } from 'react-bootstrap';

export const ModalDetails = ({ ...props }) => {
  const [amount, setAmount] = useState(0.0);
  const { user, show, setShow } = props;
  const { user_id, name, surname, wallet_balance, email } = user;

  return (
    <>
      <Modal
        centered
        dialogClassName="modal-40w"
        show={props.show}
        onHide={() => setShow(false)}
      >
        <Modal.Header closeButton className="mx-3">
          <h1 className="h3 my-3 font-medium">
            <FontAwesomeIcon icon={faUser} className="mx-3" />
            Client Details
          </h1>
        </Modal.Header>
        <Modal.Body className="">
          <Table
            borderless
            responsive="md"
            striped
            className="table-auto text-left"
          >
            <tbody>
              <tr>
                <td className="w-1/5 font-bold">ID</td>
                <td>{user_id}</td>
              </tr>
              <tr>
                <td className="w-1/5 font-bold">Name</td>
                <td>{name}</td>
              </tr>
              <tr>
                <td className="w-1/5 font-bold">Surname</td>
                <td>{surname}</td>
              </tr>
              <tr>
                <td className="w-1/5 font-bold">Email</td>
                <td>{email}</td>
              </tr>
              <tr>
                <td className="w-1/5 font-bold">Balance</td>
                <td>{`${wallet_balance} €`}</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <>
            <Button
              variant="outline-danger mr-5"
              onClick={() => setShow(false)}
            >
              Close
            </Button>
          </>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDetails;
