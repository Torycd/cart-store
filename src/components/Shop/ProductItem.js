import Card from '../UI/Card';
import { useDispatch } from 'react-redux'
import classes from './ProductItem.module.css';
import { cartActions } from '../Store/cart-slice';

const ProductItem = (props) => {
  const dispatch = useDispatch();
  const { title, price, description, id } = props;
  const additemToCart = () => {
    dispatch(cartActions.addItemTocart({
      id,
      title,
      price,
    }))
  };
  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={additemToCart}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
