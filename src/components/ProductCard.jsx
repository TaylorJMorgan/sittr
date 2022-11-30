import { useDispatch } from 'react-redux';

import { cartActions } from '../store/cart';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

const ProductCard = (props) => {
  const dispatch = useDispatch();

  const { name, price, description, id, image, isLoggedIn } = props;

  const [show, setShow] = useState(false);
  const [popoverText, setPopoverText] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const popover = (
    <Popover id='popover'>
      <Popover.Body>{popoverText}</Popover.Body>
    </Popover>
  );

  // Currency formatting regex from Stack Overflow https://stackoverflow.com/questions/55556221/how-do-you-format-a-number-to-currency-when-using-react-native-expo
  function currencyFormat(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  const addToCartHandler = () => {
    try {
      if (isLoggedIn) {
        dispatch(
          cartActions.addItemToCart({
            id,
            name,
            price,
            image,
          })
        );
        setPopoverText('Added to cart!');
      } else {
        setPopoverText('Please sign in to add items to cart.');
      }
    } catch (error) {
      setPopoverText(`Something went wrong! Error: ${error}`);
    }
  };

  return (
    <Col
      md={4}
      key={id}
    >
      <Card
        className='mb-4'
        onClick={handleShow}
      >
        <Card.Img
          className='mb-3'
          variant='top'
          src={require('../images/' + image)}
          alt={image}
        />
        <Card.Title className='fw-bold pb-2 ms-3 me-3 border-bottom'>
          {name}
        </Card.Title>
        <Card.Text className='mb-3 ms-3'>{currencyFormat(price)} CAD</Card.Text>
      </Card>

      <Modal
        show={show}
        onHide={handleClose}
        size='lg'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image
            className='mb-3'
            fluid
            rounded
            src={require('../images/' + image)} // expected format: '../images/black-leather-chair.png'
          />
          <p className='fs-5'>{description}</p>
        </Modal.Body>
        <Modal.Footer>
          <p className='me-auto fs-5'>{currencyFormat(price)} CAD</p>

          <OverlayTrigger
            trigger='click'
            placement='top'
            overlay={popover}
          >
            <Button
              className='fs-5'
              variant='secondary'
              onClick={addToCartHandler}
            >
              Add to cart
            </Button>
          </OverlayTrigger>
        </Modal.Footer>
      </Modal>
    </Col>
  );
};

export default ProductCard;
