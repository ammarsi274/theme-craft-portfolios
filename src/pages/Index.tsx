import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Palette, Eye, Download, Zap, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const features = [
    {
      icon: Palette,
      title: "Beautiful Themes",
      description: "Choose from professionally designed themes that make your work shine"
    },
    {
      icon: Eye,
      title: "Live Preview",
      description: "See your portfolio come to life as you type with real-time preview"
    },
    {
      icon: Download,
      title: "One-Click Export",
      description: "Download your complete portfolio as a ready-to-host static website"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Build professional portfolios in minutes, not hours"
    }
  ];

  const stats = [
    { label: "Portfolios Created", value: "10,000+", icon: Users },
    { label: "Themes Available", value: "5", icon: Palette },
    { label: "User Rating", value: "4.9/5", icon: Star }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow"></div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              PortfolioGen
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#themes" className="text-muted-foreground hover:text-foreground transition-colors">Themes</a>
            <Link to="/builder">
              <Button variant="outline" className="font-medium">
                Get Started
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary-glow/5"></div>
        <div className="container mx-auto relative">
          <Badge variant="secondary" className="mb-6 px-4 py-1">
            ✨ New themes added weekly
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent leading-tight">
            Build Stunning
            <br />
            Portfolios in Minutes
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Create professional portfolio websites with our intuitive builder. 
            Choose from beautiful themes, add your content, and export a complete website.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/builder">
              <Button size="lg" className="btn-hero text-lg px-8 py-3">
                Start Building <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
              View Examples
            </Button>
          </div>

          {/* Hero Image */}
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-glow/20 rounded-3xl blur-3xl transform scale-110"></div>
            <img 
              src={heroImage} 
              alt="Portfolio Builder Interface" 
              className="relative rounded-3xl shadow-2xl border border-border/50 w-full"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <stat.icon className="h-8 w-8 mx-auto text-primary" />
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent"> Succeed</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to help you create the perfect portfolio website
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-gradient text-center border-0 hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-primary-glow/10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Build Your Portfolio?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have created stunning portfolios with our platform
          </p>
          <Link to="/builder">
            <Button size="lg" className="btn-hero text-lg px-8 py-3">
              Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary to-primary-glow"></div>
            <span className="text-lg font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              PortfolioGen
            </span>
          </div>
          <p className="text-muted-foreground">
            © 2024 PortfolioGen. Create beautiful portfolios in minutes.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
