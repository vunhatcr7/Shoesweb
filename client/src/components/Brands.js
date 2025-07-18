import React from 'react';
import { motion } from 'framer-motion';

const brands = [
    {
        id: 1,
        name: "Nike",
        logo: '/images/nike-logo_transparent.png',
        description: "Just Do It"
    },
    {
        id: 2,
        name: "Adidas",
        logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
        description: "Impossible Is Nothing"
    },
    {
        id: 3,
        name: "Puma",
        logo: "  /images/puma-logo_transparent.png",
        description: "Forever Faster"
    },
    {
        id: 4,
        name: "New Balance",
        logo: "/images/nb-logo1-removebg-preview.png",
        description: "Fearlessly Independent"
    },
    {
        id: 5,
        name: "Reebok",
        logo: "/images/reebok.logo_transparent.png",
        description: "Be More Human"
    },
    {
        id: 6,
        name: "Adidas Original",
        logo: "/images/adidasoriginal-logo_transparent.png",
        description: "Original is the best"
    }

];

const Brands = ({ theme }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <section >
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h2 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Our Trusted Brands</h2>
                    <p className={`max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        We partner with the world's leading footwear brands to bring you the best quality and style.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {brands.map((brand) => (
                        <motion.div
                            key={brand.id}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                            className={"rounded-xl shadow-lg p-8 flex flex-col items-center text-center group hover:shadow-xl transition-shadow bg-white dark:bg-gray-200 duration-500"}
                        >
                            <div className="w-32 h-32 mb-6 relative">
                                <img
                                    src={brand.logo}
                                    alt={brand.name}
                                    className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                                />
                            </div>
                            <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-black' : 'text-gray-900'}`}>{brand.name}</h3>
                            <p className="italic text-gray-700">{brand.description}</p>
                            <motion.div
                                initial={{ width: 0 }}
                                whileHover={{ width: "100%" }}
                                className="h-1 bg-blue-600 mt-4 rounded-full"
                            />
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-12"
                >
                    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        And many more premium brands to choose from...
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Brands; 