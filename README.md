// API INTEGRATION CHEAT SHEET FOR PORTFOLIO

/* ========== GITHUB API ========== */
// Fetch your repositories to showcase as projects

// src/services/githubService.ts
import axios from 'axios';

export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: string[];
  language: string;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  sourceCode: string;
  liveDemo?: string;
  featured: boolean;
}

export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const GITHUB_USERNAME = 'ant3869';
    const response = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
    
    // Transform the data from GitHub format to your project format
    return response.data
      .filter((repo: GithubRepo) => !repo.fork && repo.description) // Filter out forked repos and those without descriptions
      .map((repo: GithubRepo) => ({
        id: repo.id,
        title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
        description: repo.description || 'No description available',
        image: `/images/projects/${repo.name.toLowerCase().replace(/\s+/g, '-')}.png`, // You'll need placeholder images
        tags: repo.topics.length > 0 ? repo.topics : [repo.language].filter(Boolean),
        sourceCode: repo.html_url,
        liveDemo: repo.homepage,
        featured: repo.stargazers_count > 0 || repo.name.includes('portfolio')
      }));
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    return [];
  }
};

/* ========== DEV.TO API ========== */
// Fetch your blog posts if you write on DEV.TO

// src/services/blogService.ts
import axios from 'axios';

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  publishedDate: string;
  url: string;
  coverImage: string;
  readingTime: number;
  tags: string[];
}

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    // Replace with your DEV.TO username
    const DEV_TO_USERNAME = 'your-username'; 
    const response = await axios.get(`https://dev.to/api/articles?username=${DEV_TO_USERNAME}`);
    
    return response.data.map((post: any) => ({
      id: post.id,
      title: post.title,
      description: post.description,
      publishedDate: new Date(post.published_at).toLocaleDateString(),
      url: post.url,
      coverImage: post.cover_image || '/images/blog-placeholder.jpg',
      readingTime: post.reading_time_minutes,
      tags: post.tag_list
    }));
  } catch (error) {
    console.error('Error fetching DEV.TO blog posts:', error);
    return [];
  }
};

/* ========== SKILL EXTRACTION ========== */
// Extract your skills from GitHub repository data

// src/services/skillsService.ts
import { GithubRepo } from './githubService';

export interface Skill {
  name: string;
  icon: string;
  level: number;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export const extractSkills = (repos: GithubRepo[]): SkillCategory[] => {
  // Count occurrences of languages and topics
  const skillCounts: Record<string, number> = {};
  
  repos.forEach(repo => {
    if (repo.language) {
      skillCounts[repo.language] = (skillCounts[repo.language] || 0) + 1;
    }
    
    repo.topics.forEach(topic => {
      // Only count technical skills
      if (!['portfolio', 'website', 'personal'].includes(topic)) {
        skillCounts[topic] = (skillCounts[topic] || 0) + 1;
      }
    });
  });
  
  // Convert to skill objects and calculate levels
  const allSkills = Object.entries(skillCounts)
    .map(([name, count]) => {
      const normalizedName = name.toLowerCase();
      
      // Calculate level based on frequency in repositories
      const level = Math.min(Math.floor(count / repos.length * 100) + 50, 95);
      
      return {
        name: name,
        icon: `/icons/${normalizedName}.svg`,
        level: level
      };
    })
    .sort((a, b) => b.level - a.level);
  
  // Define skill categories and their associated keywords
  const categories: Record<string, string[]> = {
    'Frontend': [
      'javascript', 'typescript', 'react', 'vue', 'angular', 'html', 'css', 
      'sass', 'less', 'tailwind', 'bootstrap', 'webpack', 'vite'
    ],
    'Backend': [
      'node', 'express', 'python', 'django', 'flask', 'ruby', 'rails', 'php', 
      'laravel', 'java', 'spring', 'dotnet', 'csharp', 'go', 'rust'
    ],
    'Database': [
      'sql', 'mysql', 'postgresql', 'mongodb', 'firebase', 'supabase', 
      'dynamodb', 'redis', 'sqlite'
    ],
    'DevOps': [
      'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'cicd', 'jenkins', 
      'github-actions', 'gitlab-ci', 'terraform'
    ],
    'Mobile': [
      'react-native', 'flutter', 'swift', 'kotlin', 'android', 'ios'
    ]
  };
  
  // Group skills by category
  const skillCategories: SkillCategory[] = [];
  
  Object.entries(categories).forEach(([categoryName, keywords]) => {
    const categorySkills = allSkills.filter(skill => 
      keywords.some(keyword => 
        skill.name.toLowerCase().includes(keyword)
      )
    );
    
    if (categorySkills.length > 0) {
      skillCategories.push({
        name: categoryName,
        skills: categorySkills
      });
    }
  });
  
  // Add "Other" category for remaining skills
  const otherSkills = allSkills.filter(skill => 
    !skillCategories.some(category => 
      category.skills.some(s => s.name === skill.name)
    )
  );
  
  if (otherSkills.length > 0) {
    skillCategories.push({
      name: 'Other',
      skills: otherSkills
    });
  }
  
  return skillCategories;
};

/* ========== CONTACT FORM WITH FORMSPREE ========== */
// Handle contact form submissions using Formspree

// src/components/ContactForm.tsx
import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Replace with your Formspree form ID
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/your-form-id';
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          message
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit form. Please try again later.');
      }
      
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitted && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          Thank you for your message! I'll get back to you soon.
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};

