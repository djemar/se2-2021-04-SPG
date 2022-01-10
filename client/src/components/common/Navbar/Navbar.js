import {
  faBars,
  faHome,
  faPowerOff,
  faReceipt,
  faRobot,
  faShoppingBasket,
  faStore,
  faUser,
  faUsers,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState } from 'react';
import {
  Badge,
  Button as BSButton,
  Navbar as NavbarBootstrap,
  NavDropdown,
  Overlay,
  OverlayTrigger,
  Popover,
} from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext';
import { ReactComponent as CartLogoXmas } from '../../../img/cart-logo-xmas.svg';
import { ReactComponent as CartLogo } from '../../../img/cart-logo.svg';
import img from '../../../img/undraw_profile.svg';
import { Button } from '../../misc/';
import Basket from '../Basket/Basket';
import './navbar.css';

library.add(fab);
export const Navbar = ({ ...props }) => {
  const {
    user,
    isLogged,
    animateBasket,
    setAnimateBasket,
    logout,
    setBasketProducts,
    basketProducts,
  } = props;
  const [showBasket, setShowBasket] = useState(false);
  const [showTelegram, setShowTelegram] = useState(true);

  const { users, loading } = useContext(UserContext);
  const farmer = user ? users.find(u => u.user_id === user.id) : '';

  const handleClose = () => setShowBasket(false);
  const handleShow = () => setShowBasket(true);

  return (
    <>
      <NavbarBootstrap
        bg="success"
        expand="lg"
        fixed="top"
        className="sticky navbar-light bg-white topbar static-top shadow flex justify-between py-0 px-0"
        variant="dark"
      >
        <div className={`flex flex-grow justify-between items-center`}>
          <NavDropdown
            align={'left'}
            id="dropdown-menu-align-left"
            className="no-arrow block lg:hidden"
            title={
              <Button type="outline-secondary">
                <FontAwesomeIcon icon={faBars} />
              </Button>
            }
          >
            <NavDropdown.Item className="text-dark">
              <NavLink
                activeClassName="text-secondary"
                className="text-dark no-underline text-lg font-semibold"
                exact
                to="/"
              >
                <FontAwesomeIcon icon={faHome} className={'mr-2 mb-0 w-1/6'} />
                <span className="w-5/6">Home</span>
              </NavLink>
            </NavDropdown.Item>
            <NavDropdown.Item className="text-dark">
              <NavLink
                activeClassName="text-secondary"
                className="text-dark no-underline text-lg font-semibold"
                to="/shop"
              >
                <FontAwesomeIcon
                  icon={faShoppingBasket}
                  className={'mr-2 mb-0 w-1/6'}
                />
                <span className="w-5/6">Shop</span>
              </NavLink>
            </NavDropdown.Item>
            {user && user.userType === 'Employee' && (
              <>
                <NavDropdown.Item className="text-dark">
                  <NavLink
                    activeClassName="text-secondary"
                    className="text-dark no-underline text-lg font-semibold"
                    to="/clients"
                  >
                    <FontAwesomeIcon
                      icon={faUsers}
                      className={'mr-2 mb-0 w-1/6'}
                    />
                    <span className="w-5/6">Clients</span>
                  </NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item className="text-dark">
                  <NavLink
                    activeClassName="text-secondary"
                    className="text-dark no-underline text-lg font-semibold"
                    to="/orders"
                  >
                    <FontAwesomeIcon
                      icon={faReceipt}
                      className={'mr-2 mb-0 w-1/6'}
                    />
                    <span className="w-5/6">Orders</span>
                  </NavLink>
                </NavDropdown.Item>
              </>
            )}
            {user && user.userType === 'Farmer' && (
              <>
                <NavDropdown.Item className="text-dark">
                  <NavLink
                    activeClassName="text-secondary"
                    className="text-dark no-underline text-lg font-semibold"
                    to="/myShop"
                  >
                    <FontAwesomeIcon
                      icon={faStore}
                      className={'mr-2 mb-0 w-1/6'}
                    />
                    <span className="w-5/6">My Shop</span>
                  </NavLink>
                </NavDropdown.Item>
              </>
            )}
            {user && user.userType === 'Manager' && (
              <>
                <NavDropdown.Item className="text-dark">
                  <NavLink
                    activeClassName="text-secondary"
                    className="text-dark no-underline text-lg font-semibold"
                    to="/reports"
                  >
                    <FontAwesomeIcon
                      icon={faChartLine}
                      className={'mr-2 mb-0 w-1/6'}
                    />
                    <span className="w-5/6">Reports</span>
                  </NavLink>
                </NavDropdown.Item>
              </>
            )}
            {!user && (
              <>
                <NavDropdown.Divider />
                <NavDropdown.Item className="text-dark">
                  <NavLink
                    activeClassName="text-secondary"
                    className="text-dark no-underline text-lg font-semibold"
                    to="/login"
                  >
                    <FontAwesomeIcon
                      icon={faUsers}
                      className={'mr-2 mb-0 w-1/6'}
                    />
                    <span className="w-5/6">Login</span>
                  </NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item className="text-dark">
                  <NavLink
                    activeClassName="text-secondary"
                    className="text-dark no-underline text-lg font-semibold"
                    to="/register"
                  >
                    <FontAwesomeIcon
                      icon={faReceipt}
                      className={'mr-2 mb-0 w-1/6'}
                    />
                    <span className="w-5/6">Register</span>
                  </NavLink>
                </NavDropdown.Item>
              </>
            )}
            <NavDropdown.Divider className={user ? `sm:hidden` : 'hidden'} />
            <NavDropdown.Item
              className={`${user ? `sm:hidden` : 'hidden'} text-dark sm:hidden`}
            >
              <div
                className="text-telegram no-underline text-lg font-semibold"
                onClick={() =>
                  window.open('https://t.me/SPG04_softeng2_bot', '_blank')
                }
              >
                <FontAwesomeIcon
                  icon={['fab', 'telegram']}
                  color="#229ED9"
                  aria-label="btn-bot"
                  className={'mr-2 mb-0 w-1/6'}
                  onClick={() =>
                    window.open('https://t.me/SPG04_softeng2_bot', '_blank')
                  }
                />
                <span style={{ color: '#229ED9' }} className="w-5/6">
                  Telegram
                </span>
              </div>
            </NavDropdown.Item>
          </NavDropdown>
          <NavbarBootstrap.Brand className="m-0 lg:ml-4 ">
            <Link
              id="navbar-logo"
              to="/"
              className="navbar-brand flex items-center mr-0"
            >
              <CartLogoXmas className={'mr-2 mb-0 h1'} />
              SolidarityBay
            </Link>
          </NavbarBootstrap.Brand>
          <div className="m-0 p-0 lg:flex align-items-center text-lg hidden">
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
            {user && user.userType === 'Employee' && (
              <>
                <NavLink
                  activeClassName="text-secondary"
                  ariaLabel="nav-clients"
                  className="navbar-item-spg"
                  to="/clients"
                >
                  <FontAwesomeIcon icon={faUsers} className={'mr-2 mb-0'} />
                  Clients
                </NavLink>
                <NavLink
                  activeClassName="text-secondary"
                  ariaLabel="nav-orders"
                  className="navbar-item-spg"
                  to="/orders"
                >
                  <FontAwesomeIcon icon={faReceipt} className={'mr-2 mb-0'} />
                  Orders
                </NavLink>
              </>
            )}
            {user && user.userType === 'Farmer' && (
              <>
                <NavLink
                  activeClassName="text-secondary"
                  className="navbar-item-spg"
                  to="/myShop"
                >
                  <FontAwesomeIcon icon={faStore} className={'mr-2 mb-0'} />
                  My Shop
                </NavLink>
              </>
            )}
            {user && user.userType === 'Manager' && (
              <>
                <NavLink
                  activeClassName="text-secondary"
                  className="navbar-item-spg"
                  to="/reports"
                >
                  <FontAwesomeIcon icon={faChartLine} className={'mr-2 mb-0'} />
                  Reports
                </NavLink>
              </>
            )}
          </div>
          <div className={`flex ${user || farmer ? 'sm:pr-4' : 'pr-4'}`}>
            {!user && !loading ? (
              <div className="hidden lg:flex items-center mr-4">
                <Button
                  type="warning"
                  ariaLabel="btn-register"
                  text={'Register'}
                  url={'/register'}
                />
                <div className="topbar-divider"></div>
                <Button
                  ariaLabel="btn-login"
                  type="outline-secondary"
                  text={'Login'}
                  url={'/login'}
                />
              </div>
            ) : (
              <NavDropdown
                align={'left'}
                id="dropdown-menu-align-left"
                aria-label="navdropdown"
                className="dropdown no-arrow px-0"
                title={
                  <>
                    <span className="mr-2 text-gray-500 small d-none d-sm-block uppercase">
                      <strong>
                        {user &&
                        (user.userType === 'Client' ||
                          user.userType === 'Employee')
                          ? user.name
                          : farmer
                          ? farmer.company_name
                          : ''}
                      </strong>
                    </span>
                    <img
                      alt=""
                      className="img-profile rounded-circle"
                      src={img}
                    />
                  </>
                }
              >
                {user.userType === 'Client' && (
                  <NavDropdown.Item className="text-dark">
                    <NavLink className="text-dark no-underline" to={`/user`}>
                      <FontAwesomeIcon icon={faUser} className={'mr-2 mb-0'} />
                      Account
                    </NavLink>
                  </NavDropdown.Item>
                )}
                <NavDropdown.Item
                  aria-label="navdropdown-item"
                  className="text-danger"
                  onClick={() => logout()}
                >
                  <FontAwesomeIcon icon={faPowerOff} className={'mr-2 mb-0'} />
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            )}

            <OverlayTrigger
              show={showTelegram}
              overlay={
                <Popover
                  show={showTelegram}
                  id="popover-contained"
                  className={user ? `hidden sm:block` : ''}
                >
                  <Popover.Body>
                    <div className="flex justify-between">
                      <strong>Subscribe Now!</strong>
                      <span
                        className="text-primary font-black text-right cursor-pointer"
                        onClick={() => setShowTelegram(old => !old)}
                      >
                        X
                      </span>
                    </div>
                    Find out our Weekly Shop.{' '}
                  </Popover.Body>
                </Popover>
              }
              defaultShow={true}
              placement="bottom"
              containerPadding={20}
            >
              <div className="nav-item flex items-center">
                <FontAwesomeIcon
                  icon={['fab', 'telegram']}
                  //onClick={() => setShowTelegram(old => !old)}
                  color="#229ED9"
                  aria-label="btn-bot"
                  className={`text-4xl ${user ? `hidden sm:block` : ''}`}
                  onClick={() =>
                    window.open('https://t.me/SPG04_softeng2_bot', '_blank')
                  }
                />
              </div>
            </OverlayTrigger>
          </div>
        </div>
        <BSButton
          id="btn-basket"
          className="d-flex flex-row justify-content-center align-items-center px-6 md:px-10"
          onClick={handleShow}
        >
          <CartLogo
            id="basket-icon"
            className={
              animateBasket
                ? 'logo-icon md:mr-3 anim-basket-icon'
                : 'logo-icon md:mr-3'
            }
            onAnimationEnd={() => setAnimateBasket(false)}
          />
          <span className="hidden md:block">Your Basket</span>
          {basketProducts.length > 0 && (
            <Badge pill bg="light" text="dark" className="ml-3">
              {basketProducts.reduce((accum, item) => accum + item.quantity, 0)}
            </Badge>
          )}
        </BSButton>
      </NavbarBootstrap>
      <Basket
        show={showBasket}
        onHide={handleClose}
        basketProducts={basketProducts}
        setBasketProducts={setBasketProducts}
        user={user}
        isLogged={isLogged}
      />
    </>
  );
};

export default Navbar;
