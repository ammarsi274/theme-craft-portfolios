import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { PortfolioData, Theme } from '@/types/portfolio';

export const exportPortfolio = async (portfolioData: PortfolioData, selectedTheme: Theme) => {
  const zip = new JSZip();

  // Generate HTML content
  const htmlContent = generateHTMLContent(portfolioData, selectedTheme);
  
  // Generate CSS content
  const cssContent = generateCSSContent(selectedTheme);
  
  // Generate JS content (minimal for interactivity)
  const jsContent = generateJSContent();

  // Add files to zip
  zip.file('index.html', htmlContent);
  zip.file('styles.css', cssContent);
  zip.file('script.js', jsContent);
  zip.file('README.md', generateReadme(portfolioData));

  // Generate and download zip
  const content = await zip.generateAsync({ type: 'blob' });
  const fileName = `${portfolioData.personalInfo.name || 'portfolio'}-website.zip`;
  saveAs(content, fileName);
};

const generateHTMLContent = (portfolioData: PortfolioData, selectedTheme: Theme): string => {
  const { personalInfo, socialLinks, skills, experiences, education, projects } = portfolioData;
  
  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${personalInfo.name ? `${personalInfo.name} - Portfolio` : 'Portfolio'}</title>
    <meta name="description" content="${personalInfo.about ? personalInfo.about.substring(0, 150) + '...' : 'Professional portfolio website'}">
    <meta name="author" content="${personalInfo.name || 'Portfolio Owner'}">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="${personalInfo.name ? `${personalInfo.name} - Portfolio` : 'Portfolio'}">
    <meta property="og:description" content="${personalInfo.about ? personalInfo.about.substring(0, 150) + '...' : 'Professional portfolio website'}">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:title" content="${personalInfo.name ? `${personalInfo.name} - Portfolio` : 'Portfolio'}">
    <meta property="twitter:description" content="${personalInfo.about ? personalInfo.about.substring(0, 150) + '...' : 'Professional portfolio website'}">
    
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
</head>
<body class="${selectedTheme.id}">
    <!-- Header/Hero Section -->
    <header class="hero">
        <div class="container">
            ${personalInfo.name ? `<h1 class="hero-title">${personalInfo.name}</h1>` : ''}
            ${personalInfo.title ? `<h2 class="hero-subtitle">${personalInfo.title}</h2>` : ''}
            ${personalInfo.about ? `<div class="hero-description">${markdownToHTML(personalInfo.about)}</div>` : ''}
            
            <!-- Contact Info -->
            <div class="contact-info">
                ${personalInfo.email ? `<div class="contact-item"><i data-lucide="mail"></i> ${personalInfo.email}</div>` : ''}
                ${personalInfo.phone ? `<div class="contact-item"><i data-lucide="phone"></i> ${personalInfo.phone}</div>` : ''}
                ${personalInfo.location ? `<div class="contact-item"><i data-lucide="map-pin"></i> ${personalInfo.location}</div>` : ''}
                ${personalInfo.website ? `<div class="contact-item"><i data-lucide="globe"></i> <a href="${personalInfo.website}">Website</a></div>` : ''}
            </div>

            <!-- Social Links -->
            <div class="social-links">
                ${socialLinks.github ? `<a href="${socialLinks.github}" target="_blank" rel="noopener noreferrer" class="social-link"><i data-lucide="github"></i></a>` : ''}
                ${socialLinks.linkedin ? `<a href="${socialLinks.linkedin}" target="_blank" rel="noopener noreferrer" class="social-link"><i data-lucide="linkedin"></i></a>` : ''}
                ${socialLinks.twitter ? `<a href="${socialLinks.twitter}" target="_blank" rel="noopener noreferrer" class="social-link"><i data-lucide="twitter"></i></a>` : ''}
            </div>
        </div>
    </header>

    <main>
        ${skills.length > 0 ? `
        <!-- Skills Section -->
        <section class="section skills-section">
            <div class="container">
                <h3 class="section-title">Skills & Expertise</h3>
                <div class="skills-grid">
                    ${Object.entries(groupedSkills).map(([category, categorySkills]) => `
                        <div class="skill-category">
                            <h4 class="skill-category-title">${category}</h4>
                            <div class="skill-tags">
                                ${categorySkills.map(skill => `
                                    <span class="skill-tag">
                                        ${skill.name}
                                        <span class="skill-level">${skill.level}/10</span>
                                    </span>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
        ` : ''}

        ${experiences.length > 0 ? `
        <!-- Experience Section -->
        <section class="section experience-section">
            <div class="container">
                <h3 class="section-title"><i data-lucide="briefcase"></i> Work Experience</h3>
                <div class="timeline">
                    ${experiences.map(exp => `
                        <div class="timeline-item">
                            <div class="timeline-header">
                                <h4 class="timeline-title">${exp.position}</h4>
                                <span class="timeline-date"><i data-lucide="calendar"></i> ${exp.duration}</span>
                            </div>
                            <p class="timeline-company">${exp.company}</p>
                            ${exp.description ? `<div class="timeline-description">${markdownToHTML(exp.description)}</div>` : ''}
                            ${exp.technologies.length > 0 ? `
                                <div class="tech-tags">
                                    ${exp.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
        ` : ''}

        ${education.length > 0 ? `
        <!-- Education Section -->
        <section class="section education-section">
            <div class="container">
                <h3 class="section-title"><i data-lucide="graduation-cap"></i> Education</h3>
                <div class="timeline">
                    ${education.map(edu => `
                        <div class="timeline-item">
                            <div class="timeline-header">
                                <h4 class="timeline-title">${edu.degree}</h4>
                                <span class="timeline-date"><i data-lucide="calendar"></i> ${edu.duration}</span>
                            </div>
                            <p class="timeline-company">${edu.institution}</p>
                            ${edu.description ? `<div class="timeline-description">${markdownToHTML(edu.description)}</div>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
        ` : ''}

        ${projects.length > 0 ? `
        <!-- Projects Section -->
        <section class="section projects-section">
            <div class="container">
                <h3 class="section-title">Featured Projects</h3>
                <div class="projects-grid">
                    ${projects.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)).map(project => `
                        <div class="project-card ${project.featured ? 'featured' : ''}">
                            ${project.image ? `<div class="project-image"><img src="${project.image}" alt="${project.title}" /></div>` : ''}
                            <div class="project-content">
                                <div class="project-header">
                                    <h4 class="project-title">${project.title}</h4>
                                    ${project.featured ? '<span class="featured-badge">Featured</span>' : ''}
                                </div>
                                <div class="project-description">${markdownToHTML(project.description)}</div>
                                ${project.technologies.length > 0 ? `
                                    <div class="tech-tags">
                                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                                    </div>
                                ` : ''}
                                <div class="project-links">
                                    ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-link"><i data-lucide="external-link"></i> Demo</a>` : ''}
                                    ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link"><i data-lucide="github"></i> Code</a>` : ''}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
        ` : ''}
    </main>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <p>© 2024 ${personalInfo.name || 'Portfolio Owner'}. Built with PortfolioGen</p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>`;
};

const generateCSSContent = (selectedTheme: Theme): string => {
  return `/* Portfolio Website Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary: ${selectedTheme.colors.primary};
    --secondary: ${selectedTheme.colors.secondary};
    --accent: ${selectedTheme.colors.accent};
    --background: ${selectedTheme.colors.background};
    --text: ${selectedTheme.colors.text};
    --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    --border-radius: 0.75rem;
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: var(--text);
    background: var(--background);
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
}

/* Hero Section */
.hero {
    background: linear-gradient(135deg, var(--primary), var(--accent));
    color: white;
    padding: 6rem 0;
    text-align: center;
    position: relative;
    overflow: hidden;
}

.hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
    pointer-events: none;
}

.hero-title {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    position: relative;
}

.hero-subtitle {
    font-size: 1.5rem;
    font-weight: 400;
    margin-bottom: 2rem;
    opacity: 0.9;
    position: relative;
}

.hero-description {
    font-size: 1.1rem;
    max-width: 600px;
    margin: 0 auto 2rem;
    opacity: 0.9;
    position: relative;
}

.contact-info {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 2rem;
}

.contact-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
}

.contact-item a {
    color: inherit;
    text-decoration: none;
}

.contact-item a:hover {
    text-decoration: underline;
}

.social-links {
    display: flex;
    justify-content: center;
    gap: 1rem;
}

.social-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    color: white;
    text-decoration: none;
    transition: var(--transition);
}

.social-link:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
}

/* Sections */
.section {
    padding: 4rem 0;
}

.section:nth-child(even) {
    background: var(--secondary);
}

.section-title {
    text-align: center;
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 3rem;
    color: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

/* Skills */
.skills-grid {
    display: grid;
    gap: 2rem;
}

.skill-category {
    background: white;
    padding: 2rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
}

.skill-category-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--primary);
}

.skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.skill-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--primary);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 500;
}

.skill-level {
    background: rgba(255, 255, 255, 0.2);
    padding: 0.125rem 0.5rem;
    border-radius: 9999px;
    font-size: 0.75rem;
}

/* Timeline */
.timeline {
    max-width: 800px;
    margin: 0 auto;
    position: relative;
}

.timeline::before {
    content: '';
    position: absolute;
    left: 2rem;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--primary);
}

.timeline-item {
    position: relative;
    padding-left: 5rem;
    margin-bottom: 3rem;
    background: white;
    padding: 2rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
}

.timeline-item::before {
    content: '';
    position: absolute;
    left: -2rem;
    top: 2rem;
    width: 1rem;
    height: 1rem;
    background: var(--primary);
    border-radius: 50%;
    border: 3px solid white;
    box-shadow: var(--shadow);
}

.timeline-header {
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 0.5rem;
    flex-wrap: wrap;
    gap: 1rem;
}

.timeline-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text);
}

.timeline-date {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.875rem;
    color: var(--primary);
    font-weight: 500;
}

.timeline-company {
    font-size: 1rem;
    font-weight: 500;
    color: var(--primary);
    margin-bottom: 1rem;
}

.timeline-description {
    color: var(--text);
    margin-bottom: 1rem;
}

/* Tech Tags */
.tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.tech-tag {
    background: var(--secondary);
    color: var(--text);
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
    border: 1px solid var(--primary);
}

/* Projects */
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
}

.project-card {
    background: white;
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--shadow);
    transition: var(--transition);
}

.project-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
}

.project-card.featured {
    border: 2px solid var(--primary);
}

.project-image {
    width: 100%;
    height: 200px;
    overflow: hidden;
}

.project-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.project-content {
    padding: 1.5rem;
}

.project-header {
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 1rem;
    gap: 1rem;
}

.project-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text);
}

.featured-badge {
    background: var(--primary);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
}

.project-description {
    color: var(--text);
    margin-bottom: 1rem;
}

.project-links {
    display: flex;
    gap: 0.75rem;
}

.project-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--primary);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: var(--border-radius);
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    transition: var(--transition);
}

.project-link:hover {
    background: var(--accent);
    transform: translateY(-1px);
}

/* Footer */
.footer {
    background: var(--text);
    color: white;
    text-align: center;
    padding: 2rem 0;
}

/* Responsive Design */
@media (max-width: 768px) {
    .hero-title {
        font-size: 2.5rem;
    }
    
    .hero-subtitle {
        font-size: 1.25rem;
    }
    
    .contact-info {
        gap: 1rem;
    }
    
    .timeline::before {
        left: 1rem;
    }
    
    .timeline-item {
        padding-left: 3rem;
    }
    
    .timeline-item::before {
        left: -1.5rem;
    }
    
    .timeline-header {
        flex-direction: column;
        align-items: start;
    }
    
    .projects-grid {
        grid-template-columns: 1fr;
    }
    
    .project-header {
        flex-direction: column;
        align-items: start;
    }
}

@media (max-width: 480px) {
    .hero {
        padding: 4rem 0;
    }
    
    .hero-title {
        font-size: 2rem;
    }
    
    .section {
        padding: 3rem 0;
    }
    
    .section-title {
        font-size: 2rem;
    }
    
    .contact-info {
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
    }
}`;
};

const generateJSContent = (): string => {
  return `// Portfolio Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading states for external links
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', function() {
            const originalText = this.textContent;
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 300);
        });
    });
    
    // Simple fade-in animation for timeline items
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe timeline items and project cards
    document.querySelectorAll('.timeline-item, .project-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    console.log('Portfolio website loaded successfully!');
});`;
};

const generateReadme = (portfolioData: PortfolioData): string => {
  return `# ${portfolioData.personalInfo.name || 'Portfolio'} Website

This is a professional portfolio website generated with PortfolioGen.

## Features

- ✨ Responsive design that works on all devices
- 🎨 Modern and professional styling
- 📱 Mobile-first approach
- 🚀 Fast loading and optimized
- 🔍 SEO-friendly with proper meta tags
- ♿ Accessible design

## Structure

- \`index.html\` - Main portfolio page
- \`styles.css\` - All styling and layout
- \`script.js\` - Interactive features and animations
- \`README.md\` - This file

## Hosting

This website can be hosted on any static hosting service:

### Free Options:
- **Netlify**: Drag and drop the files to netlify.com/drop
- **Vercel**: Upload via vercel.com
- **GitHub Pages**: Upload to a GitHub repository
- **Surge.sh**: Use surge.sh for quick deployment

### Quick Deploy with Netlify:
1. Go to https://app.netlify.com/drop
2. Drag and drop all the files
3. Your site will be live instantly!

## Customization

You can edit the files directly:
- Modify \`styles.css\` to change colors, fonts, or layout
- Update \`index.html\` to add or remove sections
- Enhance \`script.js\` to add more interactivity

## Browser Support

This website works in all modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge

---

Built with ❤️ using PortfolioGen
`;
};

// Simple markdown to HTML converter
const markdownToHTML = (markdown: string): string => {
  return markdown
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/^(.*)$/gm, '<p>$1</p>')
    .replace(/<p><\/p>/g, '')
    .replace(/^\<p\>/, '')
    .replace(/\<\/p\>$/, '');
};