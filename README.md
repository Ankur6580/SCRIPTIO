# AI Video Script Generator

AI Video Script Generator is a full-stack web application that allows users to generate YouTube video scripts using AI. Users can generate scripts without logging in, but to save scripts, they must create an account. The application is designed with a modern, professional UI and serves as an implementation of full-stack development skills.

## Features
- AI-powered script generation
- Generate scripts without login (not saved)
- Automatic script saving for logged-in users
- User authentication and account management
- PDF export functionality
- Light/Dark theme support
- Responsive and modern UI

## Tech Stack
### Frontend
- React 19
- Vite
- TailwindCSS
- React Router
- DOMPurify (for security)
- Marked (Markdown parsing)
- ESLint & Prettier

### Backend
- Node.js
- Express.js
- Prisma (ORM)
- SQLite (Database)
- bcrypt.js (Password hashing)
- JSON Web Tokens (JWT) for authentication
- CORS & Dotenv
- Puppeteer (For additional script processing)
- AI API integration

## Project Structure
```
SCRIPTIO
├─ README.md
├─ scriptio-backend
│  ├─ ai
│  │  ├─ aiController.js
│  │  ├─ aiService.js
│  │  └─ apiRoutes.js
│  ├─ auth
│  │  ├─ authController.js
│  │  ├─ authMiddleware.js
│  │  ├─ authRoutes.js
│  │  ├─ authServices.js
│  │  ├─ authValidator.js
│  │  └─ deleteUser.js
│  ├─ package.json
│  ├─ prisma
│  │  └─ schema.prisma
│  └─ server.js
└─ scriptio-frontend
   ├─ .prettierrc
   ├─ eslint.config.js
   ├─ index.html
   ├─ package.json
   ├─ public
   │  └─ favicon.png
   ├─ src
   │  ├─ App.jsx
   │  ├─ assets
   │  │  ├─ BrandLogo.svg
   │  │  └─ logo.svg
   │  ├─ components
   │  │  ├─ Animation.jsx
   │  │  ├─ AuthForm.jsx
   │  │  ├─ Contact.jsx
   │  │  ├─ Footer.jsx
   │  │  ├─ MDRenderer.jsx
   │  │  ├─ Navbar.jsx
   │  │  ├─ PDFDownloader.jsx
   │  │  ├─ PromptInputOutput.jsx
   │  │  ├─ Scripts.jsx
   │  │  └─ ThemeSwitcher.jsx
   │  ├─ contexts
   │  │  └─ ThemeContext.jsx
   │  ├─ helpers
   │  │  └─ validator.js
   │  ├─ index.css
   │  ├─ main.jsx
   │  └─ pages
   │     ├─ Dashboard.jsx
   │     ├─ Home.jsx
   │     ├─ Login.jsx
   │     └─ Register.jsx
   └─ vite.config.js
```

## Installation
### Prerequisites
- Node.js installed
- NPM or Yarn

### Setup
#### Clone the repository
```sh
git clone https://github.com/Ankur6580/SCRIPTIO.git
cd SCRIPTIO
```
#### Backend Setup
```sh
cd scriptio-backend
npm install
npm start
```
#### Frontend Setup
```sh
cd scriptio-frontend
npm install
npm run dev
```

## Usage
- Visit `http://localhost:5173` to access the frontend
- Generate scripts instantly without logging in
- Register/Login to save scripts

## Contributing
Contributions are welcome! Feel free to open issues or pull requests.

## Contact
For inquiries, reach out at **ankurdas.abs@gmail.com**. I am open to freelancing opportunities.

## License
This project is licensed under the MIT License.