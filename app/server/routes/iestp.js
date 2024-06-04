const controller = require('../controllers').iestps;
const {Router} = require('express');
const router = Router();

router.get('/iestp',  controller.obtener);



module.exports=router;