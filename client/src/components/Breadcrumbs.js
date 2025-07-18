import { Link, useLocation } from "react-router-dom";

const nameMap = {
    "products": "Sản phẩm",
    "product": "Chi tiết sản phẩm",
    "cart": "Giỏ hàng",
    "profile": "Tài khoản",
    "wishlist": "Yêu thích",
    "checkout": "Thanh toán",
    "orders": "Đơn hàng",
    "about": "Giới thiệu",
};

function isId(segment) {
    // Đoán id là chuỗi số hoặc hex hoặc uuid (có thể tùy chỉnh)
    return /^(\d+|[a-f0-9]{8,})$/i.test(segment);
}

export default function Breadcrumbs() {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter(Boolean);

    // Xử lý đặc biệt cho các route động
    let crumbs = [];
    if (pathnames.length === 0) {
        crumbs = [];
    } else if (pathnames[0] === "products") {
        crumbs = [
            { label: nameMap["products"], to: "/products" },
        ];
    } else if (pathnames[0] === "product") {
        crumbs = [
            { label: nameMap["products"], to: "/products" },
            { label: nameMap["product"] },
        ];
    } else if (nameMap[pathnames[0]]) {
        crumbs = [
            { label: nameMap[pathnames[0]], to: `/${pathnames[0]}` },
        ];
    }

    return (
        <nav className="text-sm py-2 px-4 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700" aria-label="Breadcrumb">
            <ol className="list-none flex flex-wrap items-center gap-1 text-gray-500 dark:text-gray-300">
                <li>
                    <Link to="/" className="hover:underline text-primary-600 dark:text-primary-400">Trang chủ</Link>
                </li>
                {crumbs.map((crumb, idx) => (
                    <li key={idx} className="flex items-center">
                        <span className="mx-1">/</span>
                        {crumb.to && idx !== crumbs.length - 1 ? (
                            <Link to={crumb.to} className="hover:underline text-primary-600 dark:text-primary-400">{crumb.label}</Link>
                        ) : (
                            <span className="font-semibold text-gray-900 dark:text-white">{crumb.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
} 