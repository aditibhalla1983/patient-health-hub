import { useState } from "react";
import { HeartPulse, TrendingUp, Users, Sun } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis,
} from "recharts";
import PageHeader from "@/components/PageHeader";
import MobileNav from "@/components/MobileNav";

const symptomData = [
  { name: "Fatigue", count: 712 },
  { name: "Joint Pain", count: 634 },
  { name: "Skin Rash", count: 489 },
  { name: "Fever", count: 356 },
  { name: "Hair Loss", count: 278 },
  { name: "Mouth Sores", count: 198 },
];

const flareData = [
  { month: "Jan", flares: 3.1 },
  { month: "Feb", flares: 2.8 },
  { month: "Mar", flares: 3.5 },
  { month: "Apr", flares: 2.4 },
  { month: "May", flares: 2.9 },
  { month: "Jun", flares: 3.8 },
  { month: "Jul", flares: 4.2 },
  { month: "Aug", flares: 3.6 },
  { month: "Sep", flares: 2.7 },
  { month: "Oct", flares: 2.3 },
  { month: "Nov", flares: 3.0 },
  { month: "Dec", flares: 2.6 },
];

const organData = [
  { name: "Skin", value: 35, color: "hsl(345, 65%, 55%)" },
  { name: "Joints", value: 28, color: "hsl(25, 90%, 55%)" },
  { name: "Kidneys", value: 18, color: "hsl(260, 55%, 58%)" },
  { name: "Blood", value: 12, color: "hsl(210, 70%, 52%)" },
  { name: "Other", value: 7, color: "hsl(174, 62%, 40%)" },
];

const qualityOfLife = [
  { subject: "Energy", A: 35 },
  { subject: "Mobility", A: 62 },
  { subject: "Sleep", A: 48 },
  { subject: "Mood", A: 55 },
  { subject: "Social", A: 42 },
  { subject: "Work", A: 38 },
];

type Tab = "symptoms" | "flares" | "organs" | "quality";

const tabs: { key: Tab; label: string }[] = [
  { key: "symptoms", label: "Symptoms" },
  { key: "flares", label: "Flares" },
  { key: "organs", label: "Organs" },
  { key: "quality", label: "Quality" },
];

const LupusData = () => {
  const [activeTab, setActiveTab] = useState<Tab>("symptoms");

  return (
    <div className="min-h-screen bg-background pb-24 max-w-lg mx-auto">
      <PageHeader title="Lupus Data" subtitle="892 patient contributions" showBack />

      {/* Stats */}
      <div className="px-5 grid grid-cols-3 gap-3 mb-4 animate-fade-in">
        {[
          { icon: Users, label: "Patients", value: "892", color: "text-health-rose" },
          { icon: TrendingUp, label: "Avg Flares/Mo", value: "3.1", color: "text-health-orange" },
          { icon: Sun, label: "UV Trigger", value: "67%", color: "text-health-blue" },
        ].map((s) => (
          <div key={s.label} className="bg-card rounded-xl p-3 shadow-card border border-border text-center">
            <s.icon className={`w-4 h-4 mx-auto mb-1 ${s.color}`} />
            <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[10px] text-muted-foreground font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="px-5 mb-4">
        <div className="flex gap-1 p-1 bg-secondary rounded-xl">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === tab.key
                  ? "bg-card text-foreground shadow-card"
                  : "text-muted-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="px-5 animate-fade-in">
        <div className="bg-card rounded-2xl p-4 shadow-card border border-border">
          {activeTab === "symptoms" && (
            <>
              <h3 className="text-sm font-bold text-card-foreground mb-4">Most Reported Symptoms</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={symptomData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 15%, 89%)" />
                  <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(210, 10%, 50%)" />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(210, 10%, 50%)" width={70} />
                  <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                  <Bar dataKey="count" fill="hsl(345, 65%, 55%)" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </>
          )}

          {activeTab === "flares" && (
            <>
              <h3 className="text-sm font-bold text-card-foreground mb-4">Monthly Flare Frequency</h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={flareData}>
                  <defs>
                    <linearGradient id="flareGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(345, 65%, 55%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(345, 65%, 55%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 15%, 89%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="hsl(210, 10%, 50%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(210, 10%, 50%)" />
                  <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                  <Area type="monotone" dataKey="flares" stroke="hsl(345, 65%, 55%)" fill="url(#flareGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </>
          )}

          {activeTab === "organs" && (
            <>
              <h3 className="text-sm font-bold text-card-foreground mb-4">Organ System Involvement</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={organData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" stroke="none">
                    {organData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                {organData.map((s) => (
                  <div key={s.name} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                    <span className="text-[10px] text-muted-foreground font-medium">{s.name} ({s.value}%)</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "quality" && (
            <>
              <h3 className="text-sm font-bold text-card-foreground mb-4">Quality of Life Impact</h3>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={qualityOfLife}>
                  <PolarGrid stroke="hsl(200, 15%, 89%)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} stroke="hsl(210, 10%, 50%)" />
                  <PolarRadiusAxis tick={{ fontSize: 9 }} stroke="hsl(210, 10%, 50%)" domain={[0, 100]} />
                  <Radar name="Score" dataKey="A" stroke="hsl(345, 65%, 55%)" fill="hsl(345, 65%, 55%)" fillOpacity={0.2} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
              <p className="text-[10px] text-muted-foreground text-center mt-1">
                Lower scores indicate greater impact on daily life
              </p>
            </>
          )}
        </div>

        {/* Insight */}
        <div className="mt-4 bg-health-rose-light rounded-2xl p-4 border border-border">
          <div className="flex items-start gap-3">
            <HeartPulse className="w-5 h-5 text-health-rose flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-foreground">Key Insight</h4>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Fatigue is the most reported symptom (80% of patients). Summer months show
                increased flare activity, correlating with UV exposure.
              </p>
            </div>
          </div>
        </div>
      </div>

      <MobileNav />
    </div>
  );
};

export default LupusData;
