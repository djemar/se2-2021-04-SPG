import { Card, Button as BSButton, Tabs, Sonnet, Tab } from 'react-bootstrap';
import { useState } from 'react';
import Breadcrumbs from '../../misc/Breadcrumbs';
import img from '../../../img/undraw_profile.svg';
import './User.css';

export const User = ({ ...props }) => {
  const { user } = props;
  const [key, setKey] = useState('orders');

  return (
    <div className="flex flex-column justify-start">
      <div className="flex flex-none justify-start pb-8 pt-4">
        <Breadcrumbs />
      </div>
      <div className="flex flex-grow justify-between">
        <div className="flex w-100 h-100 px-3">
          <Card className="user-box shadow py-0">
            <Card.Title className="flex items-center justify-center text-center w-100 text-3xl font-bold text-white user-box-title">
              Account
            </Card.Title>
            <Card.Body className="py-4 w-100 h-100">
              <div className="row">
                <div className="col-3 flex flex-column justify-center py-4">
                  <img
                    alt=""
                    className="img-profile rounded-circle h-36 mb-6"
                    src={img}
                  />
                  <Card.Text className="text-xl font-bold flex justify-center text-dark mb-2">
                    Nome Cognome
                  </Card.Text>
                  <Card.Text className="text-md  flex justify-center text-dark mb-2">
                    User Type
                  </Card.Text>
                  <Card.Text className="text-md flex justify-center text-dark mb-2">
                    User ID
                  </Card.Text>
                </div>
                <div className="col-9 flex flex-column justify-start py-4 user-divider">
                  <Tabs
                    activeKey={key}
                    onSelect={k => setKey(k)}
                    className="mb-3"
                  >
                    <Tab
                      tabClassName="no-underline text-primary"
                      eventKey="orders"
                      title="Orders"
                    >
                      Order List
                    </Tab>
                    <Tab
                      tabClassName="no-underline text-primary"
                      eventKey="wallet"
                      title="Wallet"
                    >
                      Wallet content
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default User;
