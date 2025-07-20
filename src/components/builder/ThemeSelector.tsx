import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Palette } from "lucide-react";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { Theme } from "@/types/portfolio";

const ThemeSelector = () => {
  const { selectedTheme, setSelectedTheme } = usePortfolio();

  const themes: Theme[] = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and professional design with modern elements',
      preview: 'theme-modern',
      colors: {
        primary: '#6366f1',
        secondary: '#f1f5f9',
        accent: '#8b5cf6',
        background: '#ffffff',
        text: '#1e293b',
      },
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Bold and vibrant design for creative professionals',
      preview: 'theme-creative',
      colors: {
        primary: '#ec4899',
        secondary: '#fdf2f8',
        accent: '#f97316',
        background: '#ffffff',
        text: '#1f2937',
      },
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Simple and elegant design focused on content',
      preview: 'theme-minimal',
      colors: {
        primary: '#374151',
        secondary: '#f9fafb',
        accent: '#6b7280',
        background: '#ffffff',
        text: '#111827',
      },
    },
    {
      id: 'tech',
      name: 'Tech',
      description: 'Futuristic design perfect for developers and tech professionals',
      preview: 'theme-tech',
      colors: {
        primary: '#06b6d4',
        secondary: '#f0f9ff',
        accent: '#3b82f6',
        background: '#ffffff',
        text: '#0f172a',
      },
    },
    {
      id: 'dark',
      name: 'Dark Mode',
      description: 'Sleek dark theme with elegant contrast',
      preview: 'theme-minimal',
      colors: {
        primary: '#8b5cf6',
        secondary: '#1f2937',
        accent: '#06b6d4',
        background: '#111827',
        text: '#f9fafb',
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Choose Your Theme
        </h3>
        <p className="text-sm text-muted-foreground">
          Select a theme that best represents your style and profession
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {themes.map((theme) => (
          <Card 
            key={theme.id} 
            className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
              selectedTheme.id === theme.id 
                ? 'ring-2 ring-primary shadow-lg' 
                : 'hover:shadow-md'
            }`}
            onClick={() => setSelectedTheme(theme)}
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    {theme.name}
                    {selectedTheme.id === theme.id && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {theme.description}
                  </p>
                </div>
                {selectedTheme.id === theme.id && (
                  <Badge variant="default">Selected</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Theme Preview */}
              <div className={`w-full h-24 rounded-lg ${theme.preview} flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-br opacity-80"></div>
                <div className="relative text-white text-sm font-medium">
                  {theme.name} Preview
                </div>
              </div>

              {/* Color Palette */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Color Palette</p>
                <div className="flex gap-2">
                  <div 
                    className="w-6 h-6 rounded-full border border-border" 
                    style={{ backgroundColor: theme.colors.primary }}
                    title="Primary"
                  />
                  <div 
                    className="w-6 h-6 rounded-full border border-border" 
                    style={{ backgroundColor: theme.colors.accent }}
                    title="Accent"
                  />
                  <div 
                    className="w-6 h-6 rounded-full border border-border" 
                    style={{ backgroundColor: theme.colors.secondary }}
                    title="Secondary"
                  />
                  <div 
                    className="w-6 h-6 rounded-full border border-border" 
                    style={{ backgroundColor: theme.colors.background }}
                    title="Background"
                  />
                </div>
              </div>

              {/* Select Button */}
              <Button 
                variant={selectedTheme.id === theme.id ? "default" : "outline"}
                size="sm"
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTheme(theme);
                }}
              >
                {selectedTheme.id === theme.id ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Selected
                  </>
                ) : (
                  'Select Theme'
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Current Selection Info */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-lg"
              style={{ 
                background: `linear-gradient(135deg, ${selectedTheme.colors.primary}, ${selectedTheme.colors.accent})`
              }}
            />
            <div>
              <h4 className="font-medium">Currently Selected: {selectedTheme.name}</h4>
              <p className="text-sm text-muted-foreground">{selectedTheme.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemeSelector;