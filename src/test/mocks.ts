import type { GithubRepo, GithubUser } from "../types/github";

// Real data from github.com/piyush-eon
export const mockUser: GithubUser = {
  login: "piyush-eon",
  name: "Piyush Agarwal (Roadside Coder)",
  avatar_url: "https://avatars.githubusercontent.com/u/51760520",
  bio: "Full Stack Developer, Voice Over Artist, and a YouTuber @ RoadsideCoder",
  location: "India",
  public_repos: 60,
  followers: 3200,
  following: 0,
  html_url: "https://github.com/piyush-eon",
};

// User with all optional fields as null — for testing conditional rendering
export const mockUserMinimal: GithubUser = {
  login: "ghost",
  name: null,
  avatar_url: "https://avatars.githubusercontent.com/u/99999",
  bio: null,
  location: null,
  public_repos: 0,
  followers: 0,
  following: 0,
  html_url: "https://github.com/ghost",
};

// Real repos from piyush-eon — mix of with/without description and language
export const mockRepos: GithubRepo[] = [
  {
    id: 1,
    name: "ai-interview-platform",
    description:
      "Full Stack Interview Platform with Next JS, Supabase, Tailwind, Stream, Arcjet, Shadcn UI Tutorial",
    stargazers_count: 6,
    language: "JavaScript",
    html_url: "https://github.com/piyush-eon/ai-interview-platform",
  },
  {
    id: 2,
    name: "react-entertainment-hub",
    description: null, // intentionally null — tests "No description" fallback
    stargazers_count: 0,
    language: null, // intentionally null — tests language badge is hidden
    html_url: "https://github.com/piyush-eon/react-entertainment-hub",
  },
  {
    id: 3,
    name: "react-native-course",
    description: "Build Kribb (Full Stack App for IOS and Android)",
    stargazers_count: 7,
    language: "TypeScript",
    html_url: "https://github.com/piyush-eon/react-native-course",
  },
];
