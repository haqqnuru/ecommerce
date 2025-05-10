import { connect } from 'react-redux';
import { compose } from 'redux';

import { selectIsCollectionFetching } from '../redux/shop/shop.selectors';
import WithSpinner from './withSpinner';
import CollectionPage from '../pages/collectionPage';

const mapStateToProps = (state, ownProps) => ({
    isLoading: selectIsCollectionFetching(state), // Use same as overview
    collectionId: ownProps.collectionId
});

const CollectionPageContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionPage);

export default CollectionPageContainer;
