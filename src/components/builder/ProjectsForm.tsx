import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Plus, X, ExternalLink, Github, Star } from "lucide-react";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { Project } from "@/types/portfolio";

const ProjectsForm = () => {
  const { portfolioData, addProject, removeProject } = usePortfolio();
  const { projects } = portfolioData;

  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: "",
    description: "",
    image: "",
    technologies: [],
    liveUrl: "",
    githubUrl: "",
    featured: false
  });

  const [techInput, setTechInput] = useState("");

  const handleAddProject = () => {
    if (newProject.title && newProject.description) {
      addProject({
        id: Date.now().toString(),
        title: newProject.title,
        description: newProject.description,
        image: newProject.image || "",
        technologies: newProject.technologies || [],
        liveUrl: newProject.liveUrl || "",
        githubUrl: newProject.githubUrl || "",
        featured: newProject.featured || false
      });
      setNewProject({
        title: "",
        description: "",
        image: "",
        technologies: [],
        liveUrl: "",
        githubUrl: "",
        featured: false
      });
    }
  };

  const addTechnology = () => {
    if (techInput.trim() && newProject.technologies) {
      setNewProject({
        ...newProject,
        technologies: [...newProject.technologies, techInput.trim()]
      });
      setTechInput("");
    }
  };

  const removeTechnology = (index: number) => {
    if (newProject.technologies) {
      setNewProject({
        ...newProject,
        technologies: newProject.technologies.filter((_, i) => i !== index)
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Projects Portfolio</h3>
        <p className="text-sm text-muted-foreground">
          Showcase your best work and projects
        </p>
      </div>

      {/* Add New Project */}
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="text-base">Add New Project</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="project-title">Project Title</Label>
              <Input
                id="project-title"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                placeholder="My Awesome App"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-image">Image URL (Optional)</Label>
              <Input
                id="project-image"
                value={newProject.image}
                onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                placeholder="https://example.com/project-image.jpg"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-description">Description</Label>
            <Textarea
              id="project-description"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              placeholder="Describe your project, what it does, and the problem it solves..."
              rows={3}
            />
            <p className="text-xs text-muted-foreground">Supports Markdown formatting</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="live-url">Live Demo URL (Optional)</Label>
              <Input
                id="live-url"
                value={newProject.liveUrl}
                onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                placeholder="https://myproject.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="github-url">GitHub URL (Optional)</Label>
              <Input
                id="github-url"
                value={newProject.githubUrl}
                onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                placeholder="https://github.com/username/project"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-technologies">Technologies Used</Label>
            <div className="flex gap-2">
              <Input
                id="project-technologies"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="React, Node.js, MongoDB..."
                onKeyPress={(e) => e.key === 'Enter' && addTechnology()}
              />
              <Button type="button" onClick={addTechnology} disabled={!techInput.trim()}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {newProject.technologies && newProject.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {newProject.technologies.map((tech, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {tech}
                    <button onClick={() => removeTechnology(index)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="featured"
              checked={newProject.featured}
              onCheckedChange={(checked) => setNewProject({ ...newProject, featured: checked })}
            />
            <Label htmlFor="featured" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Featured Project
            </Label>
          </div>

          <Button onClick={handleAddProject} disabled={!newProject.title || !newProject.description}>
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </CardContent>
      </Card>

      {/* Projects List */}
      {projects.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium">Your Projects</h4>
          {projects.map((project) => (
            <Card key={project.id} className={project.featured ? "ring-2 ring-primary/20" : ""}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base">{project.title}</CardTitle>
                    {project.featured && (
                      <Badge variant="default" className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeProject(project.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {project.image && (
                  <div className="w-full h-32 bg-muted rounded-lg overflow-hidden">
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
                
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>

                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1">
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
                        Live Demo
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
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {projects.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No projects added yet. Add your first project above!</p>
        </div>
      )}
    </div>
  );
};

export default ProjectsForm;