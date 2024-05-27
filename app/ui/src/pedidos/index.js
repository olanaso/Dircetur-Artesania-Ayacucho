import { listarPedidos, filtrarPedidos } from './api';

async function cargarPedidos() {
    try {
        const pedidos = await listarPedidos();
        cargarTabla(pedidos);
    } catch (error) {
        console.error('Error:', error);
    }
}

function cargarTabla(pedidos){
    const tablaCategoriaBody = document.getElementById('tablaCategoria').getElementsByTagName('tbody')[0];
  
    // Limpiar el contenido existente del tbody
    tablaCategoriaBody.innerHTML = '';
    pedidos.forEach(pedido => {
      const row = tablaCategoriaBody.insertRow();
  
      const cellNumPedido = row.insertCell(0);
      const cellCliente = row.insertCell(1);
      const cellArtesano = row.insertCell(2);
      const cellFechaPedido = row.insertCell(3);
      const cellMonto = row.insertCell(4);
      const cellEstado = row.insertCell(5);
      const cellAcciones = row.insertCell(6);


      cellNumPedido.textContent = pedido.num_pedido;
      cellCliente.textContent = pedido.cliente;
      cellArtesano.textContent = pedido.artesano;
      cellFechaPedido.textContent = pedido.fecha_pedido;
      cellMonto.textContent = pedido.monto;
      cellEstado.textContent = pedido.estado;
  
      //botones de editar y eliminar con eventos asociados
      const editarBtn = document.createElement('button');
      editarBtn.type = 'button';
      editarBtn.className = 'btn btn-info btn-sm';
      editarBtn.innerHTML = '<i class="icon icon-eye"></i>';
    //   editarBtn.addEventListener('click', () => editarCategoria(categoria));
      
    });
  }

document.addEventListener('DOMContentLoaded', () => {

});