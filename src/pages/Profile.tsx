import { User, Heart, FileText, Settings, ChevronRight, Shield } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import MobileNav from "@/components/MobileNav";

const menuItems = [
  { icon: FileText, label: "My Submissions", count: "3", color: "text-health-teal", bg: "bg-health-teal-light" },
  { icon: Heart, label: "Saved Insights", count: "7", color: "text-health-rose", bg: "bg-health-rose-light" },
  { icon: Shield, label: "Privacy Settings", color: "text-health-purple", bg: "bg-health-purple-light" },
  { icon: Settings, label: "App Settings", color: "text-health-blue", bg: "bg-health-blue-light" },
];

const Profile = () => {
  return (
    <div className="min-h-screen bg-background pb-24 max-w-lg mx-auto">
      <PageHeader title="Profile" />

      <div className="px-5 animate-fade-in">
        {/* Profile Card */}
        <div className="bg-card rounded-2xl p-5 shadow-card border border-border text-center mb-6">
          <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-3">
            <User className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="text-lg font-bold text-card-foreground">Patient</h2>
          <p className="text-xs text-muted-foreground mt-1">Contributing since 2024</p>
          <div className="flex justify-center gap-6 mt-4">
            <div className="text-center">
              <p className="text-lg font-bold text-health-teal">3</p>
              <p className="text-[10px] text-muted-foreground">Submissions</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-health-purple">2</p>
              <p className="text-[10px] text-muted-foreground">Conditions</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-health-blue">7</p>
              <p className="text-[10px] text-muted-foreground">Saved</p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-4 p-4 rounded-2xl bg-card shadow-card border border-border hover:shadow-elevated transition-all active:scale-[0.98] text-left"
            >
              <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center`}>
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <span className="flex-1 text-sm font-semibold text-card-foreground">{item.label}</span>
              {item.count && (
                <span className="text-xs font-semibold text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                  {item.count}
                </span>
              )}
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>

      <MobileNav />
    </div>
  );
};

export default Profile;
