import { faGreaterThan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as dayjs from 'dayjs';
import { useContext, useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { Link, NavLink, useLocation } from 'react-router-dom';
import '../../App.css';
import { TimeContext } from '../../context/TimeContext';
import './../common/Sidebar/sidebar.css';
import DateModal from './DateModal';

export const Breadcrumbs = ({ ...props }) => {
  const { setDirty } = props;
  const [modalShow, setModalShow] = useState(false);
  const { dateState, setDateState } = useContext(TimeContext);

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
  });
  return (
    <div className="vw-100 px-3 d-flex justify-between items-center">
      <ListGroup className="striped-list text-black shadow">
        <ListGroup.Item key="home" className="text-dark flex">
          <Link to="/" className="breadcrumbs">
            Home
          </Link>
          {breadcrumbs}
        </ListGroup.Item>
      </ListGroup>
      <Card
        className="striped-list breadcrumbs px-3 py-2 shadow"
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
