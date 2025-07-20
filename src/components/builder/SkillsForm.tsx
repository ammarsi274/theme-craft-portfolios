import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { Skill } from "@/types/portfolio";

const SkillsForm = () => {
  const { portfolioData, addSkill, removeSkill } = usePortfolio();
  const { skills } = portfolioData;

  const [newSkill, setNewSkill] = useState<Partial<Skill>>({
    name: "",
    level: 5,
    category: "Technical"
  });

  const skillCategories = [
    "Technical",
    "Programming Languages",
    "Frameworks",
    "Tools",
    "Soft Skills",
    "Languages"
  ];

  const handleAddSkill = () => {
    if (newSkill.name && newSkill.category && newSkill.level) {
      addSkill({
        name: newSkill.name,
        level: newSkill.level,
        category: newSkill.category
      });
      setNewSkill({ name: "", level: 5, category: "Technical" });
    }
  };

  const groupedSkills = skills.reduce((acc, skill, index) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push({ ...skill, index });
    return acc;
  }, {} as Record<string, (Skill & { index: number })[]>);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Skills & Expertise</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Add your skills and rate your proficiency level (1-10)
        </p>
      </div>

      {/* Add New Skill */}
      <div className="space-y-4 p-4 border border-border rounded-lg bg-muted/20">
        <h4 className="font-medium">Add New Skill</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="skill-name">Skill Name</Label>
            <Input
              id="skill-name"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              placeholder="React, Python, Design..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="skill-category">Category</Label>
            <Select
              value={newSkill.category}
              onValueChange={(value) => setNewSkill({ ...newSkill, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {skillCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="skill-level">Proficiency (1-10)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="skill-level"
                type="number"
                min="1"
                max="10"
                value={newSkill.level}
                onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) || 1 })}
                className="w-20"
              />
              <Button onClick={handleAddSkill} disabled={!newSkill.name}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Skills List */}
      {Object.keys(groupedSkills).length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium">Your Skills</h4>
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category} className="space-y-2">
              <h5 className="text-sm font-medium text-muted-foreground">{category}</h5>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill) => (
                  <Badge
                    key={skill.index}
                    variant="secondary"
                    className="flex items-center gap-2 px-3 py-1"
                  >
                    <span>{skill.name}</span>
                    <span className="text-xs bg-primary/20 px-1 rounded">
                      {skill.level}/10
                    </span>
                    <button
                      onClick={() => removeSkill(skill.index)}
                      className="hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {skills.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No skills added yet. Add your first skill above!</p>
        </div>
      )}
    </div>
  );
};

export default SkillsForm;