import { Prisma } from "../../generated/prisma/index.js";
import AppError from "../errors/AppError.js";

/**
 * Trata erros conhecidos do Prisma e lança erros da aplicação apropriados.
 * @param error O erro lançado pelo Prisma.
 * @throws {AppError} Erro da aplicação com mensagem e código de status apropriados.
 */
export function handlePrismaError(error: unknown): void {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case "P2002":
                throw new AppError("Registro duplicado, valor único já existe.", 409, error.meta);

            case "P2025":
                throw new AppError("Registro não encontrado.", 404);

            case "P2003":
                throw new AppError("Violação de integridade referencial, recurso ainda está vinculado a outro registro.", 400);

            case "P2014":
                throw new AppError("Erro de relacionamento, registro relacionado inválido.", 400);

            case "P2000":
                throw new AppError("Um dos campos excede o tamanho máximo permitido.", 400);

            default:
                throw new AppError(`Erro interno do Prisma (${error.code}).`, 500, error.meta);
        }
    }

    throw new AppError("Erro interno do servidor.", 500, error);
}