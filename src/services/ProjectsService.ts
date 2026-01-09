import prisma from "../database.js";
import type { Image, Project } from "@prisma/client";
import AppError from "../errors/AppError.js";
import type { ProjectPostData, UpdateProject } from "../types/index.js";
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
                                technology: { include: { logo: true } }
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
                    technologies: {
                        include: {
                            technology: { include: { logo: true } }
                        }
                    }
                }
            })
            if (!project) throw new AppError("Projeto não encontrado.", 404)

            return project
        } catch (error) {
            handlePrismaError(error)
        }
    }

    static async updateProject(
        slug: string,
        data: UpdateProject
    ) {
        try {
            const updateData: any = {};

            if (data.projectName !== undefined) {
                updateData.projectName = data.projectName;
            }

            if (data.slug !== undefined) {
                updateData.slug = data.slug;
            }

            if (data.description !== undefined) {
                updateData.description = data.description;
            }

            if (data.projectLink !== undefined) {
                updateData.projectLink = data.projectLink;
            }

            if (data.githubLink !== undefined) {
                updateData.githubLink = data.githubLink;
            }

            if (data.image) {
                updateData.image = {
                    update: {
                        ...(data.image.name !== undefined && {
                            name: data.image.name
                        }),
                        ...(data.image.imageLink !== undefined && {
                            imageLink: data.image.imageLink
                        })
                    }
                };
            }

            if (data.technologyIds) {
                updateData.technologies = {
                    set: data.technologyIds.map((id) => ({
                        technologyId: id
                    }))
                };
            }

            await prisma.project.update({
                where: { slug },
                data: updateData
            });


        } catch (error) {
            handlePrismaError(error);
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
