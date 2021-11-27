import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

export const QuantitySelector = ({ ...props }) => {
  const { orderQuantity, setOrderQuantity, max } = props;

  const handleIncreaseQuantity = () => {
    if (orderQuantity < max) setOrderQuantity(orderQuantity + 1);
  };
  const handleDecreaseQuantity = () => {
    if (orderQuantity > 1) setOrderQuantity(orderQuantity - 1);
  };
  return (
    <div className="d-flex justify-content-center align-items-center">
      <IoRemoveCircleOutline
        className="btn-icon"
        size={20}
        onClick={handleDecreaseQuantity}
      />
      <span className="mx-4 font-medium text-base"> {orderQuantity} </span>
      <IoAddCircleOutline
        size={20}
        className="btn-icon"
        onClick={handleIncreaseQuantity}
      />
    </div>
  );
};

export default QuantitySelector;
