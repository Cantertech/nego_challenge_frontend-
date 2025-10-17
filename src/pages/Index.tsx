import { useState } from "react";
import { Button } from "@/components/ui/button";
import ChatBot from "@/components/ChatBot";
import WaitlistForm from "@/components/WaitlistForm";
import ChallengeCountdown from "@/components/ChallengeCountdown";
import heroBackground from "@/assets/hero-background.jpg";
import appleWatch from "@/assets/apple_watch.png";
import { Sparkles, Trophy, Award, Zap } from "lucide-react";

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Hero Section with Background */}
        <div 
          className="relative min-h-screen bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${heroBackground})`
          }}
        >
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-background/80" />
          
          <main className="relative container mx-auto px-4 py-12 md:py-20 min-h-screen flex items-center">
            <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary-foreground animate-scale-in">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-semibold">The Ultimate Negotiation Challenge</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight drop-shadow-2xl">
                Can You Outsmart Our AI Seller?
              </h1>

              {/* Sub-headline */}
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto drop-shadow-lg">
                Welcome to <span className="text-accent font-bold">The Nego Challenge!</span> Test your bargaining skills against our AI
                with the personality of a Makola Market pro. The top negotiators win!
              </p>

              {/* Product Showcase */}
              <div className="my-8 max-w-md mx-auto">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border-2 border-accent/30 animate-scale-in">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Zap className="h-5 w-5 text-accent" />
                    <h3 className="font-heading font-bold text-lg text-foreground">Today's Challenge Product</h3>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                    <img 
                      src={appleWatch} 
                      alt="Apple Watch - Challenge Product"
                      className="relative w-full h-48 object-contain rounded-lg"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <h4 className="font-bold text-xl text-foreground">Premium Apple Watch</h4>
                    <p className="text-sm text-muted-foreground mt-1">Starting Price: <span className="text-2xl font-bold text-primary">450 GHS</span></p>
                    <p className="text-xs text-accent font-semibold mt-2">Can you negotiate a better deal?</p>
                  </div>
                </div>
              </div>

              {/* Prize Information */}
              <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto py-8">
                <div className="bg-white/95 backdrop-blur-md border-2 border-primary/20 rounded-2xl p-4 md:p-8 shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105 animate-scale-in">
                  <Trophy className="h-8 md:h-12 w-8 md:w-12 text-accent mx-auto mb-3 md:mb-4 animate-float" />
                  <h3 className="font-heading font-bold text-xl md:text-2xl mb-2 md:mb-3 text-primary">1st Prize</h3>
                  <p className="text-foreground text-sm md:text-lg">
                    <span className="text-xl md:text-2xl font-bold text-accent">100 GHS</span> cash + 
                    <span className="font-semibold"> 3 Months</span> of Nego.chat Pro for FREE
                  </p>
                </div>
                <div className="bg-white/95 backdrop-blur-md border-2 border-primary/20 rounded-2xl p-4 md:p-8 shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105 animate-scale-in" style={{ animationDelay: "0.1s" }}>
                  <Award className="h-8 md:h-12 w-8 md:w-12 text-primary mx-auto mb-3 md:mb-4 animate-float" style={{ animationDelay: "0.5s" }} />
                  <h3 className="font-heading font-bold text-xl md:text-2xl mb-2 md:mb-3 text-primary">2nd Prize</h3>
                  <p className="text-foreground text-sm md:text-lg">
                    <span className="text-xl md:text-2xl font-bold text-accent">50 GHS</span> cash + 
                    <span className="font-semibold"> 1 Month</span> of Nego.chat Pro for FREE
                  </p>
                </div>
              </div>

              {/* Primary CTA */}
              <div className="space-y-6 pt-4">
                <Button
                  onClick={() => setIsChatOpen(true)}
                  size="lg"
                  className="text-xl px-10 py-8 h-auto bg-gradient-to-r from-primary to-primary-glow hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] transition-all duration-300 hover:scale-110 font-bold rounded-full"
                >
                  <Sparkles className="mr-2 h-6 w-6" />
                  Start the Challenge!
                </Button>

                {/* Secondary CTA */}
                <p className="text-white/90 text-lg backdrop-blur-sm bg-black/20 inline-block px-6 py-3 rounded-full">
                  Sell online? Can't reply to all your comments?{" "}
                  <button
                    onClick={scrollToWaitlist}
                    className="text-accent hover:text-accent/80 font-semibold underline decoration-2 underline-offset-4 transition-colors"
                  >
                    See how this can help
                  </button>
                </p>
              </div>
            </div>
          </main>
        </div>

        {/* Challenge Countdown */}
        <section className="py-8 md:py-12 bg-background">
          <div className="container mx-auto px-4">
            <ChallengeCountdown />
          </div>
        </section>

        {/* How It Works Video Section */}
        <section id="video-section" className="py-16 md:py-24 bg-gradient-to-b from-background to-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 backdrop-blur-sm border border-accent/20 text-accent mb-2">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-semibold">Experience AI-Powered Sales</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                See the AI Negotiator in Action
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Watch how our AI handles real customer negotiations - just like it will for your TikTok and Instagram sales. 
                <span className="block mt-2 text-foreground font-semibold">Every comment. Every question. Every haggle. Handled automatically.</span>
              </p>
              
              {/* Demo Video */}
              <div className="relative aspect-video bg-muted rounded-2xl border-2 border-primary/20 shadow-2xl overflow-hidden">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/mMsaSFWUbKc"
                  title="Nego Challenge Demo Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Value Props for Sellers */}
              <div className="grid md:grid-cols-3 gap-4 pt-8">
                <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                  <p className="text-sm text-foreground font-semibold">Never Miss a Sale</p>
                  <p className="text-xs text-muted-foreground mt-2">AI replies instantly, even while you sleep</p>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-accent/20">
                  <div className="text-3xl font-bold text-accent mb-2">Smart</div>
                  <p className="text-sm text-foreground font-semibold">Negotiates Like a Pro</p>
                  <p className="text-xs text-muted-foreground mt-2">Knows when to hold firm and when to close</p>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <div className="text-3xl font-bold text-primary mb-2">∞</div>
                  <p className="text-sm text-foreground font-semibold">Unlimited Capacity</p>
                  <p className="text-xs text-muted-foreground mt-2">Handle 1000s of comments simultaneously</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Waitlist Form */}
        <WaitlistForm />
      </div>

      {/* ChatBot Modal */}
      {isChatOpen && <ChatBot onClose={() => setIsChatOpen(false)} />}
    </>
  );
};

export default Index;
