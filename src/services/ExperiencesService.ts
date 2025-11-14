import prisma from "../database.js";
import type { Experiences } from "@prisma/client";
import { handlePrismaError } from "../utils/handlePrismaError.js";


export default class ExperiencesService {

    static async createExperience(data: Experiences) {
        try {
            const newExperience = await prisma.experiences.create({ data })

            return newExperience
        } catch (error) {
            handlePrismaError(error)
        }
    }

    static async getAll() {
        try {
            const experiences = await prisma.experiences.findMany({
                orderBy: { startedAt: 'asc' }
            })

            return experiences
        } catch (error) {
            handlePrismaError(error)
        }
    }

    static async updateExperience(experienceId: string, data: Experiences) {
        try {
            const updatedExperience = await prisma.experiences.update({ where: { id: experienceId }, data })

            return updatedExperience
        } catch (error) {
            handlePrismaError(error)
        }
    }

    static async deleteExperience(experienceId: string) {
        try {
            const deletedExperience = await prisma.experiences.delete({ where: { id: experienceId } })

            return deletedExperience
        } catch (error) {
            handlePrismaError(error)
        }
    }
}