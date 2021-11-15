import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingCart,
  faUserPlus,
  faStore,
} from '@fortawesome/free-solid-svg-icons';
import { Navbar as NavbarBootstrap, NavDropdown } from 'react-bootstrap';
import { Button } from '../../misc/';
import img from '../../../img/undraw_profile.svg';
import { Link, NavLink } from 'react-router-dom';

export const Navbar = ({ ...props }) => {
  const { user, logout } = props;
  return (
    <>
      <NavbarBootstrap
        bg="success"
        expand="lg"
        className="navbar-light bg-white topbar mb-4 static-top shadow d-flex justify-content-between py-0"
        variant="dark"
      >
        <NavbarBootstrap.Brand>
          <Link
            to="/"
            className="navbar-brand text-primary font-weight-bold d-flex align-items-center mr-0"
          >
            <FontAwesomeIcon icon={faShoppingCart} className={'mr-2 mb-0 h1'} />
            Solidarity Purchasing Group
          </Link>
        </NavbarBootstrap.Brand>
        <div className="row m-0 p-0 flex items-center">
          <NavLink
            activeClassName="text-primary"
            className="navbar-item-spg"
            to="/categories"
          >
            <FontAwesomeIcon icon={faStore} className={'mr-2 mb-0'} />
            Categories
          </NavLink>
          <NavLink
            activeClassName="text-primary"
            aria-label="nav-create-client"
            className="navbar-item-spg"
            to="/createClient"
          >
            <FontAwesomeIcon icon={faUserPlus} className={'mr-2 mb-0'} />
            Create Client
          </NavLink>
          <div className="topbar-divider d-none d-sm-block"></div>
          {!user ? (
            <Button type={'warning'} text={'Login'} url={'/login'} />
          ) : (
            <NavDropdown
              align={'right'}
              id="dropdown-menu-align-right"
              className="nav-item dropdown no-arrow"
              title={
                <>
                  <span className="mr-2 text-gray-500 small d-none d-sm-block uppercase">
                    <strong>{user.name}</strong>
                  </span>
                  <img
                    alt=""
                    className="img-profile rounded-circle"
                    src={img}
                  />
                </>
              }
            >
              <NavDropdown.Item className="text-danger" onClick={logout}>
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </div>
      </NavbarBootstrap>
    </>
  );
};

export default Navbar;
