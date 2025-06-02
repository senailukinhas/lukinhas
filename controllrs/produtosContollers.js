const conexao = require("./db/conexao")

exports.criarProduto = (req,res) => {
    const {nome,preco,quantidade} = req.body;
    conexao.query(
        "INSERT INTO produtos (nome,preco, quantidade) VALUES (?,?,?)"
        [nome,preco,quantidade],
        (err) => {
            if(err) return res.status(500).send("erro ao cadastrar produto");
            res.status(200).send("produto cadastrado com sucesso")
        
        }
    );
};

exports.listarProduto = (req,res) => {
    conexao.query("SELECT * FROM produtos",(err,results) => {
        if(err)return res.status(500).send("erro ao buscar produtos");
        res.status(200).send(results)
    })
};

exports.atualizarProduto = (req,res) => {
    const{id} = req.params;
    const{nome,preco} = req.body;
    const query = "UPDATE produtos SET nome = ?, preco = ? where = ?";
    conexao.query(query,[nome,preco,id],(err,results) => {
        if(err) return res.status(500).send("erro ao atualizar");
        if(results.affectedrows===0)return res.send(404).send("produto nao encontrado")
            res.send("produto atualizado com sucesso");
    })
}

exports.deletarProduto = (req, res) => {
    const { id } = req.params;
  
    const query = 'DELETE FROM produtos WHERE id = ?';
    const values = [id];
  
    conexao.query(query, values, (err, results) => {
      if (err) {
        return res.status(500).json({ mensagem: 'Erro ao deletar o produto', erro: err });
      }
  
      if (results.affectedRows === 0) {
        return res.status(404).json({ mensagem: 'Produto não encontrado' });
      }
  
      return res.status(200).json({ mensagem: 'Produto deletado com sucesso' });
    });
  };
  
  const express = require('express');
const router = express.Router();

const produtosController = require('../controllers/produtosControllers');

// Rotas para produtos
router.post('/', produtosController.criarProduto);
router.get('/', produtosController.listarProdutos);
router.put('/:id', produtosController.atualizarProduto);
router.delete('/:id', produtosController.deletarProduto);

module.exports = router;

const express = require('express');
const app = express();

const produtosRoutes = require('./routes/produtos');

// Middleware para interpretar JSON
app.use(express.json());

// Rotas
app.use('/produtos', produtosRoutes);

// Inicialização do servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend rodando em http://localhost:${PORT}`);
});