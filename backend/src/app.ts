import 'dotenv/config'; // Cargar variables de entorno al inicio
import express from 'express';
import cors from 'cors'; // Si tu frontend está en un dominio diferente
import mainRouter from './routes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Habilitar CORS para permitir solicitudes desde tu frontend
app.use(express.json()); // Para parsear cuerpos de solicitud JSON

// Rutas principales
app.use('/api', mainRouter); // Todas tus rutas bajo /api

// Manejo de errores (opcional, pero recomendado)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});