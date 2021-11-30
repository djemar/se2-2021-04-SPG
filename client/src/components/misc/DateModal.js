import { useState } from 'react';
import { Modal, Button as ButtonBS, Form, Row, Col } from 'react-bootstrap';
import * as dayjs from 'dayjs';

export const DateModal = ({ ...props }) => {
  const { setDateState } = props;
  const [valueDate, setValueDate] = useState();
  const [valueTime, setValueTime] = useState();

  return (
    <Modal
      {...props}
      dialogClassName="w-auto"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {`${props.title}`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body as={Row}>
        <Col sm={6}>
          <Form.Control
            size="lg"
            type="date"
            placeholder="Select date"
            onChange={e => setValueDate(e.target.value)}
          />
        </Col>
        <Col sm={6}>
          <Form.Control
            size="lg"
            type="time"
            placeholder="Select time"
            onChange={e => setValueTime(e.currentTarget.value)}
          />
        </Col>
        <Row className="d-flex mt-10 mb-5 justify-center text-xl font-medium">
          {dayjs(`${valueDate}T${valueTime}`).format('HH:mm, dddd, DD/MM/YYYY')}
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <ButtonBS variant="danger" className="mr-5" onClick={props.onHide}>
          Close
        </ButtonBS>
        <ButtonBS
          variant="success"
          onClick={() => {
            setDateState(dayjs(`${valueDate}T${valueTime}`).toISOString());
            props.onHide();
          }}
        >
          Set Date
        </ButtonBS>
      </Modal.Footer>
    </Modal>
  );
};

export default DateModal;
