import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBjWbBHB-QOMK3otgq-y01ZvbFNNBvyydg",
	authDomain: "socially-f0531.firebaseapp.com",
	projectId: "socially-f0531",
	storageBucket: "socially-f0531.appspot.com",
	messagingSenderId: "1023707884675",
	appId: "1:1023707884675:web:e7e468a694102232dcffb6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
