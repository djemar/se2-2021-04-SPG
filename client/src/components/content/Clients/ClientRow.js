import { Card, Button, Container, Alert, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import ModalTopUp from './ModalTopUp';

export const ClientRow = ({ ...props }) => {
  const [show, setShow] = useState(false);
  const renderButton = () => {
    if (props.isClient) {
      return (
        <Button
          className="mx-1 bg-primary"
          size="sm"
          ariaLabel={'clientbtn-' + props.user_id}
          onClick={() => setShow(true)}
        >
          <FontAwesomeIcon icon={faCoins} className="mx-1" />
          Top-Up
        </Button>
      );
    }
  };
  return (
    <>
      <tr>
        <td>{props.user_id}</td>
        <td>{props.name}</td>
        <td>{props.surname}</td>
        <td>{props.email}</td>
        <td>
          €{' '}
          <i
            id={'currAmount' + props.user_id}
            ariaLabel={'currAmount' + props.user_id}
          >
            {props.wallet_balance}
          </i>
        </td>
        <td>{renderButton()}</td>
      </tr>
      <ModalTopUp
        show={show}
        setShow={setShow}
        currAmount={props.wallet_balance}
        user_id={props.user_id}
        setDirty={props.setDirty}
      ></ModalTopUp>
    </>
  );
};

export default ClientRow;
