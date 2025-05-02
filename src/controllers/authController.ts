import { Request, Response } from 'express';

export class AuthController {
    register(req: Request, res: Response) {
        res.render('register');
    }

    login(req: Request, res: Response) {
        res.render('login');
    }
}

export const authController = new AuthController();