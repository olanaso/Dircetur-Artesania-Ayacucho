const multer = require('multer');
const moment = require('moment');
var path = require('path');
const fs = require('fs');

const pdf = require('pdf-parse');
const { fromPath } = require("pdf2pic");
//const { fileserverpath } = require('../config/fileServer');
const fileserverpath = "D:/MTC/fileserverDDP/public/files/";


function generateFinalName (originalfilename) {
    // return `${originalfilename}_${moment().unix()}.${originalfilename.split('.').pop()} `
    return `${moment().unix()}-${originalfilename}`
}


async function uploadarchivo (req, res, next) {
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            //    cb(null, path.join(__dirname, '/../../public/uploads/'));
            cb(null, fileserverpath);
        },
        filename: function (req, file, cb) {
            let filename = generateFinalName(file.originalname);
            req.filenamesaved = filename;
            req.originalname = file.originalname;

            cb(null, filename);
        }
    })

    var upload = multer({ storage: storage }).array("myfile", 1)
    upload(req, res, function (err) {

        console.log(req.body);

        if (err) {
            return next({
                error: err,
                message: "OCURRIO UN ERROR LA SUBIR EL ARCHIVO",
                status: 401
            });
        }
        next();
    })
}

async function uploadarchivoMultiple (req, res, next) {

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            //    cb(null, path.join(__dirname, '/../../public/uploads/'));
            cb(null, fileserverpath);
        },
        filename: function (req, file, cb) {
            let filename = generateFinalName(file.originalname);
            req.filenamesaved = filename;
            req.originalname = file.originalname;
            req.denominacionFile = req.body.denominacionFile;
            cb(null, filename);
        }
    })

    var upload = multer({ storage: storage }).array("myfile", 1)
    upload(req, res, function (err) {

        console.log(req.body);
        req.denominacion = req.body.denominacion;

        if (err) {
            return next({
                error: err,
                message: "OCURRIO UN ERROR LA SUBIR EL ARCHIVO",
                status: 401
            });
        }


        next();
    })

}




/*Midleware que permite subir un archivo a una Ruta dada, es necesario que te permitea realizar */
async function uploadarchivoDDP (req, res, next) {
    /*Busco si existe la carpeta para el procesmiento del shape*/
    var dir = path.join(__dirname, '../public/' + req.query.folder) //__dirname+gdalConfig.path_file;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, dir);
        },
        filename: async function (req, file, cb) {
            //genenra el nombre en funcion al momento actual
            let fileuploadname = moment().unix() + '-' + file.originalname;
            req.filenamesaved = fileuploadname;
            req.originalname = file.originalname;
            cb(null, fileuploadname);
        }
    })

    var upload = multer({ storage: storage }).array("myfile", 1)

    await upload(req, res, async function (err) {
        if (err) {
            return next({
                error: err,
                message: "OCURRIO UN ERROR LA SUBIR EL ARCHIVO",
                status: 401
            });
        }
        next();
    });
}



async function extraerJsonDePDF (data) {
    try {
        // Utilizamos una expresión regular para extraer el texto desde 'CUI' hasta 'Huella Derecha'
        const regex = /(CUI:.+?Huella Derecha)/s;
        const resultado = data.text.match(regex);

        // Extraemos el texto coincidente si existe
        const textoExtraido = resultado ? resultado[1] : "Texto no encontrado";



        // Dividimos el texto en líneas
        const lineas = textoExtraido.split('\n');

        let jsonResult = {};
        lineas.forEach(linea => {
            // Dividimos cada línea en clave y valor
            let partes = linea.split(':');
            if (partes.length > 1) {
                let clave = partes[0].trim();
                let valor = partes.slice(1).join(':').trim(); // En caso de que haya más de un ':' en la línea
                jsonResult[clave] = valor;
            }
        });

        jsonResult.dni = jsonResult["CUI"].split(' - ')[0]
        return jsonResult;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

/*Midleware que permite subir un archivo a una Ruta dada, es necesario que te permitea realizar */
async function uploadarchivoDNI (req, res, next) {
    /*Busco si existe la carpeta para el procesmiento del shape*/
    var dir = path.join(__dirname, '../public/' + req.query.folder) //__dirname+gdalConfig.path_file;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, dir);
        },
        filename: async function (req, file, cb) {
            //genenra el nombre en funcion al momento actual

            // const jsonResult = await extraerJsonDePDF(file);
            //         console.log(jsonResult);


            console.log(req.ciudadano)
            let fileuploadname = moment().unix() + '-' + file.originalname;
            req.filenamesaved = fileuploadname;
            req.originalname = file.originalname;
            //req.ciudadano = jsonResult;
            cb(null, fileuploadname);
        }
    })

    var upload = multer({ storage: storage }).array("myfile", 1)

    await upload(req, res, async function (err) {
        if (err) {
            return next({
                error: err,
                message: "OCURRIO UN ERROR LA SUBIR EL ARCHIVO",
                status: 401
            });
        }

        // Aquí se procesa el archivo PDF para extraer el texto
        if (req.files && req.files.length > 0) {
            const fileData = fs.readFileSync(req.files[0].path);
            try {
                const data = await pdf(fileData);

                req.ciudadano = await extraerJsonDePDF(data); // Aquí se almacena el texto extraído del PDF
            } catch (error) {
                return next({
                    error: error,
                    message: "ERROR AL PROCESAR EL ARCHIVO PDF",
                    status: 500
                });
            }
        }
        next();
    });
}


module.exports = {
    uploadarchivo,
    uploadarchivoMultiple,
    uploadarchivoDDP,
    uploadarchivoDNI
}
