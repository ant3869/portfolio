import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Github, Youtube, Instagram, FileCode, Brush, MessageCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample data for social feeds
const socialData = {
  github: [
    {
      id: 1,
      title: 'developer-toolkit',
      description: 'A comprehensive suite of developer tools that streamlines common tasks',
      url: 'https://github.com/example/developer-toolkit',
      stars: 235,
      forks: 45,
      language: 'TypeScript'
    },
    {
      id: 2,
      title: 'build-optimizer',
      description: 'An intelligent build system for C++ projects that reduces compilation time',
      url: 'https://github.com/example/build-optimizer',
      stars: 187,
      forks: 32,
      language: 'C++'
    },
    {
      id: 3,
      title: 'code-analyzer',
      description: 'Static analysis tool that identifies code quality issues and security vulnerabilities',
      url: 'https://github.com/example/code-analyzer',
      stars: 156,
      forks: 28,
      language: 'Python'
    }
  ],
  deviantArt: [
    {
      id: 1,
      title: 'Neon Cyberpunk Interface',
      imageUrl: 'https://images.pexels.com/photos/2560932/pexels-photo-2560932.jpeg',
      likes: 124
    },
    {
      id: 2,
      title: 'Minimalist Development Setup',
      imageUrl: 'https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg',
      likes: 86
    },
    {
      id: 3,
      title: 'Neural Network Visualization',
      imageUrl: 'https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg',
      likes: 152
    }
  ],
  youtube: [
    {
      id: 1,
      title: 'Building a Custom Developer Toolkit from Scratch',
      thumbnailUrl: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg',
      views: '24K',
      published: '3 weeks ago'
    },
    {
      id: 2,
      title: 'Advanced C++ Performance Optimization Techniques',
      thumbnailUrl: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg',
      views: '18K',
      published: '1 month ago'
    },
    {
      id: 3,
      title: 'Automating Your Development Workflow',
      thumbnailUrl: 'https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg',
      views: '32K',
      published: '2 months ago'
    }
  ],
  reddit: [
    {
      id: 1,
      title: 'Created a tool that automates repetitive development tasks',
      subreddit: 'r/programming',
      upvotes: 542,
      comments: 87
    },
    {
      id: 2,
      title: 'What are your favorite VSCode extensions for C++ development?',
      subreddit: 'r/cpp',
      upvotes: 324,
      comments: 156
    },
    {
      id: 3,
      title: 'I built a code quality tool that helped our team reduce bugs by 40%',
      subreddit: 'r/webdev',
      upvotes: 456,
      comments: 92
    }
  ]
};

export default function SocialHub() {
  return (
    <section id="social" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <h2 className="section-heading text-center mb-12">
          Social Media Hub
        </h2>
        
        <Tabs defaultValue="github" className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="github" className="flex items-center">
                <Github className="h-4 w-4 mr-2" /> GitHub
              </TabsTrigger>
              <TabsTrigger value="deviantArt" className="flex items-center">
                <Brush className="h-4 w-4 mr-2" /> DeviantArt
              </TabsTrigger>
              <TabsTrigger value="youtube" className="flex items-center">
                <Youtube className="h-4 w-4 mr-2" /> YouTube
              </TabsTrigger>
              <TabsTrigger value="reddit" className="flex items-center">
                <MessageCircle className="h-4 w-4 mr-2" /> Reddit
              </TabsTrigger>
            </TabsList>
          </div>
          
          {/* GitHub Tab */}
          <TabsContent value="github" className="space-y-6">
            <p className="text-center text-muted-foreground mb-6">
              Check out my top repositories on GitHub where I share developer tools, automation scripts, and more.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {socialData.github.map((repo) => (
                <Card key={repo.id} className="card-hover border-primary/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <Github className="h-5 w-5 mr-2 text-primary" />
                        <a 
                          href={repo.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-semibold hover:underline"
                        >
                          {repo.title}
                        </a>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span className="flex items-center mr-2">
                          ⭐ {repo.stars}
                        </span>
                        <span className="flex items-center">
                          🍴 {repo.forks}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      {repo.description}
                    </p>
                    <div className="flex items-center text-xs">
                      <FileCode className="h-3 w-3 mr-1" />
                      <span className="text-primary">{repo.language}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* DeviantArt Tab */}
          <TabsContent value="deviantArt">
            <p className="text-center text-muted-foreground mb-6">
              Creative work and UI design concepts on DeviantArt
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {socialData.deviantArt.map((art) => (
                <Card key={art.id} className="overflow-hidden card-hover border-primary/10">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img 
                      src={art.imageUrl} 
                      alt={art.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                    <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs flex items-center">
                      <span className="mr-1">❤️</span>
                      <span>{art.likes}</span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-medium">{art.title}</h4>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* YouTube Tab */}
          <TabsContent value="youtube">
            <p className="text-center text-muted-foreground mb-6">
              Technical tutorials and coding live streams on YouTube
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {socialData.youtube.map((video) => (
                <Card key={video.id} className="overflow-hidden card-hover border-primary/10">
                  <div className="aspect-video relative">
                    <img 
                      src={video.thumbnailUrl} 
                      alt={video.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <span className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                        <Youtube className="h-6 w-6 text-red-500" />
                      </span>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-0.5 rounded text-xs text-white">
                      {video.views} views
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-medium line-clamp-2">{video.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{video.published}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Reddit Tab */}
          <TabsContent value="reddit">
            <p className="text-center text-muted-foreground mb-6">
              Discussions and contributions to tech communities on Reddit
            </p>
            <div className="space-y-4">
              {socialData.reddit.map((post) => (
                <Card key={post.id} className="card-hover border-primary/10">
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <div className="mr-4 flex flex-col items-center">
                        <span className="font-bold text-lg text-primary">{post.upvotes}</span>
                        <span className="text-xs text-muted-foreground">upvotes</span>
                      </div>
                      <div>
                        <h4 className="font-medium">{post.title}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                            {post.subreddit}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {post.comments} comments
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}