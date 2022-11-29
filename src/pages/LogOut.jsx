import Container from 'react-bootstrap/Container';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { signOut } from 'firebase/auth';

function LogOut(props) {
  const navigate = useNavigate();

  const auth = props.auth;

  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        // Sign out successful
        navigate('/loggedout');
      })
      .catch((error) => {
        // An error occurred
      });
  };

  return (
    <Container
      as='main'
      className='m-auto bg-light py-5 rounded text-center mx-auto'
    >
      <h1 className='mb-3'>Sign out?</h1>

      <Button
        variant='secondary'
        className='mb-3'
        size='lg'
        onClick={signOutHandler}
      >
        Click here to sign out
      </Button>

      <p>
        <Link
          to='/products'
          className='text-muted'
        >
          Click here to continue shopping
        </Link>
      </p>
    </Container>
  );
}

export default LogOut;
