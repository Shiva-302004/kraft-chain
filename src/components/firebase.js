import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBVSLXJSuufoOexfor68NAH1EjMNFc36Ro",
  authDomain: "kraft-chain.firebaseapp.com",
  projectId: "kraft-chain",
  storageBucket: "kraft-chain.appspot.com",
  messagingSenderId: "707075131187",
  appId: "1:707075131187:web:e69bc51aa1ca1586e32046",
  measurementId: "G-35CKW98K2F"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth()
export const db=getFirestore(app);
export default app