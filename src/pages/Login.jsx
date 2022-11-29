import SignInForm from '../components/SignInForm';

function Login(props) {
  return (
    <SignInForm
      auth={props.auth}
      title='Sign in'
      button='Sign in'
      isRegister='false'
      route='/login'
      user={props.user}
    />
  );
}

export default Login;
