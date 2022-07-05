import express from 'express';
import 'dotenv/config';
import logger from './utils/logger';
import routes from './routes';
import prisma from './utils/prisma';

const main = async () => {
  const app = express();
  const port = process.env.PORT || 8080;

  app.use(express.json());

  app.use('/api', routes);

  app.listen(port, () => {
    logger.info('server started');
  });
};

main()
  .catch((err) => {
    logger.error(err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
