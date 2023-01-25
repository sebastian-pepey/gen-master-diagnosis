const express=require('express');
const router=express.Router();
const mainController=require('../controllers/main.controller');

router.get('/informes',mainController.informes);

router.get('/informacion',mainController.informacion);

router.get('/nuevo-caso',mainController.nuevo);

router.get('/editar',mainController.editar);

router.get('/registro',mainController.registro);

router.get('/ingreso',mainController.ingreso);

router.get('/',mainController.main);

router.post('/',mainController.main);

module.exports=router;