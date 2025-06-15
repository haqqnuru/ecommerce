import React, { useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CollectionPageContainer from '../components/collectionsContainer';
import { selectIsCollectionFetching } from '../redux/shop/shop.selectors';

import { fetchCollectionsStart } from '../redux/shop/shop.actions';
import WithSpinner from '../components/withSpinner';
import CollectionsOverview from '../components/collectionsOverview'

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);


// Wrapper to extract `collectionId` from the URL and pass it to the container
const CollectionPageContainerWrapper = () => {
  const { collectionId } = useParams();
  return <CollectionPageContainer collectionId={collectionId} />;
};

const ShopPage = ({ fetchCollectionsStart, isFetchingCollections }) => {

  // This loads your shop collection data from Firebase into Redux 
  // when the shop page is first shown.
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);

  return (
    <div className="shop-page">
      <Routes>
        <Route
          index
          element={<CollectionsOverviewWithSpinner isLoading={isFetchingCollections} />}
        />
        <Route
          path=":collectionId"
          element={<CollectionPageContainerWrapper />}
        />
      </Routes>
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  isFetchingCollections: selectIsCollectionFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);