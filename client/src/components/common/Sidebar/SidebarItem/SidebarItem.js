import { Link } from 'react-router-dom';
import { InputGroup, FormControl } from 'react-bootstrap';

const SidebarItem = ({ ...props }) => {
  const { product } = props;
  const { title, description, quantity, unit } = product;
  return (
    <>
      <hr className="sidebar-divider" />

      <div className="product-heading">
        <Link className="no-underline" to="/">
          {title}
        </Link>
      </div>

      <li className="flex justify-between">
        <span className="ml-1 product-item">{description}</span>
        <div className="flex flex-column justify-center items-center">
          <InputGroup className="mx-3 w-20">
            <FormControl type="number" placeholder={quantity} min={0} />
          </InputGroup>
          <span className="product-unit mt-1">{unit}</span>
        </div>
      </li>
    </>
  );
};

export default SidebarItem;
