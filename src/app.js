// ./src/app.js
import express from 'express';
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars';
import router from './routes/index.js';
import connectMongo from './db/index.js';
import { PORT, db } from './config/index.config.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Configuración de motor de plantillas Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// Configuración de la conexión a la base de datos
connectMongo(db);

// Configuración de las rutas
router(app);

// Configuración del puerto y inicio del servidor
const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app;


