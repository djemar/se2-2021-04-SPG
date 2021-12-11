import { faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import ProductsModal from './ProductsModal';

export const UserOrderRow = ({ ...props }) => {
  const {
    order_id,
    date_order,
    products_and_qnt,
    tot_price,
    status,
    isManager,
  } = props;

  const [show, setShow] = useState(false);
  const [details, setDetails] = useState(false);

  const styleFromStatus = {
    pending_cancellation: 'order-pending-cancellation',
    pending: 'order-pending',
    delivered: 'order-delivered',
    approved: 'order-approved',
  };

  return (
    <>
      <tr>
        <td className="text-center align-middle">{order_id}</td>
        <td className="text-center align-middle md:table-cell hidden">
          {date_order}
        </td>
        <td className="text-center align-middle lg:table-cell hidden">
          {products_and_qnt.length}
        </td>
        <td className="text-center align-middle">€ {tot_price}</td>
        <td className="text-center align-middle">
          <span
            className={`h-6 w-6 xs:w-min xs:px-3 xs:py-0.5 inline-flex items-center xs:inline text-sm rounded-xl text-white ${styleFromStatus[status]}`}
          >
            <span className="xs:inline hidden">{status}</span>
          </span>
        </td>
        <td className="text-center align-middle">
          <Button
            className="buttons-order-details mx-1"
            size="sm"
            onClick={() => setDetails(true)}
          >
            <FontAwesomeIcon icon={faList} className="mx-1 sm:hidden" />
            <span className="sm:inline hidden">See details</span>
          </Button>
        </td>
      </tr>
      <ProductsModal
        show={details}
        setShow={setDetails}
        order_id={order_id}
        date_order={date_order}
        products_and_qnt={products_and_qnt}
        status={status}
        tot_price={tot_price}
      />
    </>
  );
};

export default UserOrderRow;
