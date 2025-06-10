const express = require("express")

const app = express ()

app.get('/', (req,res) => {
    res.send("servidor express funcionando")
})

const usuariosRoutes = require("./routes/usuarios")


app.use(express.json())
app.use("/usuarios",usuariosRoutes);

app.listen(3000,()=> {
    console.log("servidor backend rodando em http://localhost3000")
})