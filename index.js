const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const admin = require("firebase-admin");

// Carrega credenciais
const serviceAccount = require("./firebase-key.json");

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

// Inicia servidor local
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API rodando em http://localhost:${PORT}`);
});
