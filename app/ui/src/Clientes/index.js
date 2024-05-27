import { listarClientes, filtrarClientes, borrarCliente, actualizarCliente } from './api';


async function cargarCliente() {
  try {
    const Clientes = await listarClientes();
    cargarTabla(Clientes);
  } catch (error) {
    console.error('Error:', error);
  }
}

function cargarTabla(Clientes){
  const tablaClienteBody = document.getElementById('tablaCliente').getElementsByTagName('tbody')[0];

  // Limpiar el contenido existente del tbody
  tablaClienteBody.innerHTML = '';
  Clientes.forEach(Cliente => {
    const row = tablaClienteBody.insertRow();

    const cellID = row.insertCell(0);
    const cellNombreyApellido = row.insertCell(1);
    const cellCorreo = row.insertCell(2);
    const cellEstado = row.insertCell(3);
    const cellAcciones = row.insertCell(4);

    cellID.textContent = Cliente.id;
    cellNombreyApellido.textContent = Cliente.nombres + " " + Cliente.apellidos;
    cellCorreo.textContent = Cliente.correo;
    cellEstado.textContent = Cliente.estado;

    //botones de ver y eliminar con eventos asociados
    const detalleCliente = document.createElement('button');
    detalleCliente.type = 'button';
    detalleCliente.className = 'btn btn-light btn-sm';
    detalleCliente.innerHTML = '<a href="/detalle-cliente.html"><i class="icon icon-eye2"></i></a>';
    detalleCliente.addEventListener('click', () => window.location.href = `/detalle-cliente.html?id=${Cliente.id}`);
    
    const eliminarBtn = document.createElement('button');
    eliminarBtn.type = 'button';
    eliminarBtn.className = 'btn btn-primary btn-sm ml-2';
    eliminarBtn.innerHTML = '<i class="icon icon-bin"></i>';
    eliminarBtn.addEventListener('click', () => eliminarCliente(Cliente.id));
    cellAcciones.appendChild(detalleCliente);
    cellAcciones.appendChild(eliminarBtn);
  });
}
async function eliminarCliente(id) {
  var respuesta = confirm("¿Estás seguro de que deseas eliminar?");
  if (respuesta) {
    try {
      const result = await borrarCliente(id);
      if (result) {

          console.log("Cliente eliminado exitosamente");
          // Recargar la tabla de Clientes
          await cargarCliente();
      } else {
          console.error("Error al eliminar la Cliente");
      }
    } catch (error) {
        console.error('Error:', error);
    }
  } else {
    console.log("El usuario canceló la acción.");
  }

}


async function filtrarClientesAction() {
  const btnFiltrar = document.getElementById('filtrar-Cliente');

  btnFiltrar.addEventListener('click', async (event) => {
    event.preventDefault();
    const nombre = document.getElementById('nombre-Cliente').value;
    const correo = document.getElementById('correo-Cliente').value;
    const filtro = {
      nombres:nombre,
      correo:correo
    };
    const Clientes = await filtrarClientes(filtro);
    cargarTabla(Clientes);
  });
}
document.addEventListener('DOMContentLoaded', () => {
  cargarCliente();
  filtrarClientesAction();
});