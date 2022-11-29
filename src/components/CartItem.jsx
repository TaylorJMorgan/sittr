import { useDispatch } from 'react-redux';

import { cartActions } from '../store/cart';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

function CartItem(props) {
  const dispatch = useDispatch();

  const { name, quantity, total, price, id, image } = props.item;

  const removeItemHandler = () => {
    dispatch(cartActions.removeItemFromCart(id));
  };

  const addItemHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id,
        name,
        price,
        image,
      })
    );
  };

  // Currency formatting regex from Stack Overflow https://stackoverflow.com/questions/55556221/how-do-you-format-a-number-to-currency-when-using-react-native-expo
  const currencyFormat = (num) => {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  return (
    <div>
      <Row
        key={id}
        className='border-top align-items-center py-3 mx-3'
      >
        <Col md={2}>
          <Image
            thumbnail
            className='cart-img'
            src={require('../images/' + image)}
            alt={image}
          />
        </Col>
        <Col md={2}>
          <h4>{name}</h4>
        </Col>
        <Col md={2}>
          <h4>{quantity}x</h4>
        </Col>
        <Col md={2}>
          <h4>{currencyFormat(total)}</h4>
          <h6>({currencyFormat(price)}/unit)</h6>
        </Col>
        <Col md={4}>
          <Button
            variant='secondary'
            className='me-3'
            onClick={removeItemHandler}
          >
            -
          </Button>
          <Button
            variant='secondary'
            onClick={addItemHandler}
          >
            +
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default CartItem;
