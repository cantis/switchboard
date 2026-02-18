export type AppLink = {
    name: string;
    description?: string;
    href: string;
    tags?: string[];
};

export const APPS: AppLink[] = [
    {
        name: "API Docs",
        description: "FastAPI Swagger UI",
        href: "http://localhost/api/docs",
        tags: ["api", "docs"]
    },
    {
        name: "Health Check",
        description: "Check the health of the API",
        href: "http://localhost/api/health",
        tags: ["api", "health"]
    },
    {
        name: "Time Tracker",
        description: "Track work hours",
        href: "http://localhost:5000",
        tags: ["local", "dev"]
    }
];

