import React, { useEffect } from 'react'
import { GlobalStyle } from './global.styles'
import HomePage from './pages/homepage'
import './sass/homepage.styles.scss'
import './sass/menu-item.styles.scss'
import './sass/directory.styles.scss'
import { Route, Routes, Navigate } from 'react-router-dom'
import ShopPage from './pages/shopPage'
import Header from './components/header'
import SignInSignOutPage from './pages/signInSignOutPage'
import { connect } from 'react-redux';
import CartIcon from './components/cartIcon'
import { createStructuredSelector } from 'reselect'
import { selectCurrentUser } from './redux/user/user.selectors'
import CheckOutPage from './pages/checkOutPage'
import { checkUserSession } from './redux/user/user.actions'
import '@stripe/stripe-js';
import '@stripe/react-stripe-js';



const App = ({ checkUserSession, currentUser }) => {

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/shop/*" element={<ShopPage />} />
        <Route path='/checkout' element={<CheckOutPage />} />
        <Route
          path='/signin'
          element={
            currentUser ? (
              <Navigate to='/' />
            ) : (
              <SignInSignOutPage />
            )
          }
        />
        <Route path='/test' element={<CartIcon />} />
      </Routes>

    </>
  )
}

// This is a function that lets us access the value in the global state.
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

// gives us access to the dispatch method which allows us send actions through reducers in the store.
const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);