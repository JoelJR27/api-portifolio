import type { Request, Response, NextFunction } from "express"
import type { TechnologyCreateData, TechnologyPutData } from "../types/index.js"
import TechnologiesService from "../services/TechnologiesService.js"

export default class TechnologiesController {
    
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data: TechnologyCreateData = req.body

            const newTechnology = await TechnologiesService.createTechnology(data)

            return res.status(201).send({
                status: "success",
                message: "Tecnologia criada com sucesso.",
                technology: newTechnology
            })
        } catch (error) {
            next(error)
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const technologies = await TechnologiesService.getAll()

            res.status(200).send({
                status: "success",
                message: "Tecnologias recuperadas com sucesso.",
                count: technologies?.length,
                data: technologies
            })
        } catch (error) {
            next(error)
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params

            const technology = await TechnologiesService.findTechnologyById(id!);

            return res.status(200).send({
                status: "success",
                message: "Tecnologia recuperada com sucesso.",
                data: technology
            })
        } catch (error) {
            next(error)
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const data: TechnologyPutData = req.body;

            await TechnologiesService.updateTechnology(id!, data);

            res.status(200).send({
                status: "success",
                message: "Tecnologia atualizada com sucesso.",
                updatedFiels: data
            })

        } catch (error) {
            next(error)
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const deletedTechnology = await TechnologiesService.deleteTechnology(id!)

            res.status(200).send({
                status: "success",
                message: "Tecnologia deletada com sucesso.",
                deleted: deletedTechnology?.name
            })
        } catch (error) {
            next(error)
        }
    }
}