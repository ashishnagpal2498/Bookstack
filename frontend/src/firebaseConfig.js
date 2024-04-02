/* Author - Arihant Dugar */
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
 
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB5wED_fLeKsrpGVORthPDlHH_tKXq5ER0",
    authDomain: "bookstack-60870.firebaseapp.com",
    projectId: "bookstack-60870",
    storageBucket: "bookstack-60870.appspot.com",
    messagingSenderId: "480249477262",
    appId: "1:480249477262:web:ec7ab8af4850cfdbffb1df",
    measurementId: "G-CB5F0FRHEZ"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;