import React from 'react';
import ReactDOM from 'react-dom';
import './style/style.css';
import './style/custom.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import TimeContextProvider from './context/TimeContext';
import UserContextProvider from './context/UserContext';

ReactDOM.render(
  <React.StrictMode>
    <TimeContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </TimeContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
