import type { NextFunction, Request, Response } from "express";
import ExperiencesService from "../services/ExperiencesService.js";
import type { Experiences } from "../../generated/prisma/index.js";

export default class ExperiencesController {
    
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const experience = await ExperiencesService.createExperience(req.body)

            return res.status(201).send({
                status: "success",
                message: "Experiência criada com sucesso.",
                experienceName: experience?.title
            })
        } catch (error) {
            next(error)
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const experiences = await ExperiencesService.getAll();

            return res.status(200).send({
                status: "success",
                message: "Experiências buscadas com sucesso.",
                data: experiences
            })
        } catch (error) {
            next(error)
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params

            const data: Experiences = req?.body

            await ExperiencesService.updateExperience(id!, data)

            return res.status(200).send({
                status: "success",
                message: "Experiência atualizada com sucesso.",
                updatedFields: data
            })
        } catch (error) {
            next(error)
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params

            const experienceToDelete = await ExperiencesService.deleteExperience(id!)

            return res.status(200).send({
                status: "success",
                message: "Experiência deletada com sucesso.",
                deletedExperience: experienceToDelete?.title
            })
        } catch (error) {
            next(error)
        }
    }
}