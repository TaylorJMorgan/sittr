import SignInForm from '../components/SignInForm';

function Register(props) {
  return (
    <SignInForm
      auth={props.auth}
      title='Register'
      button='Register'
      route='/register'
      isRegister='true'
    />
  );
}

export default Register;
