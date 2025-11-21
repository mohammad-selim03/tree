import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Simple password hash for 'password123' (pre-generated with bcrypt)
const DEMO_PASSWORD_HASH = '$2b$10$YQk8Y3M4U1Q2M4U5Y3M4UeMiB3qDx9dQ0MV8zjXGVz7gQj4xN2ZWu'

async function main() {
    console.log('🌱 Starting seed...')

    // 1. Create a seller user first
    console.log('Creating seller user...')

    const sellerUser = await prisma.user.upsert({
        where: { email: 'seller@treeverse.com' },
        update: {},
        create: {
            email: 'seller@treeverse.com',
            passwordHash: DEMO_PASSWORD_HASH,
            role: 'SELLER',
            profile: {
                fullName: 'TreeVerse Demo Seller',
                phone: '+1 (555) 123-4567',
                avatar: '🌳',
            },
        },
    })
    console.log('✅ Seller user created:', sellerUser.email)
    console.log('   📧 Email: seller@treeverse.com')
    console.log('   🔑 Password: password123')

    // 2. Create seller profile
    console.log('Creating seller profile...')
    const seller = await prisma.seller.upsert({
        where: { userId: sellerUser.id },
        update: {},
        create: {
            userId: sellerUser.id,
            businessName: 'TreeVerse Nursery',
            verified: true,
            rating: 4.8,
            storefront: {
                description: 'Premium quality trees since 2020',
                location: 'Portland, Oregon',
            },
        },
    })
    console.log('✅ Seller profile created:', seller.businessName)

    // 3. Create species
    console.log('Creating species...')

    const japaneseMaple = await prisma.species.upsert({
        where: { scientificName: 'Acer palmatum' },
        update: {},
        create: {
            scientificName: 'Acer palmatum',
            commonName: 'Japanese Maple',
            family: 'Sapindaceae',
            hardinessZones: ['5', '6', '7', '8', '9'],
            careRequirements: {
                sunlight: 'Partial shade',
                water: 'Moderate',
                soil: 'Well-drained, acidic',
                maintenance: 'Low to moderate',
            },
            imageUrl: '🍁',
        },
    })

    const blueSpruce = await prisma.species.upsert({
        where: { scientificName: 'Picea pungens' },
        update: {},
        create: {
            scientificName: 'Picea pungens',
            commonName: 'Blue Spruce',
            family: 'Pinaceae',
            hardinessZones: ['2', '3', '4', '5', '6', '7'],
            careRequirements: {
                sunlight: 'Full sun',
                water: 'Low to moderate',
                soil: 'Well-drained',
                maintenance: 'Low',
            },
            imageUrl: '🌲',
        },
    })

    const cherryBlossom = await prisma.species.upsert({
        where: { scientificName: 'Prunus serrulata' },
        update: {},
        create: {
            scientificName: 'Prunus serrulata',
            commonName: 'Cherry Blossom',
            family: 'Rosaceae',
            hardinessZones: ['5', '6', '7', '8'],
            careRequirements: {
                sunlight: 'Full sun',
                water: 'Moderate',
                soil: 'Well-drained, slightly acidic',
                maintenance: 'Moderate',
            },
            imageUrl: '🌸',
        },
    })

    const redOak = await prisma.species.upsert({
        where: { scientificName: 'Quercus rubra' },
        update: {},
        create: {
            scientificName: 'Quercus rubra',
            commonName: 'Red Oak',
            family: 'Fagaceae',
            hardinessZones: ['3', '4', '5', '6', '7', '8'],
            careRequirements: {
                sunlight: 'Full sun',
                water: 'Moderate',
                soil: 'Well-drained, acidic to neutral',
                maintenance: 'Low',
            },
            imageUrl: '🌳',
        },
    })

    console.log('✅ Species created')

    // 4. Create listings
    console.log('Creating listings...')

    const listings = [
        {
            speciesId: japaneseMaple.id,
            title: 'Japanese Maple - Red Emperor',
            description: 'Stunning red foliage Japanese Maple. This beautiful ornamental tree features vibrant red leaves that turn brilliant crimson in fall. Perfect for adding color and elegance to any garden. Grows 15-20 feet tall.',
            basePrice: 149.99,
            inventory: 12,
            status: 'ACTIVE' as const,
            metadata: {
                category: 'Ornamental',
                size: 'Medium',
                matureHeight: '15-20 ft',
                features: ['Fall Color', 'Ornamental', 'Low Maintenance'],
            },
            publishedAt: new Date(),
        },
        {
            speciesId: blueSpruce.id,
            title: 'Blue Spruce - Premium Grade',
            description: 'Majestic Blue Spruce with striking steel-blue needles. This evergreen conifer is perfect for year-round beauty and privacy screening. Hardy and low-maintenance. Grows 30-50 feet tall.',
            basePrice: 89.99,
            inventory: 8,
            status: 'ACTIVE' as const,
            metadata: {
                category: 'Evergreen',
                size: 'Large',
                matureHeight: '30-50 ft',
                features: ['Evergreen', 'Privacy Screen', 'Cold Hardy'],
            },
            publishedAt: new Date(),
        },
        {
            speciesId: cherryBlossom.id,
            title: 'Cherry Blossom - Yoshino',
            description: 'Classic Yoshino Cherry Blossom tree with breathtaking spring blooms. Produces clouds of pale pink flowers that create a stunning display. A true showstopper for any landscape. Grows 20-30 feet tall.',
            basePrice: 179.99,
            inventory: 6,
            status: 'ACTIVE' as const,
            metadata: {
                category: 'Ornamental',
                size: 'Medium',
                matureHeight: '20-30 ft',
                features: ['Spring Blooms', 'Ornamental', 'Fast Growing'],
            },
            publishedAt: new Date(),
        },
        {
            speciesId: redOak.id,
            title: 'Red Oak - Shade Tree Giant',
            description: 'Magnificent Red Oak providing excellent shade and fall color. This native oak offers brilliant red autumn foliage and strong, durable wood. Perfect for large properties. Grows 50-75 feet tall.',
            basePrice: 199.99,
            inventory: 5,
            status: 'ACTIVE' as const,
            metadata: {
                category: 'Shade',
                size: 'Large',
                matureHeight: '50-75 ft',
                features: ['Shade Tree', 'Fall Color', 'Native Species'],
            },
            publishedAt: new Date(),
        },
    ]

    for (const listingData of listings) {
        const listing = await prisma.listing.create({
            data: {
                ...listingData,
                sellerId: seller.id,
            },
        })

        // Create an image for each listing
        await prisma.listingImage.create({
            data: {
                listingId: listing.id,
                url: listingData.metadata.category === 'Ornamental' && listingData.title.includes('Maple') ? '🍁' :
                    listingData.metadata.category === 'Evergreen' ? '🌲' :
                        listingData.metadata.category === 'Ornamental' && listingData.title.includes('Cherry') ? '🌸' : '🌳',
                altText: listingData.title,
                order: 0,
            },
        })

        console.log(`✅ Created listing: ${listing.title}`)
    }

    console.log('')
    console.log('🎉 Seed completed successfully!')
    console.log('')
    console.log('📊 Summary:')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('✅ 1 Seller user created')
    console.log('   📧 Email: seller@treeverse.com')
    console.log('   🔑 Password: password123')
    console.log('✅ 1 Seller profile created')
    console.log('✅ 4 Species created')
    console.log('✅ 4 Listings created (ACTIVE status)')
    console.log('✅ 4 Images created')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('')
    console.log('🚀 Next steps:')
    console.log('   1. Visit: http://localhost:3000/trees')
    console.log('   2. See your beautiful tree listings!')
    console.log('   3. Enjoy the premium design! 🌳✨')
    console.log('')
}

main()
    .catch((e) => {
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
        console.error('❌ Error during seed:')
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
        console.error(e)
        console.error('')
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
