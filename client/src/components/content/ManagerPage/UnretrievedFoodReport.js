import './Reports.css';
import UnretrievedReportFilters from './UnretrievedReportFilters';
import UnretrievedReportGraphs from './UnretrievedReportGraphs';
import { TimeContext } from '../../../context/TimeContext';
import { useContext, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekOfYear);

export const UnretrievedFoodReport = ({ ...props }) => {
  const { categories } = props;

  const { dateState } = useContext(TimeContext);

  const [filterDate, setFilterDate] = useState(new Date());
  const [year, setYear] = useState(dayjs(dateState).get('year'));
  const [month, setMonth] = useState(dayjs(dateState).get('month') + 1);
  const [week, setWeek] = useState(dayjs(dateState).week()); // be careful: it counts for the first sunday of that week (1st Jan 2022 is sunday --> w == 1)
  const [timeReportType, setTimeReportType] = useState('monthly');

  const [unretrievedOrders, setUnretrievedOrders] = useState([]);
  const [dirty, setDirty] = useState(true);

  useEffect(() => {
    setYear(dayjs(filterDate).get('year'));
    setMonth(dayjs(filterDate).get('month') + 1);
    setWeek(dayjs(filterDate).week());
  }, [filterDate]);

  return (
    <>
      <div className="flex justify-between p-8 flex-column lg:flex-row">
        <UnretrievedReportFilters
          filterDate={filterDate}
          setFilterDate={setFilterDate}
          year={year}
          setYear={setYear}
          month={month}
          setMonth={setMonth}
          week={week}
          setWeek={setWeek}
          timeReportType={timeReportType}
          setTimeReportType={setTimeReportType}
        />
        <UnretrievedReportGraphs
          categories={categories}
          year={year}
          month={month}
          week={week}
          timeReportType={timeReportType}
          unretrievedOrders={unretrievedOrders}
          setUnretrievedOrders={setUnretrievedOrders}
          dirty={dirty}
          setDirty={setDirty}
        />
      </div>
    </>
  );
};

export default UnretrievedFoodReport;
