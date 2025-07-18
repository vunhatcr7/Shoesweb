import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const aboutSections = [
  {
    title: 'Our Mission',
    content: 'Shoe Store Web mong muốn mang đến trải nghiệm mua sắm giày hiện đại, tiện lợi và truyền cảm hứng cho giới trẻ yêu thời trang, thể thao. Chúng tôi cam kết chỉ cung cấp sản phẩm chính hãng từ các thương hiệu hàng đầu thế giới.',
    img: '/images/banner25.png',
  },
  {
    title: 'Our Values',
    content: 'Chúng tôi đề cao sự trung thực, sáng tạo, và lấy khách hàng làm trung tâm. Mỗi sản phẩm, mỗi trải nghiệm đều hướng đến sự hài lòng và phong cách riêng của bạn.',
    img: '/images/poster2.jpg',
  },
  {
    title: 'Technology & Team',
    content: 'Website được phát triển với ReactJS, NodeJS, MongoDB, giao diện lấy cảm hứng từ Nike, tối ưu cho mọi thiết bị. Đội ngũ trẻ trung, đam mê công nghệ và thời trang luôn sẵn sàng hỗ trợ bạn.',
    img: '/images/lebron22.png',
  },
  {
    title: 'Thank You!',
    content: 'Cảm ơn bạn đã tin tưởng và đồng hành cùng Shoe Store Web. Chúng tôi sẽ không ngừng đổi mới để phục vụ bạn tốt hơn mỗi ngày!',
    img: '/images/poster3.jpg',
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 pb-16">
      <div className="max-w-5xl mx-auto px-4 pt-16">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-gray-900 dark:text-white drop-shadow-lg"
        >
          About Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-lg md:text-xl text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto"
        >
          Shoe Store Web là nền tảng mua sắm giày hiện đại, lấy cảm hứng từ Nike, mang đến trải nghiệm trẻ trung, năng động và tiện lợi cho mọi khách hàng yêu thời trang thể thao.
        </motion.p>
        <div className="space-y-16">
          {aboutSections.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              <img
                src={section.img}
                alt={section.title}
                className="w-full md:w-1/2 rounded-2xl shadow-xl object-cover h-64 md:h-80 mb-6 md:mb-0"
                loading="lazy"
              />
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">{section.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">{section.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-16">
          <Link
            to="/"
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold px-8 py-3 rounded-full shadow-lg transition-all duration-300 mt-4"
          >
            Quay về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About; 