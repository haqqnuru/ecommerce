import React from 'react';
import { useParams } from 'react-router-dom';
import CollectionPage from '../pages/collectionPage';
 // Your connected component

const CollectionPageWrapper = () => {
  const { collectionId } = useParams();
  return <CollectionPage collectionId={collectionId} />;
};

export default CollectionPageWrapper;