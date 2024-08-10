import '../carrito-compras/style.css';
import { loadPartials } from '../utils/viewpartials';
import { hideLoading } from '../utils/init';


hideLoading();
// Uso de la función
(async function () {
  let partials = [
    { path: 'partials/shared/menuNavCliente.html', container: 'main-header' },
    { path: 'partials/shared/footerCliente.html', container: 'main-footer' },

  ];
  try {
    await loadPartials(partials);
    import('../utils/common')


    // Aquí coloca el código que deseas ejecutar después de que todas las vistas parciales se hayan cargado.
    console.log('Las vistas parciales se han cargado correctamente!');
    // Por ejemplo, podrías iniciar tu aplicación aquí.

    startApp();
  } catch (e) {
    console.error(e);
  }
})();

function startApp() {
  setTimeout(function () {
    //funcion para llenar en otros caoss
  }, 500);
}



$(document).ready(function () {
  // Incrementar cantidad
  $('.btn-increase').click(function () {
    var $input = $(this).closest('.input-group').find('.product-quantity');
    var currentValue = parseInt($input.val());
    $input.val(currentValue + 1);
  });

  // Decrementar cantidad
  $('.btn-decrease').click(function () {
    var $input = $(this).closest('.input-group').find('.product-quantity');
    var currentValue = parseInt($input.val());
    if (currentValue > 0) {
      $input.val(currentValue - 1);
    }
  });
});