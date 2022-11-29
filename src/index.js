import React from 'react';

import { Provider } from 'react-redux';
import store from './store/index';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import LoggedIn from './pages/LoggedIn';
import LoggedOut from './pages/LoggedOut';
import LogOut from './pages/LogOut';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
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
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <div className='d-flex flex-column vh-100'>
          <Navigation auth={auth} />
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='products'
              element={<Products />}
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
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
