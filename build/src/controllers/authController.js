"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.AuthController = void 0;
class AuthController {
    register(req, res) {
        res.render('register');
    }
    login(req, res) {
        res.render('login');
    }
}
exports.AuthController = AuthController;
exports.authController = new AuthController();
