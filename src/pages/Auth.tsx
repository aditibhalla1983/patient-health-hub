import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Mail, Lock, User, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { lovable } from "@/integrations/lovable/index";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    const { error } = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin
    });
    if (error) {
      toast.error(error.message);
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Welcome back!");
        navigate("/");
      }
    } else {
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        setLoading(false);
        return;
      }
      const { error } = await signUp(email, password, displayName);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Check your email to confirm your account!");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto">
      {/* Header */}
      <div className="pt-12 pb-8 px-8 text-center">
        <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-elevated">
          <Heart className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
          Human Health Project
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          {isLogin ? "Welcome back! Sign in to continue." : "Join our health community today."}
        </p>
      </div>

      {/* Toggle */}
      <div className="px-8 mb-6">
        <div className="flex p-1 bg-secondary rounded-xl">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            isLogin ? "bg-card text-foreground shadow-card" : "text-muted-foreground"}`
            }>
            
            Sign In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            !isLogin ? "bg-card text-foreground shadow-card" : "text-muted-foreground"}`
            }>
            
            Sign Up
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-8 space-y-4 animate-fade-in">
        {!isLogin &&
        <div>
            <label className="text-xs font-semibold text-foreground mb-1.5 block">
              Display Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
              type="text"
              placeholder="Your name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-secondary text-foreground text-sm border border-border focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all" />
            
            </div>
          </div>
        }

        <div>
          <label className="text-xs font-semibold text-foreground mb-1.5 block">
            Email <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-secondary text-foreground text-sm border border-border focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all" />
            
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-foreground mb-1.5 block">
            Password <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-secondary text-foreground text-sm border border-border focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all" />
            
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-2xl gradient-primary text-primary-foreground font-semibold text-sm active:scale-[0.98] transition-transform gap-2 disabled:opacity-60 flex items-center justify-center">
          
          {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
          {!loading && <ArrowRight className="w-4 h-4" />}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 py-1">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Google */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          className="w-full py-3 rounded-2xl font-semibold text-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 disabled:opacity-60 border-primary border-2 text-secondary-foreground bg-[#6fbeb8] shadow-sm">
          
          <svg className="w-4.5 h-4.5 shadow-sm opacity-95 border-dotted" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          {googleLoading ? "Connecting..." : "Continue with Google"}
        </button>
      </form>

      <p className="text-[11px] text-muted-foreground text-center mt-6 px-8">
        By continuing, you agree to contribute anonymized health data to advance medical research.
      </p>
    </div>);

};

export default Auth;