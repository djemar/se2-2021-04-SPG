import { Card, Button as BSButton } from 'react-bootstrap';
import Breadcrumbs from '../../misc/Breadcrumbs';
import './Farmers.css';

export const Farmers = ({ ...props }) => {
  return (
    <div className="flex flex-column justify-start">
      <div className="flex flex-none justify-start py-8">
        <Breadcrumbs />
      </div>
      <div className="flex flex-grow justify-between">
        <div className="flex w-100 h-100 p-3">
          <Card className="spg-box shadow py-0">
            <Card.Title className="flex items-center justify-center text-center w-100 text-3xl font-bold text-white spg-box-title">
              Farmers
            </Card.Title>
            <Card.Body className="py-4 w-100 h-100">Farmers List</Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Farmers;
