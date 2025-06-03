const conexao = require("../db/conexao")

exports.criarFuncionarios = (req,res) => {
    const {nome,cargo,idade} = req.body;

    conexao.query(
        "INSERT INTO funcionarios (nome,cargo, idade) VALUES (?,?,?)",
        [nome,cargo,idade],
        (err) => {
            console.log(err)
            if(err) return res.status(500).send("erro ao cadastrar funcionario");
            res.status(200).send("Funcionario cadastrado com sucesso");
        
        }
    );
};

exports.listarFuncionarios = (req,res) => {
    conexao.query("SELECT * FROM funcionarios",(err,results) => {
        if(err)return res.status(500).send("erro ao buscar funcionarios ");
        res.status(200).send(results)
    })
};

exports.atualizarFuncionarios = (req,res) => {
    const{id} = req.params;
    const{nome,cargo,idade} = req.body;
    const query = "UPDATE funcionarios SET nome = ?, cargo = ?, idade =? where id = ? ";
    conexao.query(query,[nome,cargo, idade,id],(err,results) => {
        if(err) return res.status(500).send("erro ao atualizar");
        if(results.affectedrows===0)return res.send(404).send("produto nao encontrado");
            res.send("produto atualizado com sucesso");
    });
};


exports.deletarFuncionarios = (req, res) => {
    const { id } = req.params;
  
    const query = 'DELETE FROM funcionarios WHERE id = ?';
    const values = [id];
  
    conexao.query(query, values, (err, results) => {
      if (err) {
        return res.status(500).json({ mensagem: 'Erro ao deletar o Funcionario', erro: err });
      }
  
      if (results.affectedRows === 0) {
        return res.status(404).json({ mensagem: 'Funcionario não encontrado' });
      }
  
      return res.status(200).json({ mensagem: 'Funcionario deletado com sucesso' });
    });
  };
  