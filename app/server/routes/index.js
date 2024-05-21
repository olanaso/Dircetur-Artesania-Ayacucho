const fileUpload = require('express-fileupload');
const mantenimiento= require('./mantenimiento');
const equipo=require('./equipo');
const personal=require('./personal');
const indent_predios=require('./indent_predios');
const usuario=require('./usuario');
const libros=require('./libros');
const mail=require('./mail');
const accesos=require('./accesos');
const iestp=require('./iestp');
const programas=require('./programas');
const notas=require('./notas');

module.exports = (app) => {
    app.use('/api',mantenimiento);
    app.use('/api',equipo);
    app.use('/api',personal);
    app.use('/api',indent_predios);
    app.use('/api',usuario);
    app.use('/api',libros);
    app.use('/api',mail);
    app.use('/api',accesos);
    app.use('/api',iestp);
    app.use('/api',programas);
       app.use('/api',notas);
};