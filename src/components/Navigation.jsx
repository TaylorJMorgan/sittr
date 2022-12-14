import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useEffect } from 'react';

function Navigation(props) {
  const location = useLocation();

  const isLoggedIn = props.isLoggedIn;
  const user = props.currentUser;

  useEffect(() => {}, [location, user]);

  return (
    <Navbar
      collapseOnSelect
      as='header'
      expand='lg'
      variant='light'
      bg='light'
      className='mb-auto border-bottom'
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to='/'
          className='brand-name fs-2'
        >
          Sittr
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='sitter-navbar' />
        <Navbar.Collapse id='sitter-navbar'>
          <Nav className='ms-auto fs-5'>
            <Nav.Link
              className='ms-3'
              eventKey='1'
              as={Link}
              to='/'
            >
              Home
            </Nav.Link>
            <Nav.Link
              className='ms-3'
              eventKey='2'
              as={Link}
              to='products'
            >
              Products
            </Nav.Link>

            {isLoggedIn === false && (
              <Nav.Link
                className='ms-3'
                eventKey='3'
                as={Link}
                to='login'
              >
                Login
              </Nav.Link>
            )}

            {isLoggedIn === true && (
              <Nav.Link
                className='ms-3'
                eventKey='4'
                as={Link}
                to='logout'
              >
                {user.email + ' (Sign out)'}
              </Nav.Link>
            )}

            <Nav.Link
              className='ms-3'
              eventKey='5'
              as={Link}
              to='cart'
            >
              <ShoppingCartIcon />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
