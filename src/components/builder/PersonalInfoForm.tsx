import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePortfolio } from "@/contexts/PortfolioContext";

const PersonalInfoForm = () => {
  const { portfolioData, updatePersonalInfo, updateSocialLinks } = usePortfolio();
  const { personalInfo, socialLinks } = portfolioData;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={personalInfo.name}
              onChange={(e) => updatePersonalInfo({ name: e.target.value })}
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Professional Title</Label>
            <Input
              id="title"
              value={personalInfo.title}
              onChange={(e) => updatePersonalInfo({ title: e.target.value })}
              placeholder="Full Stack Developer"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="about">About Me</Label>
        <Textarea
          id="about"
          value={personalInfo.about}
          onChange={(e) => updatePersonalInfo({ about: e.target.value })}
          placeholder="Tell us about yourself, your experience, and what you're passionate about..."
          rows={4}
        />
        <p className="text-xs text-muted-foreground">Supports Markdown formatting</p>
      </div>

      <div>
        <h4 className="text-md font-semibold mb-3">Contact Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={personalInfo.email}
              onChange={(e) => updatePersonalInfo({ email: e.target.value })}
              placeholder="john@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={personalInfo.phone}
              onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={personalInfo.location}
              onChange={(e) => updatePersonalInfo({ location: e.target.value })}
              placeholder="San Francisco, CA"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              value={personalInfo.website}
              onChange={(e) => updatePersonalInfo({ website: e.target.value })}
              placeholder="https://johndoe.com"
            />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-md font-semibold mb-3">Social Links</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="github">GitHub</Label>
            <Input
              id="github"
              value={socialLinks.github}
              onChange={(e) => updateSocialLinks({ github: e.target.value })}
              placeholder="https://github.com/johndoe"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              value={socialLinks.linkedin}
              onChange={(e) => updateSocialLinks({ linkedin: e.target.value })}
              placeholder="https://linkedin.com/in/johndoe"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="twitter">Twitter</Label>
            <Input
              id="twitter"
              value={socialLinks.twitter}
              onChange={(e) => updateSocialLinks({ twitter: e.target.value })}
              placeholder="https://twitter.com/johndoe"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dribbble">Dribbble</Label>
            <Input
              id="dribbble"
              value={socialLinks.dribbble}
              onChange={(e) => updateSocialLinks({ dribbble: e.target.value })}
              placeholder="https://dribbble.com/johndoe"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;