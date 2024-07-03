// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxmUGw9g5GPIc_lKABv8SYpuOWJ6S51Pk",
  authDomain: "businessdirectoryapp-68ed2.firebaseapp.com",
  projectId: "businessdirectoryapp-68ed2",
  storageBucket: "businessdirectoryapp-68ed2.appspot.com",
  messagingSenderId: "112837730848",
  appId: "1:112837730848:web:30c40b55c49629fd86d245",
  measurementId: "G-DSHPHVBJZP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const fireDB = getFirestore(app);
export const storage = getStorage(app)
//export const analytics = getAnalytics(app);