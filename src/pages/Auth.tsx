import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Mail, Lock, User, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

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
              isLogin ? "bg-card text-foreground shadow-card" : "text-muted-foreground"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              !isLogin ? "bg-card text-foreground shadow-card" : "text-muted-foreground"
            }`}
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-8 space-y-4 animate-fade-in">
        {!isLogin && (
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
                className="w-full pl-10 pr-3 py-3 rounded-xl bg-secondary text-foreground text-sm border border-border focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
        )}

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
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-secondary text-foreground text-sm border border-border focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all"
            />
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
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-secondary text-foreground text-sm border border-border focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-2xl gradient-primary text-primary-foreground font-semibold text-sm active:scale-[0.98] transition-transform flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
          {!loading && <ArrowRight className="w-4 h-4" />}
        </button>
      </form>

      <p className="text-[11px] text-muted-foreground text-center mt-6 px-8">
        By continuing, you agree to contribute anonymized health data to advance medical research.
      </p>
    </div>
  );
};

export default Auth;
