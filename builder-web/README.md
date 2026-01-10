# Builder Web

เว็บไซต์โปรโมทธุรกิจรับสร้างบ้าน พัฒนาด้วย React + Vite พร้อม WebGL Scrollytelling

## 📦 การติดตั้ง

### ขั้นตอนที่ 1: ติดตั้ง Node.js

ดาวน์โหลดและติดตั้ง [Node.js](https://nodejs.org/) (แนะนำ v18 ขึ้นไป)

### ขั้นตอนที่ 2: ติดตั้ง Dependencies

```bash
npm install
```

## 📋 รายการ Dependencies ที่ใช้

### Production Dependencies

| Package              | Version  | คำอธิบาย                                   |
| -------------------- | -------- | ------------------------------------------ |
| `react`              | ^19.2.0  | Library หลักสำหรับสร้าง UI                 |
| `react-dom`          | ^19.2.0  | React DOM renderer                         |
| `react-router-dom`   | ^7.12.0  | Routing สำหรับ React                       |
| `three`              | ^0.182.0 | 3D Graphics Library                        |
| `@react-three/fiber` | ^9.5.0   | React renderer สำหรับ Three.js             |
| `@react-three/drei`  | ^10.7.7  | Helper components สำหรับ React Three Fiber |
| `@types/three`       | ^0.182.0 | TypeScript types สำหรับ Three.js           |
| `tailwindcss`        | ^4.1.18  | CSS Framework                              |
| `@tailwindcss/vite`  | ^4.1.18  | Tailwind CSS plugin สำหรับ Vite            |
| `lucide-react`       | ^0.562.0 | Icon library                               |

### Development Dependencies

| Package                       | Version | คำอธิบาย                           |
| ----------------------------- | ------- | ---------------------------------- |
| `vite` (rolldown-vite)        | 7.2.5   | Build tool                         |
| `@vitejs/plugin-react`        | ^5.1.1  | Vite plugin สำหรับ React           |
| `eslint`                      | ^9.39.1 | Linting tool                       |
| `@eslint/js`                  | ^9.39.1 | ESLint JavaScript configs          |
| `eslint-plugin-react-hooks`   | ^7.0.1  | ESLint rules สำหรับ React Hooks    |
| `eslint-plugin-react-refresh` | ^0.4.24 | ESLint plugin สำหรับ React Refresh |
| `globals`                     | ^16.5.0 | Global variables สำหรับ ESLint     |
| `@types/react`                | ^19.2.5 | TypeScript types สำหรับ React      |
| `@types/react-dom`            | ^19.2.3 | TypeScript types สำหรับ React DOM  |

## 🚀 คำสั่งที่ใช้งาน

```bash
# รันโปรเจคในโหมด development
npm run dev

# Build โปรเจคสำหรับ production
npm run build

# Preview production build
npm run preview

# ตรวจสอบ code ด้วย ESLint
npm run lint
```

## 🌐 เปิดใช้งาน

หลังจากรัน `npm run dev` แล้ว เปิดเบราว์เซอร์ไปที่ http://localhost:5173
