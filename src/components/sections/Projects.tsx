import { ExternalLink, Github, Link2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';

// Project data
const projects = [
  {
    id: 'developer-tools',
    title: 'Developer Toolkit',
    description: 'A comprehensive suite of developer tools that streamlines common tasks, automates repetitive processes, and improves overall workflow efficiency.',
    image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg',
    tech: ['TypeScript', 'React', 'Node.js', 'Electron'],
    demoUrl: 'https://example.com/devtoolkit',
    repoUrl: 'https://github.com/example/dev-toolkit',
    metrics: 'Reduced build times by 40% and automated 75+ routine tasks for a team of 20+ developers',
    type: 'featured'
  },
  {
    id: 'code-analyzer',
    title: 'Code Quality Analyzer',
    description: 'An intelligent code analysis tool that identifies potential bugs, security vulnerabilities, and performance bottlenecks, helping teams maintain high code quality standards.',
    image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg',
    tech: ['Python', 'Machine Learning', 'AST Analysis'],
    demoUrl: 'https://example.com/analyzer',
    repoUrl: 'https://github.com/example/code-analyzer',
    metrics: 'Identified 200+ critical issues across 500K+ lines of code, improving overall code quality by 35%',
    type: 'featured'
  },
  {
    id: 'build-system',
    title: 'Custom Build System',
    description: 'A highly optimized build system for large-scale C++ projects that significantly reduces compilation times through intelligent caching and parallel processing.',
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg',
    tech: ['C++', 'Python', 'CMake', 'CI/CD'],
    demoUrl: 'https://example.com/build-system',
    repoUrl: 'https://github.com/example/build-system',
    metrics: 'Reduced build times from 45 minutes to under 5 minutes for a 2M+ line codebase',
    type: 'featured'
  },
  {
    id: 'dev-dashboard',
    title: 'Developer Analytics Dashboard',
    description: 'Real-time analytics dashboard for monitoring developer productivity, build health, and project progress.',
    image: 'https://images.pexels.com/photos/93599/pexels-photo-93599.jpeg',
    tech: ['React', 'D3.js', 'Node.js', 'MongoDB'],
    demoUrl: 'https://example.com/dev-dashboard',
    repoUrl: 'https://github.com/example/dev-dashboard',
    type: 'other'
  },
  {
    id: 'auto-docs',
    title: 'Automated Documentation Generator',
    description: 'Tool that automatically generates technical documentation from code comments and structure analysis.',
    image: 'https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg',
    tech: ['Python', 'NLP', 'Markdown'],
    demoUrl: 'https://example.com/auto-docs',
    repoUrl: 'https://github.com/example/auto-docs',
    type: 'other'
  },
  {
    id: 'dependency-analyzer',
    title: 'Dependency Vulnerability Scanner',
    description: 'Scans project dependencies for security vulnerabilities and suggests safer alternatives.',
    image: 'https://images.pexels.com/photos/306763/pexels-photo-306763.jpeg',
    tech: ['JavaScript', 'Security APIs', 'Node.js'],
    demoUrl: 'https://example.com/dependency-scanner',
    repoUrl: 'https://github.com/example/dependency-scanner',
    type: 'other'
  }
];

// Filter projects by type
const featuredProjects = projects.filter(p => p.type === 'featured');
const otherProjects = projects.filter(p => p.type === 'other');

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <h2 className="section-heading text-center mb-12">
          Featured Projects
        </h2>
        
        <Tabs defaultValue="featured" className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="other">Other Projects</TabsTrigger>
            </TabsList>
          </div>
          
          {/* Featured Projects Tab */}
          <TabsContent value="featured" className="space-y-12">
            {featuredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden border-primary/10 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 md:p-8 flex flex-col">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-2xl">{project.title}</CardTitle>
                      <CardDescription className="text-base mt-2">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <div className="flex flex-wrap gap-2 my-4">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="secondary">{tech}</Badge>
                      ))}
                    </div>
                    
                    {project.metrics && (
                      <div className="bg-primary/5 rounded-lg p-3 my-2 text-sm">
                        <strong>Impact:</strong> {project.metrics}
                      </div>
                    )}
                    
                    <CardFooter className="p-0 mt-auto pt-4 flex gap-3">
                      <Button asChild size="sm">
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          Source Code
                        </a>
                      </Button>
                    </CardFooter>
                  </div>
                  
                  <div className="md:order-first md:h-auto">
                    <AspectRatio ratio={16 / 9} className="bg-muted">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="rounded-l-none md:rounded-l-lg h-full w-full object-cover"
                      />
                    </AspectRatio>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
          
          {/* Other Projects Tab */}
          <TabsContent value="other">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden card-hover border-primary/10">
                  <AspectRatio ratio={16 / 9} className="bg-muted">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="h-full w-full object-cover"
                    />
                  </AspectRatio>
                  
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="p-6 pt-0">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="outline">{tech}</Badge>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between pt-0">
                    <Button asChild variant="ghost" size="sm">
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <Link2 className="h-4 w-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                    <Button asChild variant="ghost" size="sm">
                      <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}