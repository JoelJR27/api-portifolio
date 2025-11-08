import { Prisma } from "../../generated/prisma/index.js";
import AppError from "../errors/AppError.js";
import type { NextFunction, Request, Response } from "express";

export default function errorHandler(err: any, req: Request, res: Response, _next: NextFunction) {
    console.error("Erro capturado:", err);

    if (err instanceof AppError) {
        return res.status(err.statusCode).send({
            status: "error",
            message: err.message,
            details: err.details ?? null,
        });
    }


    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
            case "P2002":
                return res.status(409).json({
                    status: "error",
                    message: "Registro duplicado — valor único já existe.",
                    target: err.meta?.target,
                });

            case "P2025":
                return res.status(404).json({
                    status: "error",
                    message: "Registro não encontrado.",
                });

            case "P2003":
                return res.status(400).json({
                    status: "error",
                    message: "Violação de integridade referencial (chave estrangeira).",
                });

            default:
                return res.status(500).json({
                    status: "error",
                    message: `Erro Prisma (${err.code})`,
                });
        }
    }

    if (err instanceof SyntaxError && "body" in err) {
        return res.status(400).json({
            status: "error",
            message: "Corpo da requisição inválido (JSON mal formatado).",
        });
    }

    return res.status(500).json({
        status: "error",
        message: "Erro interno do servidor.",
    });
}