import '../proceso-compra/style.css';
import { showToast } from '../utils/toast';
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




// pasos de la compra
var currentStep = 1;

function showStep(step) {
    $('.step').removeClass('active');
    $('#step' + step).addClass('active');
    $('.stepper-item').removeClass('active');
    $('.stepper-item').slice(0, step).addClass('active');
}

function validateStep(step) {
    var isValid = true;

    // Validar los campos del formulario
    $('#step' + step + ' .form-control').each(function () {
        if (!this.checkValidity()) {
            isValid = false;
            $(this).addClass('is-invalid');
        } else {
            $(this).removeClass('is-invalid');
        }
    });

    // Validar el checkbox en el paso 4
    if (step === 4) {
        var checkbox = $('#step4Terminos');
        if (!checkbox.is(':checked')) {
            isValid = false;
            checkbox.addClass('is-invalid');
            showToast("Debe aceptar los términos y condiciones antes de continuar.");
        } else {
            checkbox.removeClass('is-invalid');
        }
    }

    return isValid;
}

$('.next').click(function () {
    if (validateStep(currentStep)) {
        currentStep++;
        showStep(currentStep);
    } else {
        if (currentStep !== 4) {
            showToast("Por favor, complete los campos antes de continuar.");
        }
    }
});

$('.prev').click(function () {
    currentStep--;
    showStep(currentStep);
});

// Mostrar el primer paso al cargar la página
$(document).ready(function () {
    showStep(currentStep);
});
