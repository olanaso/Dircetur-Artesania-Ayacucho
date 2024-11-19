import { reporteGeneral } from './api'


import { loadPartials } from '../utils/viewpartials';
import { createXLS } from '../utils/exportexcel';
import { hideLoading, llenarinformacionIESTPProg, checkSession } from '../utils/init';
import { showToast } from '../utils/toast';


hideLoading();
// Uso de la función
(async function () {
    let partials = [
        { path: 'partials/shared/header.html', container: 'app-header' },
        { path: 'partials/shared/menu.html', container: 'app-side' },


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

function startApp () {
    checkSession();
    setTimeout(function () {
        llenarinformacionIESTPProg();
    }, 500);

}



/* (en caso de querer personalizar campos de reportes en general)*/
document.getElementById('reportType').addEventListener('change', function () {
    /*const reportType = this.value;
    const checkboxContainer = document.getElementById('checkboxContainer');
    checkboxContainer.innerHTML = ''; // Clear previous checkboxes

    let attributes = [];

    switch (reportType) {
        case 'productos':
            attributes = ['artesano_id', 'nombres_es', 'resumen_es', 'descripcion_es', 'cualidades_es',  'palabra_clave_es', 'numero_piezas_es', 'alto', 'ancho', 'materiales_es', 'precio', 'peso', 'tecnicas_es',  'cantidad', 'cantidad_minima', 'restar_stock', 'tipo_estado', 'fecha_disponible','lst_colores', 'lst_talla', 'lst_ofertas', 'lst_otros_costos', 'igv', 'precios_envio', 'precio_local', 'precio_nacional', 'precio_extranjero', 'tiempo_elaboracion', 'tiempo_envio', 'preventas'];
            break;
        case 'artesanos':
            attributes = ['dni', 'ruc', 'nombres', 'apellidos', 'correo', 'celular', 'telefonos', 'ubigeo', 'lugar_nacimiento', 'lengua_materna', 'lst_taller', 'lst_especialidadtecnicas', 'lst_contactos', 'lst_mediospago', 'estado'];
            break;
        case 'clientes':
            attributes = ['nombres', 'apellidos', 'correo', 'telefono', 'direccion', 'pais', 'region', 'ciudad', 'tipo_documento', 'numero_documento', 'direccion_envio', 'estado'];
            break;
        default:
            break;
    }

    if (attributes.length > 0) {
        const message = document.createElement('p');
        message.innerText = 'Seleccione los campos que desea en el reporte';
        checkboxContainer.appendChild(message);

        const checkboxDiv = document.createElement('div');
        checkboxDiv.classList.add('row', 'g-3');

        attributes.forEach(attr => {
            const colDiv = document.createElement('div');
            colDiv.classList.add('col-12', 'col-md-4');

            const formCheck = document.createElement('div');
            formCheck.classList.add('form-check');

            const input = document.createElement('input');
            input.classList.add('form-check-input');
            input.type = 'checkbox';
            input.value = attr;
            input.id = attr;

            const label = document.createElement('label');
            label.classList.add('form-check-label');
            label.htmlFor = attr;
            label.innerText = attr;

            formCheck.appendChild(input);
            formCheck.appendChild(label);
            colDiv.appendChild(formCheck);
            checkboxDiv.appendChild(colDiv);
        });

        checkboxContainer.appendChild(checkboxDiv);
    }*/
});


/*document.getElementById('btn-reporte').addEventListener('click', async function(event) {
    event.preventDefault()
    const selectedReportType = document.getElementById('reportType').value;
     const selectedAttributes = Array.from(document.querySelectorAll('#checkboxContainer input:checked')).map(input => input.value);
    if (selectedReportType && selectedAttributes.length > 0) {
        const response = await reporteGeneral(selectedReportType);
         generateTable(response ,selectedAttributes)
    } 
    if (selectedReportType) {
        const response = await reporteGeneral(selectedReportType);
        console.log("response: ", response)
         generateTable(response ,selectedAttributes)
    }
});*/




document.getElementById('btn-exportarexcel').addEventListener('click', async function (event) {
    event.preventDefault()


    const selectedReportType = document.getElementById('reportType').value;

    if (selectedReportType == 0) {
        showToast('Escoge el tipo de reporte');
        return;
    }


    /*const selectedAttributes = Array.from(document.querySelectorAll('#checkboxContainer input:checked')).map(input => input.value);

   if (selectedReportType && selectedAttributes.length > 0) {
       const response = await reporteGeneral(selectedReportType);
       createXLS(response,"reporte1.xls", "select artesano_id  as id from  ") 
   } 

   /*if (selectedReportType) {
       const response = await reporteGeneral(selectedReportType);
       console.log("response: ", response)
       //createXLS(response,"reporte2.xls", "select * from ") 
       
   } */
    switch (selectedReportType) {
        case 'productos':
            const response1 = await reporteGeneral(selectedReportType);
            createXLS(response1, "productos.xls", "select artesano_id as id, nombres_es as nombre, resumen_es as resumen, descripcion_es as descripcion, cualidades_es as cualidades,  palabra_clave_es as palabraclave, numero_piezas_es as numero_piezas, alto, ancho, materiales_es as materiales, precio, peso, tecnicas_es as tecnicas,  cantidad, cantidad_minima, restar_stock, tipo_estado, fecha_disponible, igv, precios_envio, precio_local, precio_nacional, precio_extranjero, tiempo_elaboracion, tiempo_envio, preventas from ")

            showToast('Generando reporte');
            break;
        case 'artesanos':
            const response2 = await reporteGeneral(selectedReportType);
            createXLS(response2, "artesanos.xls", "select dni, ruc, nombres, apellidos, correo, celular, telefonos, ubigeo, lugar_nacimiento, lengua_materna,  estado from ")

            showToast('Generando reporte');
            break;
        case 'clientes':
            const response3 = await reporteGeneral(selectedReportType);
            createXLS(response3, "clientes.xls", "select nombres, apellidos, correo, telefono, direccion, pais, region, ciudad, tipo_documento, numero_documento, direccion_envio, estado from ")

            showToast('Generando reporte');
            break;
        default:
            break;
    }


});

function generateTable (data, attributes) {
    const tableContainer = document.getElementById('tablaReportes');
    tableContainer.innerHTML = ''; // Clear previous table

    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    attributes.forEach(attr => {
        const th = document.createElement('th');
        th.innerText = attr;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    data.forEach(item => {
        const row = document.createElement('tr');
        attributes.forEach(attr => {
            const td = document.createElement('td');
            td.innerText = item[attr] !== null ? item[attr] : '';
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    tableContainer.appendChild(table);
}
