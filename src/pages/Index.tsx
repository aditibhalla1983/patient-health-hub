import { useNavigate } from "react-router-dom";
import { Brain, HeartPulse, PlusCircle, BarChart3, Shield, Users } from "lucide-react";
import HealthCategoryCard from "@/components/HealthCategoryCard";
import MobileNav from "@/components/MobileNav";
import heroImage from "@/assets/health-hero.png";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24 max-w-lg mx-auto">
      {/* Header */}
      <div className="px-5 pt-[env(safe-area-inset-top,16px)] pb-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-medium">Welcome back 👋</p>
            <h1 className="text-2xl font-bold text-foreground mt-0.5">
              Human Health Project
            </h1>
          </div>
          <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <Users className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>
      </div>

      {/* Hero Card */}
      <div className="px-5 mt-4 animate-fade-in">
        <div className="relative overflow-hidden rounded-2xl gradient-primary p-5">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-foreground/20 text-primary-foreground text-xs font-semibold mb-3">
              <Shield className="w-3 h-3" /> Your Data, Your Choice
            </span>
            <h2 className="text-lg font-bold text-primary-foreground leading-snug">
              Share your health story.<br />Help others heal.
            </h2>
            <p className="text-xs text-primary-foreground/80 mt-2 leading-relaxed">
              Contribute anonymized health data to advance medical research and help patients worldwide.
            </p>
            <button
              onClick={() => navigate("/submit")}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-foreground text-primary font-semibold text-sm hover:opacity-90 transition-opacity active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              Add Your Health Info
            </button>
          </div>
          <img
            src={heroImage}
            alt="Health data illustration"
            className="absolute right-0 bottom-0 w-32 h-32 object-contain opacity-30"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-5 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-foreground">Explore Shared Data</h2>
          <button
            onClick={() => navigate("/explore")}
            className="text-xs font-semibold text-primary"
          >
            View All →
          </button>
        </div>

        <div className="space-y-3">
          <HealthCategoryCard
            icon={Brain}
            title="Migraine Data"
            subtitle="Triggers, frequency, treatments"
            count={1248}
            colorClass="text-health-purple"
            bgClass="bg-health-purple-light"
            onClick={() => navigate("/explore/migraine")}
          />
          <HealthCategoryCard
            icon={HeartPulse}
            title="Lupus Data"
            subtitle="Symptoms, flares, medications"
            count={892}
            colorClass="text-health-rose"
            bgClass="bg-health-rose-light"
            onClick={() => navigate("/explore/lupus")}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="px-5 mt-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Contributors", value: "2.4K", color: "text-health-teal" },
            { label: "Data Points", value: "18K", color: "text-health-blue" },
            { label: "Conditions", value: "12", color: "text-health-orange" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-card rounded-xl p-3 shadow-card border border-border text-center"
            >
              <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Explore CTA */}
      <div className="px-5 mt-6">
        <button
          onClick={() => navigate("/explore")}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-secondary text-secondary-foreground font-semibold text-sm hover:bg-muted transition-colors active:scale-[0.98]"
        >
          <BarChart3 className="w-5 h-5" />
          Explore All Health Data
        </button>
      </div>

      <MobileNav />
    </div>
  );
};

export default Index;
