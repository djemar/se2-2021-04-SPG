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
  }, [dateState]);

  return (
    <TimeContext.Provider
      value={{ dateState, setDateState, orderEnabled, addingProductsDays }}
    >
      {children}
    </TimeContext.Provider>
  );
};

export default TimeContextProvider;
