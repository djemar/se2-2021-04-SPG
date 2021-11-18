import { ListGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../../../App.css';
import { categories } from '../../fakedata';
import './sidebar.css';

export const Sidebar = ({ ...props }) => {
  const { setDirty } = props;

  const mappedLink = categories.map((cat, index) => {
    if (cat.name !== 'All products') {
      return (
        <LinkContainer
          to={'/shop/' + cat.name.replaceAll(' ', '-')}
          key={index}
        >
          <ListGroup.Item
            action
            title={cat.name}
            className="text-black"
            onClick={() => setDirty(true)}
          >
            {cat.name}
          </ListGroup.Item>
        </LinkContainer>
      );
    } else {
      return (
        <LinkContainer exact to={'/shop'} key={index}>
          <ListGroup.Item
            action
            title={cat.name}
            className="text-black"
            onClick={() => setDirty(true)}
          >
            {cat.name}
          </ListGroup.Item>
        </LinkContainer>
      );
    }
  });
  return (
    <ListGroup
      className="striped-list text-black shadow"
      defaultActiveKey="All products"
    >
      <ListGroup.Item key={'cat'} className="font-bold">
        Categories
      </ListGroup.Item>
      {mappedLink}
    </ListGroup>
  );
};

export default Sidebar;
