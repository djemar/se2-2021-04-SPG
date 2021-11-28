import {
  faHome,
  faList,
  faPowerOff,
  faReceipt,
  faShoppingBasket,
  faStore,
  faUser,
  faUsers,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import {
  Badge,
  Button as BSButton,
  Navbar as NavbarBootstrap,
  NavDropdown,
} from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { ReactComponent as CartLogo } from '../../../img/cart-logo.svg';
import img from '../../../img/undraw_profile.svg';
import { Button } from '../../misc/';
import Basket from '../Basket/Basket';
import './navbar.css';

export const Navbar = ({ ...props }) => {
  const {
    user,
    animateBasket,
    setAnimateBasket,
    logout,
    setBasketProducts,
    basketProducts,
  } = props;
  const [showBasket, setShowBasket] = useState(false);

  const handleClose = () => setShowBasket(false);
  const handleShow = () => setShowBasket(true);

  return (
    <>
      <NavbarBootstrap
        bg="success"
        expand="lg"
        fixed="top"
        className="sticky navbar-light bg-white topbar mb-4 static-top shadow flex justify-between py-0 px-0 pl-4"
        variant="dark"
      >
        <div className="flex flex-grow justify-between items-center">
          <NavbarBootstrap.Brand>
            <Link
              id="navbar-logo"
              to="/"
              className="navbar-brand flex items-center mr-0"
            >
              <CartLogo className={'mr-2 mb-0 h1'} />
              SolidarityBay
            </Link>
          </NavbarBootstrap.Brand>
          <div className="m-0 p-0 d-flex align-items-center">
            <NavLink
              activeClassName="text-secondary"
              className="navbar-item-spg"
              exact
              to="/"
            >
              <FontAwesomeIcon icon={faHome} className={'mr-2 mb-0'} />
              Home
            </NavLink>
            <NavLink
              activeClassName="text-secondary"
              className="navbar-item-spg"
              to="/shop"
            >
              <FontAwesomeIcon
                icon={faShoppingBasket}
                className={'mr-2 mb-0'}
              />
              Shop
            </NavLink>
            {user.userType === 2 && (
              <>
                <NavLink
                  activeClassName="text-secondary"
                  className="navbar-item-spg"
                  to="/farmers"
                >
                  <FontAwesomeIcon icon={faStore} className={'mr-2 mb-0'} />
                  Farmers
                </NavLink>
                <NavLink
                  activeClassName="text-secondary"
                  className="navbar-item-spg"
                  to="/clients"
                >
                  <FontAwesomeIcon icon={faUsers} className={'mr-2 mb-0'} />
                  Clients
                </NavLink>
                <NavLink
                  activeClassName="text-secondary"
                  className="navbar-item-spg"
                  to="/orders"
                >
                  <FontAwesomeIcon icon={faReceipt} className={'mr-2 mb-0'} />
                  Orders
                </NavLink>
              </>
            )}
          </div>
          {!user ? (
            <div className="flex items-center mr-4">
              <Button type="warning" text={'Register'} url={'/register'} />
              <div className="topbar-divider"></div>
              <Button type="outline-secondary" text={'Login'} url={'/login'} />
            </div>
          ) : (
            <NavDropdown
              align={'left'}
              id="dropdown-menu-align-left"
              className="nav-item dropdown no-arrow mr-4"
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
              <NavDropdown.Item className="text-dark">
                <NavLink
                  className="text-dark no-underline"
                  to={`/user/${user.id}`}
                >
                  <FontAwesomeIcon icon={faUser} className={'mr-2 mb-0'} />
                  Account
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item className="text-danger" onClick={logout}>
                <FontAwesomeIcon icon={faPowerOff} className={'mr-2 mb-0'} />
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </div>
        <BSButton
          id="btn-basket"
          className="d-flex flex-row justify-content-center align-items-center"
          onClick={handleShow}
        >
          <CartLogo
            id="basket-icon"
            className={
              animateBasket
                ? 'logo-icon mr-3 anim-basket-icon'
                : 'logo-icon mr-3'
            }
            onAnimationEnd={() => setAnimateBasket(false)}
          />
          Your Basket
          {basketProducts.length > 0 ? (
            <Badge pill bg="light" text="dark" className="ml-3">
              {basketProducts.reduce((accum, item) => accum + item.quantity, 0)}
            </Badge>
          ) : (
            <></>
          )}
        </BSButton>
      </NavbarBootstrap>
      <Basket
        show={showBasket}
        onHide={handleClose}
        basketProducts={basketProducts}
        setBasketProducts={setBasketProducts}
      />
    </>
  );
};

export default Navbar;
