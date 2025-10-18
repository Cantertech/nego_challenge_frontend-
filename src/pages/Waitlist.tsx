import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, Sparkles, MessageCircle, Clock, Copy, Share2, Zap, Bot, TrendingUp, Users, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiService } from "@/services/api";
import { useNavigate } from "react-router-dom";
import heroBackground from "@/assets/hero-background.jpg";

const Waitlist = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactMethod, setContactMethod] = useState("email");
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [referredBy, setReferredBy] = useState<string | null>(null);
  const [signedUp, setSignedUp] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check for referral code in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refCode = params.get('ref');
    if (refCode) {
      setReferredBy(refCode);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const contactValue = contactMethod === "email" ? email : phone;
    if (!contactValue) return;

    setIsSubmitting(true);

    try {
      const response = await apiService.addToWaitlist({
        contact_type: contactMethod as "email" | "phone",
        contact_value: contactValue,
        source: "website",
        referred_by: referredBy
      });

      // Store their referral code
      setReferralCode(response.referral_code);
      setSignedUp(true);

      toast({
        title: "Success! 🎉",
        description: "You've been added to the waitlist! Check out your referral code below.",
      });
      
      setEmail("");
      setPhone("");
    } catch (error) {
      console.error("Error joining waitlist:", error);
      toast({
        title: "Oops!",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyReferralLink = () => {
    const link = `${window.location.origin}?ref=${referralCode}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard. Share with 3 friends!",
    });
  };

  const shareReferralLink = () => {
    const link = `${window.location.origin}?ref=${referralCode}`;
    const text = "🎯 Join me on the Negomind waitlist! AI that handles all your sales comments on TikTok & Instagram! 🚀";

    if (navigator.share) {
      navigator.share({
        title: "Negomind - AI Sales Assistant",
        text: text,
        url: link,
      });
    } else {
      copyReferralLink();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Background */}
      <div 
        className="relative min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${heroBackground})`
        }}
      >
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-background/80" />
        
        <main className="relative container mx-auto px-4 py-12 md:py-20 min-h-screen flex items-center">
          <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/30 text-white animate-scale-in">
              <Bot className="h-4 w-4" />
              <span className="text-sm font-semibold">AI-Powered Sales Assistant</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight drop-shadow-2xl">
              Never Miss a Sale on Social Media Again
            </h1>

            {/* Sub-headline */}
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
              <span className="text-accent font-bold">Negomind</span> is your AI sales agent that replies to every comment 
              on your TikTok & Instagram posts. It negotiates prices, answers questions, and closes deals—automatically. 
              <span className="block mt-3 text-white font-semibold">24/7. Smart. Unlimited.</span>
            </p>

            {/* Key Features */}
            <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto py-8">
              <div className="bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl hover:bg-white/15 transition-all duration-300 hover:scale-105 animate-scale-in">
                <MessageCircle className="h-10 md:h-12 w-10 md:w-12 text-accent mx-auto mb-4 animate-float" />
                <h3 className="font-heading font-bold text-xl md:text-2xl mb-2 text-white">Auto-Reply</h3>
                <p className="text-white/80 text-sm md:text-base">
                  Responds to every "Is this available?" and "How much?" instantly
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl hover:bg-white/15 transition-all duration-300 hover:scale-105 animate-scale-in" style={{ animationDelay: "0.1s" }}>
                <TrendingUp className="h-10 md:h-12 w-10 md:w-12 text-primary mx-auto mb-4 animate-float" style={{ animationDelay: "0.3s" }} />
                <h3 className="font-heading font-bold text-xl md:text-2xl mb-2 text-white">Smart Negotiation</h3>
                <p className="text-white/80 text-sm md:text-base">
                  Haggles like a pro—knows when to hold firm, when to offer discounts
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl hover:bg-white/15 transition-all duration-300 hover:scale-105 animate-scale-in" style={{ animationDelay: "0.2s" }}>
                <Zap className="h-10 md:h-12 w-10 md:w-12 text-accent mx-auto mb-4 animate-float" style={{ animationDelay: "0.6s" }} />
                <h3 className="font-heading font-bold text-xl md:text-2xl mb-2 text-white">Close Sales</h3>
                <p className="text-white/80 text-sm md:text-base">
                  Handles payment details and confirms orders while you sleep
                </p>
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* PROMINENT Waitlist Form Section - Right After Hero */}
      <section id="waitlist" className="py-16 md:py-24 px-4 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 relative overflow-hidden border-y-4 border-accent/30">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {referredBy && !signedUp && (
            <div className="mb-8 bg-accent/20 border-2 border-accent/40 rounded-xl p-6 animate-bounce">
              <p className="text-accent font-bold text-lg">
                🎉 You've been referred! Complete signup below to join the waitlist.
              </p>
            </div>
          )}
          
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent/20 backdrop-blur-sm border-2 border-accent/30 text-accent mb-6 animate-scale-in">
            <Sparkles className="h-5 w-5" />
            <span className="text-base font-bold">Limited Early Access</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-fade-in">
            Join the Waitlist Today!
          </h2>
          
          <p className="text-foreground text-xl md:text-2xl mb-10 max-w-3xl mx-auto font-semibold leading-relaxed">
            Be among the first to get <span className="text-primary font-bold">Negomind</span> for your business. 
            <span className="block mt-3 text-accent font-bold text-2xl">🎁 Early users get exclusive benefits!</span>
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8">
            <Tabs value={contactMethod} onValueChange={setContactMethod} className="mb-6">
              <TabsList className="grid w-full grid-cols-2 mb-8 h-14">
                <TabsTrigger value="email" className="flex items-center gap-2 text-base font-semibold">
                  <Mail className="h-5 w-5" />
                  Email
                </TabsTrigger>
                <TabsTrigger value="phone" className="flex items-center gap-2 text-base font-semibold">
                  <Phone className="h-5 w-5" />
                  Phone
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="email" className="mt-0">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-14 h-16 text-lg border-2 border-primary/30 focus:border-primary rounded-xl shadow-lg"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting} 
                    size="lg"
                    className="sm:w-auto h-16 px-10 bg-gradient-to-r from-primary to-accent hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] transition-all duration-300 hover:scale-105 text-lg font-bold rounded-xl"
                  >
                    {isSubmitting ? "Joining..." : "Join Waitlist →"}
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="phone" className="mt-0">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
                    <Input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="pl-14 h-16 text-lg border-2 border-primary/30 focus:border-primary rounded-xl shadow-lg"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting} 
                    size="lg"
                    className="sm:w-auto h-16 px-10 bg-gradient-to-r from-primary to-accent hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] transition-all duration-300 hover:scale-105 text-lg font-bold rounded-xl"
                  >
                    {isSubmitting ? "Joining..." : "Join Waitlist →"}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </form>
          
          {!signedUp ? (
            <div className="space-y-6">
              <p className="text-base text-muted-foreground">
                Join <span className="font-bold text-primary text-xl">500+</span> social media sellers getting their AI sales assistant
              </p>
              
              <div className="pt-6 border-t-2 border-dashed border-primary/20">
                <p className="text-foreground text-lg mb-4 font-medium">Want to test the AI first?</p>
                <Button
                  onClick={() => navigate('/challenge')}
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 h-auto border-2 border-accent hover:bg-accent hover:text-white transition-all duration-300 rounded-xl"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Try the AI Challenge
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="mt-8 bg-gradient-to-r from-accent/10 to-primary/10 border-2 border-accent/30 rounded-2xl p-8 animate-scale-in">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">You're on the Waitlist!</h3>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 shadow-lg">
                <p className="text-sm text-muted-foreground mb-3">Your Referral Code:</p>
                <p className="text-4xl font-mono font-bold text-primary mb-3">{referralCode}</p>
                <p className="text-sm text-muted-foreground">Share this code to move up the waitlist!</p>
              </div>

              <p className="text-foreground font-bold mb-6 text-xl">
                📢 Share with 3 friends to get priority access!
              </p>

              <div className="flex gap-4 justify-center flex-wrap mb-6">
                <Button onClick={shareReferralLink} className="bg-accent hover:bg-accent/90 h-14 px-8 text-base rounded-xl">
                  <Share2 className="mr-2 h-5 w-5" />
                  Share Link
                </Button>
                <Button onClick={copyReferralLink} variant="outline" className="h-14 px-8 text-base border-2 rounded-xl">
                  <Copy className="mr-2 h-5 w-5" />
                  Copy Link
                </Button>
              </div>

              <p className="text-xs text-muted-foreground break-all bg-muted/50 p-4 rounded-lg">
                {window.location.origin}?ref={referralCode}
              </p>
              
              <div className="mt-8 pt-8 border-t-2 border-dashed border-primary/20">
                <p className="text-foreground text-lg mb-4 font-medium">Want to try the AI challenge?</p>
                <Button
                  onClick={() => navigate('/challenge')}
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 h-auto border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-xl"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Try the Challenge
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-background via-muted to-background">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 text-primary mb-6 animate-scale-in">
            <Users className="h-4 w-4" />
            <span className="text-sm font-semibold">For TikTok & Instagram Sellers</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 text-foreground">
            Sound Familiar?
          </h2>
          
          {/* Pain points */}
          <div className="mb-8 space-y-4 max-w-2xl mx-auto">
            <div className="flex items-start gap-4 bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-red-200 dark:border-red-900 shadow-lg">
              <MessageCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
              <div className="text-left">
                <p className="text-lg md:text-xl text-foreground font-semibold mb-1">
                  "Is this available?" × 200 comments
                </p>
                <p className="text-sm text-muted-foreground">
                  You're drowning in repetitive questions you can't answer fast enough
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-red-200 dark:border-red-900 shadow-lg">
              <TrendingUp className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
              <div className="text-left">
                <p className="text-lg md:text-xl text-foreground font-semibold mb-1">
                  "Can you do 50 GHS?" when you're pricing at 100
                </p>
                <p className="text-sm text-muted-foreground">
                  You lose deals because you're too busy or accept lowball offers
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-red-200 dark:border-red-900 shadow-lg">
              <Clock className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
              <div className="text-left">
                <p className="text-lg md:text-xl text-foreground font-semibold mb-1">
                  Missed sales because you couldn't reply fast enough
                </p>
                <p className="text-sm text-muted-foreground">
                  Customers move on to competitors who respond faster
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section - How It Works Video */}
      <section id="video-section" className="py-16 md:py-24 bg-gradient-to-b from-muted to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 backdrop-blur-sm border border-accent/20 text-accent mb-2">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-semibold">See Negomind in Action</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground">
              Watch How Negomind Handles Customer Negotiations
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Every comment. Every question. Every haggle. Handled automatically by AI.
              <span className="block mt-2 text-foreground font-semibold">Just like having a full-time sales team.</span>
            </p>
            
            {/* Demo Video */}
            <div className="relative aspect-video bg-muted rounded-2xl border-2 border-primary/20 shadow-2xl overflow-hidden">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/mMsaSFWUbKc"
                title="Negomind Demo Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Value Props */}
            <div className="grid md:grid-cols-3 gap-6 pt-8">
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur-sm rounded-xl p-6 border-2 border-primary/20 hover:border-primary/40 transition-all">
                <div className="text-4xl font-bold text-primary mb-3">24/7</div>
                <p className="text-base text-foreground font-semibold mb-2">Never Miss a Sale</p>
                <p className="text-sm text-muted-foreground">AI replies instantly, even while you sleep or are busy</p>
              </div>
              <div className="bg-gradient-to-br from-accent/5 to-accent/10 backdrop-blur-sm rounded-xl p-6 border-2 border-accent/20 hover:border-accent/40 transition-all">
                <div className="text-4xl font-bold text-accent mb-3">Smart</div>
                <p className="text-base text-foreground font-semibold mb-2">Negotiates Like a Pro</p>
                <p className="text-sm text-muted-foreground">Knows when to hold firm and when to close the deal</p>
              </div>
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur-sm rounded-xl p-6 border-2 border-primary/20 hover:border-primary/40 transition-all">
                <div className="text-4xl font-bold text-primary mb-3">∞</div>
                <p className="text-base text-foreground font-semibold mb-2">Unlimited Capacity</p>
                <p className="text-sm text-muted-foreground">Handle thousands of comments simultaneously</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Waitlist;
