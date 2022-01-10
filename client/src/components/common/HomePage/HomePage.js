import { Link } from 'react-router-dom';
import { Row, Container, Button as BSButton, Image } from 'react-bootstrap';
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
        className="home m-0 p-0 background"
        style={{
          backgroundImage: `url(${HomePageImg})` /*margin trouble*/,
          backgroundRepeat: 'no-repeat',
          height: '600px',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          alignItems: 'center',
          /*opacity: '0.4'; : light also the others conponents*/
        }}
      >
        <div className="m-0 p-0 align-items-center flex flex-column h-full">
          <div
            className="text-center py-24 flex-grow flex items-center"
            id="main-title"
          >
            <h1 aria-label="buy-local">Buy local, buy responsible </h1>
          </div>
          <div className="center mt-5 flex-none">
            <Link to={'/shop'} className="no-underline">
              <BSButton
                id="btn-shopping"
                aria-label="start-shopping-btn"
                className="d-inline-flex px-5 py-4 align-items-center justify-content-center bg-secondary rounded-full"
              >
                Start Shopping
              </BSButton>
            </Link>
            <div>
              <a href="#goto">
                <FontAwesomeIcon icon={faChevronDown} id="arrow" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* HomePage - explaination  */}
      <div
        className="text-2xl py-10 bg-white flex justify-content-center"
        aria-label="paragraph"
        id="goto"
      >
        <div className="w-3/4">
          <i>
            Our social solidarity shop is a core principle of collective action
            and is founded on shared values and beliefs among different groups
            in our society. We promote practices that sustain the alternative
            food networks in the country, such as: solidarity and critical
            consumption, organic and km-0 productions as ways to promote
            environment protection, respect of labour regulation and fair
            economic relations
          </i>
        </div>
      </div>

      <Row className="m-5 flex ">
        {/*d-flex overflow-x-scroll*/}
        <div className="mid-title text-dark">
          <h2 aria-label="our-products">
            <strong>Our Products</strong>
          </h2>
        </div>
      </Row>

      {/* HomePage - our products*/}

      <div className="">
        <div className="flex flex-wrap justify-center gap-8 2xl:gap-12 w-full">
          <Link to={'/shop/Fruit-&-vegetable'} className="no-underline">
            <Image
              className="w-36 h-36 2xl:h-44 2xl:w-44 mb-4 rounded-full"
              title="Fruit & vegetable"
              src="https://images.unsplash.com/photo-1598030304671-5aa1d6f21128?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
            />
            <p className="no-underline">Fruit & vegetable</p>
          </Link>
          <Link to={'/shop/Dairy'} className="no-underline">
            <Image
              className="w-36 h-36 2xl:h-44 2xl:w-44 mb-4 rounded-full"
              title="Dairy"
              src="https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            />
            <p className="no-underline">Dairy</p>
          </Link>

          <Link to={'/shop/Meat-&-cured-meat'} className="no-underline">
            <Image
              className="w-36 h-36 2xl:h-44 2xl:w-44 mb-4 rounded-full"
              title="Meat & cured meat"
              src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            />
            <p className="no-underline">Meat & cured meat</p>
          </Link>
          <Link to={'/shop/Bread-&-sweets'} className="no-underline">
            <Image
              className="w-36 h-36 2xl:h-44 2xl:w-44 mb-4 rounded-full"
              title="Bread & sweets"
              src="https://images.unsplash.com/photo-1550617931-e17a7b70dce2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            />
            <p className="no-underline">Bread & sweets</p>
          </Link>

          <Link to={'/shop/Drinks'} className="no-underline">
            <Image
              className="w-36 h-36 2xl:h-44 2xl:w-44 mb-4 rounded-full zoom"
              title="Drink"
              src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=957&q=80"
            />
            <p className="no-underline">Drink</p>
          </Link>
          <Link to={'/shop/Gastronomy'} className="no-underline">
            <Image
              className="w-36 h-36 2xl:h-44 2xl:w-44 mb-4 rounded-full"
              title="Gastronomy"
              src="https://images.unsplash.com/photo-1625937712159-e305336cbf4b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=631&q=80"
            />
            <p className="no-underline">Gastronomy</p>
          </Link>
          <Link to={'/shop/Other-foods'} className="no-underline">
            <Image
              className="w-36 h-36 2xl:h-44 2xl:w-44 mb-4 rounded-full"
              title="Other"
              src="https://images.unsplash.com/photo-1621244335063-1106a47c9612?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            />
            <p className="no-underline">Other</p>
          </Link>
        </div>
      </div>

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
          <div className="last-title mt-5 text-dark">
            <h2 aria-label="contact-us">
              <strong>Contact Us</strong>
            </h2>
          </div>

          <div className="col-sm info d-inline text-2xl">
            <span className="inline-flex items-center font-semibold shadow-lg rounded-full mx-2 p-4">
              <i className="fab fa-facebook text-secondary mr-2" /> Facebook
            </span>
            <span className="inline-flex items-center font-semibold shadow-lg rounded-full mx-2 p-4">
              <i className="fab fa-instagram text-secondary mr-2" /> Instagram
            </span>
            <span className="inline-flex items-center font-semibold shadow-lg rounded-full mx-2 p-4">
              <i className="fab fa-twitter text-secondary mr-2" /> Twitter
            </span>
            <span className="inline-flex items-center font-semibold shadow-lg rounded-full mx-2 p-4">
              <i className="fab fa-youtube text-secondary mr-2" /> Youtube
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
