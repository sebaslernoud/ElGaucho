import 'dotenv/config'; // Cargar variables de entorno al inicio
import express from 'express';
import cors from 'cors'; // Si tu frontend está en un dominio diferente
import mainRouter from './routes';
import fs from 'fs';
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Habilitar CORS para permitir solicitudes desde tu frontend
app.use(express.json()); // Para parsear cuerpos de solicitud JSON

// Rutas principales
app.use('/api', mainRouter); // Todas tus rutas bajo /api


const uploadDir = 'C:/Users/54232/Desktop/appsMov/ElGaucho/assets/userPhotos';

// Solo intentamos servirla si existe, para evitar errores al iniciar si la carpeta no está creada aun
if (fs.existsSync(uploadDir)) {
    // Mapeamos la URL '/uploads' a tu carpeta local
    app.use('/uploads', express.static(uploadDir));
}

// Manejo de errores (opcional, pero recomendado)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});