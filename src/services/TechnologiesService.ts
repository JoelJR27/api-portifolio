import prisma from "../database.js";
import type { TechnologyCreateData, TechnologyPutData } from "../types/index.js";
import { handlePrismaError } from "../utils/handlePrismaError.js";


export default class TechnologiesService {
    
    static async createTechnology(data: TechnologyCreateData) {
        try {
            const { name, image } = data
            const technology = await prisma.technologies.create({
                data: {
                    name,
                    logo: {
                        create: image
                    }
                },
                include: {
                    logo: true,
                },
            });

            return technology;
        } catch (error) {
            handlePrismaError(error)
        }
    }

    static async getAll() {
        try {
            const techonologies = await prisma.technologies.findMany({
                include: {
                    logo: true,
                },
            });

            return techonologies;
        } catch (error) {
            handlePrismaError(error)
        }
    }

    static async findTechnologyById(technologyId: string) {
        try {
            const technology = await prisma.technologies.findUnique({
                where: {
                    id: technologyId
                },
                include: {
                    logo: true
                }
            })

            return technology
        } catch (error) {
            handlePrismaError(error)
        }
    }

    static async updateTechnology(technologyId: string, data: TechnologyPutData) {
        try {
            const { name, logo } = data

            const updatedTechonology = await prisma.technologies.update({
                where: {
                    id: technologyId,
                },
                data: {
                    name: name,
                    logo: {
                        update: {
                            data: logo
                        }
                    }
                }
            })

            return updatedTechonology
        } catch (error) {
            handlePrismaError(error)
        }
    }

    static async deleteTechnology(technologyId: string) {
        try {
            const deletedTechnology = await prisma.technologies.delete({
                where: { id: technologyId },
            });
            
            return deletedTechnology
        } catch (error) {
            handlePrismaError(error)
        }
    }

}