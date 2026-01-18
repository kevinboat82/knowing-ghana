import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Create admin user
    const hashedPassword = await bcrypt.hash('ghana2025', 10);
    await prisma.admin.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
            username: 'admin',
            password: hashedPassword
        }
    });
    console.log('✅ Admin user created (username: admin, password: ghana2025)');

    // Seed History
    const historyData = [
        {
            year: "1482",
            title: "Arrival of the Portuguese",
            desc: "Don Diogo d'Azambuja builds Elmina Castle, marking the beginning of significant European interaction and the tragic era of the trans-Atlantic slave trade.",
            image: "https://images.unsplash.com/photo-1576487122176-79c29c8eb004?auto=format&fit=crop&q=80&w=800"
        },
        {
            year: "1900",
            title: "War of the Golden Stool",
            desc: "Yaa Asantewaa, Queen Mother of Ejisu, leads the Asante rebellion against British colonialism to protect the Golden Stool.",
            image: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?auto=format&fit=crop&q=80&w=800"
        },
        {
            year: "1957",
            title: "Independence",
            desc: "On March 6th, Kwame Nkrumah declares: 'Ghana, your beloved country, is free forever,' becoming the first sub-Saharan nation to gain independence.",
            image: "https://images.unsplash.com/photo-1624823157639-50980838971f?auto=format&fit=crop&q=80&w=800"
        },
        {
            year: "1992",
            title: "The Fourth Republic",
            desc: "A new constitution is adopted, ushering in the longest period of stable democratic rule under Jerry John Rawlings.",
            image: "https://images.unsplash.com/photo-1589827613589-29c8e1d67046?auto=format&fit=crop&q=80&w=800"
        },
        {
            year: "2025",
            title: "The Reset Era",
            desc: "John Dramani Mahama returns to the presidency with the 'Resetting Ghana' agenda, focusing on the 24-Hour Economy and agricultural revitalization.",
            image: "https://images.unsplash.com/photo-1617529497471-9218633199c0?auto=format&fit=crop&q=80&w=800"
        }
    ];

    for (const item of historyData) {
        await prisma.history.create({ data: item });
    }
    console.log('✅ History events seeded');

    // Seed Manifesto
    const manifestoData = [
        {
            policy: "24-Hour Economy Implementation",
            category: "Economy",
            status: "in_progress",
            progress: 35,
            details: "Pilot phase active in Tema Port and DVLA. Tax incentives for night-shift manufacturing approved."
        },
        {
            policy: "Feed Ghana Programme",
            category: "Agriculture",
            status: "started",
            progress: 15,
            details: "Launched in Techiman. Distribution of subsidized fertilizer to 50,000 farmers began in Oct 2025."
        },
        {
            policy: "Abolish E-Levy",
            category: "Taxation",
            status: "pending",
            progress: 5,
            details: "Bill currently under review by the Finance Committee in Parliament."
        },
        {
            policy: "Airport Modernization (GACL)",
            category: "Infrastructure",
            status: "in_progress",
            progress: 60,
            details: "Terminal 2 expansion is 80% complete. New automated gates installed."
        },
        {
            policy: "Free Technical Education",
            category: "Education",
            status: "in_progress",
            progress: 45,
            details: "21 new TVET centers approved. Partnership with Germany for dual training system."
        },
        {
            policy: "Healthcare Access Initiative",
            category: "Health",
            status: "started",
            progress: 20,
            details: "Mobile health units deployed to 5 regions. New NHIS reforms under consultation."
        }
    ];

    for (const item of manifestoData) {
        await prisma.manifesto.create({ data: item });
    }
    console.log('✅ Manifesto items seeded');

    // Seed Investments
    const investmentData = [
        {
            title: "Agro-Processing",
            desc: "Value addition to cocoa, cashew, and cassava. 100% tax holiday for first 5 years for factories in rural zones.",
            roi: "High (15-22%)"
        },
        {
            title: "Manufacturing (24h)",
            desc: "Specific incentives for companies running 3 shifts. Access to cheaper off-peak electricity tariffs.",
            roi: "Medium (10-15%)"
        },
        {
            title: "Tourism & Hospitality",
            desc: "Invest in 'Beyond the Return' infrastructure. Hotels and eco-resorts in the Volta and Central regions.",
            roi: "High (18-25%)"
        },
        {
            title: "Fintech & ICT",
            desc: "Accra is the 'Google AI' hub of Africa. Growing demand for digital payment solutions.",
            roi: "Very High (25%+)"
        }
    ];

    for (const item of investmentData) {
        await prisma.investment.create({ data: item });
    }
    console.log('✅ Investment sectors seeded');

    console.log('🎉 Database seeding complete!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