export default ContactForm;

/* ========== GITHUB PROFILE DATA ========== */
// Fetch your GitHub profile information

// src/services/profileService.ts
import axios from 'axios';

export interface GithubProfile {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface Profile {
  name: string;
  role: string;
  avatarUrl: string;
  bio: string;
  location: string;
  company: string;
  website: string;
  email: string;
  github: string;
  stats: {
    repositories: number;
    followers: number;
    following: number;
  };
}

export const fetchProfile = async (): Promise<Profile> => {
  try {
    const GITHUB_USERNAME = 'ant3869';
    const response = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}`);
    const data: GithubProfile = response.data;
    
    return {
      name: data.name || data.login,
      role: 'Software Developer', // You can hardcode this or derive it from bio
      avatarUrl: data.avatar_url,
      bio: data.bio || '',
      location: data.location || '',
      company: data.company || '',
      website: data.blog || '',
      email: data.email || '',
      github: data.html_url,
      stats: {
        repositories: data.public_repos,
        followers: data.followers,
        following: data.following
      }
    };
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    
    // Return fallback data
    return {
      name: 'Anthony',
      role: 'Software Developer',
      avatarUrl: '/images/profile.jpg',
      bio: 'Software developer specializing in modern web technologies.',
      location: 'United States',
      company: '',
      website: '',
      email: '',
      github: 'https://github.com/ant3869',
      stats: {
        repositories: 0,
        followers: 0,
        following: 0
      }
    };
  }
};

/* ========== USING THESE SERVICES TOGETHER WITH HOOKS ========== */
// src/hooks/usePortfolio.ts

import { useState, useEffect } from 'react';
import { fetchProjects, Project } from '../services/githubService';
import { fetchBlogPosts, BlogPost } from '../services/blogService';
import { fetchProfile, Profile } from '../services/profileService';
import { extractSkills, SkillCategory } from '../services/skillsService';

interface PortfolioData {
  profile: Profile | null;
  projects: Project[];
  blogPosts: BlogPost[];
  skills: SkillCategory[];
  isLoading: boolean;
  error: string | null;
}

export const usePortfolio = () => {
  const [data, setData] = useState<PortfolioData>({
    profile: null,
    projects: [],
    blogPosts: [],
    skills: [],
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all data in parallel
        const [profileData, projectsData, blogPostsData] = await Promise.all([
          fetchProfile(),
          fetchProjects(),
          fetchBlogPosts()
        ]);
        
        // Extract skills from projects data
        const skillsData = extractSkills(projectsData);
        
        setData({
          profile: profileData,
          projects: projectsData,
          blogPosts: blogPostsData,
          skills: skillsData,
          isLoading: false,
          error: null
        });
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
        setData(prev => ({
          ...prev,
          isLoading: false,
          error: 'Failed to load portfolio data. Please try again later.'
        }));
      }
    };

    fetchData();
  }, []);

  return data;
};

/* ========== IMPLEMENTING DATA CONTEXT ========== */
// src/context/PortfolioContext.tsx

import React, { createContext, useContext, ReactNode } from 'react';
import { usePortfolio } from '../hooks/usePortfolio';

// Create a context with the data from usePortfolio
const PortfolioContext = createContext<ReturnType<typeof usePortfolio> | undefined>(undefined);

// Provider component
export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const portfolioData = usePortfolio();
  
  return (
    <PortfolioContext.Provider value={portfolioData}>
      {children}
    </PortfolioContext.Provider>
  );
};

// Hook to use the portfolio context
export const usePortfolioContext = () => {
  const context = useContext(PortfolioContext);
  
  if (context === undefined) {
    throw new Error('usePortfolioContext must be used within a PortfolioProvider');
  }
  
  return context;
};

/* ========== IMPLEMENTATION EXAMPLE ========== */
// src/App.tsx

import React from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <PortfolioProvider>
      <div className="bg-gray-900 text-white min-h-screen">
        <Header />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Blog />
          <Contact />
        </main>
        <Footer />
      </div>
    </PortfolioProvider>
  );
};

export default App;

/* ========== EXAMPLE COMPONENT USING REAL DATA ========== */
// src/components/Projects.tsx

import React from 'react';
import { usePortfolioContext } from '../context/PortfolioContext';

const Projects: React.FC = () => {
  const { projects, isLoading, error } = usePortfolioContext();
  
  if (isLoading) {
    return (
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Projects</h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </section>
    );
  }
  
  if (error) {
    return (
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Projects</h2>
          <div className="bg-red-900 text-white p-4 rounded-lg">
            <p className="text-center">{error}</p>
          </div>
        </div>
      </section>
    );
  }
  
  // Filter to featured projects first, then sort by latest
  const featuredProjects = projects
    .filter(project => project.featured)
    .sort((a, b) => b.id - a.id);
  
  const otherProjects = projects
    .filter(project => !project.featured)
    .sort((a, b) => b.id - a.id);
  
  const sortedProjects = [...featuredProjects, ...otherProjects];
  
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Projects</h2>
        
        {projects.length === 0 ? (
          <p className="text-center text-gray-400">No projects found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProjects.map(project => (
              <div key={project.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-2xl">
                <div className="h-48 bg-gray-700">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/project-placeholder.jpg';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-4xl">🚀</span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-blue-900 text-blue-200 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4">
                    <a
                      href={project.sourceCode}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Source Code
                    </a>
                    
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-400 hover:text-green-300 transition-colors"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
