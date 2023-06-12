import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification,
    updateProfile,
    updateEmail,
    initializeAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence } from "firebase/auth/react-native";


// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
    apiKey: "AIzaSyDNY0ErzWPU0BJio2H_fYgs-e4yOVV548c",
    authDomain: "terraapp-af2b4.firebaseapp.com",
    projectId: "terraapp-af2b4",
    storageBucket: "terraapp-af2b4.appspot.com",
    messagingSenderId: "109432924487",
    appId: "1:109432924487:web:ad4ac678a1fcd3ba044462",
    measurementId: "G-FHDSYTLG9X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
export { auth, db };


const AuthService = {

    register: async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await AsyncStorage.setItem('user', JSON.stringify(user)); // save user info in AsyncStorage
            return user;
        } catch (error) {
            throw error;
        }
    },

    signIn: async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await AsyncStorage.setItem('user', JSON.stringify(user)); // save user info in AsyncStorage
            return user;
        } catch (error) {
            throw error;
        }
    },

    updateUser: async (displayName, photoURL) => {
        updateProfile(auth.currentUser, {
            displayName: displayName, photoURL: photoURL
        }).then(() => {
            return true
        }).catch((error) => {
            console.log(error.message);
            return error
        });
    },

    emailUpdate: async (email) => {
        updateEmail(auth.currentUser, email).then(() => {
            return true
        }).catch((error) => {
            console.log(error.message)
            return error.message
        });
    },

    verification: async () => {
        try {
            return await sendEmailVerification(auth.currentUser)
        } catch (e) {
            console.log(e.message)
            return e.message
        }
    },

    signOut: async () => {
        try {
            return await signOut(auth);
        } catch (error) {
            console.log(e.message)
            return e.message
        }
    },

};

export default AuthService;
