import { Button } from 'react-bootstrap';
import ModalConfirmation from './ModalConfirmation';
import { useState } from 'react';

export const OrderRow = ({ ...props }) => {
  const { order_id, ref_product, ref_user, date_order, quantity, status } =
    props;

  const [show, setShow] = useState(false);

  const styleFromStatus = {
    pending: 'order-pending',
    delivered: 'order-delivered',
    approved: 'order-approved',
  };

  return (
    <>
      <tr>
        <td className="text-center">{order_id}</td>
        <td className="text-center">{ref_product}</td>
        <td className="text-center">{ref_user}</td>
        <td className="text-center">{date_order}</td>
        <td className="text-center">{quantity}</td>
        <td className="text-center">
          <span
            className={`text-white text-center px-3 order-status ${styleFromStatus[status]}`}
          >
            {status}
          </span>
        </td>
        <td className="text-center">
          <Button
            className="buttons-order mx-1 bg-primary"
            size="sm"
            onClick={() => setShow(true)}
            disabled={status === 'delivered'}
          >
            Update Status
          </Button>
        </td>
      </tr>
      <ModalConfirmation
        show={show}
        setShow={setShow}
        order_id={props.order_id}
        setDirty={props.setDirty}
      ></ModalConfirmation>
    </>
  );
};

export default OrderRow;
