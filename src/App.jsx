import React, { Component } from 'react'
import './App.css'
import HomePage from './pages/homepage'
import './sass/homepage.styles.scss'
import './sass/menu-item.styles.scss'
import './sass/directory.styles.scss'
import { Route, Routes, Navigate } from 'react-router-dom'
import ShopPage from './pages/shopPage'
import Header from './components/header'
import { onSnapshot } from 'firebase/firestore';
import { auth, createUserProfileDocument } from './firebase/firebase'
import SignInSignOutPage from './pages/signInSignOutPage'
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { getSerializableUser } from './util/utils'
import CartIcon from './components/cartIcon'
import { createStructuredSelector } from 'reselect'
import { selectCurrentUser } from './redux/user/user.selectors'
import CheckOutPage from './pages/checkOutPage'




export class App extends Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    // this allows a user to stay logged in
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        onSnapshot(userRef, (snapShot) => {
          const serializableUser = getSerializableUser(userAuth, snapShot);
          setCurrentUser(serializableUser);
        });
      } else {
        setCurrentUser(null);
      }
    });
  }


  //close the subscription
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path="/shop/*" element={<ShopPage />} />
          <Route path='/checkout' element={<CheckOutPage />} />
          <Route
            path='/signin'
            element={
              this.props.currentUser ? (
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
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);