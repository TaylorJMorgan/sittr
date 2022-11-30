import Products from './pages/Products';
import Cart from './pages/Cart';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import LoggedIn from './pages/LoggedIn';
import LoggedOut from './pages/LoggedOut';
import LogOut from './pages/LogOut';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendCartData, fetchCartData } from './store/cart-actions';
import { cartActions } from './store/cart';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: 'AIzaSyAeNkJ_RasiFZtvIxX-49o7OtpONwt8kws',
  authDomain: 'sittr-cb344.firebaseapp.com',
  databaseURL: 'https://sittr-cb344-default-rtdb.firebaseio.com',
  projectId: 'sittr-cb344',
  storageBucket: 'sittr-cb344.appspot.com',
  messagingSenderId: '443780208637',
  appId: '1:443780208637:web:ef5f1939e3073d9c796b94',
  measurementId: 'G-1QJPD8V1DN',
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(firebase);

const App = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const [currentUser, setCurrentUser] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCartData(currentUser.uid));
    }
  }, [isLoggedIn, dispatch, currentUser.uid]);

  useEffect(() => {
    if (isLoggedIn) {
      if (cart.changed) {
        dispatch(sendCartData(cart, currentUser.uid));
      }
    }
  }, [isLoggedIn, cart, dispatch, currentUser.uid]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setCurrentUser(user);
        setIsLoggedIn(true);
        console.log('user change occurring');
      } else {
        // User is signed out
        setIsLoggedIn(false);
        console.log('user signout occurring');
        dispatch(cartActions.resetCart());
      }
    });
  }, [dispatch]);

  return (
    <div className='d-flex flex-column vh-100'>
      <Navigation
        auth={auth}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
      />
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='products'
          element={
            <Products
              auth={auth}
              isLoggedIn={isLoggedIn}
            />
          }
        />
        <Route
          path='cart'
          element={<Cart auth={auth} />}
        />
        <Route
          path='login'
          element={<Login auth={auth} />}
        />
        <Route
          path='register'
          element={<Register auth={auth} />}
        />
        <Route
          path='loggedin'
          element={<LoggedIn auth={auth} />}
        />
        <Route
          path='logout'
          element={<LogOut auth={auth} />}
        />
        <Route
          path='loggedout'
          element={<LoggedOut />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
