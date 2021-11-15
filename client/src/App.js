import { BrowserRouter as Router } from 'react-router-dom';
import { Sidebar } from './components/common/Sidebar';
import { Navbar } from './components/common/Navbar';
import { Main } from './components/common/Main/';
import { Spinner } from './components/misc';
import './vendor/fontawesome-free/css/all.min.css';
import { useState } from 'react';

function App() {
  const [basketProducts, setBasketProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [showBasket, setShowBasket] = useState(true);
  const [sessionCheck, setSessionCheck] = useState(true);
  const [user, setUser] = useState({
    id: 1,
    username: 'pippo@baudo.it',
    name: 'Pippo',
    surname: 'Baudo',
    userType: 1,
  });
  const [loading, setLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(true);

  /*const login = async user => {
    setUser(user);
    setIsLogged(true);
  };

  const logout = async () => {
    await API.logOut();
    setUser();
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
        console.log(err.error);
        setSessionCheck(false);
        setLoading(false);
      }
    };
    if (sessionCheck) {
      checkSession();
    }
  }, [sessionCheck]); */

  return loading ? (
    <div className="vh-100 d-flex align-items-center">
      <Spinner />
    </div>
  ) : (
    <Router>
      <div id="wrapper">
        <div id="content-wrapper" className="d-flex flex-column vh-100">
          <div id="content">
            <Navbar user={user} /* logout={logout} */ />
            <Main
              user={user}
              //login={login}
              isLogged={isLogged}
              basketProducts={basketProducts}
              setBasketProducts={setBasketProducts}
              show={show}
              setShow={setShow}
            />
          </div>
        </div>
        {showBasket && (
          <Sidebar
            basketProducts={basketProducts}
            setBasketProducts={setBasketProducts}
            show={show}
            setShow={setShow}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
