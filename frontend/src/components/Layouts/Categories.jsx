import { Link } from 'react-router-dom';
import { useState } from 'react';

// Import Material-UI icons for 3D look
import DiamondIcon from '@mui/icons-material/Diamond';
import HomeIcon from '@mui/icons-material/Home';
import SpaIcon from '@mui/icons-material/Spa';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import ChairIcon from '@mui/icons-material/Chair';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const catNav = [
    {
        name: "Fashion",
        icon: <CheckroomIcon sx={{ fontSize: 28 }} />,
        color: "from-pink-500 to-rose-500",
        bgColor: "bg-gradient-to-br from-pink-50 to-rose-50",
        borderColor: "border-pink-200",
        hoverColor: "hover:shadow-pink-100",
        description: "Latest trends",
        iconBg: "bg-gradient-to-br from-pink-500 to-rose-500",
        hasDropdown: true,
        subCategories: [
            { name: "Men", path: "/products?category=Men" },
            { name: "Women", path: "/products?category=Women" }
        ]
    },
    {
        name: "Home",
        icon: <ChairIcon sx={{ fontSize: 28 }} />,
        color: "from-emerald-500 to-teal-600",
        bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50",
        borderColor: "border-emerald-200",
        hoverColor: "hover:shadow-emerald-100",
        description: "Elegant solutions",
        iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
        hasDropdown: false
    },
    {
        name: "Beauty",
        icon: <SpaIcon sx={{ fontSize: 28 }} />,
        color: "from-purple-500 to-indigo-600",
        bgColor: "bg-gradient-to-br from-purple-50 to-indigo-50",
        borderColor: "border-purple-200",
        hoverColor: "hover:shadow-purple-100",
        description: "Premium products",
        iconBg: "bg-gradient-to-br from-purple-500 to-indigo-600",
        hasDropdown: false
    },
];

const Categories = () => {
    const [hoveredCategory, setHoveredCategory] = useState(null);

    return (
        <section className=" py-16 px-4 sm:px-6 lg:px-0 ">
            <div className="max-w-5xl mx-auto">
                {/* Section Header - Luxury Style */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-50/80 via-purple-50/80 to-blue-50/80 backdrop-blur-xl rounded-2xl mb-6 border border-pink-200/50 shadow-lg">
                        <DiamondIcon sx={{ fontSize: 20, color: '#EC4899' }} className="mr-2" />
                        <span className="text-transparent bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text font-bold text-sm tracking-widest uppercase">
                            Premium Collections
                        </span>
                        <DiamondIcon sx={{ fontSize: 20, color: '#8B5CF6' }} className="ml-2" />
                    </div>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto font-light">
                        Discover our meticulously curated premium collections
                    </p>
                </div>

                {/* Luxury 3-Category Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    {catNav.map((item, i) => (
                        <div 
                            className="group block relative"
                            key={i}
                            onMouseEnter={() => setHoveredCategory(item.name)}
                            onMouseLeave={() => setHoveredCategory(null)}
                        >
                            <div className={`
                                ${item.bgColor} 
                                rounded-2xl p-8 
                                border-2 ${item.borderColor}
                                shadow-xl hover:shadow-2xl 
                                transition-all duration-500 
                                transform hover:-translate-y-2
                                relative overflow-hidden
                                ${item.hoverColor}
                                h-full
                                backdrop-blur-sm
                            `}>
                                {/* Animated Background Pattern */}
                                <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.03]">
                                    <div className={`w-full h-full bg-gradient-to-br ${item.color} rounded-full animate-pulse`}></div>
                                </div>
                                
                                {/* 3D Icon Container */}
                                <div className={`
                                    w-20 h-20 rounded-2xl 
                                    ${item.iconBg}
                                    flex items-center justify-center 
                                    shadow-2xl mb-6
                                    group-hover:scale-110 
                                    group-hover:rotate-3
                                    transition-all duration-500
                                    relative z-10
                                    border-2 border-white/40
                                    mx-auto
                                    transform-gpu
                                `}>
                                    <div className="text-white filter drop-shadow-lg">
                                        {item.icon}
                                    </div>
                                    {/* 3D Shadow Effect */}
                                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.color} blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>
                                </div>

                                {/* Category Name with Dropdown Indicator */}
                                <div className="flex items-center justify-center mb-3 relative z-10">
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300 text-center">
                                        {item.name}
                                    </h3>
                                    {item.hasDropdown && (
                                        <KeyboardArrowDownIcon 
                                            className={`ml-1 text-gray-600 transition-transform duration-300 ${
                                                hoveredCategory === item.name ? 'rotate-180' : ''
                                            }`} 
                                            sx={{ fontSize: 20 }}
                                        />
                                    )}
                                </div>

                                {/* Description */}
                                <p className="text-gray-600 text-base mb-6 relative z-10 text-center leading-relaxed font-light">
                                    {item.description}
                                </p>

                                {/* Luxury CTA Button */}
                                <div className="flex items-center justify-center relative z-10">
                                    {item.hasDropdown ? (
                                        <div className="flex items-center text-gray-700 font-semibold text-sm group-hover:text-gray-900 transition-colors duration-300 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 group-hover:border-gray-300">
                                            <span>Choose Category</span>
                                            <KeyboardArrowDownIcon 
                                                className={`ml-2 transition-transform duration-300 ${
                                                    hoveredCategory === item.name ? 'rotate-180' : ''
                                                }`} 
                                                sx={{ fontSize: 18 }}
                                            />
                                        </div>
                                    ) : (
                                        <Link 
                                            to={`/products?category=${item.name}`}
                                            className="flex items-center text-gray-700 font-semibold text-sm group-hover:text-gray-900 transition-colors duration-300 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 group-hover:border-gray-300"
                                        >
                                            <span>Explore Collection</span>
                                            <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </Link>
                                    )}
                                </div>

                                {/* Hover Effect Overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500 rounded-2xl`}></div>
                                
                                {/* Glow Effect */}
                                <div className={`absolute -inset-1 bg-gradient-to-br ${item.color} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}></div>
                            </div>

                            {/* Dropdown for Fashion */}
                            {item.hasDropdown && hoveredCategory === item.name && (
                                <div className="absolute top-full left-0 right-0 mt-2 z-50">
                                    <div className={`bg-white rounded-2xl shadow-2xl border-2 ${item.borderColor} overflow-hidden backdrop-blur-sm`}>
                                        {item.subCategories.map((subItem, subIndex) => (
                                            <Link
                                                key={subIndex}
                                                to={subItem.path}
                                                className="block px-6 py-4 hover:bg-gradient-to-r from-pink-50 to-rose-50 transition-all duration-300 group/subitem"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="text-gray-800 font-medium group-hover/subitem:text-gray-900 transition-colors">
                                                        {subItem.name}
                                                    </span>
                                                    <svg className="w-4 h-4 text-gray-400 group-hover/subitem:text-gray-600 group-hover/subitem:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                    </svg>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Luxury Bottom CTA */}
                <div className="text-center mt-16">
                    <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-pink-50 to-purple-50 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg border border-pink-200/50">
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium text-gray-600">More luxury categories coming soon</span>
                            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full animate-pulse delay-300"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Categories;