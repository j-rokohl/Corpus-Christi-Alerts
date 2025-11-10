// Import the functions you need from the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    updateDoc,
    doc,
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAvoPneCFuoRgG9mcsZ3OjdqDr-Iirb1TY",
    authDomain: "alert-notes.firebaseapp.com",
    projectId: "alert-notes",
    storageBucket: "alert-notes.firebasestorage.app",
    messagingSenderId: "224214997173",
    appId: "1:224214997173:web:a949fd40197275e271c6fc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Add a note
export async function addNoteToFirebase(note) {
    try {
        const docRef = await addDoc(collection(db, "notes"), note);
        return { id: docRef.id, ...note };
    } catch (e) {
        console.error("Error adding note: ", e);
    }
}

export async function getNotesFromFirebase() {
    const notes = [];
    try {
        const querySnapshot = await getDocs(collection(db, "notes"));
        querySnapshot.forEach((doc) => {
            notes.push({ id: doc.id, ...doc.data() });
        });
    } catch (e) {
        console.error("Error retrieving notes: ", e);
    }
    return notes;
}

export async function deleteNoteFromFirebase(id) {
    try {
        await deleteDoc(doc(db, "notes", id));
    } catch (e) {
        console.error("Error deleting note: ", e);
    }
}

export async function updateNoteInFirebase(id, updatedData) {
    console.log(updatedData, id);
    try {
        const noteRef = doc(db, "notes", id);
        console.log(noteRef);
        await updateDoc(noteRef, updatedData);
    } catch (e) {
        console.error("Error updating note: ", e);
    }
}
