import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  Plane, 
  Clock, 
  Zap, 
  Package, 
  Heart, 
  Mail, 
  MapPin,
  Phone,
  ChevronDown,
  Menu,
  X
} from "lucide-react";
import heroImage from "@assets/generated_images/hero_drone_in_flight.png";
import droneCloseup from "@assets/generated_images/drone_close-up_product_shot.png";
import droneDelivering from "@assets/generated_images/drone_delivering_first_aid.png";
import droneTopDown from "@assets/generated_images/drone_top-down_view.png";
import droneSideProfile from "@assets/generated_images/drone_side_profile_technical.png";
import droneCitySunset from "@assets/generated_images/drone_over_city_sunset.png";
import firstAidDetail from "@assets/generated_images/first-aid_compartment_detail.png";
import ronPortrait from "@assets/generated_images/team_member_ron_portrait.png";
import anikPortrait from "@assets/generated_images/team_member_anik_portrait.png";
import trimPortrait from "@assets/generated_images/team_member_trim_portrait.png";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const submitContactMutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. We'll get back to you soon.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
                <Plane className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold tracking-tight">Firehawk</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => scrollToSection("specs")}
                className="text-foreground hover:text-primary transition-colors font-medium"
                data-testid="link-specs"
              >
                Specs
              </button>
              <button 
                onClick={() => scrollToSection("team")}
                className="text-foreground hover:text-primary transition-colors font-medium"
                data-testid="link-team"
              >
                Team
              </button>
              <button 
                onClick={() => scrollToSection("gallery")}
                className="text-foreground hover:text-primary transition-colors font-medium"
                data-testid="link-gallery"
              >
                Gallery
              </button>
              <button 
                onClick={() => scrollToSection("contact")}
                className="text-foreground hover:text-primary transition-colors font-medium"
                data-testid="link-contact"
              >
                Contact
              </button>
              <Link href="/admin">
                <Button variant="outline" size="sm" data-testid="link-admin">
                  Admin
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 flex flex-col gap-3">
              <button 
                onClick={() => scrollToSection("specs")}
                className="text-left py-2 text-foreground hover:text-primary transition-colors font-medium"
                data-testid="link-mobile-specs"
              >
                Specs
              </button>
              <button 
                onClick={() => scrollToSection("team")}
                className="text-left py-2 text-foreground hover:text-primary transition-colors font-medium"
                data-testid="link-mobile-team"
              >
                Team
              </button>
              <button 
                onClick={() => scrollToSection("gallery")}
                className="text-left py-2 text-foreground hover:text-primary transition-colors font-medium"
                data-testid="link-mobile-gallery"
              >
                Gallery
              </button>
              <button 
                onClick={() => scrollToSection("contact")}
                className="text-left py-2 text-foreground hover:text-primary transition-colors font-medium"
                data-testid="link-mobile-contact"
              >
                Contact
              </button>
              <Link href="/admin">
                <Button variant="outline" size="sm" className="w-full" data-testid="link-mobile-admin">
                  Admin
                </Button>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6" data-testid="text-hero-title">
            Emergency Response<br />at the Speed of Flight
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto" data-testid="text-hero-subtitle">
            Firehawk delivers critical first-aid supplies when every second counts. 
            Autonomous. Reliable. Life-saving.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="text-lg px-8"
              onClick={() => scrollToSection("specs")}
              data-testid="button-view-specs"
            >
              View Specifications
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 bg-background/20 backdrop-blur-sm border-white/30 text-white hover:bg-background/30"
              onClick={() => scrollToSection("demo")}
              data-testid="button-watch-demo"
            >
              Watch Demo
            </Button>
          </div>

          {/* Stats Bar */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 justify-center items-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-1">15 min</div>
              <div className="text-sm text-white/80">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-1">10 km</div>
              <div className="text-sm text-white/80">Flight Range</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-1">2.5 kg</div>
              <div className="text-sm text-white/80">Payload Capacity</div>
            </div>
          </div>
        </div>

        <button 
          onClick={() => scrollToSection("specs")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
          data-testid="button-scroll-down"
        >
          <ChevronDown className="w-8 h-8 text-white" />
        </button>
      </section>

      {/* Specifications Section */}
      <section id="specs" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" data-testid="text-specs-title">
              Technical Specifications
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Engineered for speed, precision, and reliability in emergency situations
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src={droneSideProfile} 
                alt="Firehawk drone technical side view" 
                className="w-full rounded-lg"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <Card className="p-6 hover-elevate">
                <CardContent className="p-0">
                  <Zap className="w-10 h-10 text-primary mb-4" />
                  <div className="text-3xl font-bold mb-2">80 km/h</div>
                  <div className="text-sm text-muted-foreground mb-1 font-medium">Max Speed</div>
                  <p className="text-sm text-muted-foreground">
                    Rapid deployment for critical emergencies
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 hover-elevate">
                <CardContent className="p-0">
                  <Clock className="w-10 h-10 text-primary mb-4" />
                  <div className="text-3xl font-bold mb-2">30 min</div>
                  <div className="text-sm text-muted-foreground mb-1 font-medium">Flight Time</div>
                  <p className="text-sm text-muted-foreground">
                    Extended operation for longer missions
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 hover-elevate">
                <CardContent className="p-0">
                  <Package className="w-10 h-10 text-primary mb-4" />
                  <div className="text-3xl font-bold mb-2">2.5 kg</div>
                  <div className="text-sm text-muted-foreground mb-1 font-medium">Payload</div>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive first-aid kit capacity
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 hover-elevate">
                <CardContent className="p-0">
                  <MapPin className="w-10 h-10 text-primary mb-4" />
                  <div className="text-3xl font-bold mb-2">±1 m</div>
                  <div className="text-sm text-muted-foreground mb-1 font-medium">Precision</div>
                  <p className="text-sm text-muted-foreground">
                    GPS-guided accurate delivery system
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Additional Specs */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">First-Aid Equipment</h3>
              <p className="text-sm text-muted-foreground">
                Bandages, gauze, antiseptic, tourniquets, emergency medication, and AED-ready compartment
              </p>
            </div>
            <div className="text-center">
              <Plane className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Autonomous Navigation</h3>
              <p className="text-sm text-muted-foreground">
                AI-powered obstacle avoidance, real-time route optimization, and weather adaptation
              </p>
            </div>
            <div className="text-center">
              <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Live Communication</h3>
              <p className="text-sm text-muted-foreground">
                Two-way audio, video streaming, and emergency hotline integration
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section id="demo" className="py-24 bg-card">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" data-testid="text-demo-title">
              See Firehawk in Action
            </h2>
            <p className="text-xl text-muted-foreground">
              Watch how Firehawk delivers life-saving supplies in emergency situations
            </p>
          </div>

          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Firehawk Demo Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              data-testid="video-demo"
            />
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Note: Replace this YouTube URL with your actual demo video
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" data-testid="text-gallery-title">
              Gallery
            </h2>
            <p className="text-xl text-muted-foreground">
              Explore Firehawk's design and capabilities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { src: droneCloseup, alt: "Firehawk drone close-up product shot" },
              { src: droneDelivering, alt: "Firehawk delivering first aid in action" },
              { src: droneTopDown, alt: "Top-down view of Firehawk drone" },
              { src: droneCitySunset, alt: "Firehawk flying over city at sunset" },
              { src: firstAidDetail, alt: "First-aid compartment details" },
              { src: droneSideProfile, alt: "Side profile technical view" },
            ].map((image, index) => (
              <div 
                key={index}
                className="group relative aspect-square overflow-hidden rounded-lg hover-elevate"
                data-testid={`image-gallery-${index}`}
              >
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" data-testid="text-team-title">
              Young Innovators
            </h2>
            <p className="text-xl text-muted-foreground">
              Meet the talented 13-year-old creators behind Firehawk
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                name: "Ron", 
                image: ronPortrait,
                role: "Lead Engineer",
                bio: "Designed Firehawk's autonomous navigation system and flight control algorithms. Passionate about robotics and saving lives through technology."
              },
              { 
                name: "Anik", 
                image: anikPortrait,
                role: "Systems Architect",
                bio: "Developed the medical payload system and emergency response protocols. Combines healthcare knowledge with engineering excellence."
              },
              { 
                name: "Trim", 
                image: trimPortrait,
                role: "Software Developer",
                bio: "Built the communication systems and real-time tracking platform. Expert in AI integration and emergency dispatch technology."
              },
            ].map((member, index) => (
              <Card key={index} className="overflow-hidden hover-elevate" data-testid={`card-team-${member.name.toLowerCase()}`}>
                <div className="aspect-[3/4] overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={`${member.name} - Firehawk team member`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-baseline gap-2 mb-1">
                    <h3 className="text-2xl font-bold">{member.name}</h3>
                    <span className="text-sm text-muted-foreground">13 years old</span>
                  </div>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" data-testid="text-contact-title">
              Get in Touch
            </h2>
            <p className="text-xl text-muted-foreground">
              Have questions or want to learn more? We'd love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <Card className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit((data) => submitContactMutation.mutate(data))} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your name" 
                              data-testid="input-name"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="your.email@example.com" 
                              data-testid="input-email"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="What's this about?" 
                              data-testid="input-subject"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us more..." 
                              className="min-h-32"
                              data-testid="input-message"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full"
                      disabled={submitContactMutation.isPending}
                      data-testid="button-submit-contact"
                    >
                      {submitContactMutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </Card>
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <CardContent className="p-0 space-y-4">
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-sm text-muted-foreground">contact@firehawk.tech</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Clock className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Response Time</h3>
                      <p className="text-sm text-muted-foreground">We typically respond within 24 hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-primary/10 rounded-lg p-6 border border-primary/20">
                <h3 className="font-semibold mb-2 text-primary">Emergency?</h3>
                <p className="text-sm text-muted-foreground">
                  For urgent inquiries or partnership opportunities, our team is ready to help bring life-saving technology to your area.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
                  <Plane className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-2xl font-bold">Firehawk</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Emergency first-aid delivery drone. Saving lives through innovation.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <button onClick={() => scrollToSection("specs")} className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Specifications
                </button>
                <button onClick={() => scrollToSection("team")} className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Our Team
                </button>
                <button onClick={() => scrollToSection("gallery")} className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Gallery
                </button>
                <button onClick={() => scrollToSection("contact")} className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Creators</h3>
              <p className="text-sm text-muted-foreground">
                Built by Ron, Anik, and Trim - three talented 13-year-old innovators passionate about saving lives through technology.
              </p>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Firehawk. Built with passion by young innovators.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
