import ShopActionTypes from './shop.types';
import {
  db,
  convertCollectionsSnapshotToMap
} from '../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';


export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
});

// export const fetchCollectionsStartAsync = () => {
//   return dispatch => {
//     dispatch(fetchCollectionsStart()); // ← ADD THIS LINE

//     const collectionRef = collection(db, 'collections');

//     getDocs(collectionRef)
//       .then((snapshot) => {
//         const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
//         dispatch(fetchCollectionsSuccess(collectionsMap));
//       })
//       .catch(error => dispatch(fetchCollectionsFailure(error.message)));
//   };
// };

