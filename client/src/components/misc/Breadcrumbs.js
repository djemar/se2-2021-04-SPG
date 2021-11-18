import { ListGroup } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, NavLink } from 'react-router-dom';
import '../../App.css';
import './../common/Sidebar/sidebar.css';

export const Breadcrumbs = ({ ...props }) => {
  const { setDirty } = props;

  const capitalize = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getBackPath = (pathArray, index) => {
    let tmp = '';
    for (let i = 0; i < index; i++) {
      tmp += `/${pathArray[i]}`;
    }
    return tmp;
  };

  const pathArray = useLocation()
    .pathname.split('/')
    .filter(p => p !== '');

  const icon = (
    <FontAwesomeIcon icon={faGreaterThan} className="mx-2 text-secondary" />
  );

  const breadcrumbs = pathArray.map((p, i) => {
    return (
      <>
        {icon}
        <NavLink
          activeClassName="text-secondary font-bold"
          exact
          to={`${getBackPath(pathArray, i)}/${p}`}
          className="breadcrumbs"
        >
          {capitalize(p.split('-').join(' '))}
        </NavLink>
      </>
    );
  });
  return (
    <div className="px-3">
      <ListGroup className="striped-list text-black shadow">
        <ListGroup.Item key="home" className="text-dark">
          <Link to="/" className="breadcrumbs">
            Home
          </Link>{' '}
          {breadcrumbs}
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default Breadcrumbs;
