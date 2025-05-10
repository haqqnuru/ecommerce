import React, { Component } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CollectionPageContainer from '../components/collectionsContainer';
import { selectIsCollectionFetching } from '../redux/shop/shop.selectors';

import { fetchCollectionsStartAsync } from '../redux/shop/shop.actions';
import WithSpinner from '../components/withSpinner';
import CollectionsOverview from '../components/collectionsOverview'

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);


// Wrapper to extract `collectionId` from the URL and pass it to the container
const CollectionPageContainerWrapper = () => {
  const { collectionId } = useParams();
  return <CollectionPageContainer collectionId={collectionId} />;
};

class ShopPage extends Component {

  // This loads your shop collection data from Firebase into Redux 
  // when the shop page is first shown.
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;

    fetchCollectionsStartAsync();

  }

  render() {
    const { isFetchingCollections } = this.props;

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
}

const mapStateToProps = createStructuredSelector({
  isFetchingCollections: selectIsCollectionFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);