import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import type { Request, Response, NextFunction } from "express";
import type { User } from "@prisma/client";
import UserServices from "../services/UserService.js";
import AppError from "../errors/AppError.js";
import type { AuthenticatedUser } from "../types/index.js";
const SECRET_KEY = process.env.MY_SECRET!

export default class UserController {

    static async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password }: { email: string, password: string } = req.body;

            const user = await UserServices.getUser(email)

            const authenticatedUser = await UserController.validateUser({ email, password }, user);

            if (authenticatedUser instanceof Error) throw authenticatedUser

            const auth = authenticatedUser as AuthenticatedUser;

            // res.header({ "Set-Cookie": `token=${auth.token}; HttpOnly; Path=/; SameSite=None; Secure` });
            const isProduction = process.env.NODE_ENV === "production";

            res.cookie("token", auth.token, {
                httpOnly: true,
                secure: isProduction,
                sameSite: isProduction ? "none" : "lax",
                maxAge: 2 * 60 * 60 * 1000,
                path: "/",
            });
                            
            res.status(200).send({
                status: "success",
                message: "Usuário autenticado com sucesso.",
                user: auth.username
            });
        } catch (error) {
            next(error)
        }
    }

    private static async validateUser(credentials: Partial<User>, user: User) {
        try {
            const { id, username } = user

            const isPasswordCorrect = await this.validatePassword(credentials.password!, user.password!)

            if (!isPasswordCorrect) {
                throw new AppError("E-mail ou senha incorretos.", 401)
            }

            const token = this.generateToken({ id, username })

            return { id, username, token }
        } catch (error) {
            return error
        }
    }

    private static generateToken(user: Partial<User>) {
        const { username, email } = user

        const token = jwt.sign({ username, email }, SECRET_KEY, { expiresIn: "2h" })

        return token
    }

    private static async validatePassword(plainPassword: string, hashedPassword: string) {
        return await bcrypt.compare(plainPassword, hashedPassword)
    }
}