import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { FirebaseConfig } from "../types";

const firebaseConfig: FirebaseConfig = {
    apiKey: "AIzaSyCf2Vt_dAS4X41n_JxKzLcOHRyiv5tC-7o",
    authDomain: "weather-hub-bc593.firebaseapp.com",
    projectId: "weather-hub-bc593",
    storageBucket: "weather-hub-bc593.appspot.com",
    messagingSenderId: "528803325097",
    appId: "1:528803325097:web:b118659ab2e0610eaa35b8",
};

export const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth: Auth = getAuth();
export const db: Firestore = getFirestore();
