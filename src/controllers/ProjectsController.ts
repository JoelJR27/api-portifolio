import type { Request, Response, NextFunction } from "express";
import ProjectService from "../services/ProjectsService.js";

export default class ProjectsController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const project = await ProjectService.createProject(req.body)

            return res.status(201).json({
                status: "success",
                message: "Projeto criado com sucesso.",
                data: project,
            })
        } catch (error) {
            next(error)
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const projects = await ProjectService.getAll()

            return res.status(200).json({
                status: "success",
                message: "Projetos retornados com sucesso.",
                count: projects?.length,
                data: projects,
            });
        }
        catch (error) {
            next(error)
        }
    }

    static async getBySlug(req: Request, res: Response, next: NextFunction) {
        try {
            const { slug } = req.params;

            const project = await ProjectService.getProjectBySlug(slug!);

            return res.status(200).send({
                status: "success",
                message: "Projeto encontrado com sucesso.",
                data: project
            });
        } catch (error) {
            next(error)
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { slug } = req.params

            const data = req.body;

            await ProjectService.updateProject(slug!, data)

            res.status(200).send({
                status: "success",
                message: "Projeto atualizado com sucesso.",
                updatedFields: data
            })
        } catch (error) {
            next(error)
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { slug } = req.params;

            const project = await ProjectService.deleteProject(slug!)

            return res.status(200).send({
                status: "success",
                message: "Projeto deletado com sucesso.",
                project: project
            })
        } catch (error) {
            next(error)
        }
    }
}