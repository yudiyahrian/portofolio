import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "1",
    slug: "quilla",
    title: "Quilla — HR Management Platform",
    tagline: "Integrated Employee, Attendance & Payroll System",
    description:
      "An integrated web and mobile HR platform for managing employee data, attendance, and payroll from a single dashboard. Built with Next.js and Laravel at PT Light Code Digital.",
    longDescription: `Quilla is a full-featured HR management platform built for PT Light Code Digital, designed to replace fragmented spreadsheets and manual processes with a single integrated system.

The web application handles all core HR workflows: employee onboarding and profile management, daily attendance tracking with real-time status updates, and a complete payroll engine that calculates salaries, deductions, and tax components automatically.

The backend is powered by Laravel, exposing a clean REST API consumed by both the Next.js web frontend and a companion Flutter mobile application. This dual-client architecture allows HR managers to operate from their desktops while employees can clock in, view their schedules, and check payslips from their phones.

UI/UX was designed in Figma before implementation, ensuring a consistent visual language across both web and mobile surfaces.`,
    image: "/images/quilla/thumbnail_quilla.webp",
    images: [
      "/images/quilla/ss1.webp",
      "/images/quilla/ss2.webp",
      "/images/quilla/ss3.webp",
      "/images/quilla/ss4.webp",
      "/images/quilla/ss5.webp",
    ],
    tech: [
      "Next.js",
      "Laravel",
      "Flutter",
      "MySQL",
      "Tailwind CSS",
      "Figma",
      "REST API",
    ],
    category: "fullstack",
    featured: true,
    status: "completed",
    year: 2025,
    achievements: [
      "Unified employee data, attendance, and payroll into one platform",
      "Available as both a web app and a Flutter mobile app",
      "Designed end-to-end in Figma before implementation",
    ],
    challenges:
      "Keeping the Flutter mobile app and Next.js web app in perfect sync with a shared Laravel backend while maintaining a consistent UX across both platforms.",
    solution:
      "Designed a well-versioned REST API in Laravel and used shared data contracts between client apps. Managed state on mobile with a scalable BLoC pattern and used React Query on web for server-state synchronization.",
  },
  {
    id: "2",
    slug: "media-center",
    title: "Media Center",
    tagline: "Real-Time Remote Content Management System",
    description:
      "A web application enabling users to manage and broadcast digital content remotely in real time. Built with Next.js and Socket.io for PT Light Code Digital.",
    longDescription: `Media Center is a remote content management platform developed for PT Light Code Digital, enabling administrators to push, schedule, and monitor digital content across multiple screens from a central web dashboard.

The system uses Socket.io for bidirectional real-time communication, so content changes made on the admin dashboard are instantly reflected on connected display screens without requiring a page refresh. This makes it suitable for digital signage, media walls, and presentation systems.

The entire UI was first designed in Figma, then built with Next.js and Tailwind CSS. The real-time layer handles connection state management, reconnection logic, and message queuing to ensure reliable delivery even on unstable connections.`,
    image: "/images/media_center/thumbnail_mediacenter.webp",
    images: [
      "/images/media_center/ss1.webp",
      "/images/media_center/ss2.webp",
      "/images/media_center/ss3.webp",
      "/images/media_center/ss4.webp",
    ],
    tech: ["Next.js", "Socket.io", "TypeScript", "Tailwind CSS", "Figma"],
    category: "web",
    featured: true,
    status: "completed",
    year: 2025,
    achievements: [
      "Real-time content sync across all connected screens via WebSockets",
      "Designed full UI/UX in Figma before building",
      "Delivered within a 3-month timeline at PT Light Code Digital",
    ],
    challenges:
      "Ensuring reliable real-time delivery of content updates to clients simultaneously, with graceful handling of dropped connections.",
    solution:
      "Implemented Socket.io rooms to group displays by channel, added reconnection logic with exponential backoff, and built a message queue that replays missed updates on reconnect.",
  },
  {
    id: "3",
    slug: "audify",
    title: "Audify — Audit Management System",
    tagline: "Quality Audit, Quality Result",
    description:
      "An enterprise Audit Management System developed at PT Light Code Digital to make the audit process more organized, trackable, and results-driven.",
    longDescription: `Audify is an internal enterprise tool built for PT Light Code Digital under their motto "Quality Audit, Quality Result". The system centralizes the entire audit lifecycle — from audit planning and team assignment, through evidence collection, to findings reporting and resolution tracking.

The dashboard gives managers a bird's-eye view of all active audit projects, their statuses, and team assignments. Auditors get their own task queue showing what needs supervision, what needs guidance, and what they are personally responsible for auditing.

The project was built with Flutter for the frontend and a Firebase for the backend. Role-based access control differentiates between Manager in Charge, Leader, and Team Member views, ensuring each user only sees what is relevant to their role.`,
    image: "/images/audify/thumbnail_audify.webp",
    images: [
      "/images/audify/proses.webp",
      "/images/audify/ss1.webp",
      "/images/audify/ss2.webp",
      "/images/audify/ss3.webp",
      "/images/audify/ss4.webp",
      "/images/audify/ss5.webp",
    ],
    tech: ["Dart", "Flutter", "Firebase", "Sqlite"],
    category: "fullstack",
    featured: true,
    status: "completed",
    year: 2025,
    achievements: [
      "Full audit lifecycle tracking from planning to resolution",
      "Unified dashboard showing all active projects and statuses",
    ],
    challenges:
      "Designing role-based access control complex enough to represent real audit hierarchies without making the UI confusing for end users.",
    solution:
      "Built a three-tier RBAC system in Laravel using policies and gates, with the frontend conditionally rendering views based on the authenticated user's role returned from the API.",
  },
  {
    id: "4",
    slug: "filenta",
    title: "Filenta — AI Document Management",
    tagline: "Structured, Fast, and Secure Digital Archive with AI",
    description:
      "An AI-integrated document management system that automates and enhances digital archive workflows, making document storage, retrieval, and tracking smarter and more efficient.",
    longDescription: `Filenta is a next-generation document management system developed to modernize the way organizations handle their digital archives. By integrating AI into the document pipeline, Filenta automates tasks that were previously manual and error-prone.

Key capabilities include intelligent document classification (automatically categorizing uploaded files), smart search that understands content rather than just filenames, and AI-assisted metadata tagging to improve discoverability.

The system was built with a focus on security and structure — documents are stored with a full version history, access logs, and permission management per folder and file. The UI presents a familiar file-explorer-style interface that keeps the power of AI accessible without overwhelming users.`,
    image: "/images/filenta/thumbnail_filenta.webp",
    images: [
      "/images/filenta/ss1.webp",
      "/images/filenta/ss2.webp",
      "/images/filenta/ss3.webp",
      "/images/filenta/ss4.webp",
      "/images/filenta/ss5.webp",
      "/images/filenta/ss6.webp",
      "/images/filenta/ss7.webp",
    ],
    tech: [
      "Flutter",
      "Pocketbase",
      "AI Integration",
      "Sqlite",
      "Go",
      "Python",
      "Ollama",
      "FastAPI",
    ],
    category: "ai",
    featured: true,
    status: "in-progress",
    year: 2025,
    achievements: [
      "AI-powered document classification and smart metadata tagging",
      "Full version history and audit log per document",
      "Role-based file and folder permission management",
    ],
    challenges:
      "Integrating AI document classification into a familiar, non-technical UX without adding friction to the upload and retrieval flow.",
    solution:
      "Built an async processing pipeline where AI classification runs in the background after upload, progressively enriching document metadata without blocking the user's workflow.",
  },
  {
    id: "5",
    slug: "breadit",
    title: "Breadit — Social Media Platform",
    tagline: "A Reddit-Inspired Community Web App",
    description:
      "A Reddit-style social media web application built with Next.js, Prisma, and MySQL. Full-stack implementation from Figma design through to database schema and API.",
    longDescription: `Breadit is a social media platform built as a school capstone project at SMK Taruna Bhakti, inspired by Reddit's community-driven model. Users can create posts, like and comment, and see a personalized home feed.

The entire project was solo-built: UI/UX designed in Figma, frontend built with Next.js 14 and Tailwind CSS, backend handled through Next.js API routes, and data persistence through Prisma ORM connected to a MySQL database.

Features include user authentication, post creation with rich text, nested comments, like system. The project was completed within a tight 2-month window as a student project.`,
    image: "/images/breadit/thumbnail_breadit.webp",
    images: [
      "/images/breadit/ss1.webp",
      "/images/breadit/ss2.webp",
      "/images/breadit/ss3.webp",
      "/images/breadit/ss4.webp",
      "/images/breadit/ss5.webp",
    ],
    tech: ["Next.js", "Tailwind CSS", "Prisma", "MySQL", "TypeScript", "Figma"],
    category: "fullstack",
    github: "https://github.com/yudiyahrian/breadit",
    featured: false,
    status: "completed",
    year: 2024,
    achievements: [
      "Full-stack solo project from Figma design to deployed product",
      "Community posts, nested comments, and voting system",
      "Built and shipped in under 2 months as a student project",
    ],
    challenges:
      "Implementing a performant nested comment tree that could scale without becoming unwieldy to query or render.",
    solution:
      "Used a recursive Prisma relation for comments with a depth limit of 3 levels, and client-side recursive rendering with memoization to prevent unnecessary re-renders.",
  },
  {
    id: "6",
    slug: "smoos",
    title: "SMOOS — School Monitoring System",
    tagline: "Mobile-First Student Payment & Attendance Tracker",
    description:
      "A mobile app-based school information system for monitoring student bill payments, enabling parent payments anywhere, and providing real-time attendance updates.",
    longDescription: `SMOOS (School Monitoring System) is a Flutter-based mobile application designed to bridge communication between schools and parents around two key concerns: payment tracking and student attendance.

The system has two interfaces — one for school administrators and one for parents. School staff can record attendance, issue bills, and send real-time notifications. Parents can view their child's attendance record, see outstanding bills, and make payments directly from the app from anywhere.

Firebase provides the real-time notification layer for instant parent alerts on attendance and payment reminders.`,
    image: "/images/smoos/thumbnail_smoos.webp",
    images: [
      "/images/smoos/ss1.webp",
      "/images/smoos/ss2.webp",
      "/images/smoos/ss3.webp",
    ],
    tech: ["Flutter", "Dart", "Firebase", "Midtrans"],
    category: "mobile",
    featured: false,
    status: "completed",
    year: 2024,
    achievements: [
      "Dual interface — separate flows for school staff and parents",
      "Real-time attendance notifications pushed to parents instantly",
    ],
    challenges: "Handling real time data for parent",
    solution: "Implemented real time with firebase firestore with caution",
  },
  {
    id: "7",
    slug: "e-starby",
    title: "E-Starby — Digital Library App",
    tagline: "A New Way to Reading",
    description:
      "A digital library mobile application built with Flutter and Firebase, enabling users to discover, organize, and read books across genres from their mobile device.",
    longDescription: `E-Starby (Starbook Library) is a Flutter-based digital library app developed at SMK Taruna Bhakti. The app aims to make reading more accessible by offering a curated catalog of books across various genres.

Users can browse by genre (Adventure, News, etc.), search by title or author, create a personal reading list, and track their reading progress. The authentication flow supports email/password login as well as Google Sign-In and Apple Sign-In.

Firebase Firestore serves as the backend database for book metadata and user reading lists, while Firebase Authentication handles the identity layer. The UI was built with Flutter's Material Design components, customized for a clean, dark-themed reading experience.`,
    image: "/images/elibrary/thumbnail_elibrary.webp",
    images: [
      "/images/elibrary/ss1.webp",
      "/images/elibrary/ss2.webp",
      "/images/elibrary/ss3.webp",
      "/images/elibrary/ss4.webp",
      "/images/elibrary/ss5.webp",
      "/images/elibrary/ss6.webp",
      "/images/elibrary/ss7.webp",
    ],
    tech: [
      "Flutter",
      "Dart",
      "Firebase",
      "Firestore",
      "Firebase Auth",
      "Google Sign-In",
    ],
    category: "mobile",
    featured: false,
    status: "completed",
    year: 2023,
    achievements: [
      "Google Sign-In alongside email/password auth",
      "Personalized reading list and progress tracking per user",
      "Genre-based browsing and full-text search by title or author",
    ],
    challenges:
      "Providing a fast, low-latency browsing experience on a large book catalog stored in Firestore without incurring excessive read costs.",
    solution:
      "Implemented cursor-based Firestore pagination and client-side caching with Flutter's built-in state management, loading only the visible page of results at a time.",
  },
  {
    id: "8",
    slug: "dac-education-center",
    title: "DAC Education Center (DEC)",
    tagline: "Online Programming Course Platform",
    description:
      "A web-based learning platform providing programming courses for career starters, built with Flutter Web and Firebase during an internship at PT DAC Solution Informatika.",
    longDescription: `DAC Education Center (DEC) is an e-learning platform developed as part of the internship at PT DAC Solution Informatika. The platform is designed for learners who want to start or advance their careers in software development.

Courses are organized by topic and difficulty level, with video lessons, written content, and progress tracking per user. The platform was intentionally built with Flutter Web to demonstrate Flutter's capability as a cross-platform framework beyond just mobile.

Firebase powers the backend: Firestore stores course content and user progress, Firebase Auth handles login, and Firebase Storage hosts course videos and assets. The platform was designed to be easily extended with new courses without code changes — course content is data-driven from Firestore.`,
    image: "/images/dec/thumbnail_dec.webp",
    images: [
      "/images/dec/ss1.webp",
      "/images/dec/ss2.webp",
      "/images/dec/ss3.webp",
      "/images/dec/ss4.webp",
      "/images/dec/ss5.webp",
      "/images/dec/ss6.webp",
    ],
    tech: [
      "Flutter Web",
      "Dart",
      "Firebase",
      "Firestore",
      "Firebase Storage",
      "Firebase Auth",
    ],
    category: "web",
    featured: false,
    status: "completed",
    year: 2023,
    achievements: [
      "Data-driven course content — new courses added without code changes",
      "Per-user progress tracking stored in Firestore",
      "Built with Flutter Web, showcasing cross-platform capability",
    ],
    challenges:
      "Making Flutter Web feel performant and native-like for a content-heavy educational platform, where initial load time is critical.",
    solution:
      "Used Flutter's deferred loading for non-critical course content widgets, lazy-loaded video players only on demand, and optimized Firestore queries with selective field projection to minimize payload size.",
  },
  {
    id: "9",
    slug: "weathery",
    title: "Weathery — Flutter Weather App",
    tagline: "Clean and Accurate Weather Forecasts",
    description:
      "A beautifully designed weather forecast Flutter app using the OpenWeatherMap API, showing current conditions and a 5-day forecast with a clean dark UI.",
    longDescription: `Weathery is a personal Flutter project built to deepen understanding of API integration, state management, and responsive mobile UI design.

The app fetches real-time weather data from the OpenWeatherMap API, displaying current temperature, humidity, wind speed, and a rolling 5-day forecast for the user's selected location.

The UI features a clean dark theme with weather-condition-aware icons and background gradients — sunny days show warm tones, rainy days shift to cool blues. The app served as a practical exercise in clean architecture, separating the API layer, domain models, and UI widgets cleanly.`,
    image: "/images/weathery/thumbnail_weathery.webp",
    images: ["/images/weathery/ss1.webp", "/images/weathery/ss2.webp"],
    tech: [
      "Flutter",
      "Dart",
      "OpenWeatherMap API",
      "Geolocator",
      "Clean Architecture",
    ],
    category: "mobile",
    github: "https://github.com/yudiyahrian/weathery",
    featured: false,
    status: "completed",
    year: 2023,
    achievements: [
      "GPS-based auto-location detection on app launch",
      "5-day forecast with condition-aware UI theming",
      "Clean architecture with separated data, domain, and presentation layers",
    ],
    challenges: "Handling data from the OpenWeatherMap API",
    solution:
      "Create a model to transform JSON from API into dart language model",
  },
  {
    id: "10",
    slug: "counseling-web-app",
    title: "Counseling Web App",
    tagline: "Landing Page & Dashboard for Student Counseling",
    description:
      "A counseling web application with a public landing page and a secure admin dashboard, built with Laravel to help manage student counseling sessions and records.",
    longDescription: `The Counseling Web App is a full-stack Laravel project designed to support school counseling departments in managing their student sessions digitally.

The public-facing landing page introduces the counseling program, its objectives, and provides a way for students to request an appointment. The admin dashboard allows counselors to manage their session calendar, and track student records over time.

The entire application is built on Laravel, using Blade templates for server-rendered views and MySQL for data persistence. User authentication, CSRF protection, and role-based access between counselors and administrators are handled by Laravel's built-in auth scaffolding.`,
    image: "/images/counseling/thumbnail_counseling.webp",
    images: [
      "/images/counseling/ss1.webp",
      "/images/counseling/ss2.webp",
      "/images/counseling/ss3.webp",
      "/images/counseling/ss4.webp",
    ],
    tech: ["Laravel", "PHP", "MySQL", "Blade", "Tailwind CSS"],
    category: "web",
    featured: false,
    status: "completed",
    year: 2024,
    achievements: [
      "Public landing page plus secure counselor dashboard in one app",
      "Student appointment request and session tracking system",
      "Role-based access between counselors and administrators",
    ],
    challenges:
      "Designing a system simple enough for non-technical school counselors to use daily without any training overhead.",
    solution:
      "Conducted a brief discovery session with the intended users and stripped the dashboard to only the core actions: view upcoming sessions, log a new session, and search student history.",
  },
  {
    id: "11",
    slug: "web-fighting-game",
    title: "Web Fighting Game",
    tagline: "JavaScript Beyond the Basics",
    description:
      "A browser-based 2D fighting game built purely with JavaScript, HTML Canvas, and CSS — showcasing advanced JS capabilities far beyond typical website use.",
    longDescription: `Web Fighting Game is a personal creative project built to demonstrate that JavaScript is a serious game development tool, not just a scripting language for websites.

The game runs entirely in the browser using the HTML5 Canvas API for rendering, with a custom game loop handling 60fps updates. Two characters face off in a side-scrolling arena with attack animations, health bars, collision detection, and a timer countdown.

The project covers concepts including sprite sheet animation, frame-by-frame rendering, keyboard event handling for simultaneous key presses, hitbox collision detection, and a simple finite state machine for character states (idle, running, jumping, attacking, dead).

This project was built as both a learning exercise and a portfolio piece to demonstrate JavaScript proficiency beyond DOM manipulation.`,
    image: "/images/webfighting/thumbnail_webfighting.webp",
    images: [
      "/images/webfighting/ss1.webp",
      "/images/webfighting/ss2.webp",
      "/images/webfighting/ss3.webp",
    ],
    tech: [
      "JavaScript",
      "HTML5 Canvas",
      "CSS",
      "Sprite Animation",
      "Game Loop",
    ],
    category: "web",
    github: "https://github.com/yudiyahrian/web-fighting-game",
    featured: false,
    status: "completed",
    year: 2024,
    achievements: [
      "60fps game loop with HTML5 Canvas rendering",
      "Sprite sheet animation system for character states",
      "Hitbox collision detection and two-player keyboard controls",
    ],
    challenges:
      "Achieving smooth 60fps animation with sprite sheets while handling simultaneous keyboard inputs for two players without key conflicts.",
    solution:
      "Built a keystate map that tracks all currently pressed keys rather than relying on keydown/keyup events, and used requestAnimationFrame with a delta-time calculation for frame-rate-independent movement.",
  },
  {
    id: "12",
    slug: "light-code-digital-website",
    title: "Light Code Digital Website",
    tagline: "Company Profile Website in React JS",
    description:
      "A company profile website for Light Code Digital, built with React JS, presenting the company's services, products, and contact information in a clean, modern layout.",
    longDescription: `The Light Code Digital company profile website is a React JS application built to establish the agency's online presence and communicate its services to potential clients.

The site covers the company's profile, services offered, featured products, and a contact section. It was built as a single-page application using React with smooth scroll-based navigation between sections.

The project introduced structured component architecture — reusing layout components, section components, and UI primitives — and served as a practical introduction to building production-quality React apps without a full framework like Next.js.`,
    image: "/images/lcd/thumbnail_lcd.webp",
    images: [
      "/images/lcd/ss1.webp",
      "/images/lcd/ss2.webp",
      "/images/lcd/ss3.webp",
      "/images/lcd/ss4.webp",
      "/images/lcd/ss5.webp",
    ],
    tech: ["React JS", "JavaScript", "CSS", "HTML"],
    category: "web",
    featured: false,
    status: "completed",
    year: 2024,
    achievements: [
      "Full company profile with services, products, and contact sections",
      "Single-page application with smooth scroll navigation",
      "Reusable React component architecture",
    ],
    challenges:
      "Delivering a professional-looking site quickly without a full CSS framework, while keeping the code maintainable.",
    solution:
      "Used CSS Modules for scoped component styling, avoiding class name conflicts and keeping styles co-located with their components for easy maintenance.",
  },
];

export const getFeaturedProjects = () => projects.filter((p) => p.featured);
export const getProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);
export const getProjectsByCategory = (category: string) =>
  category === "all"
    ? projects
    : projects.filter((p) => p.category === category);
