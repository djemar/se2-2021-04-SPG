import { createContext, useEffect, useState } from 'react';
import * as dayjs from 'dayjs';

export const TimeContext = createContext();

//const { dateState, setDateState } = useContext(TimeContext);

const TimeContextProvider = ({ ...props }) => {
  const { children } = props;

  const [dateState, setDateState] = useState(dayjs().toISOString());
  const [orderEnabled, setOrderEnabled] = useState(false);

  useEffect(() => {
    const today = dayjs(dateState).get('day');
    const hour = dayjs(dateState).get('hour');
    // sabato 9:00 < x < domenica 23:00
    if ((today === 6 && hour >= 9) || (today === 0 && hour < 23)) {
      setOrderEnabled(true);
    } else {
      setOrderEnabled(false);
    }
  }, [dateState]);

  return (
    <TimeContext.Provider value={{ dateState, setDateState, orderEnabled }}>
      {children}
    </TimeContext.Provider>
  );
};

export default TimeContextProvider;
