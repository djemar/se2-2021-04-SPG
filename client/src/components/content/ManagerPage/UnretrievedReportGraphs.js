import { Card, Container } from 'react-bootstrap';
import './Reports.css';
import Plot from 'react-plotly.js';
import React, { useEffect, useState } from 'react';
import API from '../../../API';
import { Spinner } from '../../misc';

const MoY = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const WoY = Array.from({ length: 52 }, (_, i) => {
  let tmp = i + 1;
  return tmp.toString();
});

//- months: j   f   m   a    m    j    j    a    s    o    n    d
const passedDaysPerMonthNormal = [
  0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334,
];
const passedDaysPerMonthLeap = [
  0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335,
];

const fakeData = {
  toBeUsed: false,
  orders: [
    {
      order_id: 1,
      ref_product: 53,
      ref_user: 2,
      date_order: '10/12/2022',
      quantity: 5,
      status: 'unretrieved',
    },
    {
      order_id: 2,
      ref_product: 54,
      ref_user: 3,
      date_order: '10/09/2022',
      quantity: 2,
      status: 'unretrieved',
    },
  ],
};

function UnretrievedReportGraphs(props) {
  const {
    categories,
    year,
    month,
    week,
    timeReportType,
    unretrievedOrders,
    setUnretrievedOrders,
    dirty,
    setDirty,
  } = props;

  const [title, setTitle] = useState(year + ' - Monthly');
  const [xaxis, setXaxis] = useState('Months of Year');
  const [xData, setXData] = useState(MoY);
  const [yData, setYData] = useState(new Array(52).fill(0));

  // const [unretrievedOrders, setUnretrievedOrders] = useState([]);
  // const [dirty, setDirty] = useState(true);
  const [currentYearOrders, setCurrentYearOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllUnretrievedOrders = async () => {
      if (fakeData.toBeUsed) {
        setUnretrievedOrders(fakeData.orders);
        setCurrentYearOrders(fakeData.orders);
      } else {
        const unretrieved = await API.getAllOrdersUnretrieved();
        setUnretrievedOrders(unretrieved);
      }
    };

    getAllUnretrievedOrders().then(() => {
      setDirty(false);
    });
  }, []);

  useEffect(() => {
    let filtered;
    if (fakeData.toBeUsed) {
      filtered = fakeData.orders;
    } else {
      filtered = unretrievedOrders
        ? unretrievedOrders.filter(
            o => o.date_order.split('/')[2] === year.toString()
          )
        : [];
    }
    setCurrentYearOrders(filtered);
    setLoading(false);
  }, [unretrievedOrders, loading]);

  useEffect(() => {
    setLoading(true);
  }, [year]);

  const computeMonthlyReport = () => {
    if (unretrievedOrders !== undefined) {
      // looking for orders with unretrieved status (orders during current year, counted as divided per months)
      let countersArray = new Array(12).fill(0);
      for (let i = 0; i < currentYearOrders.length; i++) {
        let index = parseInt(currentYearOrders[i].date_order.split('/')[1]);
        if (index > 0 && index <= 12) {
          countersArray[index - 1]++;
        }
      }
      setYData(countersArray);
    }
  };

  const computeWeeklyReport = () => {
    if (unretrievedOrders !== undefined) {
      // looking for orders with unretrieved status (orders during current year, counted as divided per weeks)
      let countersArray = new Array(52).fill(0);
      for (let i = 0; i < currentYearOrders.length; i++) {
        let index = computeWeek(currentYearOrders[i].date_order);
        if (index > 0 && index <= 52) {
          countersArray[index]++;
        }
      }
      setYData(countersArray);
    }
  };

  const computeWeek = dateOrderString => {
    // compute the week number starting from the date string (e.g., from "2022/01/01" to 1)
    let daysOfCurrentMonth = parseInt(dateOrderString.split('/')[0]);
    let months = parseInt(dateOrderString.split('/')[1]);
    let y = parseInt(dateOrderString.split('/')[2]);

    let passedDays = 0;
    // get the number of days have been passed if we are at month `months`
    if (!isLeapYear(y)) passedDays = passedDaysPerMonthNormal[months - 1];
    else passedDays = passedDaysPerMonthLeap[months - 1];

    let weekNumber = Math.floor((passedDays + daysOfCurrentMonth) / 7); //(converting float to integer)
    return weekNumber;
  };

  const isLeapYear = y => {
    // Compute is current `year`(int) is leap ("bisestile") or not:

    // leap year if perfectly divisible by 400
    if (y % 400 === 0) {
      return true;
    }
    // not a leap year if divisible by 100
    // but not divisible by 400
    else if (y % 100 === 0) {
      return false;
    }
    // leap year if not divisible by 100
    // but divisible by 4
    else if (y % 4 === 0) {
      return true;
    }
    // all other years are not leap years
    else {
      return false;
    }
  };

  useEffect(() => {
    if (!dirty) {
      if (timeReportType === 'monthly') {
        setTitle(year + ' - Monthly');
        setXaxis('Months of Year');
        setXData(MoY);
        computeMonthlyReport();
      } else {
        setTitle(year + ' - Weekly');
        setXaxis('Weeks of Year');
        setXData(WoY);
        computeWeeklyReport();
      }
    }
  }, [year, timeReportType, dirty, currentYearOrders]);

  const data = [
    {
      x: xData,
      y: yData,
      type: 'scatter',
      mode: 'lines',
      marker: { color: '#d85016' },
      name: 'unretrieved food',
    },
  ];

  const layout = {
    title: title,
    width: 750,
    height: 465,
    xaxis: { title: xaxis },
    yaxis: { title: 'Quantity' },
  };

  const config = { scrollZoom: true };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex-grow mt-4 lg:mt-0">
          <Card className="box2 flex flex-column items-center h-full">
            {unretrievedOrders !== undefined &&
            currentYearOrders.length >= 1 ? (
              <Plot data={data} layout={layout} config={config} />
            ) : year <= new Date().getFullYear() ? (
              <div className="flex h-full items-center p-4  text-center">
                <i>{'There were no unretrieved orders during ' + year + '!'}</i>
              </div>
            ) : (
              <div className="flex h-full items-center p-4 text-center">
                <i>
                  {'We can do many things for you...'}
                  <br />
                  {'Foreseeing future is not one of them.'}
                </i>
              </div>
            )}
          </Card>
        </div>
      )}
    </>
  );
}

export default UnretrievedReportGraphs;
