import { cartActions } from './cart';

export const fetchCartData = (uid) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `https://sittr-cb344-default-rtdb.firebaseio.com/users/${uid}/cart.json`
      );

      if (!response.ok) {
        throw new Error('Could not fetch cart data!');
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      console.log('Oops, there was an error replacing cart');
    }
  };
};

export const sendCartData = (cart, uid) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        `https://sittr-cb344-default-rtdb.firebaseio.com/users/${uid}/cart.json`,
        {
          method: 'PUT',
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Sending cart data failed.');
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      console.log('Oops, there was an error with sending the request');
    }
  };
};
