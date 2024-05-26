import { signOut } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js"
import { auth } from './firebase.js'
const logout = document.querySelector('#logout')
// const logout2 = document.querySelector('#logout2')


logout.addEventListener('click', async () => {
    await signOut(auth)
    console.log('Usuario saliendo')
})