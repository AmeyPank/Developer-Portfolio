import { PrismaClient, Role } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const adminEmail = "admin@example.com";
    const rawPassword = "AdminPassword123!";

    // Hash password using 10 salt rounds
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const admin = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {},
        create: {
            email: adminEmail,
            name: "Portfolio Admin",
            password: hashedPassword,
            role: Role.ADMIN,
        },
    });

    console.log("----------------------------------------");
    console.log(" Admin user seeded successfully!");
    console.log(` Email:    ${admin.email}`);
    console.log(` Password: ${rawPassword}`);
    console.log(` Role:     ${admin.role}`);
    console.log("----------------------------------------");
}

main()
    .catch((e) => {
        console.error("Error seeding admin user:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });