import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDeMNY7GbFQUXgozimil266UpTuiwK1r6o",
    authDomain: "luna-4e044.firebaseapp.com",
    projectId: "luna-4e044",
    storageBucket: "luna-4e044.appspot.com",
    messagingSenderId: "447676446506",
    appId: "1:447676446506:web:e0115a54db90cb4f0c5053",
    measurementId: "G-9MRKH5KXZK"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app)
export const auth = getAuth(app)
