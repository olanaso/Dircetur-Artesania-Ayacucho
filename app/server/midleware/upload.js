const multer = require('multer');
const moment = require('moment');
const path = require('path');
const fs = require('fs');

function generateFinalName (originalfilename) {
    return `${moment().unix()}-${originalfilename}`;
}

/* Middleware que permite subir un archivo a una Ruta dada */
async function uploadarchivoDDP (req, res, next) {
    try {
        // Verificar si la carpeta existe, si no, crearla
        //     
        //const folder = 'img/' + (req.query.folder || '');
        const folder = 'files-app/' + (req.query.folder || '');
        console.log(`folder: ${folder}`)
        if (!folder) {
            return res.status(400).json({
                error: "Falta el parámetro 'folder' en la solicitud.",
                message: "OCURRIÓ UN ERROR AL SUBIR EL ARCHIVO",
                status: 400
            });
        }


        const dir = path.join(__dirname, '../public', folder);


        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // Configurar el almacenamiento de Multer
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, dir);
            },
            filename: function (req, file, cb) {
                const fileuploadname = generateFinalName(file.originalname);
                req.filenamesaved = fileuploadname;
                req.originalname = file.originalname;
                cb(null, fileuploadname);
            }
        });

        // Configuración dinámica para el campo de archivo y el número máximo de archivos
        const fieldName = req.query.inputName || 'myfile';  // Nombre del campo de archivo, por defecto 'myfile'
        const maxCount = parseInt(req.query.maxCount) || 1; // Número máximo de archivos, por defecto 1

        console.log(`Esperando campo de archivo: ${fieldName} con máximo de archivos: ${maxCount}`);
        // Crear el middleware de Multer
        const upload = multer({
            storage: storage,
            limits: { fileSize: 1024 * 1024 * 150 } // Limitar el tamaño del archivo a 10MB
        }).array(fieldName, maxCount);

        // Ejecutar el middleware de Multer
        upload(req, res, function (err) {
            if (err) {
                if (err instanceof multer.MulterError) {
                    // Un error de Multer ocurrió al subir.
                    console.error("MulterError:", err);
                    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                        return res.status(400).json({
                            error: `Campo inesperado: ${err.field}`,
                            message: "OCURRIÓ UN ERROR AL SUBIR EL ARCHIVO",
                            status: 400
                        });
                    } else {
                        return res.status(400).json({
                            error: err.message,
                            message: "OCURRIÓ UN ERROR AL SUBIR EL ARCHIVO",
                            status: 400
                        });
                    }
                } else {
                    // Un error desconocido ocurrió al subir.
                    console.error("Error desconocido:", err);
                    return res.status(500).json({
                        error: err.message,
                        message: "OCURRIÓ UN ERROR AL SUBIR EL ARCHIVO",
                        status: 500
                    });
                }
            }
            // Si no hay errores, pasar al siguiente middleware
            next();
        });
    } catch (err) {
        // Manejo de errores fuera del proceso de Multer
        console.error("Error del servidor:", err);
        return res.status(500).json({
            error: err.message,
            message: "OCURRIÓ UN ERROR EN EL SERVIDOR",
            status: 500
        });
    }
}

