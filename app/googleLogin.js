import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js"
import { auth } from './firebase.js'
import { showMensajes } from './mensajesAlertas.js'

const btnGoogle = document.querySelector('#googleLogin')
btnGoogle.addEventListener('click', async () => {
    const provider = new GoogleAuthProvider()


    try {
        const credenciales = await signInWithPopup(auth, provider)
        console.log(credenciales)
        const modal = bootstrap.Modal.getInstance(document.querySelector('#inscribirseModal'))
        modal.hide()
        showMensajes('Bienvenido' + credentials.user.displayname)




    } catch (error) {
        console.log(error)
        console.log('esta mal aqui')
        console.log(error.code)
    }
})