import { Router } from 'express';
import { login, signUp } from './user/user.controller';

const router = Router();

// user routes
router.get('/user/me');
router.get('/user/logout');
router.post('/user/login', login);
router.post('/user/signUp', signUp);

export default router;
