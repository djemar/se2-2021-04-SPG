import { Button } from 'react-bootstrap';
import ModalConfirmation from './ModalConfirmation';
import ProductsModal from './ProductsModal';
import { useState } from 'react';

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
  };

  return (
    <>
      <tr>
        <td className="text-center align-middle">{order_id}</td>
        <td className="text-center align-middle">{ref_user}</td>
        <td className="text-center align-middle">{date_order}</td>
        <td className="text-center align-middle">
          <Button
            className="buttons-order-details mx-1"
            size="sm"
            onClick={() => setDetails(true)}
          >
            See details
          </Button>
        </td>
        <td className="text-center align-middle">€ {tot_price}</td>
        <td className="text-center align-middle">
          <span
            className={`text-white text-center px-3 py-0.5 order-status ${styleFromStatus[status]}`}
          >
            {status}
          </span>
        </td>
        {isManager && (
          <td className="text-center align-middle">
            <Button
              className="buttons-order mx-1 bg-primary"
              size="sm"
              onClick={() => setShow(true)}
              disabled={status === 'delivered'}
            >
              Update Status
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
      />
    </>
  );
};

export default OrderRow;
