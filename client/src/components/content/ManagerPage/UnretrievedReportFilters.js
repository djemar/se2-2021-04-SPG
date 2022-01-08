import { Card, Container, Row, Form, Alert } from 'react-bootstrap';
import './Reports.css';
import DatePicker from 'react-datepicker';

function UnretrievedReportFilters(props) {
  const {
    filterDate,
    setFilterDate,
    year,
    setYear,
    month,
    setMonth,
    week,
    setWeek,
    timeReportType,
    setTimeReportType,
  } = props;

  return (
    <>
      <div className="flex-none lg:mr-8">
        <Card className="box1">
          <div className="flex justify-center pt-4 font-weight-bold">
            Select a year
          </div>
          <Card.Body>
            <div className="flex justify-between sm:flex-row sm:justify-center lg:flex-col lg:justify-between flex-col items-center">
              <DatePicker
                selected={filterDate}
                onChange={date => setFilterDate(date)}
                showYearPicker
                dateFormat="yyyy"
                inline
              />
              <div className="ml-0 sm:ml-8 lg:ml-0">
                <Alert
                  variant="success"
                  className="text-center mt-4 sm:mt-0 lg:mt-4 mb-0"
                >
                  {'You selected: '}
                  <strong>{year || 'N/A'}</strong>
                </Alert>
                <div className="text-center mt-4 font-weight-bold">
                  Select type
                </div>
                <Form className="pt-4">
                  <Form.Group>
                    <Row className="pl-12">
                      <Form.Check
                        checked={timeReportType === 'weekly'}
                        type="radio"
                        aria-label="weekly-radio"
                        label="Weekly"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios1"
                        onClick={() => {
                          setTimeReportType('weekly');
                        }}
                      />
                    </Row>
                    <Row className="pl-12">
                      <Form.Check
                        checked={timeReportType === 'monthly'}
                        type="radio"
                        variant="success"
                        aria-label="monthly-radio"
                        label="Monthly"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios2"
                        onClick={() => {
                          setTimeReportType('monthly');
                        }}
                      />
                    </Row>
                  </Form.Group>
                </Form>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default UnretrievedReportFilters;
