 const express = require('express');
const router = express.Router();

const funcionariosController = require('../controllers/funcionariosControllers');

// Rotas para produtos
router.post('/', funcionariosController.criarFuncionarios);
router.get('/', funcionariosController.listarFuncionarios);
router.put('/:id', funcionariosController.atualizarFuncionarios);
router.delete('/:id', funcionariosController.deletarFuncionarios);

module.exports = router; 