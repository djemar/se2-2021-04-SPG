import { createContext, useEffect, useState } from 'react';
import * as dayjs from 'dayjs';
import API from '../API';

export const UserContext = createContext();

//const { showAlertBalance, products, orders } = useContext(UserContext);

const UserContextProvider = ({ ...props }) => {
  const { children } = props;

  const [alertBalance, setAlertBalance] = useState(false);

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [dirtyProd, setDirtyProd] = useState(true);
  const [dirty, setDirty] = useState(true);
  const [loadingProd, setLoadingProd] = useState(true);

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

    if (dirtyProd) {
      setLoadingProd(true);
      getAllProducts().then(() => {
        setLoadingProd(false);
        setDirtyProd(false);
      });
    }
  }, [isLogged, dirtyProd]);

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
        setDirty,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
