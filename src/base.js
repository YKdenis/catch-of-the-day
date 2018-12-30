import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBTitLB447E2TgBuEG9znAGuobthSqdZ20",
    authDomain: "catch-of-the-day-obi.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-obi.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// this is a named export
export {
    firebaseApp
}

// this is a default export
export default base;