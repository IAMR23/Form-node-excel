const express = require("express");
const fs = require("fs");
const XLSX = require("xlsx");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(
  cors({
    origin: "http://127.0.0.1:5500", // Permitir solo este origen
    methods: ["GET", "POST"], // Métodos permitidos
    allowedHeaders: ["Content-Type"],
  })
);

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
  let datos = leerExcel();

  // Verifica si el correo ya existe
  if (datos.some((d) => d.email === req.body.email)) {
    return res.json({ mensaje: "Error: Ya enviaste el formulario." });
  }

  // Agrega los nuevos datos y guarda el Excel
  datos.push(req.body);
  const nuevoLibro = XLSX.utils.book_new();
  const nuevaHoja = XLSX.utils.json_to_sheet(datos);
  XLSX.utils.book_append_sheet(nuevoLibro, nuevaHoja, "Formulario");
  XLSX.writeFile(nuevoLibro, archivoExcel);

  res.json({ mensaje: "Datos guardados correctamente." });
});

app.listen(PORT || 3000, () => {
  console.log(`Server Ready in the PORT: ${PORT}`);
});
