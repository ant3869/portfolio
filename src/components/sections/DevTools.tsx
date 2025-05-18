import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TerminalSquare, Zap, BarChart3, Terminal } from 'lucide-react';

// Sample tools data
const tools = [
  {
    id: 'build-optimizer',
    category: 'automation',
    title: 'Build Process Optimizer',
    description: 'A custom build system that drastically reduces compilation time for large C++ projects through intelligent dependency management and parallel processing.',
    features: [
      'Smart dependency detection',
      'Parallel compilation',
      'Incremental builds',
      'Cloud caching'
    ],
    metrics: {
      improvement: '85%',
      oldValue: '45 min',
      newValue: '6.5 min'
    },
    codeSnippet: `// Example of the build configuration
const BuildConfig = {
  parallelJobs: 16,
  cacheEnabled: true,
  incrementalBuilds: true,
  smartDependencies: {
    scanMode: 'deep',
    cacheInvalidation: 'selective'
  }
};

// Initialize the build optimizer
const optimizer = new BuildOptimizer(BuildConfig);
optimizer.analyze('./src').then(result => {
  console.log(\`Found \${result.modules} modules with \${result.dependencies} dependencies\`);
  optimizer.startBuild();
});`
  },
  {
    id: 'code-generator',
    category: 'generator',
    title: 'Boilerplate Code Generator',
    description: 'A smart templating system that generates standardized boilerplate code for new components, services, and modules based on project-specific patterns and best practices.',
    features: [
      'Custom templates',
      'Context-aware generation',
      'Style guide enforcement',
      'Post-generation validation'
    ],
    metrics: {
      improvement: '95%',
      oldValue: '2 hours',
      newValue: '5 min'
    },
    codeSnippet: `// Example template for React component generation
import fs from 'fs';
import path from 'path';

const componentTemplate = (name) => \`
import React from 'react';
import styles from './${name}.module.css';

interface ${name}Props {
  // Add your props here
}

export function ${name}({ ...props }: ${name}Props) {
  return (
    <div className={styles.container}>
      {/* Component content */}
    </div>
  );
}
\`;

// Generate the component files
const generateComponent = (name, directory) => {
  const componentDir = path.join(directory, name);
  fs.mkdirSync(componentDir, { recursive: true });
  fs.writeFileSync(
    path.join(componentDir, \`${name}.tsx\`), 
    componentTemplate(name)
  );
  fs.writeFileSync(
    path.join(componentDir, \`${name}.module.css\`), 
    '.container { }'
  );
  fs.writeFileSync(
    path.join(componentDir, \`index.ts\`), 
    \`export * from './${name}';\`
  );
};`
  },
  {
    id: 'analyzer',
    category: 'analysis',
    title: 'Code Quality Analyzer',
    description: 'A static analysis tool that scans code for quality issues, potential bugs, and performance problems, providing actionable recommendations.',
    features: [
      'Custom rule sets',
      'Automated fixes',
      'Integration with CI/CD',
      'Trend reporting'
    ],
    metrics: {
      improvement: '40%',
      oldValue: '250 issues',
      newValue: '150 issues'
    },
    codeSnippet: `// Sample configuration for the analyzer
module.exports = {
  rules: {
    'no-unused-vars': 'error',
    'no-duplicate-imports': 'error',
    'prefer-const': 'warn',
    'performance/no-expensive-loop': 'warn',
    'security/no-eval': 'error',
    'custom/consistent-error-handling': 'warn'
  },
  plugins: [
    'performance',
    'security',
    'custom'
  ],
  ignorePatterns: [
    'dist/**',
    'node_modules/**'
  ],
  autofix: true,
  reportLevel: 'detailed',
  maxWarnings: 50
};`
  },
  {
    id: 'scripts',
    category: 'automation',
    title: 'Workflow Automation Scripts',
    description: 'A collection of PowerShell and Bash scripts that automate common development tasks, from environment setup to deployment processes.',
    features: [
      'Environment setup',
      'Database initialization',
      'Log processing',
      'Deployment automation'
    ],
    metrics: {
      improvement: '70%',
      oldValue: '3.5 hours',
      newValue: '1 hour'
    },
    codeSnippet: `# PowerShell example for automating environment setup
function Setup-DevEnvironment {
    param(
        [string]$ProjectName,
        [string]$GitRepo,
        [switch]$InstallDependencies = $true
    )
    
    Write-Host "Setting up development environment for $ProjectName..." -ForegroundColor Cyan
    
    # Clone repository
    if (-not (Test-Path $ProjectName)) {
        Write-Host "Cloning repository..." -ForegroundColor Yellow
        git clone $GitRepo $ProjectName
        Set-Location $ProjectName
    } else {
        Write-Host "Project folder exists, skipping clone." -ForegroundColor Yellow
    }
    
    # Install dependencies if requested
    if ($InstallDependencies) {
        Write-Host "Installing dependencies..." -ForegroundColor Yellow
        if (Test-Path "package.json") {
            npm install
        } elseif (Test-Path "requirements.txt") {
            python -m pip install -r requirements.txt
        }
    }
    
    # Configure local settings
    Write-Host "Setting up local configuration..." -ForegroundColor Yellow
    if (Test-Path "config.template.json") {
        Copy-Item "config.template.json" "config.local.json"
    }
    
    Write-Host "Development environment setup complete!" -ForegroundColor Green
}`
  }
];

export default function DevTools() {
  return (
    <section id="devtools" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-heading text-center mb-12">
          Dev Tools & Automations
        </h2>
        
        <Tabs defaultValue="automation" className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="automation" className="flex items-center">
                <Zap className="h-4 w-4 mr-2" /> Automation
              </TabsTrigger>
              <TabsTrigger value="generator" className="flex items-center">
                <Terminal className="h-4 w-4 mr-2" /> Generators
              </TabsTrigger>
              <TabsTrigger value="analysis" className="flex items-center">
                <BarChart3 className="h-4 w-4 mr-2" /> Analysis
              </TabsTrigger>
            </TabsList>
          </div>
          
          {/* Generate tabs content for each category */}
          {['automation', 'generator', 'analysis'].map(category => (
            <TabsContent key={category} value={category} className="space-y-8">
              {tools
                .filter(tool => tool.category === category)
                .map(tool => (
                  <Card key={tool.id} className="border-primary/10 shadow-md overflow-hidden">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                        <div>
                          <h3 className="text-xl font-bold flex items-center">
                            <TerminalSquare className="h-5 w-5 mr-2 text-primary" />
                            {tool.title}
                          </h3>
                          <p className="text-muted-foreground mt-2">
                            {tool.description}
                          </p>
                        </div>
                        
                        {tool.metrics && (
                          <div className="bg-primary/10 px-4 py-2 rounded-lg text-center">
                            <div className="text-xl font-bold text-primary">{tool.metrics.improvement}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {tool.metrics.oldValue} → {tool.metrics.newValue}
                            </div>
                            <div className="text-xs">Improvement</div>
                          </div>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6">
                        <div className="lg:col-span-2">
                          <h4 className="font-semibold mb-3">Key Features</h4>
                          <ul className="space-y-2">
                            {tool.features.map((feature, index) => (
                              <li key={index} className="flex items-start">
                                <Zap className="h-4 w-4 text-primary mt-1 mr-2" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="lg:col-span-3">
                          <h4 className="font-semibold mb-3">Code Sample</h4>
                          <pre className="code-block">
                            <code>{tool.codeSnippet}</code>
                          </pre>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}