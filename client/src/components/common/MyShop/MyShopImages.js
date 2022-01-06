import { useState } from 'react';
import { Modal, Button, Image, InputGroup, FormControl } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

import { imageList } from '../../../img/uploads/imagesList';

export const MyShopImages = ({ ...props }) => {
  const { setUrl, setShow, show } = props;

  const [search, setSearch] = useState('');

  const handleClose = () => {
    setShow(false);
  };

  const select = url => {
    setUrl(url);
    handleClose();
  };

  const imagesList = imageList
    .filter(img => img.title.toLowerCase().includes(search))
    .map(img => (
      <>
        <tr className="">
          <td className="text-center align-middle w-14" align="center">
            <Image className="w-10 h-10" fluid rounded src={img.url} />
          </td>
          <td className="text-left align-middle">{img.title}</td>
          <td className="text-center align-middle">
            <Button
              className="buttons-order-details mx-1"
              size="sm"
              aria-label="button-details"
              onClick={() => select(img.url)}
            >
              <span>Select</span>
            </Button>
          </td>
        </tr>
      </>
    ));

  return (
    <Modal
      centered
      size="md"
      show={show}
      onHide={handleClose}
      className="h-2/3"
    >
      <Modal.Header closeButton style={{ textAlign: 'center' }}>
        Available Images
      </Modal.Header>
      <Modal.Body className="text-center">
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search image"
            aria-label="Search image"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <Button className="bg-primary">Search</Button>
        </InputGroup>
        <Table borderless responsive="md" striped>
          <tbody>{imagesList}</tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default MyShopImages;
