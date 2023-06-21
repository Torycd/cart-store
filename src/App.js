import { useDispatch, useSelector } from "react-redux";
import Notification from "./components/UI/Notification";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { Fragment } from "react";
import { useEffect } from "react";
import { sendData } from "./components/Store/cart-slice";

let showNotification = true;
function App() {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.ui.cartVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    if (showNotification) {
      showNotification = false;
      return;
    }
    dispatch(sendData(cart));
  }, [cart, dispatch]);
  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {show && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
