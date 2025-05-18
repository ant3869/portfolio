import { Dot } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function About() {
  return (
    <section id="about" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <h2 className="section-heading text-center mb-12">
          About Me
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Main About Text */}
          <div className="lg:col-span-2 space-y-6">
            <p className="text-lg">
              Hello! I'm a passionate software developer specializing in creating tools and automations that enhance developer productivity. With over 5 years of experience building software across various domains, I focus on crafting elegant solutions that simplify complex problems.
            </p>
            
            <p>
              My journey in tech began with a fascination for how things work under the hood. This curiosity led me to explore low-level systems programming, where I developed a strong foundation in C++ and C#. Eventually, I discovered my true passion: creating tools that make developers' lives easier and workflows more efficient.
            </p>
            
            <p>
              Today, I channel my expertise into building automation systems, developer utilities, and workflow optimizations that save teams countless hours and enable them to focus on what truly matters—building great products.
            </p>
            
            <div className="flex items-center gap-2 pt-2 text-primary">
              <span className="font-bold">Expertise:</span>
              <span className="flex items-center">
                Developer Tools <Dot /> Automation <Dot /> Frontend <Dot /> Systems Programming
              </span>
            </div>
          </div>
          
          {/* Education & Certifications */}
          <div className="space-y-4">
            <h3 className="section-subheading">Education & Certifications</h3>
            
            <Card className="card-hover">
              <CardContent className="p-4">
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold">MSc Computer Science</h4>
                    <span className="text-sm text-muted-foreground">2018-2020</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Stanford University</p>
                  <p className="text-sm">Specialized in Software Engineering and Systems</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardContent className="p-4">
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold">BSc Computer Science</h4>
                    <span className="text-sm text-muted-foreground">2014-2018</span>
                  </div>
                  <p className="text-sm text-muted-foreground">MIT</p>
                  <p className="text-sm">Focus on Algorithm Design and Data Structures</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardContent className="p-4">
                <div className="space-y-1">
                  <h4 className="font-semibold">Certifications</h4>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-start">
                      <Dot className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Microsoft Certified: Azure Developer Associate</span>
                    </li>
                    <li className="flex items-start">
                      <Dot className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>AWS Certified DevOps Engineer</span>
                    </li>
                    <li className="flex items-start">
                      <Dot className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Google Professional Cloud Developer</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}