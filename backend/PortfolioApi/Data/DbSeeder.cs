namespace PortfolioApi.Data
{
    using PortfolioApi.Models;
    using System.Text.Json;

    /// <summary>
    /// Defines the <see cref="DbSeeder" />.
    /// </summary>
    public static class DbSeeder
    {
        /// <summary>
        /// The Seed.
        /// </summary>
        /// <param name="context">The context<see cref="PortfolioDbContext"/>.</param>
        public static void Seed(PortfolioDbContext context)
        {
            context.Database.EnsureCreated();

            // 1. Seed Admin User
            var existingAdmin = context.AdminUsers.FirstOrDefault();
            if (existingAdmin == null)
            {
                context.AdminUsers.Add(new AdminUser
                {
                    Username = "Amit",
                    Password = "Amit@2026"
                });
                context.SaveChanges();
            }
            else
            {
                existingAdmin.Username = "Amit";
                existingAdmin.Password = "Amit@2026";
                context.SaveChanges();
            }

            // 2. Seed Master Portfolio Content matching Amit Kumar Maurya Resume PDF
            var contentDoc = context.Contents.FirstOrDefault(c => c.Key == "master_portfolio_data");

            var defaultPortfolio = new
            {
                personalInfo = new
                {
                    name = "Amit Kumar Maurya",
                    subtitle = "Full Stack Developer | Angular | ASP.NET Core | C# | SQL Server | REST APIs",
                    role = "Full Stack Developer | Angular & ASP.NET Core",
                    experienceYears = "3+ Years Experience",
                    summary = "Full Stack Developer with 3+ years of total IT experience, comprising 2+ years as a Software QA Engineer and 1+ year as a Backend Developer. Specializes in Angular, ASP.NET Core, .NET 10, C#, SQL Server, and Entity Framework Core, building secure RESTful APIs and responsive SPAs with JWT authentication and role-based access control. Strong QA foundation ensures production-ready, well-tested, maintainable code.",
                    email = "amitmaury921@gmail.com",
                    phone = "+91 7428409883",
                    location = "Lucknow, Uttar Pradesh",
                    currentRole = "Junior Backend Developer @ Infogateway IT Solutions",
                    github = "https://github.com/amiitmaurya",
                    linkedin = "https://linkedin.com/in/amit-mauryaa",
                    liveSite = "https://amit.infogatewayitsolution.com"
                },
                stats = new
                {
                    productionApis = "10+",
                    reliabilityBoost = "30%",
                    errorReduction = "25%",
                    jwtSecurity = "100%"
                },
                keyAchievements = new string[]
                {
                    "Developed 10+ production-ready REST APIs using ASP.NET Core/MVC.",
                    "Building working proficiency in Angular and TypeScript to develop responsive SPA front ends that consume ASP.NET Core Web APIs.",
                    "Implemented JWT authentication and role-based access control across all endpoints.",
                    "Reduced runtime errors by 25% through global exception handling and validation middleware.",
                    "Improved overall API reliability by 30% through optimized architecture and database design."
                },
                projects = new object[]
                {
                    new
                    {
                        id = 1,
                        title = "Mini Swiggy Clone",
                        subtitle = "Production-Ready Food Ordering Platform",
                        category = "Full-Stack",
                        badge = "Angular 22 + .NET 10",
                        badgeClass = "badge-success",
                        desc = "Developed a production-ready food ordering platform using ASP.NET Core .NET 10, Angular 22, SQL Server, and Entity Framework Core following Clean Architecture, Repository Pattern, Unit of Work, SOLID, and DRY principles.",
                        features = new string[]
                        {
                            "Implemented JWT authentication, role-based authorization, restaurant, category, food item, cart, and user management modules with RESTful APIs and Angular SPA integration.",
                            "Built responsive Angular UI with authentication, restaurant browsing, cart management, API integration, and reusable components.",
                            "Integrated global exception handling, Dependency Injection, EF Core, LINQ, server-side validation, Swagger, and Postman testing for scalable, maintainable development."
                        },
                        tech = new string[] { "ASP.NET Core (.NET 10)", "Angular 22", "TypeScript", "C#", "SQL Server", "EF Core", "JWT", "Clean Architecture", "Swagger", "Git" },
                        github = "https://github.com/amiitmaurya",
                        live = "https://amit.infogatewayitsolution.com"
                    },
                    new
                    {
                        id = 2,
                        title = "Hotel ERP Management System",
                        subtitle = "Enterprise Reservation & Room Management Platform",
                        category = "Backend",
                        badge = "ASP.NET Core MVC",
                        badgeClass = "badge-warning",
                        desc = "Built a complete Hotel ERP system using ASP.NET Core MVC with modules for room management, booking/reservations, customer management, and a centralized admin dashboard.",
                        features = new string[]
                        {
                            "Implemented role-based authentication and authorization (Admin/Staff), session-based security, and file upload validation for customer identity proofs.",
                            "Designed dashboard analytics for total rooms, bookings, availability, and occupancy; structured the codebase using Controllers, Models, Views, ViewModels, and Services with Entity Framework Core."
                        },
                        tech = new string[] { "C#", "ASP.NET Core MVC", "Entity Framework Core", "LINQ", "SQL Server", "Bootstrap", "JavaScript", "jQuery" },
                        github = "https://github.com/amiitmaurya",
                        live = (string?)null
                    },
                    new
                    {
                        id = 3,
                        title = "Expense Tracker System",
                        subtitle = "Personal Finance & Spending Analytics Platform",
                        category = "Full-Stack",
                        badge = ".NET 10 + EF Core",
                        badgeClass = "badge-accent",
                        desc = "Built full-featured expense management with CRUD, input validation, spending analytics, and income/expense dashboard.",
                        features = new string[]
                        {
                            "Integrated SQL Server with stored procedures for performant data operations.",
                            "Added visual charts and spending breakdown by categories."
                        },
                        tech = new string[] { "C#", "ASP.NET MVC", "SQL Server", "Stored Procedures", "HTML5/CSS3", "JavaScript" },
                        github = "https://github.com/amiitmaurya",
                        live = (string?)null
                    },
                    new
                    {
                        id = 4,
                        title = "Personal Portfolio Website",
                        subtitle = "Full-Stack Developer Portfolio with Admin Panel",
                        category = "Full-Stack",
                        badge = "React + ASP.NET Core",
                        badgeClass = "badge-success",
                        desc = "Full-stack portfolio with contact form backed by SQL Server, admin authentication, and message management panel.",
                        features = new string[]
                        {
                            "Live site hosted and deployed.",
                            "Integrated dynamic SQL Server storage for profile views, resume downloads, and message inbox."
                        },
                        tech = new string[] { "C#", "ASP.NET Core", "SQL Server", "React", "JavaScript", "Bootstrap" },
                        github = "https://github.com/amiitmaurya/Personal_Portfolio",
                        live = "https://amit.infogatewayitsolution.com"
                    }
                },
                skills = new
                {
                    languages = new string[] { "C#", "TypeScript", "JavaScript" },
                    frontend = new string[] { "Angular (Angular 22)", "Angular CLI", "Angular Routing", "Reactive & Template-Driven Forms", "RxJS", "Angular Services", "Component Architecture", "Single Page Applications (SPA)", "HTML5", "CSS3", "Bootstrap", "jQuery", "Responsive Web Design" },
                    backend = new string[] { ".NET 10", "ASP.NET Core", "ASP.NET Core Web API", "ASP.NET MVC", ".NET Framework", "Entity Framework Core", "RESTful APIs", "JWT Authentication", "Role-Based Authorization", "CORS", "Dependency Injection", "Middleware", "Async/Await", "Exception Handling" },
                    database = new string[] { "SQL Server", "Stored Procedures", "Database Design", "LINQ", "MongoDB" },
                    testing = new string[] { "Manual Testing", "API Testing (Postman)", "Selenium WebDriver", "QA Automation", "Agile/Scrum" },
                    tools = new string[] { "Git", "GitHub", "Visual Studio", "Visual Studio Code", "Swagger", "JIRA", "Postman", "npm" },
                    concepts = new string[] { "OOP", "SOLID Principles", "Repository Pattern", "Data Structures & Algorithms", "Server-Side Validation", "Clean Architecture", "SDLC", "Full Stack Development" }
                },
                experience = new object[]
                {
                    new
                    {
                        id = 1,
                        role = "Junior Backend Developer",
                        company = "Infogateway IT Solutions",
                        location = "Gorakhpur, UP (Hybrid)",
                        period = "Aug 2025 – Present",
                        type = "Full-Time",
                        desc = "Designing and developing 10+ RESTful APIs with ASP.NET Core/MVC, improving API reliability by 30% and reducing runtime errors by 25%.",
                        bullets = new string[]
                        {
                            "Designed and developed 10+ RESTful APIs with ASP.NET Core/MVC, improving API reliability by 30% and reducing runtime errors by 25%.",
                            "Implemented JWT-based authentication, role-based access control, and CORS policies to secure all API endpoints for front-end integration.",
                            "Designed SQL Server database schemas and optimized stored procedures for efficient, high-performance data retrieval.",
                            "Built global exception handling and server-side validation middleware, significantly improving system stability.",
                            "Collaborated closely with frontend and QA teams on defect resolution, API integration, and smooth deployment cycles."
                        }
                    },
                    new
                    {
                        id = 2,
                        role = "Software Quality Assurance Engineer",
                        company = "Microware Computing & Consulting Pvt Ltd",
                        location = "Gurugram, HR (Remote)",
                        period = "Jun 2023 – Jul 2025",
                        type = "Full-Time",
                        desc = "Designed and executed 100–150 test cases per release cycle for web and API-based applications.",
                        bullets = new string[]
                        {
                            "Designed and executed 100–150 test cases per release cycle for web and API-based applications, ensuring comprehensive coverage.",
                            "Performed API testing via Postman and automated test scenarios using Selenium WebDriver, reducing manual testing effort by 35%.",
                            "Validated database records using SQL queries; tracked and reported defects systematically in JIRA across multiple release cycles.",
                            "Contributed to a 30% reduction in production bugs and improved overall product quality through rigorous testing practices."
                        }
                    },
                    new
                    {
                        id = 3,
                        role = "Freelance Software Tester",
                        company = "Freelancer.com",
                        location = "Remote",
                        period = "Aug 2022 – May 2023",
                        type = "Freelance",
                        desc = "Delivered manual and API testing for client applications.",
                        bullets = new string[]
                        {
                            "Delivered manual and API testing for 4–5 client applications, identifying and documenting critical functional defects.",
                            "Executed end-to-end test scenarios across diverse project types, improving client application reliability by 20%+.",
                            "Provided detailed testing reports and defect logs, helping clients resolve issues before production deployment."
                        }
                    }
                },
                certifications = new object[]
                {
                    new
                    {
                        id = 1,
                        title = "Backend Development Trainee Certificate",
                        issuer = "Infogateway IT Solutions",
                        period = "April 2026"
                    },
                    new
                    {
                        id = 2,
                        title = "Software Testing Professional Certificate",
                        issuer = "Q-Spiders Training Institute",
                        period = "May 2023"
                    }
                },
                education = new object[]
                {
                    new
                    {
                        id = 1,
                        degree = "Master of Computer Application (MCA)",
                        institution = "J.S. University, Shikohabad",
                        year = "2023 – 2025"
                    },
                    new
                    {
                        id = 2,
                        degree = "Bachelor of Computer Application (BCA)",
                        institution = "DDU Gorakhpur University",
                        year = "2018 – 2021"
                    }
                }
            };

            var jsonString = JsonSerializer.Serialize(defaultPortfolio, new JsonSerializerOptions { WriteIndented = false });

            if (contentDoc == null)
            {
                context.Contents.Add(new PortfolioContent
                {
                    Key = "master_portfolio_data",
                    JsonData = jsonString
                });
                context.SaveChanges();
            }
        }
    }
}
