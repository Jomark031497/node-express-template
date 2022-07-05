import { Router } from 'express';
import validate from './middlewares/validate';
import { login, signUp } from './user/user.controller';
import schema from './user/user.schema';

const router = Router();

// user routes
router.get('/user/me');
router.get('/user/logout');
router.post('/user/login', validate(schema), login);
router.post('/user/signUp', validate(schema), signUp);

export default router;
