 const express = require('express');
const router = express.Router();

const produtosController = require('../controllers/produtosControllers');

// Rotas para produtos
router.post('/', produtosController.criarProduto);
router.get('/', produtosController.listarProduto);
router.put('/:id', produtosController.atualizarProduto);
router.delete('/:id', produtosController.deletarProduto);

module.exports = router; 