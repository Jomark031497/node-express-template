import { Router } from 'express';
import validate from './middlewares/validate';
import { userController, userSchema } from './user';

const router = Router();

// user routes
router.get('/user/me', userController.me);
router.get('/user/logout');
router.post('/user/login', validate(userSchema.loginSchema), userController.login);
router.post('/user/signUp', validate(userSchema.signUpSchema), userController.signUp);

export default router;
