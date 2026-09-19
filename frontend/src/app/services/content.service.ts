import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';

export interface PortfolioData {
  personalInfo: {
    name: string;
    title: string;
    subtitle: string;
    role: string;
    experienceYears: string;
    email: string;
    phone: string;
    location: string;
    currentRole: string;
    summary: string;
    github: string;
    linkedin: string;
    liveSite: string;
  };
  keyAchievements: string[];
  statsData: {
    productionApis: string;
    reliabilityBoost: string;
    errorReduction: string;
    jwtSecurity: string;
  };
  experiences?: any[];
  experience?: any[];
  projects: any[];
  skills: any;
  education: any[];
  certifications: any[];
}

export const defaultPortfolioData: PortfolioData = {
  personalInfo: {
    name: "Amit Kumar Maurya",
    title: "Full Stack Developer | Angular | ASP.NET Core | C# | SQL Server | REST APIs",
    subtitle: "Full Stack Developer | Angular | ASP.NET Core | C# | SQL Server | REST APIs",
    role: "Full Stack Developer | Angular & ASP.NET Core",
    experienceYears: "3+ Years Experience",
    email: "amitmaury921@gmail.com",
    phone: "+91 7428409883",
    location: "Lucknow, Uttar Pradesh",
    currentRole: "Junior Backend Developer @ Infogateway IT Solutions",
    summary: "'Full Stack' Developer with 3+ years of total IT experience, comprising 2+ years as a Software QA Engineer and 1+ year as a Backend Developer. Specializes in Angular, ASP.NET Core, .NET 10, C#, SQL Server, and Entity Framework Core, building secure RESTful APIs and responsive SPAs with JWT authentication and role-based access control. Strong QA foundation ensures production-ready, well-tested, maintainable code.",
    github: "https://github.com/amiitmaurya",
    linkedin: "https://linkedin.com/in/amit-mauryaa",
    liveSite: "https://amit.infogatewayitsolution.com"
  },
  keyAchievements: [
    "Developed 10+ production-ready REST APIs using ASP.NET Core/MVC.",
    "Building working proficiency in Angular and TypeScript to develop responsive SPA front ends that consume ASP.NET Core Web APIs.",
    "Implemented JWT authentication and role-based access control across all endpoints.",
    "Reduced runtime errors by 25% through global exception handling and validation middleware.",
    "Improved overall API reliability by 30% through optimized architecture and database design."
  ],
  statsData: {
    productionApis: "10+",
    reliabilityBoost: "30%",
    errorReduction: "25%",
    jwtSecurity: "100%"
  },
  experiences: [
    {
      id: 1,
      role: "Junior Backend Developer",
      company: "Infogateway IT Solutions",
      location: "Gorakhpur, UP (Hybrid)",
      period: "Aug 2025 – Present",
      type: "Full-Time",
      desc: "Designed and developed 10+ RESTful APIs with ASP.NET Core/MVC, improving API reliability by 30% and reducing runtime errors by 25%.",
      bulletsText: "Designed and developed 10+ RESTful APIs with ASP.NET Core/MVC, improving API reliability by 30% and reducing runtime errors by 25%.\nImplemented JWT-based authentication, role-based access control, and CORS policies to secure all API endpoints for Angular front-end integration.\nDesigned SQL Server database schemas and optimized stored procedures for efficient, high-performance data retrieval.\nBuilt global exception handling and server-side validation middleware, significantly improving system stability.\nCollaborated closely with frontend and QA teams on defect resolution, API integration, and smooth deployment cycles.",
      bullets: [
        "Designed and developed 10+ RESTful APIs with ASP.NET Core/MVC, improving API reliability by 30% and reducing runtime errors by 25%.",
        "Implemented JWT-based authentication, role-based access control, and CORS policies to secure all API endpoints for Angular front-end integration.",
        "Designed SQL Server database schemas and optimized stored procedures for efficient, high-performance data retrieval.",
        "Built global exception handling and server-side validation middleware, significantly improving system stability.",
        "Collaborated closely with frontend and QA teams on defect resolution, API integration, and smooth deployment cycles."
      ]
    },
    {
      id: 2,
      role: "Software Quality Assurance Engineer",
      company: "Microware Computing & Consulting Pvt Ltd",
      location: "Gurugram, HR (Remote)",
      period: "Jun 2023 – Jul 2025",
      type: "Full-Time",
      desc: "Designed and executed 100–150 test cases per release cycle for web and API-based applications, ensuring comprehensive coverage.",
      bulletsText: "Designed and executed 100–150 test cases per release cycle for web and API-based applications, ensuring comprehensive coverage.\nPerformed API testing via Postman and automated test scenarios using Selenium WebDriver, reducing manual testing effort by 35%.\nValidated database records using SQL queries; tracked and reported defects systematically in JIRA across multiple release cycles.\nContributed to a 30% reduction in production bugs and improved overall product quality through rigorous testing practices.",
      bullets: [
        "Designed and executed 100–150 test cases per release cycle for web and API-based applications, ensuring comprehensive coverage.",
        "Performed API testing via Postman and automated test scenarios using Selenium WebDriver, reducing manual testing effort by 35%.",
        "Validated database records using SQL queries; tracked and reported defects systematically in JIRA across multiple release cycles.",
        "Contributed to a 30% reduction in production bugs and improved overall product quality through rigorous testing practices."
      ]
    },
    {
      id: 3,
      role: "Freelance Software Tester",
      company: "Freelancer.com",
      location: "Remote",
      period: "Aug 2022 – May 2023",
      type: "Freelance",
      desc: "Delivered manual and API testing for 4–5 client applications, identifying and documenting critical functional defects.",
      bulletsText: "Delivered manual and API testing for 4–5 client applications, identifying and documenting critical functional defects.\nExecuted end-to-end test scenarios across diverse project types, improving client application reliability by 20%+.\nProvided detailed testing reports and defect logs, helping clients resolve issues before production deployment.",
      bullets: [
        "Delivered manual and API testing for 4–5 client applications, identifying and documenting critical functional defects.",
        "Executed end-to-end test scenarios across diverse project types, improving client application reliability by 20%+.\nProvided detailed testing reports and defect logs, helping clients resolve issues before production deployment."
      ]
    }
  ],
  experience: [
    {
      id: 1,
      role: "Junior Backend Developer",
      company: "Infogateway IT Solutions",
      location: "Gorakhpur, UP (Hybrid)",
      period: "Aug 2025 – Present",
      type: "Full-Time",
      desc: "Designed and developed 10+ RESTful APIs with ASP.NET Core/MVC, improving API reliability by 30% and reducing runtime errors by 25%.",
      bullets: [
        "Designed and developed 10+ RESTful APIs with ASP.NET Core/MVC, improving API reliability by 30% and reducing runtime errors by 25%.",
        "Implemented JWT-based authentication, role-based access control, and CORS policies to secure all API endpoints for Angular front-end integration.",
        "Designed SQL Server database schemas and optimized stored procedures for efficient, high-performance data retrieval.",
        "Built global exception handling and server-side validation middleware, significantly improving system stability.",
        "Collaborated closely with frontend and QA teams on defect resolution, API integration, and smooth deployment cycles."
      ]
    },
    {
      id: 2,
      role: "Software Quality Assurance Engineer",
      company: "Microware Computing & Consulting Pvt Ltd",
      location: "Gurugram, HR (Remote)",
      period: "Jun 2023 – Jul 2025",
      type: "Full-Time",
      desc: "Designed and executed 100–150 test cases per release cycle for web and API-based applications, ensuring comprehensive coverage.",
      bullets: [
        "Designed and executed 100–150 test cases per release cycle for web and API-based applications, ensuring comprehensive coverage.",
        "Performed API testing via Postman and automated test scenarios using Selenium WebDriver, reducing manual testing effort by 35%.",
        "Validated database records using SQL queries; tracked and reported defects systematically in JIRA across multiple release cycles.",
        "Contributed to a 30% reduction in production bugs and improved overall product quality through rigorous testing practices."
      ]
    },
    {
      id: 3,
      role: "Freelance Software Tester",
      company: "Freelancer.com",
      location: "Remote",
      period: "Aug 2022 – May 2023",
      type: "Freelance",
      desc: "Delivered manual and API testing for 4–5 client applications, identifying and documenting critical functional defects.",
      bullets: [
        "Delivered manual and API testing for 4–5 client applications, identifying and documenting critical functional defects.",
        "Executed end-to-end test scenarios across diverse project types, improving client application reliability by 20%+.",
        "Provided detailed testing reports and defect logs, helping clients resolve issues before production deployment."
      ]
    }
  ],
  projects: [
    {
      id: 1,
      title: "Mini Swiggy Clone",
      subtitle: "Production-Ready Food Ordering Platform",
      category: "Full-Stack",
      badge: "Angular 22 + .NET 10",
      description: "Developed a production-ready food ordering platform using ASP.NET Core .NET 10, Angular 22, SQL Server, and Entity Framework Core following Clean Architecture, Repository Pattern, Unit of Work, SOLID, and DRY principles.",
      features: [
        "Implemented JWT authentication, role-based authorization, restaurant, category, food item, cart, and user management modules with RESTful APIs and Angular SPA integration.",
        "Built responsive Angular UI with authentication, restaurant browsing, cart management, API integration, and reusable components.",
        "Integrated global exception handling, Dependency Injection, EF Core, LINQ, server-side validation, Swagger, and Postman testing for scalable, maintainable development."
      ],
      tech: ["ASP.NET Core (.NET 10)", "Angular 22", "TypeScript", "C#", "SQL Server", "EF Core", "JWT", "Clean Architecture", "Swagger", "Git"],
      githubUrl: "https://github.com/amiitmaurya",
      liveUrl: "https://amit.infogatewayitsolution.com"
    },
    {
      id: 2,
      title: "Hotel ERP Management System",
      subtitle: "Enterprise Reservation & Room Management Platform",
      category: "Backend",
      badge: "ASP.NET Core MVC",
      description: "Built a complete Hotel ERP system using ASP.NET Core MVC with modules for room management, booking/reservations, customer management, and a centralized admin dashboard.",
      features: [
        "Implemented role-based authentication and authorization (Admin/Staff), session-based security, and file upload validation for customer identity proofs.",
        "Designed dashboard analytics for total rooms, bookings, availability, and occupancy; structured the codebase using Controllers, Models, Views, ViewModels, and Services with Entity Framework Core."
      ],
      tech: ["C#", "ASP.NET Core MVC", "Entity Framework Core", "LINQ", "SQL Server", "Bootstrap", "JavaScript", "jQuery"],
      githubUrl: "https://github.com/amiitmaurya",
      liveUrl: "#"
    },
    {
      id: 3,
      title: "Expense Tracker System",
      subtitle: "Personal Finance & Spending Analytics Platform",
      category: "Full-Stack",
      badge: ".NET 10 + EF Core",
      description: "Built full-featured expense management with CRUD, input validation, spending analytics, and income/expense dashboard.",
      features: [
        "Integrated SQL Server with stored procedures for performant data operations.",
        "Added visual charts and spending breakdown by categories."
      ],
      tech: ["C#", "ASP.NET MVC", "SQL Server", "Stored Procedures", "HTML5/CSS3", "JavaScript"],
      githubUrl: "https://github.com/amiitmaurya",
      liveUrl: "#"
    },
    {
      id: 4,
      title: "Personal Portfolio Website",
      subtitle: "Full-Stack Developer Portfolio with Admin Panel",
      category: "Full-Stack",
      badge: "Angular + ASP.NET Core",
      description: "Full-stack developer portfolio application with contact form backed by SQL Server, JWT admin authentication, and dynamic message management panel.",
      features: [
        "Architected secure RESTful API endpoints using ASP.NET Core with SQL Server Entity Framework Core integration.",
        "Built responsive Angular Single Page Application (SPA) with dynamic content rendering, form validation, and real-time state management.",
        "Implemented Admin Control Panel for full CRUD operations, security credential management, and contact message inbox processing."
      ],
      tech: ["C#", "ASP.NET Core", "SQL Server", "EF Core", "Angular", "TypeScript", "JavaScript", "Bootstrap"],
      githubUrl: "https://github.com/amiitmaurya/Personal_Portfolio",
      liveUrl: "https://amit.infogatewayitsolution.com"
    }
  ],
  skills: {
    languages: ["C#", "TypeScript", "JavaScript"],
    frontend: ["Angular (Angular 22)", "Angular CLI", "Angular Routing", "Angular Forms (Reactive & Template-Driven)", "RxJS", "Angular Services", "Component-Based Architecture", "Single Page Applications (SPA)", "HTML5", "CSS3", "Bootstrap", "jQuery", "Responsive Web Design"],
    backend: [".NET 10", "ASP.NET Core", "ASP.NET Core Web API", "ASP.NET MVC", ".NET Framework", "Entity Framework Core", "RESTful APIs", "JWT Authentication", "Role-Based Authorization", "CORS", "Dependency Injection", "Middleware", "Async/Await", "Exception Handling"],
    database: ["SQL Server", "Stored Procedures", "Database Design", "LINQ"],
    testingTools: ["Manual Testing", "API Testing (Postman)", "Selenium WebDriver", "QA Automation", "Agile/Scrum"],
    tools: ["Git", "GitHub", "Visual Studio", "Visual Studio Code", "Swagger", "JIRA", "Postman", "npm"],
    concepts: ["OOP", "SOLID Principles", "Repository Pattern", "Data Structures & Algorithms", "Server-Side Validation", "Clean Architecture", "SDLC", "Full Stack Development"]
  },
  education: [
    {
      id: 1,
      degree: "Master of Computer Application (MCA)",
      institution: "J.S. University, Shikohabad",
      year: "2023 – 2025"
    },
    {
      id: 2,
      degree: "Bachelor of Computer Application (BCA)",
      institution: "DDU Gorakhpur University",
      year: "2018 – 2021"
    }
  ],
  certifications: [
    {
      id: 1,
      title: "Backend Development Trainee Certificate",
      issuer: "Infogateway IT Solutions",
      period: "April 2026"
    },
    {
      id: 2,
      title: "Software Testing Professional Certificate",
      issuer: "Q-Spiders Training Institute",
      period: "May 2023"
    }
  ]
};

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private apiUrl = 'http://localhost:5000/api/content';
  private contentSubject: BehaviorSubject<PortfolioData>;
  public content$: Observable<PortfolioData>;

  private sanitizePortfolioData(incoming: any): PortfolioData {
    if (!incoming) return defaultPortfolioData;
    const merged: PortfolioData = {
      ...defaultPortfolioData,
      ...incoming,
      personalInfo: { ...defaultPortfolioData.personalInfo, ...(incoming.personalInfo || {}) },
      statsData: { ...defaultPortfolioData.statsData, ...(incoming.statsData || {}) },
      skills: { ...defaultPortfolioData.skills, ...(incoming.skills || {}) }
    };

    if (Array.isArray(merged.projects)) {
      merged.projects = merged.projects.map((p: any) => {
        const def = defaultPortfolioData.projects.find((d: any) => d.id === p.id || d.title?.toLowerCase() === p.title?.toLowerCase());
        if (def) {
          const techList = (p.tech && Array.isArray(p.tech) && p.tech.length > 0 && !p.tech.includes('React')) ? p.tech : def.tech;
          return {
            ...def,
            ...p,
            description: (p.description && p.description.trim()) ? p.description : def.description,
            features: (p.features && Array.isArray(p.features) && p.features.length > 0) ? p.features : def.features,
            tech: techList
          };
        }
        return p;
      });
    } else {
      merged.projects = defaultPortfolioData.projects;
    }

    return merged;
  }

  constructor(private http: HttpClient) {
    const savedLocal = localStorage.getItem('master_portfolio_data');
    let initialData = defaultPortfolioData;
    if (savedLocal) {
      try {
        const parsedLocal = JSON.parse(savedLocal);
        initialData = this.sanitizePortfolioData(parsedLocal);
      } catch (e) {
        initialData = this.sanitizePortfolioData(defaultPortfolioData);
      }
    } else {
      initialData = this.sanitizePortfolioData(defaultPortfolioData);
    }
    this.contentSubject = new BehaviorSubject<PortfolioData>(initialData);
    this.content$ = this.contentSubject.asObservable();
    this.fetchContentFromBackend();
  }

  public get currentContent(): PortfolioData {
    return this.contentSubject.value;
  }

  public async fetchContentFromBackend(): Promise<PortfolioData> {
    try {
      const data = await firstValueFrom(this.http.get<any>(this.apiUrl));
      if (data) {
        let parsed = data;
        if (typeof data === 'string') {
          try { parsed = JSON.parse(data); } catch (e) {}
        }
        if (parsed && (parsed.personalInfo || parsed.projects)) {
          const merged = this.sanitizePortfolioData(parsed);
          localStorage.setItem('master_portfolio_data', JSON.stringify(merged));
          this.contentSubject.next(merged);
          try {
            await firstValueFrom(this.http.put<any>(this.apiUrl, merged));
          } catch (e) {}
          return merged;
        }
      }
    } catch (err) {
      console.warn('Backend API offline, using local cached portfolio data.');
    }
    return this.contentSubject.value;
  }

  public async updateContent(data: PortfolioData): Promise<boolean> {
    const merged = this.sanitizePortfolioData({ ...this.currentContent, ...data });
    localStorage.setItem('master_portfolio_data', JSON.stringify(merged));
    this.contentSubject.next(merged);

    try {
      const res = await firstValueFrom(this.http.put<any>(this.apiUrl, merged));
      if (res && res.data) {
        let serverData = res.data;
        if (typeof serverData === 'string') {
          try { serverData = JSON.parse(serverData); } catch (e) {}
        }
        const updated = this.sanitizePortfolioData(serverData);
        localStorage.setItem('master_portfolio_data', JSON.stringify(updated));
        this.contentSubject.next(updated);
      }
      return true;
    } catch (err) {
      console.warn('Failed to sync content to SQL backend API:', err);
      return false;
    }
  }
}
