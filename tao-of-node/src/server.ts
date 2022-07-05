import express from 'express';
import logger from './utils/logger';

const app = express();
const port = process.env.PORT || 8080;

app.listen(port, () => {
  logger.info('server started');
});
