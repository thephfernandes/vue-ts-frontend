// enum Category {
    // "Animals",
    // "Anime",
    // "Anti-Malware",
    // "Art & Design",
    // "Books",
    // "Business",
    // "Calendar",
    // "Cloud Storage & File Sharing",
    // "Continuous Integration",
    // "Cryptocurrency",
    // "Currency Exchange",
    // "Data Validation",
    // "Development",
    // "Dictionaries",
    // "Documents & Productivity",
    // "Environment",
    // "Events",
    // "Finance",
    // "Food & Drink",
    // "Games & Comics",
    // "Geocoding",
    // "Government",
    // "Health",
    // "Jobs",
    // "Machine Learning",
    // "Music",
    // "News",
    // "Open Data",
    // "Open Source Projects",
    // "Patent",
    // "Personality",
    // "Photography",
    // "Science & Math",
    // "Security",
    // "Shopping",
    // "Social",
    // "Sports & Fitness",
    // "Test Data",
    // "Text Analysis",
    // "Tracking",
    // "Transportation",
    // "URL Shorteners",
    // "Vehicle",
    // "Video",
    // "Weather"
// }

export interface Entry {
    API: string;
    Auth: string | "none";
    Category: string;
    Cors?: string | null;
    Description: string | null;
    HTTPS: boolean;
    Link: URL | null;
}