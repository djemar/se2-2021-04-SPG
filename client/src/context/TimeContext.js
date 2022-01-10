import { createContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import API from '../API';
export const TimeContext = createContext();

const TimeContextProvider = ({ ...props }) => {
  const { children } = props;

  const [dateState, setDateState] = useState(dayjs().toISOString());
  const [orderEnabled, setOrderEnabled] = useState(false);
  const [addingProductsDays, setAddingProductsDays] = useState(false);

  useEffect(() => {
    const today = dayjs(dateState).get('day');
    const hour = dayjs(dateState).get('hour');

    // saturday 9:00 < x < sunday 23:00
    if ((today === 6 && hour >= 9) || (today === 0 && hour < 23)) {
      setOrderEnabled(true);
    } else {
      setOrderEnabled(false);
    }

    // tuesday 9:00 < x < saturday 23:00
    if (
      (today === 2 && hour >= 9) ||
      (today > 2 && today < 6) ||
      (today === 6 && hour < 23)
    ) {
      setAddingProductsDays(true);
    } else {
      setAddingProductsDays(false);
    }

    let checkUnretrieved = async () => {
      let orders = await API.getAllOrders();
      console.log('stampo gli orders ===>', orders);
      orders.forEach(order => {
        if (
          order.status === 'pending' ||
          order.status === 'pending_cancellation'
        ) {
          API.setUnretrievedOrder(order.order_id);
        }
      });
    };
    //Friday 9 am set unretrieved orders
    if (today === 5 && hour === 21) {
      checkUnretrieved();
    }
    if (today === 6 && hour === 9) {
      const dates = getTimeframe();
      const result = API.sendWeeklyNotification(dates.startDate, dates.endDate);
      if (result) {
        console.log(result);
      }
    }
  }, [dateState]);

  function getTimeframe() {
    let today = dayjs(dateState).get('day');
    // db format: YYYY-MM-DD
    // Saturday = 6, sunday = 0
    // today will be equal to saturday, and end date sunday
    let startDate;

    switch (today) {
      case 1:
        startDate = dayjs(dateState).add(5, 'day').format('YYYY-MM-DD');
        break;
      case 2:
        startDate = dayjs(dateState).add(4, 'day').format('YYYY-MM-DD');
        break;
      case 3:
        startDate = dayjs(dateState).add(3, 'day').format('YYYY-MM-DD');
        break;
      case 4:
        startDate = dayjs(dateState).add(2, 'day').format('YYYY-MM-DD');
        break;
      case 5:
        startDate = dayjs(dateState).add(1, 'day').format('YYYY-MM-DD');
        break;
      case 6:
        startDate = dayjs(dateState).format('YYYY-MM-DD');
        break;
      case 0:
        startDate = dayjs(dateState).add(6, 'day').format('YYYY-MM-DD');
        break;
      default:
        break;
    }

    let endDate = dayjs(startDate).add(1, 'day').format('YYYY-MM-DD');
    const dates = { startDate, endDate };
    return dates;
  }

  return (
    <TimeContext.Provider
      value={{ dateState, setDateState, orderEnabled, addingProductsDays }}
    >
      {children}
    </TimeContext.Provider>
  );
};

export default TimeContextProvider;
