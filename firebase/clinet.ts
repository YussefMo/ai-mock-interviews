import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDEiahd5eRN9Wpqf_7-xu54aKhvmKmv00I',
  authDomain: 'prepwise-ff9dc.firebaseapp.com',
  projectId: 'prepwise-ff9dc',
  storageBucket: 'prepwise-ff9dc.firebasestorage.app',
  messagingSenderId: '508276446376',
  appId: '1:508276446376:web:9cbaa24bc1a4f8c1301e9d',
  measurementId: 'G-42Y720PC9Q'
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
