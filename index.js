const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const admin = require("firebase-admin");
const path = require("path");

// Carrega credenciais da conta de serviço
const serviceAccount = require(path.resolve(__dirname, "firebase-key.json"));

// Inicializa Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Endpoint para salvar triagem
app.post("/salvar-triagem", async (req, res) => {
  try {
    const paciente = req.body;

    // Validação simples
    if (!paciente.nome || !paciente.idade) {
      return res.status(400).json({ error: "Nome e idade são obrigatórios" });
    }

    // Cria documento com ID automático
    const ref = db.collection("triagemOftalmologia").doc();
    await ref.set({
      ...paciente,
      dataRegistro: new Date()
    });

    res.status(200).json({ message: "Triagem salva com sucesso!" });
  } catch (error) {
    console.error("Erro ao salvar triagem:", error);
    res.status(500).json({ error: "Erro ao salvar triagem" });
  }
});

// Teste simples de API
app.get("/", (req, res) => {
  res.send("API de triagem está funcionando 🚀");
});

// Inicia servidor local
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API rodando em http://localhost:${PORT}`);
});
