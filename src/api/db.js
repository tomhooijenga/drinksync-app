import firebase from "firebase/app";
import "firebase/firestore";

export const db = firebase.firestore();
db.settings({
    timestampsInSnapshots: true
});