const dotEnvResult = require("dotenv").config();
if (dotEnvResult.error) {
  if (dotEnvResult.error.code === "ENOENT") {
    console.error("Arquivo .env não encontrado!");
  }
  process.exit(1);
}

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const userModel = require("./models/userModel");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        message:
          "Requisição inválida. Username, email e password são obrigatórios.",
      });
    }

    const existingUser = userModel.findByUsername(username);
    if (existingUser) {
      return res.status(400).json({
        message: "Este nome de usuário já está em uso.",
      });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const newUser = userModel.addUser({
      username,
      passwordHash,
    });

    const userResponse = {
      id: newUser.id,
      username: newUser.username,
    };

    return res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      user: userResponse,
    });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return res.status(500).json({
      message: "Erro interno do servidor ao processar o registro.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});
