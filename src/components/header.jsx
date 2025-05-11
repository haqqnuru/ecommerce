import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import icon from '../assets/icon.svg'
import { connect } from 'react-redux';
import CartIcon from './cartIcon';
import CartDropDown from './cartDropDown';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../redux/user/user.selectors';
import { selectCartHidden } from '../redux/cart/cart.selectors';
import { signOutStart } from '../redux/user/user.actions';


function Header({ currentUser, hidden, signOutStart }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-warning bg-warning sticky"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'white'
      }}>
      <Link className="navbar-brand" to="/">
        <img
          src={icon}
          alt="icon"
          className="img-fluid"
          style={{ width: "50px", padding: "5px" }}
        />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <div className="navbar-nav ms-auto">
          <NavLink className="nav-item nav-link" to="/shop">
            SHOP
          </NavLink>
          <NavLink className="nav-item nav-link" to="/contact">
            CONTACT
          </NavLink>
          {currentUser ? (
            <span
              className="nav-item nav-link"
              style={{ cursor: "pointer" }}
              onClick={signOutStart}
            >
              SIGN OUT
            </span>
          ) : (
            <NavLink className="nav-item nav-link" to="/signin">
              SIGN IN
            </NavLink>
          )}

          <CartIcon />

        </div>{hidden ? null :
          <CartDropDown />}
      </div>
    </nav>
  )
}

//It automatically passes state to each selector
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);