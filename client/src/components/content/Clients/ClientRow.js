import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
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
        <td className="text-center align-middle">{props.user_id}</td>
        <td className="text-center align-middle">{props.name}</td>
        <td className="text-center align-middle">{props.surname}</td>
        <td className="text-center align-middle">{props.email}</td>
        <td className="text-center align-middle">
          €{' '}
          <i
            id={'currAmount' + props.user_id}
            ariaLabel={'currAmount' + props.user_id}
          >
            {props.wallet_balance}
          </i>
        </td>
        <td className="text-center align-middle">{renderButton()}</td>
      </tr>
      <ModalTopUp
        show={show}
        setShow={setShow}
        currAmount={props.wallet_balance}
        user_id={props.user_id}
        name={props.name}
        surname={props.surname}
        setDirty={props.setDirty}
      ></ModalTopUp>
    </>
  );
};

export default ClientRow;
