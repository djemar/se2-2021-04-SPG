import dayjs from 'dayjs';
import { createContext, useContext, useEffect, useState } from 'react';
import API from '../API';
import { TimeContext } from './TimeContext';

export const UserContext = createContext();

const UserContextProvider = ({ ...props }) => {
  const { children } = props;
  const [alertBalance, setAlertBalance] = useState(false);
  const { dateState } = useContext(TimeContext);
  const [products, setProducts] = useState([]);
  const [dateProducts, setDateProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [dirtyProd, setDirtyProd] = useState(true);
  const [dirty, setDirty] = useState(true);
  const [loadingProd, setLoadingProd] = useState(true);
  const [users, setUsers] = useState([]);
  const [sessionCheck, setSessionCheck] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(true);

  const login = async user => {
    setUser(user);
    setIsLogged(true);
  };

  const logout = async () => {
    await API.logout();
    setUser(null);
    setIsLogged(false);
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await API.checkSession();
        setUser(user);
        setIsLogged(true);
        setSessionCheck(false);
        setLoading(false);
      } catch (err) {
        setSessionCheck(false);
        setLoading(false);
      }
    };
    if (sessionCheck) {
      checkSession();
    }
  }, [sessionCheck, isLogged]);

  useEffect(() => {
    const getAllProducts = async () => {
      const products = await API.getAllProducts();
      setProducts(products);
    };

    if (dirtyProd || dirty) {
      setLoadingProd(true);
      getAllProducts().then(() => {
        setLoadingProd(false);
        setDirtyProd(false);
      });
    }
  }, [dirtyProd, dirty]);

  useEffect(() => {
    const getAllProductsBetweenDate = async () => {
      const dates = getTimeframe();
      const newProducts = await API.getProductsBetweenDates(
        dates.startDate,
        dates.endDate
      );
      setDateProducts(newProducts);
    };

    setLoadingProd(true);
    getAllProductsBetweenDate().then(() => {
      setLoadingProd(false);
      setDirty(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateState, dirty, dirtyProd]);

  useEffect(() => {
    if (isLogged && user && products) {
      const getAllOrders = async () => {
        const orders = await API.getAllOrders();
        const mappedOrders = API.mapOrders(
          user.userType === 'Client'
            ? orders.filter(o => o.ref_user === user.id)
            : orders,
          products
        );
        const sum = mappedOrders.reduce(
          (total, o) => (total += o.tot_price),
          0
        );
        setOrders(mappedOrders);
        if (user.userType === 'Client' && sum > user.wallet_balance)
          setAlertBalance(true);
        else setAlertBalance(false);
      };

      getAllOrders().then(() => {
        setDirty(false);
      });
    } else setAlertBalance(false);
  }, [isLogged, user, products, dirty, dirtyProd]);

  useEffect(() => {
    const getAllUsers = async () => {
      const users = await API.getAllUsers();
      setUsers(users);
    };

    if (dirty) {
      getAllUsers().then(() => {
        setDirty(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged]);

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
    <UserContext.Provider
      value={{
        alertBalance,
        setAlertBalance,
        login,
        logout,
        isLogged,
        loading,
        user,
        orders,
        products,
        dirty,
        setDirty,
        loadingProd,
        users,
        dateProducts,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
