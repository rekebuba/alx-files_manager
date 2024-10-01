import express from 'express';
import injectRoutes from './routes';
import { envLoader } from './utils/db';

const server = express();

const injectMiddlewares = (api) => {
  api.use(express.json({ limit: '200mb' }));
};

const startServer = (api) => {
  envLoader();
  const port = process.env.PORT || 5000;
  const env = process.env.npm_lifecycle_event || 'dev';
  api.listen(port, () => {
    console.log(`[${env}] API has started listening at port:${port}`);
  });
};

injectMiddlewares(server);
injectRoutes(server);
startServer(server);

export default server;
