import { Router } from 'express';
import validate from './middlewares/validate';
import { userController, userSchema } from './user';

const router = Router();

// user routes
router.get('/user/me');
router.get('/user/logout');
router.post('/user/login', validate(userSchema), userController.login);
router.post('/user/signUp', validate(userSchema), userController.signUp);

export default router;
