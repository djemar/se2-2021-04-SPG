import {
  faGreaterThan,
  faMoneyBillWaveAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
//import * as relativeTime from 'dayjs/plugin/relativeTime';
import { useContext, useEffect, useState } from 'react';
import { Card, ListGroup, Toast, ToastContainer } from 'react-bootstrap';
import { Link, NavLink, useLocation } from 'react-router-dom';
import API from '../../API';
import '../../App.css';
import { TimeContext } from '../../context/TimeContext';
import { UserContext } from '../../context/UserContext';
import './../common/Sidebar/sidebar.css';
import DateModal from './DateModal';

//dayjs.extend(relativeTime);

export const Breadcrumbs = ({ ...props }) => {
  const { latestField } = props;
  const { alertBalance, setAlertBalance } = useContext(UserContext);
  const [modalShow, setModalShow] = useState(false);
  const { dateState, setDateState } = useContext(TimeContext);
  const [now, setNow] = useState(dayjs());

  useEffect(() => {
    const pendingCancellation = async () => {
      //console.log("it's monday monrning");
      API.setAllPendingCancellationOrder();
    };

    /* const deletePending = async () => {
      //console.log("it's monday evening");
      API.deleteAllPendingOrder();
    }; */

    if (
      dayjs(dateState).get('day') === 1 &&
      dayjs(dateState).get('hour') === 9 &&
      dayjs(dateState).get('minute') === 0
    ) {
      pendingCancellation().then(() => {
        //console.log('success');
      });
    }
  }, [dateState]);

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
      className={`md:w-full flex-columns md:flex justify-between items-center ${
        !alertBalance ? 'md:py-8' : ''
      }`}
    >
      <ToastContainer className="md:m-0 w-80 md:hidden">
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
          </Toast.Header>
          <Toast.Body className="text-dark warning">
            You have orders pending but your{' '}
            <strong>balance is not enough</strong>! Top-up it!
          </Toast.Body>
        </Toast>
      </ToastContainer>
      <ListGroup
        className={`striped-list text-black shadow ${
          alertBalance ? 'mt-4 md:mt-0' : ''
        }`}
      >
        <ListGroup.Item key="home" className="text-dark flex">
          <Link to="/" className="breadcrumbs">
            Home
          </Link>
          {breadcrumbs}
        </ListGroup.Item>
      </ListGroup>
      {alertBalance && (
        <ToastContainer className="mt-4 md:m-0 w-80 hidden md:block">
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
            </Toast.Header>
            <Toast.Body className="text-dark warning">
              You have orders pending but your{' '}
              <strong>balance is not enough</strong>! Top-up it!
            </Toast.Body>
          </Toast>
        </ToastContainer>
      )}
      <Card
        className="striped-list breadcrumbs px-3 py-2 shadow cursor-pointer mt-4 md:m-0"
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