/* Middleware que permite subir un archivo a una Ruta dada */
async function uploadarchivoDDPimg (req, res, next) {
    try {
        // Verificar si la carpeta existe, si no, crearla
        //     
        const folder = 'img/' + (req.query.folder || '');
        if (!folder) {
            return res.status(400).json({
                error: "Falta el parámetro 'folder' en la solicitud.",
                message: "OCURRIÓ UN ERROR AL SUBIR EL ARCHIVO",
                status: 400
            });
        }

        const dir = path.join(__dirname, '../public/productos/', folder);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // Configurar el almacenamiento de Multer
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, dir);
            },
            filename: function (req, file, cb) {
                const fileuploadname = generateFinalName(file.originalname);
                req.filenamesaved = fileuploadname;
                req.originalname = file.originalname;
                cb(null, fileuploadname);
            }
        });

        // Configuración dinámica para el campo de archivo y el número máximo de archivos
        const fieldName = req.query.inputName || 'myfile';  // Nombre del campo de archivo, por defecto 'myfile'
        const maxCount = parseInt(req.query.maxCount) || 1; // Número máximo de archivos, por defecto 1

        console.log(`Esperando campo de archivo: ${fieldName} con máximo de archivos: ${maxCount}`);

        // Crear el middleware de Multer
        const upload = multer({
            storage: storage,
            limits: { fileSize: 1024 * 1024 * 150 } // Limitar el tamaño del archivo a 10MB
        }).array(fieldName, maxCount);

        // Ejecutar el middleware de Multer
        upload(req, res, function (err) {
            if (err) {
                if (err instanceof multer.MulterError) {
                    // Un error de Multer ocurrió al subir.
                    console.error("MulterError:", err);
                    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                        return res.status(400).json({
                            error: `Campo inesperado: ${err.field}`,
                            message: "OCURRIÓ UN ERROR AL SUBIR EL ARCHIVO",
                            status: 400
                        });
                    } else {
                        return res.status(400).json({
                            error: err.message,
                            message: "OCURRIÓ UN ERROR AL SUBIR EL ARCHIVO",
                            status: 400
                        });
                    }
                } else {
                    // Un error desconocido ocurrió al subir.
                    console.error("Error desconocido:", err);
                    return res.status(500).json({
                        error: err.message,
                        message: "OCURRIÓ UN ERROR AL SUBIR EL ARCHIVO",
                        status: 500
                    });
                }
            }
            // Si no hay errores, pasar al siguiente middleware
            next();
        });
    } catch (err) {
        // Manejo de errores fuera del proceso de Multer
        console.error("Error del servidor:", err);
        return res.status(500).json({
            error: err.message,
            message: "OCURRIÓ UN ERROR EN EL SERVIDOR",
            status: 500
        });
    }
}
/* Middleware que permite subir un archivo a una Ruta dada */
async function uploadarchivoDDPvideo (req, res, next) {
    try {
        // Verificar si la carpeta existe, si no, crearla
        //     
        const folder = 'video/' + (req.query.folder || '');
        if (!folder) {
            return res.status(400).json({
                error: "Falta el parámetro 'folder' en la solicitud.",
                message: "OCURRIÓ UN ERROR AL SUBIR EL ARCHIVO",
                status: 400
            });
        }

        const dir = path.join(__dirname, '../public/productos/', folder);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // Configurar el almacenamiento de Multer
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, dir);
            },
            filename: function (req, file, cb) {
                const fileuploadname = generateFinalName(file.originalname);
                req.filenamesaved = fileuploadname;
                req.originalname = file.originalname;
                cb(null, fileuploadname);
            }
        });

        // Configuración dinámica para el campo de archivo y el número máximo de archivos
        const fieldName = req.query.inputName || 'myfile';  // Nombre del campo de archivo, por defecto 'myfile'
        const maxCount = parseInt(req.query.maxCount) || 1; // Número máximo de archivos, por defecto 1

        console.log(`Esperando campo de archivo: ${fieldName} con máximo de archivos: ${maxCount}`);

        // Crear el middleware de Multer
        const upload = multer({
            storage: storage,
            limits: { fileSize: 1024 * 1024 * 150 } // Limitar el tamaño del archivo a 10MB
        }).array(fieldName, maxCount);

        // Ejecutar el middleware de Multer
        upload(req, res, function (err) {
            if (err) {
                if (err instanceof multer.MulterError) {
                    // Un error de Multer ocurrió al subir.
                    console.error("MulterError:", err);
                    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                        return res.status(400).json({
                            error: `Campo inesperado: ${err.field}`,
                            message: "OCURRIÓ UN ERROR AL SUBIR EL ARCHIVO",
                            status: 400
                        });
                    } else {
                        return res.status(400).json({
                            error: err.message,
                            message: "OCURRIÓ UN ERROR AL SUBIR EL ARCHIVO",
                            status: 400
                        });
                    }
                } else {
                    // Un error desconocido ocurrió al subir.
                    console.error("Error desconocido:", err);
                    return res.status(500).json({
                        error: err.message,
                        message: "OCURRIÓ UN ERROR AL SUBIR EL ARCHIVO",
                        status: 500
                    });
                }
            }
            // Si no hay errores, pasar al siguiente middleware
            next();
        });
    } catch (err) {
        // Manejo de errores fuera del proceso de Multer
        console.error("Error del servidor:", err);
        return res.status(500).json({
            error: err.message,
            message: "OCURRIÓ UN ERROR EN EL SERVIDOR",
            status: 500
        });
    }
}



module.exports = {

    uploadarchivoDDP
};
