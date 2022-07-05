import express from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';
import Redis from 'ioredis';
import router from './routes';

const app = express();

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

app.use('/api', router);

export default app;
