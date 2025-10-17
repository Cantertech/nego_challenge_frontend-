import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Send, Sparkles, Loader2, Share2 } from "lucide-react";
import appleWatch from "@/assets/apple_watch.png";
import { apiService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
  isSystemMessage?: boolean;
}

interface ChatBotProps {
  onClose: () => void;
}

// Generate unique session ID
const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const ChatBot = ({ onClose }: ChatBotProps) => {
  const [sessionId] = useState(generateSessionId());
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Typing...",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [dealClosed, setDealClosed] = useState(false);
  const [showSellerCheck, setShowSellerCheck] = useState(false);
  const [isSeller, setIsSeller] = useState<boolean | null>(null);
  const [shareCode, setShareCode] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Check for referral code in URL
  const referralCode = new URLSearchParams(window.location.search).get('ref');

  // Load LLM opening message when component mounts
  useEffect(() => {
    const loadOpening = async () => {
      try {
        // Include referral code if present
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8090'}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            session_id: sessionId,
            user_message: "INIT_GREETING",
            referred_by: referralCode
          }),
        });
        const data = await response.json();
        
        const openingMessage: Message = {
          role: "assistant",
          content: data.ai_message,
        };
        setMessages([openingMessage]);
        
        // Store share code for this participant
        if (data.share_code) {
          setShareCode(data.share_code);
        }
      } catch (error) {
        console.error("Error loading opening:", error);
        setMessages([{
          role: "assistant",
          content: "Welcome! I'm Bra Alex. I have this Premium Apple Watch - original, excellent condition, all accessories included. I'm selling it for 450 GHS. Interested?"
        }]);
      } finally {
        setIsTyping(false);
      }
    };

    loadOpening();
  }, [sessionId, referralCode]);

  const handleSend = async () => {
    if (!input.trim() || isTyping || dealClosed) return;

    const userMessage: Message = { role: "user", content: input };
    const currentInput = input;
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      // Call real API with LLM negotiation
      const response = await apiService.sendChatMessage(sessionId, currentInput);
      
      const aiResponse: Message = {
        role: "assistant",
        content: response.ai_message,
      };
      setMessages((prev) => [...prev, aiResponse]);
      
      // Check if deal was closed
      if (response.deal_closed) {
        setDealClosed(true);
        
        // Show congratulations and seller check after deal closes
        setTimeout(() => {
          setShowSellerCheck(true);
        }, 1000);
      }
      
    } catch (error) {
      console.error("Error sending message:", error);
      
      // Fallback to local response if API fails
      const fallbackResponse: Message = {
        role: "assistant",
        content: "Having some technical issues, but the Apple Watch is still available. What's your offer?",
      };
      setMessages((prev) => [...prev, fallbackResponse]);
      
      toast({
        title: "Connection Issue",
        description: "Using offline mode. Full AI features may be limited.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };

  const copyShareLink = () => {
    const link = `${window.location.origin}?ref=${shareCode}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Copied!",
      description: "Share this link with 3 friends to stay in the challenge!",
    });
  };

  const shareChallenge = () => {
    const link = `${window.location.origin}?ref=${shareCode}`;
    const text = "🎯 I just negotiated with an AI! Can you beat my score? Join the Nego Challenge and win prizes! 🏆";

    if (navigator.share) {
      navigator.share({
        title: "The Nego Challenge",
        text: text,
        url: link,
      });
    } else {
      copyShareLink();
    }
  };

  const handleSellerResponse = (isSellerResponse: boolean) => {
    setIsSeller(isSellerResponse);
    
    if (isSellerResponse) {
      // They are a seller - show video and waitlist info
      const sellerMessage: Message = {
        role: "assistant",
        content: `Great! As a seller, you just experienced how our AI negotiates on YOUR behalf!\n\n✅ Never miss a sale - responds 24/7\n✅ Professional negotiations every time\n✅ Handles unlimited comments simultaneously\n\nWatch the demo video below to see how this works for your TikTok/Instagram sales, then join our waitlist!`,
        isSystemMessage: true,
      };
      setMessages((prev) => [...prev, sellerMessage]);
      
      // Scroll to video section after a delay
      setTimeout(() => {
        onClose();
        document.getElementById("video-section")?.scrollIntoView({ behavior: "smooth" });
      }, 2000);
    } else {
      // Not a seller - show share options
      const nonSellerMessage: Message = {
        role: "assistant",
        content: `Thanks for playing! Share with 3 friends to stay in the challenge and qualify for prizes! 🎉`,
        isSystemMessage: true,
      };
      setMessages((prev) => [...prev, nonSellerMessage]);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Header */}
      <div className="border-b bg-primary text-primary-foreground p-4 flex items-center justify-between">
        <div>
          <h2 className="font-heading font-bold text-lg">Chat with Bra Alex</h2>
          <p className="text-sm opacity-90">Makola Market AI Seller • The Nego Challenge</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-primary-foreground hover:bg-primary-foreground/20"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Product Display */}
      <div className="border-b bg-muted/50 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4">
            <img 
              src={appleWatch} 
              alt="Apple Watch"
              className="w-20 h-20 md:w-24 md:h-24 rounded-lg object-contain bg-white border-2 border-primary/20 shadow-lg p-2"
            />
            <div className="flex-1">
              <h3 className="font-heading font-bold text-lg text-foreground">Premium Apple Watch</h3>
              <p className="text-sm text-muted-foreground">Original, Excellent Condition</p>
              <p className="text-2xl font-bold text-primary mt-1">450 GHS</p>
            </div>
          </div>
          {/* AI Info Badge */}
          <div className="mt-3 bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-lg p-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-accent flex-shrink-0" />
            <p className="text-xs text-foreground">
              <span className="font-semibold">Bra Alex is an AI that negotiates on YOUR behalf!</span> Imagine this handling all your TikTok/IG comments 24/7.
            </p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4 max-w-3xl mx-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.isSystemMessage
                    ? "bg-accent/20 border border-accent/30 text-foreground"
                    : message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.content}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted text-foreground rounded-lg px-4 py-2 flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <p className="text-sm">AI is thinking...</p>
              </div>
            </div>
          )}
          
          {/* Congratulations and Seller Check */}
          {showSellerCheck && isSeller === null && (
            <div className="flex justify-center mt-6">
              <div className="bg-gradient-to-r from-accent/20 to-primary/20 border-2 border-accent/30 rounded-2xl p-6 text-center max-w-md">
                <div className="text-6xl mb-4">🏆</div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Congratulations!</h3>
                <p className="text-muted-foreground mb-4">You successfully negotiated a deal!</p>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-foreground font-semibold">
                    You just experienced AI-powered negotiation in action!
                  </p>
                </div>
                
                {shareCode && (
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
                    <p className="text-xs text-muted-foreground mb-2">Your Challenge Code:</p>
                    <p className="text-lg font-mono font-bold text-primary">{shareCode}</p>
                    <Button onClick={shareChallenge} size="sm" className="mt-3 bg-accent hover:bg-accent/90">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share with 3 Friends
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      (Share to qualify for prizes!)
                    </p>
                  </div>
                )}

                <p className="text-foreground font-semibold mb-4">Are you an online seller?</p>
                <div className="flex gap-3 justify-center">
                  <Button
                    onClick={() => handleSellerResponse(true)}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Yes, I'm a Seller
                  </Button>
                  <Button
                    onClick={() => handleSellerResponse(false)}
                    variant="outline"
                  >
                    No, Just Playing
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t p-4 bg-background">
        <div className="max-w-3xl mx-auto flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && !isTyping && handleSend()}
            placeholder={dealClosed ? "Deal closed! 🎉" : "Type your offer..."}
            className="flex-1"
            disabled={isTyping || dealClosed}
          />
          <Button 
            onClick={handleSend} 
            size="icon" 
            className="shrink-0"
            disabled={isTyping || dealClosed || !input.trim()}
          >
            {isTyping ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
