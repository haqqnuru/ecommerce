import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch } from 'firebase/firestore';


// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCwVh_0iyokXubd0H16h3spc69koMW18xo",
  authDomain: "ecommerce-9574c.firebaseapp.com",
  projectId: "ecommerce-9574c",
  storageBucket: "ecommerce-9574c.firebasestorage.app",
  messagingSenderId: "360970728109",
  appId: "1:360970728109:web:0a7bc1a25458830cbb8c24",
  measurementId: "G-V1M60FDWRB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// // Initialize services
// export const auth = getAuth(app);
// export const db = getFirestore(app);

// // Set up Google provider
// const provider = new GoogleAuthProvider();
// provider.setCustomParameters({ prompt: 'select_account' });

// // Export the sign-in function
// export const signInWithGoogle = () => signInWithPopup(auth, provider);

// Create or get user document
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(db, `users/${userAuth.uid}`);
  const snapShot = await getDoc(userRef);

  if (!snapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

// This is used to add the collection database into firebase
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((obj) => {
    const newDocRef = doc(collectionRef); // auto-ID — ✅ correct usage
    batch.set(newDocRef, obj);
  });

  await batch.commit();
};

// Takes a Firestore snapshot, Extract the title and items fields,
// Create a new object like routeName etc and then return the collection arrays.
export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((docSnapshot) => {
    const { title, items } = docSnapshot.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: docSnapshot.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};


export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};


// Initialize services
export const auth = getAuth(app);
auth.useDeviceLanguage();
export const db = getFirestore(app);

// Set up Google provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Export the sign-in function
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
