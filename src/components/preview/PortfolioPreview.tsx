import { usePortfolio } from "@/contexts/PortfolioContext";
import ReactMarkdown from "react-markdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Github, 
  Linkedin, 
  Twitter, 
  ExternalLink,
  Calendar,
  Briefcase,
  GraduationCap
} from "lucide-react";

const PortfolioPreview = () => {
  const { portfolioData, selectedTheme } = usePortfolio();
  const { personalInfo, socialLinks, skills, experiences, education, projects } = portfolioData;

  // Theme-based styling
  const themeStyles = {
    modern: "bg-gradient-to-br from-blue-50 to-purple-50",
    creative: "bg-gradient-to-br from-pink-50 to-orange-50", 
    minimal: "bg-gray-50",
    tech: "bg-gradient-to-br from-cyan-50 to-blue-50",
    dark: "bg-gray-900 text-white"
  };

  const themeClass = themeStyles[selectedTheme.id as keyof typeof themeStyles] || themeStyles.modern;

  // Helper function to group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className={`min-h-full w-full overflow-auto ${themeClass} ${selectedTheme.id === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      {/* Header/Hero Section */}
      <section className="px-6 py-12 text-center">
        <div className="max-w-3xl mx-auto">
          {personalInfo.name && (
            <h1 className="text-4xl font-bold mb-2" style={{ color: selectedTheme.colors.primary }}>
              {personalInfo.name}
            </h1>
          )}
          {personalInfo.title && (
            <h2 className="text-xl mb-4 opacity-80">
              {personalInfo.title}
            </h2>
          )}
          {personalInfo.about && (
            <div className="prose prose-sm max-w-none mb-6 opacity-90">
              <ReactMarkdown>{personalInfo.about}</ReactMarkdown>
            </div>
          )}
          
          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-4 text-sm mb-6">
            {personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                <a href={personalInfo.website} className="hover:underline">
                  Website
                </a>
              </div>
            )}
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-3">
            {socialLinks.github && (
              <Button variant="outline" size="sm" asChild>
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            )}
            {socialLinks.linkedin && (
              <Button variant="outline" size="sm" asChild>
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
            )}
            {socialLinks.twitter && (
              <Button variant="outline" size="sm" asChild>
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="px-6 py-8 bg-white/50">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: selectedTheme.colors.primary }}>
              Skills & Expertise
            </h3>
            <div className="space-y-6">
              {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                <div key={category}>
                  <h4 className="text-lg font-semibold mb-3">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary"
                        className="flex items-center gap-2"
                        style={{ 
                          backgroundColor: `${selectedTheme.colors.primary}20`,
                          color: selectedTheme.colors.primary 
                        }}
                      >
                        {skill.name}
                        <span className="text-xs bg-black/10 px-1 rounded">
                          {skill.level}/10
                        </span>
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {experiences.length > 0 && (
        <section className="px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2" style={{ color: selectedTheme.colors.primary }}>
              <Briefcase className="h-6 w-6" />
              Work Experience
            </h3>
            <div className="space-y-6">
              {experiences.map((exp) => (
                <Card key={exp.id} className="bg-white/70">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-lg font-semibold">{exp.position}</h4>
                        <p className="text-md font-medium" style={{ color: selectedTheme.colors.primary }}>
                          {exp.company}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {exp.duration}
                      </div>
                    </div>
                    {exp.description && (
                      <div className="prose prose-sm mb-3">
                        <ReactMarkdown>{exp.description}</ReactMarkdown>
                      </div>
                    )}
                    {exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {exp.technologies.map((tech, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <section className="px-6 py-8 bg-white/50">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2" style={{ color: selectedTheme.colors.primary }}>
              <GraduationCap className="h-6 w-6" />
              Education
            </h3>
            <div className="space-y-4">
              {education.map((edu) => (
                <Card key={edu.id} className="bg-white/70">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-lg font-semibold">{edu.degree}</h4>
                        <p className="text-md font-medium" style={{ color: selectedTheme.colors.primary }}>
                          {edu.institution}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {edu.duration}
                      </div>
                    </div>
                    {edu.description && (
                      <div className="prose prose-sm">
                        <ReactMarkdown>{edu.description}</ReactMarkdown>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <section className="px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: selectedTheme.colors.primary }}>
              Featured Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects
                .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
                .map((project) => (
                <Card key={project.id} className="bg-white/70 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    {project.image && (
                      <div className="w-full h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-lg font-semibold">{project.title}</h4>
                        {project.featured && (
                          <Badge variant="default" className="text-xs">Featured</Badge>
                        )}
                      </div>
                      <div className="prose prose-sm mb-4">
                        <ReactMarkdown>{project.description}</ReactMarkdown>
                      </div>
                      {project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {project.technologies.map((tech, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <div className="flex gap-2">
                        {project.liveUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Demo
                            </a>
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="h-3 w-3 mr-1" />
                              Code
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="px-6 py-8 text-center bg-white/50 border-t">
        <p className="text-sm text-muted-foreground">
          {personalInfo.name && `© 2024 ${personalInfo.name}. `}
          Built with PortfolioGen
        </p>
      </footer>
    </div>
  );
};

export default PortfolioPreview;