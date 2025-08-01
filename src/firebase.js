import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyADI3w_bNMzrpKQMaMIfsuEWRskMTbDEsQ",
  authDomain: "natbladh.firebaseapp.com",
  projectId: "natbladh",
  storageBucket: "natbladh.firebasestorage.app",
  messagingSenderId: "948342342173",
  appId: "1:948342342173:web:26355c0f3d383c899dbcf4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;