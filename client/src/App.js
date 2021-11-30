import { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import API from './API';
import { Main } from './components/common/Main/';
import { Navbar } from './components/common/Navbar';
import { Spinner } from './components/misc';
import { UserContext } from './context/UserContext';
import './vendor/fontawesome-free/css/all.min.css';

function App() {
  const [basketProducts, setBasketProducts] = useState([]);
  const [show, setShow] = useState(false);

  const { user, loading, login, logout, isLogged } = useContext(UserContext);
  const [animateBasket, setAnimateBasket] = useState(false);

  return loading ? (
    <div className="vh-100 d-flex align-items-center">
      <Spinner />
    </div>
  ) : (
    <>
      <Router>
        <div id="wrapper">
          <div id="content-wrapper" className="d-flex flex-column vh-100">
            <div id="content">
              <Navbar
                user={user}
                isLogged={isLogged}
                animateBasket={animateBasket}
                setAnimateBasket={setAnimateBasket}
                basketProducts={basketProducts}
                logout={logout}
                setBasketProducts={setBasketProducts} /* logout={logout} */
              />
              <Main
                user={user}
                login={login}
                isLogged={isLogged}
                basketProducts={basketProducts}
                setBasketProducts={setBasketProducts}
                setAnimateBasket={setAnimateBasket}
                show={show}
                setShow={setShow}
              />
            </div>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
