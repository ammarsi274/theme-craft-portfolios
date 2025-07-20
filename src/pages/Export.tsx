import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Share2, Check, Copy } from "lucide-react";
import { Link } from "react-router-dom";
import { usePortfolio } from "@/contexts/PortfolioContext";
import PortfolioPreview from "@/components/preview/PortfolioPreview";
import { exportPortfolio } from "@/utils/exportUtils";
import { useToast } from "@/hooks/use-toast";

const Export = () => {
  const { portfolioData, selectedTheme } = usePortfolio();
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportPortfolio(portfolioData, selectedTheme);
      setExportComplete(true);
      toast({
        title: "Portfolio Exported!",
        description: "Your portfolio has been downloaded as a ZIP file.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting your portfolio. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied!",
      description: "Preview link copied to clipboard.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/builder" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Builder</span>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary to-primary-glow"></div>
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                PortfolioGen
              </span>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Export Options */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Export Portfolio</h1>
              <p className="text-muted-foreground">
                Your portfolio is ready! Download it or share the preview.
              </p>
            </div>

            {/* Portfolio Summary */}
            <Card className="card-gradient border-0">
              <CardHeader>
                <CardTitle>Portfolio Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Theme</span>
                  <Badge variant="secondary">{selectedTheme.name}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Sections</span>
                  <div className="flex gap-1">
                    {portfolioData.personalInfo.name && <Badge variant="outline" className="text-xs">Info</Badge>}
                    {portfolioData.skills.length > 0 && <Badge variant="outline" className="text-xs">Skills</Badge>}
                    {portfolioData.experiences.length > 0 && <Badge variant="outline" className="text-xs">Work</Badge>}
                    {portfolioData.projects.length > 0 && <Badge variant="outline" className="text-xs">Projects</Badge>}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Projects</span>
                  <span className="font-medium">{portfolioData.projects.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Skills</span>
                  <span className="font-medium">{portfolioData.skills.length}</span>
                </div>
              </CardContent>
            </Card>

            {/* Export Actions */}
            <Card className="card-gradient border-0">
              <CardHeader>
                <CardTitle>Download Portfolio</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Download your portfolio as a complete HTML website ready to host anywhere.
                </p>
                
                <Button 
                  onClick={handleExport}
                  disabled={isExporting}
                  className="w-full btn-hero"
                  size="lg"
                >
                  {isExporting ? (
                    "Exporting..."
                  ) : exportComplete ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Download Complete
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Download ZIP
                    </>
                  )}
                </Button>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-2">Share preview link</p>
                  <Button 
                    variant="outline" 
                    onClick={copyLink}
                    className="w-full"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Preview Link
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="card-gradient border-0">
              <CardHeader>
                <CardTitle>What's Included</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Complete HTML website
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Responsive CSS styling
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Optimized images
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    SEO meta tags
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Cross-browser compatible
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Full Preview */}
          <div className="lg:col-span-2">
            <Card className="card-gradient border-0 h-[calc(100vh-120px)]">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="h-5 w-5" />
                  Final Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="h-full overflow-hidden">
                <div className="h-full border border-border rounded-lg overflow-auto bg-background">
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

export default Export;