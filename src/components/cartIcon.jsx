import React from 'react'
import shoppingbag from '../assets/shoppingbag.svg'
import { connect } from 'react-redux'
import { toggleCartHidden } from '../redux/cart/cart.actions'
import { selectCartItemsCount } from '../redux/cart/cart.selectors'
import { createStructuredSelector } from 'reselect'



const CartIcon = ({toggleCartHidden, itemCount}) => {
  return (
    <div className='cart-icon'  onClick={toggleCartHidden}>
      <img
               src={shoppingbag}
               alt="shopping-bag"
               className="shopping-icon"
             /> 
             <span className='item-count'>{itemCount}</span>
    </div>
  )
}

// this dispatches the Redux action to toggle the cart’s visibility
const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

// this gets the number of items in the cart
const mapStateToProps = createStructuredSelector ({
  itemCount: selectCartItemsCount
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartIcon);
