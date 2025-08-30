# 🚀 SIH Hub - Smart India Hackathon Platform

<div align="center">
  
[![Next.js](https://img.shields.io/badge/Next.js-15.5.0-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green?logo=mongodb)](https://www.mongodb.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-orange?logo=firebase)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

**Your ultimate platform for Smart India Hackathon 2025 preparation and team formation**

[🌐 Live Demo](https://sih2025.vercel.app) • [📖 Documentation](#documentation) • [🤝 Contributing](#contributing)

</div>

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 🎯 About the Project

SIH Hub is an **unofficial platform** designed to help students explore, organize, and collaborate on Smart India Hackathon problem statements. Built with modern web technologies, it provides a comprehensive solution for SIH 2025 participants to discover problem statements, form teams, and prepare for the hackathon.

### 🌟 What is Smart India Hackathon?

Smart India Hackathon (SIH) is a premier nationwide initiative designed to engage students in solving some of the most pressing challenges faced in everyday life. Launched to foster a culture of innovation and practical problem-solving, SIH provides a dynamic platform for students to develop and showcase their creative solutions to real-world problems.

### ⚠️ Disclaimer

This platform is **not affiliated with or endorsed by the official Smart India Hackathon organization**. All problem statements and information are sourced from publicly available resources. For official registration, guidelines, and announcements, please refer to the official SIH website and channels.

---

## ✨ Features

### 🔍 **Problem Statement Management**
- **Advanced Search & Filtering**: Search by keywords, themes, categories, difficulty levels
- **Detailed Problem Views**: Comprehensive problem statement details with approach suggestions
- **AI-Powered Analysis**: Intelligent problem statement analysis and recommendations
- **Bookmark System**: Save and organize favorite problem statements

### 👥 **Team Collaboration**
- **Team Formation**: Create and join teams for collaborative problem-solving
- **Team Management**: Invite members, manage team problem statements
- **Real-time Updates**: Stay synchronized with team activities

### 🔐 **Authentication & Security**
- **Firebase Authentication**: Secure Google OAuth integration
- **JWT Token Management**: Secure API access with automatic token refresh
- **Protected Routes**: Role-based access control

### 📱 **Modern User Experience**
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Mode Support**: Toggle between light and dark themes
- **Progressive Web App**: Fast loading with offline capabilities
- **Intuitive UI**: Clean, modern interface built with Tailwind CSS

### 🎨 **Additional Features**
- **Interactive Timeline**: SIH 2025 process flow visualization
- **Problem Categories**: Organized by themes and difficulty levels
- **Export Functionality**: Download problem statements and team data
- **Real-time Notifications**: Stay updated with important information

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: Next.js 15.5.0 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: React Context API
- **Authentication**: Firebase Auth
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Animations**: Framer Motion

### **Backend**
- **Runtime**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Firebase Admin SDK + JWT
- **AI Integration**: Google Gemini AI via LangChain
- **Validation**: Zod schemas
- **CORS**: Cross-origin resource sharing enabled

### **Infrastructure & DevOps**
- **Deployment**: Vercel (Frontend) + MongoDB Atlas (Database)
- **Version Control**: Git with GitHub
- **Environment Management**: dotenv
- **Code Quality**: ESLint + TypeScript

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager
- MongoDB database (local or Atlas)
- Firebase project with Authentication enabled
- Google Gemini AI API key (optional, for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sujallchaudhary/sih-project.git
   cd sih-project
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   
   # Create environment file
   cp .env.example .env
   # Add your environment variables (see Backend Environment Variables section)
   
   # Start the backend server
   npm start
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   
   # Create environment file
   cp .env.local.example .env.local
   # Add your environment variables (see Frontend Environment Variables section)
   
   # Start the development server
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to see the application.

### Environment Variables

#### Backend (.env)
```bash
# Database
MONGODB_URI=mongodb://localhost:27017/sih-hub
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sih-hub

# Firebase Admin SDK
FIREBASE_ADMIN_PROJECT_ID=your-firebase-project-id
FIREBASE_ADMIN_PRIVATE_KEY=your-firebase-private-key
FIREBASE_ADMIN_CLIENT_EMAIL=your-firebase-client-email

# JWT
JWT_SECRET=your-super-secret-jwt-key

# Google Gemini AI (Optional)
GOOGLE_API_KEY=your-google-gemini-api-key

# Server Configuration
PORT=5000
NODE_ENV=development
```

#### Frontend (.env.local)
```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## 📁 Project Structure

```
sih-project/
├── 📁 backend/                    # Backend server
│   ├── 📁 src/
│   │   ├── 📁 controllers/        # API route controllers
│   │   ├── 📁 database/           # Database connection
│   │   ├── 📁 llms/               # AI integration
│   │   ├── 📁 middlewares/        # Authentication middleware
│   │   ├── 📁 models/             # MongoDB schemas
│   │   ├── 📁 prompts/            # AI prompts
│   │   ├── 📁 routes/             # API routes
│   │   └── 📁 utils/              # Utility functions
│   ├── 📄 index.js                # Server entry point
│   └── 📄 package.json
│
├── 📁 frontend/                   # Next.js frontend
│   ├── 📁 public/                 # Static assets
│   ├── 📁 src/
│   │   ├── 📁 app/                # Next.js app router pages
│   │   │   ├── 📁 problems/       # Problem statement pages
│   │   │   ├── 📁 team/           # Team management pages
│   │   │   ├── 📄 layout.tsx      # Root layout
│   │   │   └── 📄 page.tsx        # Home page
│   │   ├── 📁 components/         # Reusable UI components
│   │   │   ├── 📁 ui/             # shadcn/ui components
│   │   │   ├── 📄 Header.tsx      # Navigation header
│   │   │   ├── 📄 Footer.tsx      # Page footer
│   │   │   └── 📄 SIHSection.tsx  # SIH information section
│   │   ├── 📁 contexts/           # React context providers
│   │   ├── 📁 hooks/              # Custom React hooks
│   │   ├── 📁 lib/                # Utility libraries
│   │   └── 📁 types/              # TypeScript type definitions
│   ├── 📄 tailwind.config.ts      # Tailwind configuration
│   ├── 📄 next.config.ts          # Next.js configuration
│   └── 📄 package.json
│
├── 📄 README.md                   # Project documentation
└── 📄 .gitignore                  # Git ignore rules
```

---

## 📚 API Documentation

### Base URL
```
Production: https://your-backend-api.com
Development: http://localhost:5000
```

### Authentication
All protected endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Core Endpoints

#### **Problem Statements**
```bash
GET    /ps                          # Get all problem statements (with pagination)
GET    /ps/:id                      # Get specific problem statement
GET    /ps/bookmarked              # Get user's bookmarked problems
POST   /ps/bookmark                # Toggle bookmark status
GET    /ps/team                    # Get team's problem statements
POST   /ps/team                    # Add problem to team
DELETE /ps/team                    # Remove problem from team
```

#### **Authentication**
```bash
POST   /auth/login                 # User login with Firebase token
POST   /auth/refresh               # Refresh JWT token
GET    /auth/verify                # Verify token validity
```

#### **Team Management**
```bash
GET    /team                       # Get user's team information
POST   /team/create                # Create a new team
POST   /team/join/:teamId          # Join existing team
PUT    /team/update                # Update team information
DELETE /team/leave                 # Leave current team
```

### Request/Response Examples

#### Get Problem Statements
```bash
GET /ps?page=1&limit=10&theme=Healthcare&difficulty=medium

Response:
{
  "success": true,
  "data": {
    "problems": [...],
    "totalPages": 5,
    "currentPage": 1,
    "totalProblems": 50
  }
}
```

#### Bookmark Problem
```bash
POST /ps/bookmark
Content-Type: application/json
Authorization: Bearer <token>

{
  "psId": "64a1b2c3d4e5f6789abcdef0"
}

Response:
{
  "success": true,
  "message": "Problem statement bookmarked successfully",
  "isBookmarked": true
}
```

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Getting Started
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Contribution Guidelines
- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

### Code of Conduct
- Be respectful and inclusive
- Help others learn and grow
- Focus on constructive feedback
- Maintain a positive environment

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📧 Contact

**Project Maintainer**: [Sujal Chaudhary](https://github.com/sujallchaudhary)

**Project Link**: [https://github.com/sujallchaudhary/sih-project](https://github.com/sujallchaudhary/sih-project)

**Live Demo**: [https://sih2025.vercel.app](https://sih2025.vercel.app)

---

## 🙏 Acknowledgments

- [Smart India Hackathon](https://www.sih.gov.in/) for inspiring this project
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Firebase](https://firebase.google.com/) for authentication services
- [MongoDB](https://www.mongodb.com/) for the database solution
- [Vercel](https://vercel.com/) for hosting and deployment
- All contributors who help improve this project

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

*Built with ❤️ for the SIH community*

</div>
