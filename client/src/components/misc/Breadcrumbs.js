import {
  faGreaterThan,
  faMoneyBillWaveAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import { useContext, useState } from 'react';
import { Card, ListGroup, Toast, ToastContainer } from 'react-bootstrap';
import { Link, NavLink, useLocation } from 'react-router-dom';
import '../../App.css';
import { TimeContext } from '../../context/TimeContext';
import './../common/Sidebar/sidebar.css';
import DateModal from './DateModal';
import { UserContext } from '../../context/UserContext';

//dayjs.extend(relativeTime);

export const Breadcrumbs = ({ ...props }) => {
  const { latestField } = props;
  const { alertBalance, setAlertBalance } = useContext(UserContext);
  const [modalShow, setModalShow] = useState(false);
  const { dateState, setDateState } = useContext(TimeContext);
  const [now, setNow] = useState(dayjs());

  setInterval(() => {
    if (alertBalance) {
      const now = dayjs();
      setNow(now);
    }
  }, 60000);

  const capitalize = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getBackPath = (pathArray, index) => {
    let tmp = '';
    for (let i = 0; i < index; i++) {
      tmp += `/${pathArray[i]}`;
    }
    return tmp;
  };

  const pathArray = useLocation()
    .pathname.split('/')
    .filter(p => p !== '');

  const icon = (
    <FontAwesomeIcon icon={faGreaterThan} className="mx-2 text-secondary" />
  );

  const breadcrumbs = pathArray.map((p, i) => {
    if (i + 1 === pathArray.length && latestField) {
      return (
        <div key={i}>
          {icon}
          <NavLink
            activeClassName="text-secondary font-bold"
            exact
            to={`${getBackPath(pathArray, i)}/${p}`}
            className="breadcrumbs"
          >
            {capitalize(latestField)}
          </NavLink>
        </div>
      );
    } else {
      return (
        <div key={i}>
          {icon}
          <NavLink
            activeClassName="text-secondary font-bold"
            exact
            to={`${getBackPath(pathArray, i)}/${p}`}
            className="breadcrumbs"
          >
            {capitalize(p.split('-').join(' '))}
          </NavLink>
        </div>
      );
    }
  });

  return (
    <div
      className={`vw-100 px-3 d-flex justify-between items-center ${
        !alertBalance ? 'py-8' : ''
      }`}
    >
      <ListGroup className="striped-list text-black shadow">
        <ListGroup.Item key="home" className="text-dark flex">
          <Link to="/" className="breadcrumbs">
            Home
          </Link>
          {breadcrumbs}
        </ListGroup.Item>
      </ListGroup>
      {alertBalance && (
        <ToastContainer>
          <Toast
            bg="warning"
            show={alertBalance}
            onClose={() => setAlertBalance(false)}
          >
            <Toast.Header closeButton={true}>
              <FontAwesomeIcon
                icon={faMoneyBillWaveAlt}
                className={'mr-2 mb-0'}
              />
              <strong className="me-auto">Insufficient Balance</strong>
              <small>{dayjs(now).to(dayjs(dateState))}</small>
            </Toast.Header>
            <Toast.Body className="text-dark warning">
              You have orders pending but your{' '}
              <strong>balance is not enough</strong>! Top-up it!
            </Toast.Body>
          </Toast>
        </ToastContainer>
      )}
      <Card
        className="striped-list breadcrumbs px-3 py-2 shadow cursor-pointer"
        onClick={() => setModalShow(true)}
      >
        {dayjs(dateState).format('HH:mm, dddd, DD/MM/YYYY')}
      </Card>
      <DateModal
        show={modalShow}
        title={'Set a new date'}
        onHide={() => setModalShow(false)}
        setDateState={setDateState}
      />
    </div>
  );
};

export default Breadcrumbs;
