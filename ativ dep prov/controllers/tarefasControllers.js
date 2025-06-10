const conexao = require("../db/conexao")

exports.criartarefas = (req,res) => {
    const {titulo,descricao} = req.body;

    conexao.query(
        "INSERT INTO tarefas (titulo,descricao) VALUES (?,?)",
        [titulo,descricao],
        (err) => {
            if(err) return res.status(500).send("erro ao cadastrar a tarefa");
            
            res.status(200).send("tarefa cadastrada com sucesso")
        
        }
    );
};

exports.listartarefas = (req, res) => {
    conexao.query("SELECT * FROM tarefas", (err, results) => {
      if (err) return res.status(500).send("Erro ao buscar tarefas");
      res.status(200).send(results);
    });
  };
  
  exports.filtrartarefas = (req, res) => {
    const { status } = req.query; 
  
    conexao.query("SELECT * FROM tarefas WHERE status = ?", [status], (err, results) => {
      if (err) return res.status(500).send("Erro ao buscar tarefas");
      res.status(200).send(results);
    });
  };

exports.atualizartarefas = (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, status } = req.body;

    let data_conclusao = null;
    if (status === 'concluida') {
        data_conclusao = new Date(); // cria data/hora atual
    }

    const query = "UPDATE tarefas SET titulo = ?, descricao = ?, status = ?, data_conclusao = ? WHERE id = ?";

    conexao.query(query, [titulo, descricao, status, data_conclusao, id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send("erro ao atualizar");
        }
        if (results.affectedRows === 0) {
            return res.status(404).send("tarefa nao encontrada");
        }
        res.send("tarefa atualizada com sucesso");
    });
};

exports.deletartarefas = (req, res) => {
    const { id } = req.params;
  
    const query = 'DELETE FROM tarefas WHERE id = ?';
    const values = [id];
  
    conexao.query(query, values, (err, results) => {
      if (err) {
        return res.status(500).json({ mensagem: 'Erro ao deletar a tarefa', erro: err });
      }
  
      if (results.affectedRows === 0) {
        return res.status(404).json({ mensagem: 'tarefa não encontrada' });
      }
  
      return res.status(200).json({ mensagem: 'tarefa deletado com sucesso' });
    });
  };