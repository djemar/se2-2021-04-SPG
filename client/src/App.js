import { BrowserRouter as Router } from 'react-router-dom';
import { Main } from './components/common/Main/';
import { Navbar } from './components/common/Navbar';
import { Spinner } from './components/misc';
import './vendor/fontawesome-free/css/all.min.css';
import { useState, useEffect } from 'react';
import API from './API';

function App() {
  const [basketProducts, setBasketProducts] = useState([]);
  const [show, setShow] = useState(false);

  const [sessionCheck, setSessionCheck] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(true);
  const [animateBasket, setAnimateBasket] = useState(false);

  const login = async user => {
    setUser(user);
    setIsLogged(true);
  };

  const logout = async () => {
    await API.logout();
    setUser(null);
    setIsLogged(false);
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await API.checkSession();
        setUser(user);
        setIsLogged(true);
        setSessionCheck(false);
        setLoading(false);
      } catch (err) {
        setSessionCheck(false);
        setLoading(false);
      }
    };
    if (sessionCheck) {
      checkSession();
    }
  }, [sessionCheck, isLogged]);

  return loading ? (
    <div className="vh-100 d-flex align-items-center">
      <Spinner />
    </div>
  ) : (
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
  );
}

export default App;
