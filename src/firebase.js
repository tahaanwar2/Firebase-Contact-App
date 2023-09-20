
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyBmVw_1yEhqaexVeMP2t7rFvl060pNFJEo",
    authDomain: "contact-app-db343.firebaseapp.com",
    projectId: "contact-app-db343",
    storageBucket: "contact-app-db343.appspot.com",
    messagingSenderId: "326120555647",
    appId: "1:326120555647:web:5d631b1528a4595b8eeb4a"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);