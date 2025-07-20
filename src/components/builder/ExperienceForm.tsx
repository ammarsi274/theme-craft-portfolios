import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Briefcase, GraduationCap } from "lucide-react";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { Experience, Education } from "@/types/portfolio";

const ExperienceForm = () => {
  const { 
    portfolioData, 
    addExperience, 
    removeExperience, 
    addEducation, 
    removeEducation 
  } = usePortfolio();
  const { experiences, education } = portfolioData;

  const [newExperience, setNewExperience] = useState<Partial<Experience>>({
    company: "",
    position: "",
    duration: "",
    description: "",
    technologies: []
  });

  const [newEducation, setNewEducation] = useState<Partial<Education>>({
    institution: "",
    degree: "",
    duration: "",
    description: ""
  });

  const [techInput, setTechInput] = useState("");

  const handleAddExperience = () => {
    if (newExperience.company && newExperience.position) {
      addExperience({
        id: Date.now().toString(),
        company: newExperience.company,
        position: newExperience.position,
        duration: newExperience.duration || "",
        description: newExperience.description || "",
        technologies: newExperience.technologies || []
      });
      setNewExperience({
        company: "",
        position: "",
        duration: "",
        description: "",
        technologies: []
      });
    }
  };

  const handleAddEducation = () => {
    if (newEducation.institution && newEducation.degree) {
      addEducation({
        id: Date.now().toString(),
        institution: newEducation.institution,
        degree: newEducation.degree,
        duration: newEducation.duration || "",
        description: newEducation.description || ""
      });
      setNewEducation({
        institution: "",
        degree: "",
        duration: "",
        description: ""
      });
    }
  };

  const addTechnology = () => {
    if (techInput.trim() && newExperience.technologies) {
      setNewExperience({
        ...newExperience,
        technologies: [...newExperience.technologies, techInput.trim()]
      });
      setTechInput("");
    }
  };

  const removeTechnology = (index: number) => {
    if (newExperience.technologies) {
      setNewExperience({
        ...newExperience,
        technologies: newExperience.technologies.filter((_, i) => i !== index)
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Work Experience Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Work Experience</h3>
        </div>

        {/* Add New Experience */}
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="text-base">Add Work Experience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={newExperience.company}
                  onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                  placeholder="Google"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={newExperience.position}
                  onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
                  placeholder="Senior Software Engineer"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={newExperience.duration}
                onChange={(e) => setNewExperience({ ...newExperience, duration: e.target.value })}
                placeholder="Jan 2022 - Present"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newExperience.description}
                onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                placeholder="Describe your role, achievements, and responsibilities..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="technologies">Technologies Used</Label>
              <div className="flex gap-2">
                <Input
                  id="technologies"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="React, Node.js, Python..."
                  onKeyPress={(e) => e.key === 'Enter' && addTechnology()}
                />
                <Button type="button" onClick={addTechnology} disabled={!techInput.trim()}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {newExperience.technologies && newExperience.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {newExperience.technologies.map((tech, index) => (
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

            <Button onClick={handleAddExperience} disabled={!newExperience.company || !newExperience.position}>
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </CardContent>
        </Card>

        {/* Experience List */}
        {experiences.map((exp) => (
          <Card key={exp.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-base">{exp.position}</CardTitle>
                  <p className="text-sm text-muted-foreground">{exp.company} • {exp.duration}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExperience(exp.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {exp.description && (
                <p className="text-sm text-muted-foreground mb-2">{exp.description}</p>
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

      {/* Education Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Education</h3>
        </div>

        {/* Add New Education */}
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="text-base">Add Education</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="institution">Institution</Label>
                <Input
                  id="institution"
                  value={newEducation.institution}
                  onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                  placeholder="Stanford University"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="degree">Degree</Label>
                <Input
                  id="degree"
                  value={newEducation.degree}
                  onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                  placeholder="Bachelor of Computer Science"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edu-duration">Duration</Label>
              <Input
                id="edu-duration"
                value={newEducation.duration}
                onChange={(e) => setNewEducation({ ...newEducation, duration: e.target.value })}
                placeholder="2018 - 2022"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edu-description">Description (Optional)</Label>
              <Textarea
                id="edu-description"
                value={newEducation.description}
                onChange={(e) => setNewEducation({ ...newEducation, description: e.target.value })}
                placeholder="Relevant coursework, achievements, honors..."
                rows={2}
              />
            </div>

            <Button onClick={handleAddEducation} disabled={!newEducation.institution || !newEducation.degree}>
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </CardContent>
        </Card>

        {/* Education List */}
        {education.map((edu) => (
          <Card key={edu.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-base">{edu.degree}</CardTitle>
                  <p className="text-sm text-muted-foreground">{edu.institution} • {edu.duration}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(edu.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            {edu.description && (
              <CardContent>
                <p className="text-sm text-muted-foreground">{edu.description}</p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExperienceForm;