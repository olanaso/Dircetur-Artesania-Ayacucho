const fileUpload = require('express-fileupload');
const mantenimiento = require('./mantenimiento');
const equipo = require('./equipo');
const personal = require('./personal');
const indent_predios = require('./indent_predios');
const usuario = require('./usuario');
const libros = require('./libros');
const mail = require('./mail');
const accesos = require('./accesos');
const iestp = require('./iestp');
const programas = require('./programas');
const notas = require('./notas');
const artesano = require('./artesano');
const cliente = require('./cliente');
const slider = require('./slider');
const producto = require('./producto');
const categoria = require('./categoria');
const pedido = require('./pedido');
const upload = require('./upload');
const ubicaciones =require('./ubicaciones');
const reportes = require('./reportes');
const productoartesano = require('./productoartesano');
const ventapedido = require('./ventapedido');
const ubigeo = require('./ubigeo');
const pedidodetalle = require('./pedidodetalle');


module.exports = (app) => {
    app.use('/api', mantenimiento);
    app.use('/api', equipo);
    app.use('/api', personal);
    app.use('/api', indent_predios);
    app.use('/api', usuario);
    app.use('/api', libros);
    app.use('/api', mail);
    app.use('/api', accesos);
    app.use('/api', iestp);
    app.use('/api', programas);
    app.use('/api', notas);
    app.use('/api', artesano);
    app.use('/api', slider);
    app.use('/api', cliente);
    app.use('/api', producto);
    app.use('/api', categoria);
    app.use('/api', pedido);
    app.use('/api', upload);
    app.use('/api', ubicaciones);
    app.use('/api', reportes);
    app.use('/api', productoartesano);
    app.use('/api', ventapedido);
    app.use('/api', ubigeo);
    app.use('/api', pedidodetalle);

    
};