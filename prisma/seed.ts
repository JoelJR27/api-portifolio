import { PrismaClient } from "@prisma/client"
import hashData from "../src/libs/hashData.js"

const prisma = new PrismaClient()
const hashedPassword = await hashData(process.env.ADMIN_USER_PASSWORD!)
async function main() {
    const joel = await prisma.user.upsert({
        where: { email: process.env.ADMIN_USER_EMAIL! },
        update: {},
        create: {
            email: process.env.ADMIN_USER_EMAIL!,
            username: "Joel",
            password: hashedPassword,
        },
    })
    console.log({ joel })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })