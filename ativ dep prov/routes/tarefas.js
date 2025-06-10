const express = require ("express");
const router = express.Router();
const tarefasController = require("../controllers/tarefasControllers");

router.post("/", usuarioController.criarUsuario);
router.post("/", tarefasController.criartarefas);
router.get("/",tarefasController.listartarefas);
router.get("/status",tarefasController.filtrartarefas);
router.put("/:id", tarefasController.atualizartarefas);
router.delete("/:id", tarefasController.deletartarefas);

module.exports = router;