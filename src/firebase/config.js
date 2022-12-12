import { initializeApp } from "firebase/app"
import  {getAuth} from "firebase/auth"
const firebaseConfig = {
    apiKey:import.meta.env.VITE_Api_Key,
    authDomain: "j-shop-601dd.firebaseapp.com",
    projectId: "j-shop-601dd",
    storageBucket: "j-shop-601dd.appspot.com",
    messagingSenderId: "202396296768",
    appId: "1:202396296768:web:caee64f3a22fb6ad57e1a5"
};

// initialize firebase
initializeApp(firebaseConfig)

// initialize firebase auth
const auth = getAuth()

export { auth }