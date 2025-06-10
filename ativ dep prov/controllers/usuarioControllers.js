const bcrypt = require("bcryptjs");
const conexao = require("../db/conexao")

exports.criarUsuario = async (req, res) => {

const { nome, email, senha } = req.body;

if (!nome || ! email || !senha) {

return res.status(400).json({ erro: 'Nome, e-mail e senha são obrigatórios.' });

}

try {

const senhaCriptografada = await bcrypt.hash (senha, 10);

const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';

conexao.query(sql, [nome, email, senhaCriptografada], (err, resultado) => {

if (err) {

if (err.code === 'ER_DUP_ENTRY') {

return res.status(409).json({ erro: 'E-mail já cadastrado.' });

}

return res.status(500).json({ erro: 'Erro ao cadastrar usuário.' });

}

res.status (201).json({ mensagem: 'Usuário criado com sucesso!' });

});

} catch (erro) {

res.status(500).json({ erro: 'Erro ao processar a requisição.' });

}

};