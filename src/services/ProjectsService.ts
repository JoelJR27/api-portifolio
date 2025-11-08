import type { Project } from "../../generated/prisma/index.js";
import prisma from "../database.js";
import AppError from "../errors/AppError.js";
import type { ProjectPostData } from "../types/index.js";
import { handlePrismaError } from "../utils/handlePrismaError.js";

export default class ProjectService {

    static async createProject(data: ProjectPostData) {
        const { projectName, slug, description, projectLink, githubLink, image, technologyIds } = data;

        if (!image) {
            throw new AppError("Imagem do projeto é obrigatória.", 400);
        }

        if (!technologyIds || technologyIds.length === 0) {
            throw new AppError("Ao menos uma tecnologia deve ser associada ao projeto.", 400);
        }

        if (!slug) {
            throw new AppError("O slug do projeto é obrigatório.", 400);
        }

        try {
            const project = await prisma.project.create({
                data: {
                    projectName,
                    slug,
                    description,
                    projectLink,
                    githubLink,
                    image: {
                        create: image,
                    },
                    technologies: {
                        create: technologyIds.map((techId) => ({
                            technology: { connect: { id: techId } },
                        })),
                    },
                },
                include: {
                    image: true,
                    technologies: {
                        include: { technology: true },
                    },
                },
            });

            return project;
        } catch (error) {
            handlePrismaError(error)
        }
    }

    static async getAll() {
        try {
            const projects = await prisma.project.findMany(
                {
                    include: {
                        image: true,
                        technologies: {
                            include: {
                                technology: true
                            }
                        }
                    }
                }
            )
            return projects
        } catch (error) {
            handlePrismaError(error)
        }
    }

    static async getProjectBySlug(slug: string) {
        try {
            const project = await prisma.project.findUnique({
                where: {
                    slug
                },
                include: {
                    image: true,
                    technologies: true
                }
            })
            if (!project) throw new AppError("Projeto não encontrado.", 404)

            return project
        } catch (error) {
            handlePrismaError(error)
        }
    }

    static async updateProject(slug: string, data: Partial<Project>) {
        try {
            await prisma.project.update({
                where: {
                    slug
                },
                data
            })
        } catch (error) {
            handlePrismaError(error)
        }

    }

    static async deleteProject(slug: string) {
        try {
            const project = await prisma.project.delete({
                where: { slug },
            });

            return project.projectName
        } catch (error) {
            handlePrismaError(error)
        }
    }
}
