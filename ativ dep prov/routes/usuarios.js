const express = require ("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioControllers");

router.post('/', usuarioController.criarUsuario);

module.exports = router;