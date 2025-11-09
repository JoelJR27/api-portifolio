import prisma from "../database.js";
import AppError from "../errors/AppError.js";

export default class UserServices {
    static async getUser(email: string) {
        const user = await prisma.user.findUnique({ where: { email } })

        if (!user) {
            throw new AppError("Usuário não encontrado.", 404)
        }

        return user
    }
}