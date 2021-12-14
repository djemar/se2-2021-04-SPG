import { Card } from 'react-bootstrap';
import Breadcrumbs from './Breadcrumbs';
import '../content/Clients/Clients.css';

export const Page = ({ ...props }) => {
  const { children, title, subtitle } = props;

  return (
    <div className="flex flex-column justify-start">
      <div className="flex flex-none md:justify-start pb-4 md:p-0 justify-center">
        <Breadcrumbs />
      </div>
      <div className="w-full flex flex-none justify-start pl-4 items-end pb-4">
        {title && (
          <div className="flex justify-center">
            <span className="text-4xl font-bold">{title}</span>
          </div>
        )}
        {subtitle && (
          <div className="flex justify-center">
            <span className="text-2xl ml-4">{subtitle}</span>
          </div>
        )}
      </div>
      <div className="flex flex-grow justify-between">
        <div className="flex w-100 h-100">
          <Card className="spg-box shadow py-0">
            <Card.Body className="w-100 h-100 p-0">{children}</Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
