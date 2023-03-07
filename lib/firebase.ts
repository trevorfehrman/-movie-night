import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCBUdGeugcvcyYQuTuXOxUCUZs8SdaYuNo',
  authDomain: 'movie-night-f79ea.firebaseapp.com',
  projectId: 'movie-night-f79ea',
  storageBucket: 'movie-night-f79ea.appspot.com',
  messagingSenderId: '1005554447371',
  appId: '1:1005554447371:web:f9cf54562958db5a5d030e',
  measurementId: 'G-X7V8D0W35L',
};

const app = initializeApp(firebaseConfig);

const googleAuthProvider = new GoogleAuthProvider();

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

async function signInWithGoogle() {
  try {
    await signInWithPopup(auth, googleAuthProvider);
  } catch (err) {
    console.log(err);
  }
}

function signOut() {
  auth.signOut();
}

export {
  app,
  googleAuthProvider,
  auth,
  db,
  storage,
  signInWithGoogle,
  signOut,
};
