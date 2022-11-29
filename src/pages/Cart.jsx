import { useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container';
import CartItem from '../components/CartItem';

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cart.items);
  console.log(cartItems);

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
        <p>There is currently nothing in your cart.</p>
      )}
    </Container>
  );
};

export default Cart;
