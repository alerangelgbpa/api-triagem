const admin = require("firebase-admin");
const path = require("path");

const serviceAccount = require(path.resolve(__dirname, "firebase-key.json"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

(async () => {
  try {
    // Tenta listar coleções existentes
    const snapshot = await db.collection("triagemOftalmologia").limit(1).get();
    console.log("Conectado ao Firestore! Número de docs:", snapshot.size);
  } catch (err) {
    console.error("Erro de autenticação:", err);
  }
})();
