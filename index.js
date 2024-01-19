
import realTimeServer from './realTimeServer.js';
import app from './src/app.js';
import { PORT } from './config.js';

const httpServer = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

realTimeServer(httpServer);

