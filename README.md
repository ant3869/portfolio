# Personal Portfolio

A modern, responsive personal portfolio website built with React, TypeScript, and TailwindCSS.

![Portfolio Screenshot](public/images/portfolio-screenshot.png)

## 🚀 Features

- **Responsive Design**: Looks great on all devices - mobile, tablet, and desktop
- **Dark Mode UI**: Elegant dark theme for a modern look
- **Dynamic Data**: Fetches real-time data from GitHub and other sources
- **Project Showcase**: Displays your projects with details and links
- **Skills Section**: Visual representation of your technical skills
- **Contact Form**: Working contact form for visitor inquiries
- **Performance Optimized**: Fast loading and smooth animations
- **SEO Ready**: Built with search engine optimization in mind

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Customization](#customization)
- [Data Integration](#data-integration)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🏁 Quick Start

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ant3869/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory:
```
REACT_APP_GITHUB_USERNAME=your_github_username
REACT_APP_FORMSPREE_ID=your_formspree_id
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📂 Project Structure

```
portfolio/
├── public/                # Public assets
│   ├── icons/             # Icon SVGs
│   ├── images/            # Image assets
│   └── projects/          # Project screenshots
├── src/                   # Source code
│   ├── components/        # UI components
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   └── ...
│   ├── context/           # React Context API
│   │   └── DataContext.tsx
│   ├── hooks/             # Custom React hooks
│   │   └── useGithubData.ts
│   ├── services/          # API services
│   │   ├── github.ts
│   │   └── formspree.ts
│   ├── types/             # TypeScript types
│   │   └── index.ts
│   ├── utils/             # Utility functions
│   │   └── skillsExtractor.ts
│   ├── App.tsx            # Main App component
│   └── index.tsx          # Entry point
├── .env                   # Environment variables
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # TailwindCSS configuration
└── tsconfig.json          # TypeScript configuration
```

## 🛠️ Technologies Used

- **Frontend Framework**: React
- **Type System**: TypeScript
- **Styling**: TailwindCSS
- **Data Fetching**: Axios
- **Form Handling**: Formspree
- **Animations**: Framer Motion
- **Icons**: Hero Icons
- **Deployment**: Vercel/GitHub Pages

## 🎨 Customization

### Personal Information

Update your personal information in the `.env` file or directly modify the `src/data/personal.ts` file:

```typescript
// src/data/personal.ts
export const personalInfo = {
  name: "Your Name",
  role: "Your Job Title",
  bio: "Your short biography",
  // Additional info...
};
```

### Projects

By default, projects are fetched from your GitHub repositories. You can manually add projects by modifying:

```typescript
// src/data/projects.ts
export const additionalProjects = [
  {
    id: 'custom-project-1',
    title: 'Custom Project',
    description: 'Description of your custom project',
    image: '/projects/custom-project.png',
    tags: ['React', 'TypeScript'],
    sourceCode: 'https://github.com/yourusername/project',
    liveDemo: 'https://project-demo.com'
  },
  // More projects...
];
```

### Styling

This project uses TailwindCSS for styling. You can customize colors, fonts, and other design elements in the `tailwind.config.js` file:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4F46E5',
          DEFAULT: '#4338CA',
          dark: '#3730A3',
        },
        // Other custom colors...
      },
      // Add custom fonts, sizes, etc.
    },
  },
  // ...
};
```

## 🔄 Data Integration

This portfolio is designed to fetch and display real data from:

1. **GitHub API**: Projects, skills (based on repository languages), and profile information
2. **Formspree**: For the contact form functionality
3. **DEV.TO API** (optional): For displaying blog posts

You can replace these with your own data sources or use static data if preferred.

### GitHub Integration

By default, the portfolio fetches data from your GitHub profile. Set your GitHub username in the `.env` file:

```
REACT_APP_GITHUB_USERNAME=your_github_username
```

### Contact Form

The contact form uses Formspree. Create a form at [formspree.io](https://formspree.io/) and add your form ID to the `.env` file:

```
REACT_APP_FORMSPREE_ID=your_formspree_id
```

## 🚢 Deployment

### GitHub Pages

1. Update the `homepage` in `package.json`:
```json
"homepage": "https://yourusername.github.io/portfolio"
```

2. Deploy:
```bash
npm run deploy
```

### Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [GitHub API](https://docs.github.com/en/rest)
- [Formspree](https://formspree.io/)

## 📧 Contact

If you have any questions or feedback, feel free to reach out:

- GitHub: [@ant3869](https://github.com/ant3869)
- Email: your.email@example.com
- Website: [your-website.com](https://your-website.com)
