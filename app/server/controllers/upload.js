module.exports = {
    uploadFileDNI,
    uploadFilevideo,
    uploadImgSlider,
    uploadImgCliente
};

async function uploadFileDNI (req, res, next) {
    try {
        let folder = req.query.folder;
        let filenamesaved = req.filenamesaved;
        if (!filenamesaved) throw {
            error: "No se logro subir el archivo",
            message: "Ha habido un error",
            status: 400
        }
        //console.log(req.ciudadano)
        let file = folder + '/' + req.filenamesaved
        return res.status(200).send({
            filename: req.originalname, path: file
        });

    } catch (err) {
        return next(err);
    }
}

async function uploadFilevideo (req, res, next) {
    try {
        let folder = req.query.folder;
        let filenamesaved = req.filenamesaved;
        if (!filenamesaved) throw {
            error: "No se logro subir el archivo",
            message: "Ha habido un error",
            status: 400
        }
        //console.log(req.ciudadano)
        let file = 'categorias/img/' + req.filenamesaved
        return res.status(200).send({
            nombrearchuvo: req.originalname, ruta: file
        });

    } catch (err) {
        return next(err);
    }
} 
async function uploadFilevideocat (req, res, next) {
    try {
        let folder = req.query.folder;
        let filenamesaved = req.filenamesaved;
        if (!filenamesaved) throw {
            error: "No se logro subir el archivo",
            message: "Ha habido un error",
            status: 400
        }
        //console.log(req.ciudadano)
        let file = 'categorias/img/' + req.filenamesaved
        
        return res.status(200).send({
            nombrearchuvo: req.originalname, ruta: file
        });

    } catch (err) {
        return next(err);
    }
} 

async function uploadImgSlider (req, res, next) {
    try {
        let folder = req.query.folder;
        let filenamesaved = req.filenamesaved;
        if (!filenamesaved) throw {
            error: "No se logro subir el archivo",
            message: "Ha habido un error",
            status: 400
        }
        //console.log(req.ciudadano)
        //let file = 'slider/img/' + req.filenamesaved
        let file = folder + req.filenamesaved
        return res.status(200).send({
            nombrearchuvo: req.originalname, ruta: file
        });

    } catch (err) {
        return next(err);
    }
} 

async function uploadImgCliente (req, res, next) {
    try {
        let folder = 'files-app' + req.query.folder;
        let filenamesaved = req.filenamesaved;
        if (!filenamesaved) throw {
            error: "No se logro subir el archivo",
            message: "Ha habido un error",
            status: 400
        }
        //console.log(req.ciudadano)
        //let file = 'cliente/img/' + req.filenamesaved
        let file = folder + req.filenamesaved
        return res.status(200).send({
            nombrearchuvo: req.originalname, ruta: file
        });

    } catch (err) {
        return next(err);
    }
} 