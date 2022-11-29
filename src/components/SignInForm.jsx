import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

function SignInForm(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState();
  const auth = props.auth;
  const navigate = useNavigate();

  const registerHandler = () => {
    if (password !== passwordConfirm) {
      setError('Passwords do not match.');
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        auth.user = userCredential.user;
        navigate('/loggedin');
      })
      .catch((error) => {
        if (error.code === 'auth/internal-error') {
          setError('Something went wrong, please try again.');
        }
        if (error.code === 'auth/invalid-email') {
          setError('Invalid email.');
        }
        if (error.code === 'auth/weak-password') {
          setError('Weak password, please use at least 6 characters.');
        }
        if (error.code === 'auth/email-already-in-use') {
          setError('That email is already in use.');
        }
      });
  };

  const signInHandler = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        auth.user = userCredential.user;
        navigate('/loggedin');
      })
      .catch((error) => {
        if (error.code === 'auth/wrong-password') {
          setError('Incorrect password.');
        }
        if (error.code === 'auth/invalid-email') {
          setError('Invalid email.');
        }
      });
  };

  return (
    <Container
      as='main'
      className='m-auto bg-light py-3 rounded'
    >
      <Form
        className='text-center form-signin mx-auto'
        noValidate
      >
        <h1 className='mb-3'>{props.title}</h1>

        <p className='text-danger'>{error}</p>
        {/* <p className='text-danger'>{errorCode}</p> */}

        <FloatingLabel
          controlId='floatingInput'
          label='Email Address'
        >
          <Form.Control
            required
            type='email'
            placeholder='name@example.com'
            className='mb-3'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId='floatingPassword'
          label='Password'
        >
          <Form.Control
            required
            type='password'
            placeholder='Password'
            className='mb-3'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FloatingLabel>

        {props.isRegister === 'true' && (
          <Fragment>
            <FloatingLabel
              controlId='floatingPassword'
              label='Confirm Password'
            >
              <Form.Control
                required
                type='password'
                placeholder='Confirm Password'
                className='mb-3'
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </FloatingLabel>
            <Button
              variant='secondary'
              className='w-100 mb-3'
              size='lg'
              onClick={registerHandler}
            >
              {props.button}
            </Button>
          </Fragment>
        )}

        {props.isRegister === 'false' && (
          <Fragment>
            <Button
              variant='secondary'
              className='w-100 mb-3'
              size='lg'
              onClick={signInHandler}
            >
              {props.button}
            </Button>
            <Link
              to='/register'
              className='text-muted'
            >
              Create new account
            </Link>
          </Fragment>
        )}
      </Form>
    </Container>
  );
}

export default SignInForm;
