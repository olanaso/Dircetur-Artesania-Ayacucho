
module.exports = {
    uploadFileDNI
};


async function uploadFileDNI (req, res, next) {
    try {
        let filenamesaved = req.filenamesaved;
        if (!filenamesaved) throw {
            error: "No se logro subir el archivo",
            message: "Ha habido un error",
            status: 400
        }
        console.log(req.ciudadano)
        let file = req.query.folder + '/' + req.filenamesaved
        return res.status(200).send({
            filename: req.originalname, path: file, ciudadano: req.ciudadano
        });

    } catch (err) {
        return next(err);
    }
}