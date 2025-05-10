import React from 'react';
import { connect } from 'react-redux';
import { selectCollection } from '../redux/shop/shop.selectors';
import CollectionItems from '../components/collectionItems';

const CollectionPage = ({ collection }) => {
  if (!collection) return <div>Loading...</div>;

  const { title, items } = collection;
  return (
    <div className='collection-page'>
      <h2 className='title'>{title}</h2>
      <div className='items'>
        {items.map(item => (
          <CollectionItems key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);
