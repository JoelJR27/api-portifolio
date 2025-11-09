// // TODO: Implementar regras de negocio da lista de tecnologias dos projetos


// import prisma from "../database.js";

// export default class ProjectTechnologyService {
//     static async getAll() {
//         const projectTechnologies = await prisma.projectTechnology.findMany({
//             include: {
//                 project: true,
//                 technology: true
//             }
//         })

//         return projectTechnologies
//     }

//     static async createProjectTechnology(technologyName: string, projectName: string) {
//         const technology = await prisma.technologies.findFirst({
//             where: {
//                 name: technologyName
//             }
//         })
//         console.log(technology)

//         const project = await prisma.project.findFirst({
//             where: {
//                 projectName
//             }
//         })

//         await prisma.projectTechnology.create({
//             data: {
//                 technology: {
//                     connect: {
//                         id: technology?.id!
//                     }
//                 },
//                 project: {
//                     connect: {
//                         id: project?.id!
//                     }
//                 }
//             },
//             include: {
//                 project: true,
//                 technology: true
//             }
//         })
//     }

// }