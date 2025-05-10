import React from 'react'
import CustomButton from './customButton'
import'../sass/menu-item.styles.scss'
import CartItem from './cartItem'
import { connect } from 'react-redux';
import { selectCartItems } from '../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect'
import { toggleCartHidden } from '../redux/cart/cart.actions';
import { useNavigate } from 'react-router-dom'

const CartDropDown = ({ cartItems, dispatch }) => {
  const navigate = useNavigate();

  return (
    <div className='cart-dropdown'>
      <div className='cart-items'>
      {cartItems.length ? (
        cartItems.map(cartItem => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <span className='empty-message'>Your cart is empty</span>
      )}
    </div>
      <CustomButton style={{ width: '100%', fontSize: '12px' }}
        onClick={() => {
          navigate('/checkout')
          dispatch(toggleCartHidden());
      }}
    >
  GO TO CHECKOUT
</CustomButton>
      </div>
  )
}

// with the selector, this makes sure that the cart dropdown is not
// getting re rendered whenever the state chsnges that is unrelated
// to the cart item.
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});

export default connect(mapStateToProps)(CartDropDown)
