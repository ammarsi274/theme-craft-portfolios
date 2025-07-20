import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ArrowRight, Eye, Download } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { usePortfolio } from "@/contexts/PortfolioContext";
import PersonalInfoForm from "@/components/builder/PersonalInfoForm";
import SkillsForm from "@/components/builder/SkillsForm";
import ExperienceForm from "@/components/builder/ExperienceForm";
import ProjectsForm from "@/components/builder/ProjectsForm";
import ThemeSelector from "@/components/builder/ThemeSelector";
import PortfolioPreview from "@/components/preview/PortfolioPreview";

const Builder = () => {
  const navigate = useNavigate();
  const { portfolioData } = usePortfolio();
  const [activeTab, setActiveTab] = useState("personal");
  
  const tabs = [
    { id: "personal", label: "Personal Info", component: PersonalInfoForm },
    { id: "skills", label: "Skills", component: SkillsForm },
    { id: "experience", label: "Experience", component: ExperienceForm },
    { id: "projects", label: "Projects", component: ProjectsForm },
    { id: "themes", label: "Themes", component: ThemeSelector },
  ];

  const currentTabIndex = tabs.findIndex(tab => tab.id === activeTab);
  
  const handleNext = () => {
    if (currentTabIndex < tabs.length - 1) {
      setActiveTab(tabs[currentTabIndex + 1].id);
    } else {
      navigate("/export");
    }
  };

  const handlePrevious = () => {
    if (currentTabIndex > 0) {
      setActiveTab(tabs[currentTabIndex - 1].id);
    }
  };

  const isLastTab = currentTabIndex === tabs.length - 1;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow"></div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                PortfolioGen
              </span>
            </Link>
            <span className="text-muted-foreground">Builder</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/export")}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button size="sm" onClick={() => navigate("/export")}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-120px)]">
          {/* Left Panel - Form */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Build Your Portfolio</h1>
              <p className="text-muted-foreground">
                Fill in your information and see your portfolio come to life in real-time
              </p>
            </div>

            <Card className="card-gradient border-0">
              <CardHeader>
                <CardTitle>Portfolio Information</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-5">
                    {tabs.map((tab) => (
                      <TabsTrigger key={tab.id} value={tab.id} className="text-xs">
                        {tab.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {tabs.map((tab) => (
                    <TabsContent key={tab.id} value={tab.id} className="mt-6">
                      <tab.component />
                    </TabsContent>
                  ))}
                </Tabs>

                {/* Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentTabIndex === 0}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  <Button onClick={handleNext}>
                    {isLastTab ? (
                      <>
                        Export <Download className="h-4 w-4 ml-2" />
                      </>
                    ) : (
                      <>
                        Next <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Live Preview */}
          <div className="sticky top-24 h-fit">
            <Card className="card-gradient border-0 h-[calc(100vh-200px)]">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="h-full overflow-hidden">
                <div className="h-full border border-border rounded-lg overflow-hidden bg-background">
                  <PortfolioPreview />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;