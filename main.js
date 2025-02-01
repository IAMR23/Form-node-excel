import express, { json } from "express";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 3000;
app.use(json());
app.use(
  cors({
    origin: "*", // Permite solicitudes desde cualquier origen (útil para pruebas)
    methods: ["GET", "POST"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Ruta para guardar datos
app.post("/guardar", (req, res) => {
  console.log("CP1");
  res.json({ mensaje: "Datos guardados correctamente." });
});

app.get("/", (req, res) => {
  res.json({ message: "Ready in Nodejs" });
});

app.listen(PORT || 3000, () => {
  console.log(`Server Ready in the PORT: ${PORT}`);
});
