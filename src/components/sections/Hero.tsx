import { ArrowDown, FileText, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Globe from '@/components/3d/Globe';

const roles = [
  'Software Developer',
  'Tools & Automation Specialist',
  'Frontend Engineer',
  'Problem Solver'
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  // Typing animation effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: number;

    if (isTyping) {
      if (displayText.length < currentRole.length) {
        timeout = window.setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 100);
      } else {
        setIsTyping(false);
        timeout = window.setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = window.setTimeout(() => {
          setDisplayText(displayText.slice(0, displayText.length - 1));
        }, 50);
      } else {
        setIsTyping(true);
        setRoleIndex((roleIndex + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, roleIndex]);

  return (
    <section id="home" className="min-h-screen relative overflow-hidden bg-gradient-to-b from-background via-background to-primary/5">
      {/* 3D Globe Animation */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Globe />
          </Suspense>
        </Canvas>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="min-h-screen flex flex-col items-center justify-center text-center">
          {/* Main content */}
          <div className="space-y-8 max-w-4xl backdrop-blur-sm bg-background/30 p-8 rounded-2xl">
            {/* Avatar/Headshot with enhanced styling */}
            <div className="relative inline-block group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative w-32 h-32 md:w-40 md:h-40">
                <div className="w-full h-full bg-gradient-to-r from-primary to-accent rounded-full p-1">
                  <div className="w-full h-full bg-background rounded-full flex items-center justify-center overflow-hidden">
                    <img 
                      src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg" 
                      alt="Professional headshot" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-accent text-white text-xs px-3 py-1 rounded-full shadow-lg">
                  Available for Work
                </div>
              </div>
            </div>

            {/* Name & Role with enhanced typography */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">
                  John Doe
                </span>
              </h1>
              
              <div className="h-20">
                <h2 className="text-2xl md:text-3xl font-medium">
                  <span className="inline-flex items-center">
                    <span className="gradient-heading">{displayText}</span>
                    <span className={`ml-1 h-8 w-1 bg-primary ${isTyping ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}></span>
                  </span>
                </h2>
              </div>
            </div>

            {/* Enhanced CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
              >
                <a href="#contact" className="flex items-center">
                  Contact Me
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto border-primary/20 hover:border-primary/40"
              >
                <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  Resume
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto border-primary/20 hover:border-primary/40"
              >
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
            </div>
          </div>

          {/* Enhanced scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <a 
              href="#about" 
              className="group flex flex-col items-center text-muted-foreground hover:text-primary transition-colors"
              aria-label="Scroll to About section"
            >
              <span className="text-sm mb-2 opacity-0 group-hover:opacity-100 transition-opacity">Scroll</span>
              <ArrowDown className="h-5 w-5 animate-bounce" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}