import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, Sparkles, MessageCircle, Clock, Copy, Share2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiService } from "@/services/api";

const WaitlistForm = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactMethod, setContactMethod] = useState("email");
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [referredBy, setReferredBy] = useState<string | null>(null);
  const [signedUp, setSignedUp] = useState(false);
  const { toast } = useToast();

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
    const text = "🎯 Join me in the Nego Challenge! Test your negotiation skills against AI and win prizes! 🏆";

    if (navigator.share) {
      navigator.share({
        title: "The Nego Challenge",
        text: text,
        url: link,
      });
    } else {
      copyReferralLink();
    }
  };

  return (
    <section id="waitlist" className="py-20 px-4 bg-gradient-to-br from-muted via-background to-muted relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="max-w-3xl mx-auto text-center relative z-10">
        {referredBy && !signedUp && (
          <div className="mb-6 bg-accent/20 border-2 border-accent/40 rounded-lg p-4">
            <p className="text-accent font-semibold">
              🎉 You've been referred! Complete signup to join the challenge.
            </p>
          </div>
        )}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 text-primary mb-6 animate-scale-in">
          <Sparkles className="h-4 w-4" />
          <span className="text-sm font-semibold">For TikTok & Instagram Sellers</span>
        </div>
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          Drowning in Comments You Can't Answer?
        </h2>
        
        {/* Pain points - relatable scenarios */}
        <div className="mb-8 space-y-3 max-w-2xl mx-auto">
          <div className="flex items-center gap-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
            <MessageCircle className="h-5 w-5 text-primary flex-shrink-0" />
            <p className="text-left text-base md:text-lg text-foreground">
              <span className="font-semibold">"Is this available?"</span> × 200 comments
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
            <MessageCircle className="h-5 w-5 text-primary flex-shrink-0" />
            <p className="text-left text-base md:text-lg text-foreground">
              <span className="font-semibold">"Can you do 50?"</span> while you're pricing at 100
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
            <Clock className="h-5 w-5 text-accent flex-shrink-0" />
            <p className="text-left text-base md:text-lg text-foreground">
              Missed sales because you couldn't reply fast enough?
            </p>
          </div>
        </div>

        <p className="text-muted-foreground text-lg md:text-xl mb-8 max-w-2xl mx-auto font-medium">
          Your AI Agent replies to <span className="text-primary font-bold">every comment</span>, negotiates smartly, and closes sales while you sleep. 
          <span className="block mt-2 text-accent font-semibold">Never lose a customer again.</span>
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <Tabs value={contactMethod} onValueChange={setContactMethod} className="mb-4">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </TabsTrigger>
              <TabsTrigger value="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="email" className="mt-0">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 h-12 text-base border-2 focus:border-primary"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  size="lg"
                  className="sm:w-auto h-12 px-8 bg-gradient-to-r from-primary to-primary-glow hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all duration-300"
                >
                  {isSubmitting ? "Joining..." : "Get Early Access"}
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="phone" className="mt-0">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="pl-10 h-12 text-base border-2 focus:border-primary"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  size="lg"
                  className="sm:w-auto h-12 px-8 bg-gradient-to-r from-primary to-primary-glow hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all duration-300"
                >
                  {isSubmitting ? "Joining..." : "Get Early Access"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </form>
        
        {!signedUp ? (
          <p className="text-sm text-muted-foreground mt-6">
            Join <span className="font-bold text-primary">500+</span> social media sellers getting their AI sales assistant
          </p>
        ) : (
          <div className="mt-8 bg-gradient-to-r from-accent/10 to-primary/10 border-2 border-accent/30 rounded-2xl p-6">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-foreground mb-4">You're In!</h3>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
              <p className="text-sm text-muted-foreground mb-2">Your Referral Code:</p>
              <p className="text-2xl font-mono font-bold text-primary">{referralCode}</p>
            </div>

            <p className="text-foreground font-semibold mb-4">
              📢 Share with 3 friends to stay in the challenge!
            </p>

            <div className="flex gap-3 justify-center">
              <Button onClick={shareReferralLink} className="bg-accent hover:bg-accent/90">
                <Share2 className="mr-2 h-4 w-4" />
                Share Link
              </Button>
              <Button onClick={copyReferralLink} variant="outline">
                <Copy className="mr-2 h-4 w-4" />
                Copy Link
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              Share your link: {window.location.origin}?ref={referralCode}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default WaitlistForm;
