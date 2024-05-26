import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js"
import './app/signupForm.js'
import { auth } from './app/firebase.js'
import './app/logout.js'
import './app/googleLogin.js'
import { loginCheck } from './app/loginCheck.js'
import { showMensajes } from './app/mensajesAlertas.js'


//importaciones para el crud
import { saveTask, getTask, cuandoHayCambios, deleteTask, updateTask } from './app/firebase.js'

onAuthStateChanged(auth, async (user) => {
    loginCheck(user)
})


// creacion de constantes para crear documentos 
const taskForm = document.getElementById('task-form')
const taskContainer = document.getElementById('task-container')
let estadoEdicion = false;
let edicion = '';

//al momento que arranca
window.addEventListener('DOMContentLoaded', async () => {

    // const querySnapshot = await getTask()
    cuandoHayCambios((querySnapshot) => {
        let html = ''
        querySnapshot.forEach(doc => {
            const datos = doc.data()

            html += `
            <div class="card card-body mt-2">
            <h6>${datos.fecha} </h6>
            <div class="d-flex">
                <div>
                    <p> <b>Cliente:</b>${datos.nombre} ${datos.apellido} </p>
                    <p> <b>Cédula:</b>${datos.cedula}  <b>Celular:</b> ${datos.celular} </p>
                    <p> <b>Kilmetraje:</b> ${datos.kilometraje}  <b>Modelo:</b>  ${datos.modelo} </p>
                    <p> <b>Correo:</b> ${datos.correo}  <b>Placa:</b> ${datos.placa} </p>
                </div>   
                <div>
                    <p>${datos.descripcion}</p>
                </div>
            </div>
            <div>
                <button class="btn btn-danger btn-borrar" data-id ="${doc.id}">Borrar</button>
                <button class= "btn btn-success btn-editar" data-id ="${doc.id}">Editar</button>

             </div>

            </div>
            `;
        });


        // listar dentro del container de problemas 
        taskContainer.innerHTML = html
        //agrupar todos los botones con la clase btn-borrar

        const botonesEliminar = taskContainer.querySelectorAll('.btn-borrar')
        botonesEliminar.forEach(btn => {
            btn.addEventListener('click', ({ target: { dataset } }) => {
                deleteTask(dataset.id)
                showMensajes('Reporte Eliminado')
            })
        })
        //agrupar los botones con la clase btn-editar
        const botonesEditar = taskContainer.querySelectorAll('.btn-editar')
        botonesEditar.forEach(btn => {
            btn.addEventListener('click', () => {
                btn.addEventListener('click', async ({ target: { dataset } }) => {
                    const documento = await getTask(dataset.id)
                    const atributo = documento.data()
                    taskForm['nombre'].value = atributo.nombre
                    taskForm['apellido'].value = atributo.apellido
                    taskForm['cedula'].value = atributo.cedula
                    taskForm['celular'].value = atributo.celular
                    taskForm['fecha'].value = atributo.fecha
                    taskForm['correo'].value = atributo.correo
                    taskForm['modelo'].value = atributo.modelo
                    taskForm['placa'].value = atributo.placa
                    taskForm['kilometraje'].value = atributo.kilometraje
                    taskForm['descripcion'].value = atributo.descripcion

                    estadoEdicion = true
                    edicion = documento.id
                    //cambio el contenido de boton agregar
                    taskForm['btn-guardar'].innerText = 'Actualizar'

                })
            })
        })
    });

})


//atrapa datos y los envia 
taskForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const nombre = taskForm['nombre']
    const apellido = taskForm['apellido']
    const cedula = taskForm['cedula']
    const celular = taskForm['celular']
    const fecha = taskForm['fecha']
    const correo = taskForm['correo']
    const modelo = taskForm['modelo']
    const placa = taskForm['placa']
    const kilometraje = taskForm['kilometraje']
    const descripcion = taskForm['descripcion']

    if (!estadoEdicion) {
        saveTask(nombre.value, apellido.value, cedula.value, celular.value, fecha.value, correo.value, modelo.value, placa.value, kilometraje.value, descripcion.value)
        showMensajes('Ficha Creada')
    } else {
        updateTask(edicion, { nombre: nombre.value, apellido: apellido.value, cedula: cedula.value, celular: celular.value, fecha: fecha.value, correo: correo.value, modelo: modelo.value, placa: placa.value, kilometraje: kilometraje.value, descripcion: descripcion.value })
        estadoEdicion = false
        taskForm['btn-guardar'].innerText = 'Guardar'
        showMensajes('Ficha Actualizada')

    }
    taskForm.reset()


})

