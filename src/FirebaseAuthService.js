import {
  browserSessionPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const loginWithGoogle = async () => {
  const auth = getAuth();

  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      const provider = new GoogleAuthProvider();
      return signInWithPopup(auth, provider);
    })
    .catch((err) => alert(err.message));
};

export const logout = async () => {
  const auth = await getAuth();
  return signOut(auth);
};
