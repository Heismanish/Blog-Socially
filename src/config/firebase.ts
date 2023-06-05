// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyC-l1_n0blypXO8-CG7IarXutzxF1vcPRc",
	authDomain: "socialmediaapp-e9dcf.firebaseapp.com",
	projectId: "socialmediaapp-e9dcf",
	storageBucket: "socialmediaapp-e9dcf.appspot.com",
	messagingSenderId: "941240968846",
	appId: "1:941240968846:web:976296e373a2646293cbdf",
	measurementId: "G-3EZVB2X55G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
