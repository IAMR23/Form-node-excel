const express = require("express");
const fs = require("fs");
const XLSX = require("xlsx");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

const archivoExcel = "datos.xlsx";

// Función para leer el archivo Excel
const leerExcel = () => {
  if (!fs.existsSync(archivoExcel)) return [];
  const workbook = XLSX.readFile(archivoExcel);
  const hoja = workbook.Sheets[workbook.SheetNames[0]];
  return XLSX.utils.sheet_to_json(hoja);
};

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
