# Shoe Store Web

Website bán giày sneaker hiện đại, gồm frontend (ReactJS) và backend (NodeJS/Express).

## Cấu trúc thư mục

```
shoestoreweb/
├── client/   # Frontend ReactJS
├── server/   # Backend NodeJS/Express
├── README.md
├── package.json
└── ...
```

## Yêu cầu
- Node.js >= 14
- npm >= 6

## Cài đặt

### 1. Clone source code
```bash
git clone <https://github.com/vunhatcr7/Shoesweb.git>
cd shoestoreweb
```

### 2. Cài đặt dependencies cho cả client và server
```bash
cd client
npm install
cd ../server
npm install
```

## Chạy project

### Chạy frontend (ReactJS)
```bash
cd client
npm start
```
- Truy cập: http://localhost:3000

### Chạy backend (NodeJS/Express)
```bash
cd server
npm start
```
- API mặc định: http://localhost:5000

## Một số lệnh npm hữu ích
- `npm run build` (trong client): build production cho frontend
- `npm test`: chạy test (nếu có)

## Ghi chú
- Thông tin cấu hình môi trường (database, API key, ...) đặt trong file `.env` (không public lên GitHub).
- Nếu gặp lỗi thiếu file, hãy kiểm tra lại `.gitignore` và chắc chắn đã push đầy đủ source code.

---

**Tác giả:** [Tên của bạn] 