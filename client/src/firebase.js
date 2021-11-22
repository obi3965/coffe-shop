// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC-kxY8WKHOIgwHH_wnF2gEQuF9wHEY_OU",
  authDomain: "coffeeshop-fc136.firebaseapp.com",
  projectId: "coffeeshop-fc136",
  storageBucket: "coffeeshop-fc136.appspot.com",
  messagingSenderId: "925251546918",
  appId: "1:925251546918:web:4e4e7154b3a3047de01be7"
};


const firebaseApp = () => {
 initializeApp(firebaseConfig); 
} 

export default firebaseApp

