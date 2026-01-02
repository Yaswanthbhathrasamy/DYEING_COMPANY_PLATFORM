const mongoose = require('mongoose');
const Service = require('./models/Service');
require('dotenv').config();

const services = [
    {
        name: 'Cotton Reactive Dyeing',
        description: 'High-quality reactive dyeing for cotton fabrics with excellent color fastness and vibrant shades.',
        category: 'Cotton Dyeing',
        indicativePrice: 85,
        materialType: 'Fabric',
        unit: 'kg',
        imageUrl: 'https://placehold.co/600x400?text=Cotton+Reactive+Dyeing',
        isActive: true
    },
    {
        name: 'Polyester HTHP Dyeing',
        description: 'High Temperature High Pressure dyeing for polyester fabrics ensuring deep penetration and durability.',
        category: 'Polyester Dyeing',
        indicativePrice: 95,
        materialType: 'Fabric',
        unit: 'kg',
        imageUrl: 'https://placehold.co/600x400?text=Polyester+HTHP+Dyeing',
        isActive: true
    },
    {
        name: 'Polyester Dyeing',
        description: 'Standard polyester dyeing process for synthetic fabrics with consistent color quality.',
        category: 'Polyester Dyeing',
        indicativePrice: 80,
        materialType: 'Fabric',
        unit: 'kg',
        imageUrl: 'https://placehold.co/600x400?text=Polyester+Dyeing',
        isActive: true
    },
    {
        name: 'Yarn Dyeing - Cotton',
        description: 'Premium yarn dyeing service for cotton yarns with uniform color distribution.',
        category: 'Yarn Dyeing',
        indicativePrice: 90,
        materialType: 'Yarn',
        unit: 'kg',
        imageUrl: 'https://placehold.co/600x400?text=Cotton+Yarn+Dyeing',
        isActive: true
    },
    {
        name: 'Yarn Dyeing - Polyester',
        description: 'Specialized yarn dyeing for polyester yarns with excellent color retention.',
        category: 'Yarn Dyeing',
        indicativePrice: 88,
        materialType: 'Yarn',
        unit: 'kg',
        imageUrl: 'https://placehold.co/600x400?text=Polyester+Yarn+Dyeing',
        isActive: true
    },
    {
        name: 'Silk Dyeing',
        description: 'Delicate dyeing process for silk fabrics maintaining the natural luster and softness.',
        category: 'Specialty Dyeing',
        indicativePrice: 120,
        materialType: 'Fabric',
        unit: 'kg',
        imageUrl: 'https://placehold.co/600x400?text=Silk+Dyeing',
        isActive: true
    },
    {
        name: 'Denim Dyeing',
        description: 'Industrial denim dyeing with indigo and sulfur dyes for authentic denim finish.',
        category: 'Specialty Dyeing',
        indicativePrice: 75,
        materialType: 'Fabric',
        unit: 'kg',
        imageUrl: 'https://placehold.co/600x400?text=Denim+Dyeing',
        isActive: true
    },
    {
        name: 'Wool Dyeing',
        description: 'Gentle dyeing process for wool fabrics preserving the natural properties.',
        category: 'Specialty Dyeing',
        indicativePrice: 110,
        materialType: 'Fabric',
        unit: 'kg',
        imageUrl: 'https://placehold.co/600x400?text=Wool+Dyeing',
        isActive: true
    },
    {
        name: 'Blended Fabric Dyeing',
        description: 'Specialized dyeing for cotton-polyester and other blended fabrics.',
        category: 'Blended Dyeing',
        indicativePrice: 85,
        materialType: 'Both',
        unit: 'kg',
        imageUrl: 'https://placehold.co/600x400?text=Blended+Fabric+Dyeing',
        isActive: true
    },
    {
        name: 'Discharge Printing',
        description: 'Advanced discharge printing technique for vibrant prints on dark fabrics.',
        category: 'Printing',
        indicativePrice: 100,
        materialType: 'Fabric',
        unit: 'meter',
        imageUrl: 'https://placehold.co/600x400?text=Discharge+Printing',
        isActive: true
    }
];

const seedServices = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Check if services already exist
        const existingServices = await Service.countDocuments();
        if (existingServices > 0) {
            console.log(`Database already has ${existingServices} services.`);
            console.log('Skipping seed. Delete existing services first if you want to re-seed.');
            process.exit();
        }

        // Insert services
        const result = await Service.insertMany(services);
        console.log(`✅ Successfully seeded ${result.length} services to the database!`);

        console.log('\nSeeded Services:');
        result.forEach((service, index) => {
            console.log(`${index + 1}. ${service.name} (${service.category}) - ₹${service.indicativePrice}/${service.unit}`);
        });

        process.exit();
    } catch (err) {
        console.error('Error seeding services:', err);
        process.exit(1);
    }
};

seedServices();
