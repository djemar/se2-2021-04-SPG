import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../../misc/Breadcrumbs';
import './Order.css';

export const Order = ({ ...props }) => {
  const { id } = useParams();

  return (
    <div className="flex flex-column justify-start">
      <div className="flex flex-none justify-start pb-8 pt-4">
        <Breadcrumbs />
      </div>
      <div className="flex flex-grow justify-between">
        <div className="flex w-100 h-100 px-3">
          <Card className="spg-box shadow py-0">
            <Card.Title className="flex items-center justify-center text-center w-100 text-3xl font-bold text-white spg-box-title">
              Order #{id}
            </Card.Title>
            <Card.Body className="py-4 w-100 h-100">Order Resume</Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Order;
