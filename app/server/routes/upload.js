// const { ADMIN, BRIGADISTA, COORDINADOR } = require('../../config/roles');
// const { AccesoRoles } = require('../../middlewares/roleAccess');
// const { validateToken } = require('../../middlewares/auth');
const { uploadarchivoDDP, uploadarchivoDNI } = require('../midleware/upload');
const controller = require('../controllers').upload;



const { Router } = require('express');
const router = Router();

router.post('/fileupload', uploadarchivoDDP, controller.uploadFileDNI);
router.post('/fileuploadDNI', uploadarchivoDDP, controller.uploadFileDNI);

module.exports = router;
// asdasd