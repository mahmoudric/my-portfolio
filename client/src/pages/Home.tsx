import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Palette, Zap, Mail, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

/**
 * Design Philosophy: Minimalist Elegance with Asymmetric Layout
 * - Gold accent (#d4af37) for premium feel
 * - Playfair Display for headings, Poppins for body
 * - Asymmetric layouts breaking traditional patterns
 * - Subtle animations and smooth transitions
 */

export default function Home() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform Redesign",
      category: "Web Design",
      description: "Complete redesign of an e-commerce platform focusing on user experience and conversion optimization.",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030114307/azBYHo3tqLmR2mfCiqDWhw/portfolio-accent-1-QFjdoPKLmPF5hjSVaxtf5H.webp",
      year: "2026"
    },
    {
      id: 2,
      title: "SaaS Dashboard System",
      category: "UI/UX Design",
      description: "Designed a comprehensive dashboard system for a B2B SaaS platform with real-time analytics.",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030114307/azBYHo3tqLmR2mfCiqDWhw/portfolio-accent-2-gMKKNwtmwr5Koo6sTYwQdL.webp",
      year: "2026"
    }
  ];

  const services = [
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Crafting beautiful and intuitive user interfaces that users love to interact with."
    },
    {
      icon: Code,
      title: "Web Development",
      description: "Building responsive, performant websites and applications with modern technologies."
    },
    {
      icon: Zap,
      title: "Brand Strategy",
      description: "Developing comprehensive brand identities that resonate with your target audience."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="text-2xl font-bold text-accent" style={{ fontFamily: 'var(--font-display)' }}>
            Mahmoud Yassen
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#work" className="text-sm hover:text-accent transition-colors">Work</a>
            <a href="#services" className="text-sm hover:text-accent transition-colors">Services</a>
            <a href="#about" className="text-sm hover:text-accent transition-colors">About</a>
            <a href="#contact" className="text-sm hover:text-accent transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section - Asymmetric Layout */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310419663030114307/azBYHo3tqLmR2mfCiqDWhw/hero-background-RrP82BL6qbRhZQqQKEhqKV.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.3
          }}
        />
        
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="space-y-6 md:order-1 order-2">
              <div className="space-y-2">
                <p className="text-accent text-sm tracking-widest uppercase">Welcome to my portfolio</p>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                  Transforming Ideas Into Digital Excellence
                </h1>
              </div>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                I'm a passionate web designer and developer creating beautiful, functional digital experiences that drive results. Let's build something remarkable together.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  size="lg"
                  onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View My Work <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  className="border-accent text-accent hover:bg-accent/10"
                  size="lg"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get in Touch
                </Button>
              </div>
            </div>

            {/* Right: Profile Image */}
            <div className="md:order-2 order-1 flex justify-center md:justify-end">
              <div className="relative w-full max-w-sm">
                <div className="absolute -inset-4 bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg blur-xl" />
                <img 
                  src="/manus-storage/profile-photo_09e0b5be.png"
                  alt="Profile"
                  className="relative w-full rounded-lg shadow-2xl object-cover aspect-square"
                  style={{ transform: 'scaleX(-1)' }}
                />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      {/* Services Section */}
      <section id="services" className="py-20 md:py-32 bg-secondary/30">
        <div className="container">
          <div className="space-y-4 mb-16">
            <p className="text-accent text-sm tracking-widest uppercase">What I Do</p>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>Services & Expertise</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div 
                  key={index}
                  className="group p-8 bg-card rounded-lg border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      {/* Portfolio Section */}
      <section id="work" className="py-20 md:py-32">
        <div className="container">
          <div className="space-y-4 mb-16">
            <p className="text-accent text-sm tracking-widest uppercase">Recent Work</p>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>Featured Projects</h2>
          </div>

          <div className="space-y-12">
            {projects.map((project, index) => (
              <div 
                key={project.id}
                className={`group grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Image */}
                <div className={`relative overflow-hidden rounded-lg ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <img 
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className={`space-y-4 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <div className="space-y-2">
                    <p className="text-accent text-sm tracking-widest uppercase">{project.category}</p>
                    <h3 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>{project.title}</h3>
                  </div>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-4 pt-4">
                    <span className="text-sm text-muted-foreground">{project.year}</span>
                    <div className="flex-1 h-px bg-border" />
                    {project.id === 1 && (
                      <a href="/projects/ecommerce">
                        <Button 
                          variant="ghost"
                          className="text-accent hover:text-accent hover:bg-accent/10"
                        >
                          View Project <ExternalLink className="ml-2 w-4 h-4" />
                        </Button>
                      </a>
                    )}
                    {project.id === 2 ? (
                      <a href="/projects/saas-dashboard">
                        <Button
                          variant="ghost"
                          className="text-accent hover:text-accent hover:bg-accent/10"
                        >
                          View Project <ExternalLink className="ml-2 w-4 h-4" />
                        </Button>
                      </a>
                    ) : project.id !== 1 && (
                      <Button 
                        variant="ghost"
                        className="text-accent hover:text-accent hover:bg-accent/10"
                      >
                        View Project <ExternalLink className="ml-2 w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 bg-secondary/30">
        <div className="container">
          <div className="max-w-3xl">
            <div className="space-y-4 mb-8">
              <p className="text-accent text-sm tracking-widest uppercase">About Me</p>
              <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>Crafting Digital Experiences</h2>
            </div>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                I'm a passionate web developer dedicated to creating intuitive, beautiful digital solutions that solve real problems. My focus is on building high-quality web experiences that combine elegant design with robust functionality.
              </p>

              <p>
                I believe that great design is not just about aesthetics—it's about understanding user needs, solving problems elegantly, and creating experiences that delight. Every project is an opportunity to push boundaries and create something meaningful.
              </p>

              <p>
                When I'm not designing or coding, you'll find me exploring new design trends, contributing to open-source projects, or sharing knowledge with the design community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      {/* CTA Section */}
      <section id="contact" className="py-20 md:py-32">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>Let's Work Together</h2>
              <p className="text-xl text-muted-foreground">
                Have a project in mind? I'd love to hear about it. Let's create something amazing together.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <a href="mailto:mahmodelsaigh@gmail.com">
                <Button 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  size="lg"
                >
                  <Mail className="mr-2 w-4 h-4" />
                  Send Me an Email
                </Button>
              </a>
              <a href="https://wa.me/201126251838" target="_blank" rel="noopener noreferrer">
                <Button 
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent/10"
                  size="lg"
                >
                  💬 WhatsApp: +201126251838
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-secondary/30">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-2xl font-bold text-accent" style={{ fontFamily: 'var(--font-display)' }}>
              Portfolio
            </div>
            
            <div className="flex gap-8">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                Twitter
              </a>
              <a href="https://www.linkedin.com/in/mahmoud-yasen-713a23346" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                LinkedIn
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                GitHub
              </a>
              <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                
              </a>
            </div>

            <p className="text-sm text-muted-foreground">
              © 2026 All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
