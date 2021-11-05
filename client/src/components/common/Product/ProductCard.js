import { Button } from '../../misc';

import { InputGroup, FormControl } from 'react-bootstrap';

export const ProductCard = ({ ...props }) => {
  const { title, availability } = props;
  return (
    <div className="col-12 pb-4">
      <div className="card border-left-primary shadow h-100 py-0">
        <div className="card-body flex justify-between">
          <div className="flex flex-column justify-between w-100">
            <div className="no-gutters d-flex align-items-center mb-3 flex flex-none">
              <div className="h4 mb-0 font-weight-bold text-dark text-uppercase d-flex align-items-center">
                {title}
              </div>
            </div>
            <div className="flex justify-between flex-grow">
              text text text text text text text
            </div>
          </div>
          <div className="row no-gutters d-flex align-items-center justify-content-between">
            <div className="flex flex-grow"></div>
            <div className="flex flex-none">
              <div className="flex flex-column justify-between">
                <div className="flex justify-end">
                  <div className="mr-2 flex flex-column justify-start pb-4">
                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1 text-right">
                      Price
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-600 text-right">
                      €10,00
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="mr-2 flex flex-column justify-end">
                    <div className="h5 mb-0 font-weight-bold text-gray-800 text-center">
                      <InputGroup className="w-20">
                        <FormControl type="number" min={1} />
                      </InputGroup>
                    </div>
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800 flex flex-column justify-end">
                    <Button
                      type="primary"
                      text="Add"
                      disabled={availability === 0}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
