import {listarDatosCliente}  from './api.js'

async function cargarCategoria(){
    try{
        const datosCliente = await listarDatosCliente()
        cargarFormulario(datosCliente)
    }catch(error){
        console.error(error)
    }
}

function cargarFormulario(datosCliente){

}