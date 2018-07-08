import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyCdVGAuBUuVb8IjMoQLfxlcqzTv5C3f5CQ",
  authDomain: "devchat-92c57.firebaseapp.com",
  databaseURL: "https://devchat-92c57.firebaseio.com",
  projectId: "devchat-92c57",
  storageBucket: "",
  messagingSenderId: "155553477680"
})

const _fireStore = firebase.firestore()
_fireStore.settings({
  timestampsInSnapshots: true
})
const _fireAuth = firebase.auth()

const firestore = () => _fireStore
const auth = () => _fireAuth

export default {
  firebase,
  firestore,
  auth,
}
