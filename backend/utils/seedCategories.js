const Category = require('../models/categoryModel');
const connectDatabase = require('../config/database');
require('dotenv').config({ path: require('path').join(__dirname, '../config/.config.env') });

const seedCategories = async () => {
    try {
        await connectDatabase();

        // Clear existing categories
        await Category.deleteMany({});

        const categories = [
            {
                name: "Fashion",
                hasSubcategories: true,
                subcategories: [
                    {
                        name: "Men",
                        items: []
                    },
                    {
                        name: "Women",
                        items: ["Suits", "Sarees"]
                    }
                ],
                displayOrder: 1,
                isActive: true
            },
            {
                name: "Beauty",
                hasSubcategories: false,
                subcategories: [],
                displayOrder: 2,
                isActive: true
            },
            {
                name: "Home",
                hasSubcategories: false,
                subcategories: [],
                displayOrder: 3,
                isActive: true
            }
        ];

        await Category.insertMany(categories);
        console.log("✅ Categories seeded successfully!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding categories:", error);
        process.exit(1);
    }
};

seedCategories();

