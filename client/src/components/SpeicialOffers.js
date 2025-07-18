import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const offers = [
    {
        id: 1,
        title: "Summer Collection",
        description: "Get up to 50% off on selected summer styles",
        image: "/images/adidasoriginal-banner.jpg",
        link: "/summer-collection",
        discount: "50% OFF"
    },
    {
        id: 2,
        title: "New Arrivals",
        description: "Be the first to get our latest releases",
        image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1465&q=80",
        link: "/new-arrivals",
        discount: "NEW"
    },
    {
        id: 3,
        title: "Limited Edition",
        description: "Exclusive designs available for a limited time",
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1464&q=80",
        link: "/limited-edition",
        discount: "LIMITED"
    }
];

const SpecialOffers = ({ theme }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <section className={`py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-900`}>
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Special Offers</h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Don't miss out on our exclusive deals and limited-time offers. Shop now and save big!
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {offers.map((offer) => (
                        <motion.div
                            key={offer.id}
                            variants={itemVariants}
                            className={"group flex flex-col h-full overflow-hidden rounded-xl shadow-lg bg-white transition-colors duration-500 relative"}
                        >
                            <div className="relative w-full aspect-[4/5] min-h-[320px]">
                                <img
                                    src={offer.image}
                                    alt={offer.title}
                                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                <div className="absolute top-4 right-4 z-10">
                                    <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                                        {offer.discount}
                                    </span>
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-3 text-white bg-gradient-to-t from-black/90 to-black/0 rounded-b-xl min-h-[110px] flex flex-col justify-end z-20">
                                <h3 className="text-xl font-bold mb-1 text-gray-100 group-hover:text-blue-500 transition-colors">
                                    {offer.title}
                                </h3>
                                <p className="text-white/90 mb-4 text-sm font-medium drop-shadow-sm">
                                    {offer.description}
                                </p>
                                <Link to={offer.link} className="w-fit mt-auto">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`bg-white text-gray-900 px-4 py-1.5 rounded-lg font-semibold hover:bg-blue-500 hover:text-white transition-colors flex items-center gap-2 text-sm shadow ${theme === 'dark' ? 'bg-gray-900 text-white hover:bg-blue-500 hover:text-white' : ''}`}
                                    >
                                        Shop Now
                                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                    </motion.button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-12"
                >
                    <Link to="/all-offers">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
                        >
                            View All Offers
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default SpecialOffers; 