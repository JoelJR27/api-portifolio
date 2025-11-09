// import type { Image } from "../../generated/prisma/index.js";
// import prisma from "../database.js";


// export default class ImageServices { // Terminado

//     static async createImage(image: Image) {
//         const createdImage = await prisma.image.create({
//             data: {
//                 name: image.name,
//                 imageLink: image.imageLink
//             },
//         })
//         return createdImage
//     }

//     static async updateImage(imageId: string, data: Image) {
//         await prisma.image.update({
//             where: { id: imageId }, data
//         }
//         )
//     }

//     static async getAll() {
//         const images = await prisma.image.findMany()
//         return images
//     }

//     static async getImageById(id: string) {
//         const image = await prisma.image.findUnique({ where: { id: id } })
//         return image
//     }

//     static async deleteImage(id: string) {
//         await prisma.image.delete({ where: { id: id } })
//     }
// }