import { call, put, takeLatest } from 'redux-saga/effects';
import { collection, getDocs } from 'firebase/firestore';

import { db, convertCollectionsSnapshotToMap } from '../../firebase/firebase';
import {
    fetchCollectionsSuccess,
    fetchCollectionsFailure
} from './shop.actions';

import ShopActionTypes from './shop.types';

export function* fetchCollections() {
    try {
        const collectionRef = collection(db, 'collections');
        const snapshot = yield call(getDocs, collectionRef);
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    }
}

export function* onFetchCollectionsStart() {
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollections);
}
