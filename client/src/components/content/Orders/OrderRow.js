import { faCog, faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import ModalConfirmation from './ModalConfirmation';
import ProductsModal from './ProductsModal';

export const OrderRow = ({ ...props }) => {
  const {
    order_id,
    ref_user,
    date_order,
    products_and_qnt,
    tot_price,
    status,
    isManager,
  } = props;

  const [show, setShow] = useState(false);
  const [details, setDetails] = useState(false);

  const styleFromStatus = {
    pending: 'order-pending',
    delivered: 'order-delivered',
    approved: 'order-approved',
    pending_cancellation: 'order-pending-cancellation',
    unretrieved: 'order-unretrieved',
  };

  return (
    <>
      <tr>
        <td className="text-center align-middle">{order_id}</td>
        <td className="text-center align-middle">{ref_user}</td>
        <td className="text-center align-middle lg:table-cell hidden">
          {date_order}
        </td>
        <td className="text-center align-middle">
          <Button
            className="buttons-order-details mx-1"
            size="sm"
            aria-label="button-details"
            onClick={() => setDetails(true)}
          >
            <FontAwesomeIcon icon={faList} className="mx-1 sm:hidden" />
            <span className="sm:inline hidden">See details</span>
          </Button>
        </td>
        <td className="text-center align-middle md:table-cell hidden">
          € {tot_price}
        </td>
        <td className="text-center align-middle">
          <span
            className={`
              h-6 w-6 xs:w-min xs:px-3 xs:py-0.5 inline-flex items-center xs:inline text-sm rounded-xl text-white ${styleFromStatus[status]}`}
          >
            <span className="xs:inline hidden">{status}</span>
          </span>
        </td>
        {isManager && (
          <td className="text-center align-middle">
            <Button
              ariaLabel={'btn-update-status-' + order_id}
              className="buttons-order mx-1 bg-primary"
              size="sm"
              aria-label="button-change-status"
              onClick={() => setShow(true)}
              disabled={status === 'delivered'}
            >
              <FontAwesomeIcon icon={faCog} className="mx-1 md:hidden" />
              <span className="md:inline hidden">
                {status === 'delivered' ? 'Delivered' : 'Deliver'}
              </span>
            </Button>
          </td>
        )}
      </tr>
      <ModalConfirmation
        show={show}
        setShow={setShow}
        order_id={order_id}
        status={status}
        setDirty={props.setDirty}
      />
      <ProductsModal
        show={details}
        setShow={setDetails}
        order_id={order_id}
        ref_user={ref_user}
        date_order={date_order}
        products_and_qnt={products_and_qnt}
        status={status}
        tot_price={tot_price}
      />
    </>
  );
};

export default OrderRow;
