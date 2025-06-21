import React from 'react'
import CustomButton from './customButton'
import { connect } from 'react-redux'
import { addItem } from '../redux/cart/cart.actions'



function CollectionItems({ item, addItem }) {
  const {name, price, imageUrl} =item
  return (
    <div className='collection-item'>
        <div className='image'
        style={{backgroundImage: `url(${imageUrl})`
    }}/>
        <div className='collection-footer'>
<span className='name'>{name}</span>
<span className='price'>{price}</span>
        </div>
      <CustomButton onClick={() =>addItem(item)} inverted> Add to Cart </CustomButton>
    </div>
  )
} 

// const mapStateToProps = ({ user }) => ({
//   currentUser: user.currentUser
// });

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
});

export default connect(
 null,
  mapDispatchToProps
)(CollectionItems);