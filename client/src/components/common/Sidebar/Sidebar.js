import { useState } from 'react';
import { Button } from '../../misc/';
import SidebarItem from './SidebarItem/SidebarItem';

const productList = [
  {
    title: 'Product 1',
    description:
      'text text text text text text text text text text text text text text',
    quantity: 2,
    unit: 'KG',
  },
  {
    title: 'Product 2',
    description:
      'text text text text text text text text text text text text text text',
    quantity: 2,
    unit: 'KG',
  },
  {
    title: 'Product 3',
    description:
      'text text text text text text text text text text text text text text',
    quantity: 2,
    unit: 'KG',
  },
];

export const Sidebar = ({ ...props }) => {
  const [basketProducts, setBasketProducts] = useState(productList);

  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark vh-100">
      <a
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="index.html"
      >
        <div className="sidebar-brand-text mx-3">YOUR BASKET</div>
      </a>

      <hr className="sidebar-divider my-0" />

      {basketProducts.length > 0 ? (
        basketProducts.map(p => <SidebarItem key={p.title} product={p} />)
      ) : (
        <></>
      )}

      {/* <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="/"
          data-toggle="collapse"
          data-target="/collapseUtilities"
          aria-expanded="true"
          aria-controls="collapseUtilities"
        >
          <i className="fas fa-fw fa-wrench"></i>
          <span className="ml-1">Results</span>
        </a>
      </li> */}
      {/* <div className="d-flex justify-content-center mb-3">
        <Button text={'New Survey'} type={'success'} url={'/create'} />
      </div> */}
      <hr className="sidebar-divider" />
      <div className="h-100 d-flex justify-content-center align-items-end mb-5">
        <Button text={'Confirm'} type={'success'} url={'/'} />
      </div>
    </ul>
  );
};

export default Sidebar;
