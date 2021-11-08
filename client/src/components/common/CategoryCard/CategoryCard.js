import { Button } from '../../misc';

export const CategoryCard = ({ ...props }) => {
  const { title, availability } = props;
  return (
    <div className="col-md-3 mb-4 p-5 pb-0">
      <div className="card border-left-primary shadow h-100 py-0">
        <div className="card-body d-flex flex-lg-column justify-content-between">
          <div className="row no-gutters flex justify-center mb-3">
            <div className="h4 my-5 font-weight-bold text-dark text-uppercase flex justify-center">
              {title}
            </div>
          </div>
          <div className="row no-gutters flex justify-center justify-content-between">
            <div className="h5 mb-0 font-weight-bold text-gray-800">
              <Button
                type="primary"
                text="Explore"
                url={'/category/' + title.replaceAll(' ', '')}
                disabled={availability === 0}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
