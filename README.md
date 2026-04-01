# MemoVault

A full-stack notes application with image attachments, built with the MERN stack. Users can create, edit, and delete personal notes — with support for uploading images per note, stored on Cloudinary. Authentication is handled via JWT cookies with optional email verification via OTP.

---

## Live Demo

> _Coming soon / Add your deployed link here_

---

## Features

- **Authentication** — Register, login, logout with JWT cookie-based sessions
- **Email Verification** — OTP-based account verification via Nodemailer
- **Password Reset** — OTP-based password reset flow
- **Notes CRUD** — Create, read, update, delete personal notes
- **Image Attachments** — Upload and delete images per note, stored on Cloudinary
- **Thumbnail Preview** — Note cards show image thumbnails or content previews
- **Responsive UI** — Works on mobile and desktop
- **Protected Routes** — Notes are scoped per user

---

## Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database and ODM |
| JSON Web Tokens | Authentication |
| bcryptjs | Password hashing |
| Cloudinary | Image storage |
| Multer | File upload handling |
| Nodemailer | Transactional emails |

### Frontend
| Technology | Purpose |
|---|---|
| React + Vite | UI framework and build tool |
| Tailwind CSS | Styling |
| Axios | HTTP client |
| React Router v6 | Client-side routing |
| Sonner | Toast notifications |
| Context API | Global state management |

---

## Project Structure

```
MemoVault/
├── server/
│   ├── config/
│   │   ├── mongodb.js
│   │   ├── nodemailer.js
│   │   └── cloudinary.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   └── noteController.js
│   ├── middlewares/
│   │   └── userAuth.js
│   ├── models/
│   │   ├── userModel.js
│   │   └── noteModel.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   └── noteRoutes.js
│   └── server.js
│
└── client/
    └── src/
        ├── assets/
        ├── components/
        │   ├── Header.jsx
        │   └── Footer.jsx
        ├── context/
        │   └── AppContext.jsx
        ├── pages/
        │   ├── Landing.jsx
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── EmailVerify.jsx
        │   ├── ResetPassword.jsx
        │   └── Home.jsx
        ├── App.jsx
        └── main.jsx
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account
- Cloudinary account
- Gmail account (or any SMTP provider) for Nodemailer

### 1. Clone the repository

```bash
git clone https://github.com/Hexactinellida/memovault.git
cd memovault
```

### 2. Setup the server

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SENDER_EMAIL=your_email@gmail.com

NODE_ENV=development
```

Start the server:

```bash
npm run dev
```

### 3. Setup the client

```bash
cd client
npm install
npm run dev
```

The app will be running at `http://localhost:5173`

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/logout` | Logout |
| POST | `/api/auth/send-verify-otp` | Send email verification OTP |
| POST | `/api/auth/verify-account` | Verify account with OTP |
| POST | `/api/auth/send-reset-otp` | Send password reset OTP |
| POST | `/api/auth/reset-password` | Reset password with OTP |

### User
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/user/data` | Get authenticated user data |

### Notes
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/note/create` | Create a note |
| GET | `/api/note/all` | Get all notes for user |
| GET | `/api/note/:id` | Get single note |
| PUT | `/api/note/:id` | Update note |
| DELETE | `/api/note/:id` | Delete note |
| POST | `/api/note/:id/images` | Upload image to note |
| DELETE | `/api/note/:id/images` | Delete image from note |

---

## Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Server port (default 4000) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `SMTP_HOST` | SMTP host for email |
| `SMTP_PORT` | SMTP port |
| `SMTP_USER` | SMTP username |
| `SMTP_PASS` | SMTP password / app password |
| `SENDER_EMAIL` | From address for emails |
| `NODE_ENV` | `development` or `production` |

---
## Author

**Roshan** — Computer Engineering Student, Tribhuvan University (IOE)

- GitHub: [@Hexactinellida](https://github.com/Hexactinellida)
- LinkedIn: [@panthiroshan020](https://linkedin.com/in/panthiroshan020)

---

## License

This project is open source and available under the [MIT License](LICENSE).