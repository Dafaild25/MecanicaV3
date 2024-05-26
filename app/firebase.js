// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js"
//enlace para bdd
import { getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDmcNGxG8RaJb801784o428MVlB-vCZBC8",
    authDomain: "mecanica-crud.firebaseapp.com",
    projectId: "mecanica-crud",
    storageBucket: "mecanica-crud.appspot.com",
    messagingSenderId: "617641396224",
    appId: "1:617641396224:web:dcd726762cf9cd2b1970e5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//para autenticar una variable exportable
export const auth = getAuth(app);

//funciones para generar el crud
const db = getFirestore()
//guardar
export const saveTask = (nombre, apellido, cedula, celular, fecha, correo, modelo, placa, kilometraje, descripcion) => {
    addDoc(collection(db, 'Reportes'), { nombre, apellido, cedula, celular, fecha, correo, modelo, placa, kilometraje, descripcion })
}
//listar
export const getTasks = () => getDocs(collection(db, 'Reportes'))
//cuando los datos cambian 
export const cuandoHayCambios = (callback) => onSnapshot(collection(db, 'Reportes'), callback)
//eliminar
export const deleteTask = id => deleteDoc(doc(db, 'Reportes', id))
//traer de vuelta a un dato
export const getTask = id => getDoc(doc(db, 'Reportes', id))
// editar ese dato
export const updateTask = (id, newField) => updateDoc(doc(db, 'Reportes', id), newField);
