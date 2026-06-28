# Manikanta Engalligi — Personal Portfolio

<div align="center">

# AI Engineer | Full-Stack Developer | Data Analytics Enthusiast

A modern, multilingual, production-ready portfolio showcasing my professional journey, technical expertise, academic projects, certifications, and experience. Built using the latest web technologies with a strong focus on performance, accessibility, scalability, and clean UI/UX.


### Live Website

**[Visit My Portfolio](https://manikanta-portfolio-seven.vercel.app)**

---

## Portfolio Preview

![Portfolio Preview](public/images/portfolio-preview.png)

# About the Project

This portfolio was designed and developed to serve as a professional online presence where recruiters, hiring managers, collaborators, and fellow developers can learn more about me, explore my projects, review my technical skills, download my resume, and get in touch through an integrated contact form.

The application follows modern software engineering practices and is built using the latest Next.js App Router architecture, TypeScript, Tailwind CSS, and various production-ready services.

The website includes multilingual support, responsive layouts, dark/light themes, optimized image delivery, integrated EmailJS contact functionality, SEO enhancements, and deployment through Vercel.

---

# Features

- Responsive design across desktop, tablet, and mobile devices
- Modern UI built using Tailwind CSS v4
- Built with Next.js 15 App Router
- TypeScript strict mode
- English & German language support
- Dark / Light mode
- Interactive animations using Framer Motion
- Professional Hero section
- About section
- Education timeline
- Experience timeline
- Project showcase
- Technical Skills section
- Certifications
- Resume download
- Integrated EmailJS contact form
- Cloudinary image optimization
- Supabase integration
- SEO optimized metadata
- Dynamic Sitemap
- Robots.txt generation
- Progressive Web App support
- Production deployment using Vercel

---

# Tech Stack

| Category | Technology |
|------------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui |
| UI Primitives | Radix UI |
| Animation | Framer Motion |
| Localization | next-intl |
| Theme | next-themes |
| Database | Supabase |
| Email Service | EmailJS |
| Image Hosting | Cloudinary |
| Icons | Lucide React |
| Deployment | Vercel |
| Package Manager | npm |

---

# Why These Technologies?

## Next.js 15

Provides a production-ready React framework with App Router, Server Components, SEO optimization, routing, metadata generation, and high performance.

---

## TypeScript

Ensures strict type safety, maintainable code, improved developer experience, and scalable architecture.

---

## Tailwind CSS

Utility-first CSS framework used to build responsive and consistent interfaces rapidly.

---

## Framer Motion

Adds modern animations and smooth user interactions throughout the application.

---

## next-intl

Implements multilingual support for English and German while maintaining scalable localization.

---

## EmailJS

Allows visitors to contact me directly through the portfolio without requiring a backend server.

---

## Supabase

Used for scalable backend integration and future extensibility.

---

## Cloudinary

Optimizes image storage, delivery, and loading performance.

---

## Vercel

Provides continuous deployment, edge optimization, and production hosting.

---

# Project Structure

```
Manikanta-Portfolio
│
├── app/
│   ├── [locale]/
│   ├── globals.css
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── manifest.ts
│   └── layout.tsx
│
├── components/
│   ├── ui/
│   ├── language-switcher.tsx
│   ├── theme-toggle.tsx
│   └── reusable components
│
├── data/
│   └── Portfolio data
│
├── hooks/
│   └── Custom React hooks
│
├── i18n/
│   └── Internationalization configuration
│
├── lib/
│   ├── cloudinary.ts
│   ├── emailjs.ts
│   ├── utils.ts
│   └── supabase/
│
├── messages/
│   ├── en.json
│   └── de.json
│
├── providers/
│   └── Theme & Localization providers
│
├── public/
│   ├── certificates/
│   ├── images/
│   │   ├── profile.jpg
│   │   ├── portfolio-preview.png
│   │   └── projects/
│   └── resume/
│
├── sections/
│   ├── Hero
│   ├── About
│   ├── Education
│   ├── Experience
│   ├── Projects
│   ├── Skills
│   ├── Certifications
│   ├── Contact
│   └── Footer
│
├── types/
│
├── .env.example
├── .env.local
├── package.json
├── tsconfig.json
└── README.md
```

---

# Folder Explanation

### app/

Contains the Next.js App Router pages, layouts, SEO configuration, metadata generation, robots.txt, sitemap, and global styling.

### components/

Reusable UI components including buttons, cards, navigation, dialogs, language switcher, and theme toggle.

### sections/

Contains the major sections that build the portfolio page including Hero, About, Experience, Education, Projects, Skills, Certifications, Contact, and Footer.

### lib/

Contains third-party integrations including EmailJS, Cloudinary, Supabase, and reusable helper functions.

### data/

Stores structured portfolio data used throughout the application.

### providers/

Application-wide providers responsible for Theme management and Localization.

### messages/

Translation files used by next-intl for multilingual support.

### public/

Contains static assets including images, certificates, resumes, project screenshots, and icons.

### types/

Shared TypeScript interfaces and custom type declarations.

---

# Featured Projects

## Vital Guard

An IoT-based wearable healthcare monitoring system designed for senior citizens and individuals with disabilities.

**Technologies**

- ESP8266
- MPU6050
- Blynk IoT
- GPS
- Embedded Systems

---

## Video Anomaly Detection

Deep learning-based surveillance anomaly detection using transfer learning and fine-tuning.

**Technologies**

- TensorFlow
- Keras
- OpenCV
- Python
- CNN

---

## SMS Spam Detection

Machine Learning model capable of detecting spam SMS messages using multiple classification algorithms.

**Technologies**

- Python
- Scikit-Learn
- TF-IDF
- Logistic Regression
- Naive Bayes
- SVM

---

# Contact Form Workflow

```
Visitor

↓

Contact Form

↓

EmailJS

↓

Configured Email Template

↓

Gmail Inbox

↓

Message Delivered
```

---

# Environment Variables

Create a `.env.local` file in the project root.

```env
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=

NEXT_PUBLIC_EMAILJS_SERVICE_ID=

NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=

NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_ANON_KEY=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
```

---

# Local Installation

Clone the repository

```bash
git clone https://github.com/Manikanta679/Manikanta-portfolio.git
```

Move into the project directory

```bash
cd Manikanta-portfolio
```

Install dependencies

```bash
npm install
```

Create environment variables

```bash
cp .env.example .env.local
```

Run locally

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

# Available Scripts

```bash
npm run dev
```

Starts the development server.

---

```bash
npm run build
```

Creates the production build.

---

```bash
npm run start
```

Runs the production build.

---

```bash
npm run lint
```

Runs ESLint.

---

```bash
npm run typecheck
```

Runs TypeScript type checking.

---

```bash
npm run format
```

Formats the code using Prettier.

---

# Deployment

The application is deployed using **Vercel**.

Deployment Steps:

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure the required environment variables.
4. Deploy.
5. Every push to the main branch automatically triggers a production deployment.

---

# Future Improvements

- Blog Section
- Admin Dashboard
- Visitor Analytics
- Project Filtering
- Additional Languages
- CMS Integration
- Automated Email Responses
- Performance Monitoring

---

# Author

## Manikanta Engalligi

AI Engineer | Full-Stack Developer | Data Analytics Enthusiast

**Portfolio**

https://manikanta-portfolio-seven.vercel.app

**GitHub**

https://github.com/Manikanta679

**LinkedIn**

https://www.linkedin.com/in/manikanta-engalligi

---

## License

This project is intended for educational, professional, and portfolio purposes.

© 2026 Manikanta Engalligi. All Rights Reserved.