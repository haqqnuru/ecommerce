export const getSerializableUser = (userAuth, snapshot = null) => {
    if (!userAuth) return null;
  
    return {
      id: snapshot?.id || userAuth.uid,
      displayName: userAuth.displayName,
      email: userAuth.email,
      photoURL: userAuth.photoURL
    };
  };