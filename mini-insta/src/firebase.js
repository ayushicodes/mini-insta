// For Firebase JS SDK v7.20.0 and later, measurementId is optional


import firebase from 'firebase/compat'
import 'firebase/firestore'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBWMqcKzwhk_YxtphxCzHek2UnXTqS30p4",
    authDomain: "mini-instagram-bac15.firebaseapp.com",
    databaseURL: "https://mini-instagram-bac15-default-rtdb.firebaseio.com",
    projectId: "mini-instagram-bac15",
    storageBucket: "mini-instagram-bac15.appspot.com",
    messagingSenderId: "92925086200",
    appId: "1:92925086200:web:43fd1e4c412f6e6d37ee0d",
    measurementId: "G-V5H6ZXFM3W"

})

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { db, auth, storage }