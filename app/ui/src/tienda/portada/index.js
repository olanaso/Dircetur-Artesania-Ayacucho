

import { loadPartials } from "../../utils/viewpartials.js";

(async function () {
    let partials = [
        { path: '../partials/tienda/header.html', container: 'header' },
        { path: '../partials/tienda/footer.html', container: 'footer' },
    ];
    try {
        debugger
        await loadPartials(partials);
        // import('../utils/common');

        console.log('Las vistas parciales se han cargado correctamente!');

        // startApp();
    } catch (e) {
        console.error(e);
    }
})();