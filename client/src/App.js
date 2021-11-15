import { BrowserRouter as Router } from 'react-router-dom';
import { Sidebar } from './components/common/Sidebar';
import { Navbar } from './components/common/Navbar';
import { Main } from './components/common/Main/';
import './vendor/fontawesome-free/css/all.min.css';
import { useState } from 'react';

function App() {
  const [basketProducts, setBasketProducts] = useState([]);

  return (
    <Router>
      <div id="wrapper">
        <div id="content-wrapper" className="d-flex flex-column vh-100">
          <div id="content">
            <Navbar />
            <Main
              user={{}}
              basketProducts={basketProducts}
              setBasketProducts={setBasketProducts}
            />
          </div>
        </div>
        <Sidebar
          basketProducts={basketProducts}
          setBasketProducts={setBasketProducts}
        />
      </div>
    </Router>
  );
}

export default App;
