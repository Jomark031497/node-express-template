import express from 'express';
import 'dotenv/config';
import session from 'express-session';
import connectRedis from 'connect-redis';
import Redis from 'ioredis';
import logger from './utils/logger';
import routes from './routes';
import prisma from './utils/prisma';

const main = async () => {
  const app = express();
  const port = process.env.PORT || 8080;

  const RedisStore = connectRedis(session);
  const redis = new Redis(<string>process.env.REDIS_URL);

  app.use(express.json());
  app.use(
    session({
      name: 'mid',
      secret: <string>process.env.SECRET,
      saveUninitialized: false,
      resave: false,
      store: new RedisStore({
        client: redis,
      }),
      cookie: {
        maxAge: 1000 * 10,
        httpOnly: true,
        // sameSite: 'lax',
        // secure: true,
      },
    })
  );

  app.use('/api', routes);

  app.listen(port, () => {
    logger.info(`server started at http://localhost:${port}`);
  });
};

main()
  .catch((err) => {
    logger.error(err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
