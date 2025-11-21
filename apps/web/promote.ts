import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const email = process.argv[2];
    if (!email) {
        console.log('Please provide an email address: node promote.js <email>');
        process.exit(1);
    }

    try {
        const user = await prisma.user.update({
            where: { email },
            data: { role: 'SELLER' },
        });

        console.log(`✅ User ${user.email} promoted to ${user.role}`);

        // Also create a Seller profile if it doesn't exist
        // We need to check if it exists first or use upsert
        const seller = await prisma.seller.upsert({
            where: { userId: user.id },
            update: {},
            create: {
                userId: user.id,
                businessName: `${user.email.split('@')[0]}'s Store`,
                verified: true
            }
        });
        console.log(`✅ Seller profile ready for ${seller.businessName}`);

    } catch (error) {
        console.error('❌ Error:', error);
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
