// const { ADMIN, BRIGADISTA, COORDINADOR } = require('../../config/roles');
// const { AccesoRoles } = require('../../middlewares/roleAccess');
// const { validateToken } = require('../../middlewares/auth');
const { uploadarchivoDDP } = require('../midleware/upload');
const controller = require('../controllers').upload;



const { Router } = require('express');
const router = Router();

router.post('/fileupload', uploadarchivoDDP, controller.uploadFileDNI);
router.post('/fileupload2', uploadarchivoDDP, controller.uploadFilevideo);
router.post('/fileupload3', uploadarchivoDDP, controller.uploadImgSlider);
router.post('/fileupload4', uploadarchivoDDP, controller.uploadImgCliente);
module.exports = router;
// asdasd