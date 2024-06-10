// const { ADMIN, BRIGADISTA, COORDINADOR } = require('../../config/roles');
// const { AccesoRoles } = require('../../middlewares/roleAccess');
// const { validateToken } = require('../../middlewares/auth');
const { uploadarchivoDDP, uploadarchivoDDPimg, uploadarchivoDDPvideo } = require('../midleware/upload');
const controller = require('../controllers').upload;



const { Router } = require('express');
const router = Router();

router.post('/fileupload', uploadarchivoDDP, controller.uploadFileDNI);
router.post('/fileupload2', uploadarchivoDDP, controller.uploadFilevideo); 
//router.post('/fileuploadvideo', uploadarchivoDDPvideo, controller.uploadFileproductovideo);
//router.post('/fileuploadimg', uploadarchivoDDPimg, controller.uploadFileproductoimg);

module.exports = router;
// asdasd