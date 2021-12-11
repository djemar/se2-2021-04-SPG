import { ListGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../../../App.css';
import { categories } from '../../fakedata';
import './sidebar.css';

export const Sidebar = ({ ...props }) => {
  const mappedLink = categories.map((cat, index) => {
    if (cat.name !== 'All products') {
      return (
        <LinkContainer
          to={'/shop/' + cat.name.replaceAll(' ', '-')}
          key={index}
        >
          <ListGroup.Item action title={cat.name} className="text-black">
            {cat.name}
          </ListGroup.Item>
        </LinkContainer>
      );
    } else {
      return (
        <LinkContainer exact to={'/shop'} key={index}>
          <ListGroup.Item action title={cat.name} className="text-black">
            {cat.name}
          </ListGroup.Item>
        </LinkContainer>
      );
    }
  });

  //console.log(categories);
  return (
    <>
      {/* <Form.Select className="striped-list text-black shadow w-56" size="lg">
        <option className="striped-list text-black shadow w-56">
          All Categories
        </option>
      </Form.Select> */}

      <ListGroup
        className="striped-list text-black shadow w-52"
        defaultActiveKey="All products"
      >
        <ListGroup.Item key={'cat'} className="font-bold ">
          Categories
        </ListGroup.Item>
        {mappedLink}
      </ListGroup>
    </>
  );
};

export default Sidebar;
