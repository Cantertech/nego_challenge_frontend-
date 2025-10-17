import { useEffect, useState } from "react";
import { Trophy, Share2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChallengeCountdown = () => {
  // Challenge starts NOW and ends in 7 days
  const now = new Date();
  const challengeStartDate = now;
  const challengeEndDate = new Date(now.getTime() + (7 * 24 * 60 * 60 * 1000)); // 7 days from now
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [hasStarted, setHasStarted] = useState(true);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const currentTime = new Date();
      const difference = challengeEndDate.getTime() - currentTime.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        // Challenge has ended
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [challengeEndDate]);

  const shareChallenge = () => {
    const shareText = "🎯 Join the Nego Challenge! Test your negotiation skills against AI and win prizes! 🏆";
    const shareUrl = window.location.origin;

    if (navigator.share) {
      navigator.share({
        title: "The Nego Challenge",
        text: shareText,
        url: shareUrl,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      alert("Link copied to clipboard! Share with your friends!");
    }
  };

  return (
    <div className="bg-gradient-to-r from-accent/10 via-primary/10 to-accent/10 border-2 border-accent/30 rounded-2xl p-6 md:p-8 mb-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-white font-bold">
          <Trophy className="h-5 w-5" />
          <span>7-DAY CHALLENGE</span>
        </div>

        <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
          Challenge Ends In
        </h3>

        {/* Countdown Timer */}
        <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
            <div className="text-3xl md:text-4xl font-bold text-primary">{timeLeft.days}</div>
            <div className="text-xs md:text-sm text-muted-foreground">Days</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
            <div className="text-3xl md:text-4xl font-bold text-primary">{timeLeft.hours}</div>
            <div className="text-xs md:text-sm text-muted-foreground">Hours</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
            <div className="text-3xl md:text-4xl font-bold text-primary">{timeLeft.minutes}</div>
            <div className="text-xs md:text-sm text-muted-foreground">Mins</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
            <div className="text-3xl md:text-4xl font-bold text-primary">{timeLeft.seconds}</div>
            <div className="text-xs md:text-sm text-muted-foreground">Secs</div>
          </div>
        </div>

        <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4 space-y-3">
          <p className="text-foreground font-semibold">
            🚀 Challenge is <span className="text-primary font-bold">LIVE NOW!</span>
          </p>
          <p className="text-foreground font-semibold">
            🏆 Challenge ends: <span className="text-accent">{challengeEndDate.toLocaleString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true
            })}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Winners will be announced on this platform and all our social media channels
          </p>
        </div>

        {/* Share Challenge */}
        <div className="pt-4 space-y-3">
          <Button
            onClick={shareChallenge}
            className="bg-accent hover:bg-accent/90 text-white"
            size="lg"
          >
            <Share2 className="mr-2 h-5 w-5" />
            Share Challenge with Friends
          </Button>
          
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>Share with 3 friends to stay in the challenge!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCountdown;




