import { faCoins, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import ModalDetails from './ModalDetails';
import ModalTopUp from './ModalTopUp';

export const ClientRow = ({ ...props }) => {
  const { isClient, user_id, name, surname, setDirty, wallet_balance, email } =
    props;
  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const user = { user_id, name, surname, wallet_balance, email, isClient };

  const renderButton = isClient && (
    <Button
      className="bg-primary"
      size="sm"
      ariaLabel={'clientbtn-' + user_id}
      onClick={() => setShow(true)}
    >
      <FontAwesomeIcon icon={faCoins} className="mx-1" />
      <span className="md:inline hidden">Top-Up</span>
    </Button>
  );

  const details = (
    <Button
      className="bg-secondary"
      size="sm"
      //ariaLabel={'clientbtn-' + user_id}
      onClick={() => setShowDetails(true)}
    >
      <FontAwesomeIcon icon={faUser} className="mx-1" />
      <span className="sm:inline hidden">Details</span>
    </Button>
  );
  return (
    <>
      <tr>
        <td className="text-center align-middle">{user_id}</td>
        <td className="text-center align-middle">{name}</td>
        <td className="text-center align-middle">{surname}</td>
        <td className="text-center align-middle md:table-cell hidden">
          {email}
        </td>
        <td className="text-center align-middle hidden sm:table-cell">
          €{' '}
          <i id={'currAmount' + user_id} ariaLabel={'currAmount' + user_id}>
            {wallet_balance}
          </i>
        </td>
        <td className="text-center align-middle">{renderButton}</td>
        <td className="text-center align-middle md:hidden">{details}</td>
      </tr>
      <ModalTopUp
        show={show}
        setShow={setShow}
        currAmount={wallet_balance}
        user_id={user_id}
        name={name}
        surname={surname}
        setDirty={setDirty}
      />
      <ModalDetails show={showDetails} setShow={setShowDetails} user={user} />
    </>
  );
};

export default ClientRow;
