// server/routes/AuthRoutes.js
import express from 'express';
import { AuthController } from '../controllers/AuthController.js';

const router = express.Router();

// Rutas de autenticación
router.get('/', AuthController.welcome);
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/change-password', AuthController.changePassword);
router.post('/reset-password', AuthController.resetPassword);
router.get('/protected', AuthController.protected);

export default router;

