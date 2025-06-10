import { takeLatest, put, all, call } from 'redux-saga/effects';
import {
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut
} from 'firebase/auth';

import UserActionTypes from './user.types';

import {
    signInSuccess,
    signInFailure,
    signOutSuccess,
    signOutFailure,
    signUpSuccess,
    signUpFailure
} from './user.actions';

import {
    auth,
    googleProvider,
    createUserProfileDocument,
    getCurrentUser
} from '../../firebase/firebase';
import { getDoc } from 'firebase/firestore';

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapshot = yield call(getDoc, userRef); // <- Modular fix here
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signInWithGoogle() {
    try {
        const result = yield call(signInWithPopup, auth, googleProvider);
        const { user } = result;
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        console.error('Google sign-in error:', error);
        yield put(signInFailure(error));
    }
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const userCredential = yield call(
            signInWithEmailAndPassword,
            auth,
            email,
            password
        );
        const { user } = userCredential;
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        console.error('Sign-in error:', error.code, error.message);
        yield put(signInFailure(error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signOut() {
    try {
        yield call(firebaseSignOut, auth); // Using the imported function
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailure(error));
    }
}

export function* signUp({ payload: { email, password, displayName } }) {
    try {
        const { user } = yield call(
            createUserWithEmailAndPassword, // Now properly imported
            auth,
            email,
            password
        );
        yield put(signUpSuccess({ user, additionalData: { displayName } }));
    } catch (error) {
        console.error('Sign-up error:', error);
        yield put(signUpFailure(error));
    }
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
    try {
        yield call(getSnapshotFromUserAuth, user, additionalData);
    } catch (error) {
        console.error('Post-sign-up error:', error);
        yield put(signInFailure(error));
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ]);
}