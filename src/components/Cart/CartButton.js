import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../Store/ui-slice';
import classes from './CartButton.module.css';

const CartButton = (props) => {
  const cartQuantity = useSelector((state) => state.cart.totalQuantity)
  const dispatch = useDispatch();
  
  const cartToggleHandler = () => {
    dispatch(uiActions.toggleState())
  }
  return (
    <button className={classes.button} onClick={cartToggleHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
