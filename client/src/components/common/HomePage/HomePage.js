import { Link } from 'react-router-dom';
import { Row, Container, Button as BSButton } from 'react-bootstrap';
import HomePageImg from '../../../img/homepage-unsplash.jpg';
import './homepage.css';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/*we should add some scroll up for the page at each opening */

export const HomePage = ({ ...props }) => {
  return (
    <div className="flex flex-column justify-start text-center m-0 p-0">
      {/* HOME PAGE */}
      {/* HomePage - Start shopping */}
      <div
        className="home m-0 p-0 mb-5 background"
        style={{
          backgroundImage: `url(${HomePageImg})` /*margin trouble*/,
          backgroundRepeat: 'no-repeat',
          height: '425px',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          alignItems: 'center',
          /*opacity: '0.4'; : light also the others conponents*/
        }}
      >
        <Row className="m-0 p-0 align-items-center">
          <div className="text-center m-5" id="main-title">
            <h1 aria-label="buy-local">Buy local, buy responsible </h1>
          </div>
          <div className="center mt-5">
            <Link to={'/shop'} className="link">
              <BSButton
                id="btn-shopping"
                aria-label="start-shopping-btn"
                className="d-inline-flex p-5 align-items-center justify-content-center"
              >
                Start Shopping
              </BSButton>
            </Link>
          </div>
        </Row>
        <Row className="text-center m-0 p-0 well span2">
          <div>
            <a href="#goto">
              <FontAwesomeIcon icon={faChevronDown} id="arrow" />
            </a>
          </div>
        </Row>
      </div>

      {/* HomePage - explaination  */}
      <Container className="paragraph" aria-label="paragraph" id="goto">
        <i>
          Our social solidarity shop is a core principle of collective action
          and is founded on shared values and beliefs among different groups in
          our society. We promote practices that sustain the alternative food
          networks in the country, such as: solidarity and critical consumption,
          organic and km-0 productions as ways to promote environment
          protection, respect of labour regulation and fair economic relations
        </i>
      </Container>

      <Row className="m-5 flex ">
        {/*d-flex overflow-x-scroll*/}
        <div className="mid-title">
          <h2 aria-label="our-products">
            <strong>Our Products</strong>
          </h2>
        </div>
      </Row>

      {/* HomePage - our products*/}

      <Row className="ml-5 mr-5 mb-5 d-inline-flex">
        <div className="products">
          <Link to={'/shop/Fruit-&-vegetable'} className="link">
            <img
              className="round-img"
              title="Fruit & vegetable"
              src="https://images.unsplash.com/photo-1598030304671-5aa1d6f21128?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
            />
            <p className="link">Fruit & vegetable</p>
          </Link>
          <Link to={'/shop/Dairy'} className="link">
            <img
              className="round-img"
              title="Dairy"
              src="https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            />
            <p className="link">Dairy</p>
          </Link>

          <Link to={'/shop/Meat-&-cured-meat'} className="link">
            <img
              className="round-img"
              title="Meat & cured meat"
              src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            />
            <p className="link">Meat & cured meat</p>
          </Link>
          <Link to={'/shop/Bread-&-sweets'} className="link">
            <img
              className="round-img"
              title="Bread & sweets"
              src="https://images.unsplash.com/photo-1550617931-e17a7b70dce2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            />
            <p className="link">Bread & sweets</p>
          </Link>

          <Link to={'/shop/Drinks'} className="link">
            <img
              className="round-img zoom"
              title="Drink"
              src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=957&q=80"
            />
            <p className="link">Drink</p>
          </Link>
          <Link to={'/shop/Gastronomy'} className="link">
            <img
              className="round-img"
              title="Gastronomy"
              src="https://images.unsplash.com/photo-1625937712159-e305336cbf4b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=631&q=80"
            />
            <p className="link">Gastronomy</p>
          </Link>
          <Link to={'/shop/Other-foods'} className="link">
            <img
              className="round-img"
              title="Other"
              src="https://images.unsplash.com/photo-1621244335063-1106a47c9612?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            />
            <p className="link">Other</p>
          </Link>
        </div>
      </Row>

      {/* HomePage - About us section */}
      <div className="aboutus mt-5">
        <div
          className="m-0 p-0"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)`,
            backgroundRepeat: 'no-repeat',
            height: '560px',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <div className="last-title mt-5">
            <h2 aria-label="contact-us">
              <strong>Contact Us</strong>
            </h2>
          </div>

          <div className="col-sm info d-inline">
            <i className="fab fa-facebook network m-5"> Facebook </i>
            <i className="fab fa-instagram network m-5"> Instagram </i>
            <i className="fab fa-twitter network m-5"> Twitter </i>
            <i className="fab fa-youtube network m-5"> Youtube </i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
