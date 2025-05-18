import { Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand and Copyright */}
          <div className="space-y-3">
            <h3 className="font-bold text-lg gradient-heading">DevPortfolio</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Software Developer specializing in tools and automation to improve development workflows and efficiency.
            </p>
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} All Rights Reserved
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <a href="#home" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</a>
              <a href="#projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Projects</a>
              <a href="#skills" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Skills</a>
              <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            </nav>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-3">Connect</h4>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Built with React, TypeScript, and TailwindCSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}