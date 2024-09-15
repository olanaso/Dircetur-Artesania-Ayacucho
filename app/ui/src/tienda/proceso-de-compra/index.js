import './styles.css';

import { loadPartials } from "../../utils/viewpartials.js";
import { getPortadaBusqueda, busquedaProductos } from './api.js';
import { custom } from '../utils/common.js';


(async function () {
    let partials = [
        { path: '../partials/tienda/header.html', container: 'header' },
        { path: '../partials/tienda/footer.html', container: 'footer' },
    ];
    try {

        await loadPartials(partials);

        // import('../utils/common');
        console.log('Las vistas parciales se han cargado correctamente!');

        startApp();
        setTimeout(function () {
            custom()
        }, 1000)
    } catch (e) {
        console.error(e);
    }
})();


function startApp () {
    showStep(currentStep);     // crearListaInicial();
    // cargarDataPortada();
    // rellenarFormulario();
    // realizarBusqueda();
}





// pasos de la compra
var currentStep = 1;

function showStep (step) {
    $('.step').removeClass('active');
    $('#step' + step).addClass('active');
    $('.stepper-item').removeClass('active');
    $('.stepper-item').slice(0, step).addClass('active');
}

function validateStep (step) {
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
