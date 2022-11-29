import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import CartItem from '../components/CartItem';
import { Fragment } from 'react';

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <Container className='text-center bg-light py-3 mb-3 rounded'>
      <h1 className='my-3'>Your cart</h1>
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={{
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            total: item.totalPrice,
            price: item.price,
            image: item.image,
          }}
        />
      ))}
      {cartItems.length === 0 && (
        <Fragment>
          <p>There is currently nothing in your cart.</p>
          <Link
            to='/products'
            className='text-muted'
          >
            Start shopping
          </Link>
        </Fragment>
      )}
    </Container>
  );
};

export default Cart;
