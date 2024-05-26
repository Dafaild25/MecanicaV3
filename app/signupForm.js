import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js"
import { auth } from "./firebase.js"
import { showMensajes } from "./mensajesAlertas.js"

// convierte al formulari en documento y atrapa los valores para inscribirse
const inscribirFormulario = document.querySelector('#signup-form')
// funcion con promesa para atrapar 
inscribirFormulario.addEventListener('submit', async (e) => {
    e.preventDefault()
    const email = inscribirFormulario['signup-email'].value
    const password = inscribirFormulario['signup-password'].value
    console.log(email)
    console.log(password)

    // recibe tres parametros, la HTMLFormControlsCollection, email y  contraseña
    // pero debe estar dentro de un trycatch para los errores

    try {
        const credencialesUsuario = await createUserWithEmailAndPassword(auth, email, password)
        console.log(credencialesUsuario)

        // cerrar el modal usamdo la variable de bootstrap
        const signupModal = document.querySelector('#inscribirseModal')
        const modal = bootstrap.Modal.getInstance(signupModal)
        modal.hide();
        showMensajes("Bienvenido")



    } catch (error) {

        if (error.code === 'auth/email-already-in-use') {
            showMensajes("EMAIL ya registrado", "red")
        } else if (error.code === 'auth/invalid-email') {
            showMensajes("EMAIL no valido", "red")
        } else if (error.code === 'auth/weak-password') {
            showMensajes("Contraseña debil", "red")
        } else if (error.code)
            showMensajes("Algo salio mal", "red")
    }


})