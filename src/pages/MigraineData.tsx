import { useState } from "react";
import { Brain, TrendingUp, Users, Calendar } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Area, AreaChart,
} from "recharts";
import PageHeader from "@/components/PageHeader";
import MobileNav from "@/components/MobileNav";

const triggerData = [
  { name: "Stress", count: 456 },
  { name: "Sleep", count: 389 },
  { name: "Weather", count: 312 },
  { name: "Diet", count: 267 },
  { name: "Hormones", count: 234 },
  { name: "Screen", count: 198 },
];

const frequencyData = [
  { month: "Jan", episodes: 4.2 },
  { month: "Feb", episodes: 3.8 },
  { month: "Mar", episodes: 5.1 },
  { month: "Apr", episodes: 4.5 },
  { month: "May", episodes: 3.2 },
  { month: "Jun", episodes: 3.9 },
  { month: "Jul", episodes: 4.7 },
  { month: "Aug", episodes: 3.4 },
  { month: "Sep", episodes: 4.1 },
  { month: "Oct", episodes: 3.6 },
  { month: "Nov", episodes: 4.8 },
  { month: "Dec", episodes: 5.3 },
];

const severityData = [
  { name: "Mild", value: 28, color: "hsl(174, 62%, 40%)" },
  { name: "Moderate", value: 42, color: "hsl(25, 90%, 55%)" },
  { name: "Severe", value: 22, color: "hsl(345, 65%, 55%)" },
  { name: "Debilitating", value: 8, color: "hsl(260, 55%, 58%)" },
];

const medicationData = [
  { name: "Sumatriptan", effectiveness: 78 },
  { name: "Ibuprofen", effectiveness: 54 },
  { name: "Topiramate", effectiveness: 71 },
  { name: "Amitriptyline", effectiveness: 62 },
  { name: "Botox", effectiveness: 82 },
];

type Tab = "triggers" | "frequency" | "severity" | "medications";

const tabs: { key: Tab; label: string }[] = [
  { key: "triggers", label: "Triggers" },
  { key: "frequency", label: "Frequency" },
  { key: "severity", label: "Severity" },
  { key: "medications", label: "Meds" },
];

const MigraineData = () => {
  const [activeTab, setActiveTab] = useState<Tab>("triggers");

  return (
    <div className="min-h-screen bg-background pb-24 max-w-lg mx-auto">
      <PageHeader title="Migraine Data" subtitle="1,248 patient contributions" showBack />

      {/* Stats Row */}
      <div className="px-5 grid grid-cols-3 gap-3 mb-4 animate-fade-in">
        {[
          { icon: Users, label: "Patients", value: "1,248", color: "text-health-purple" },
          { icon: TrendingUp, label: "Avg/Month", value: "4.1", color: "text-health-blue" },
          { icon: Calendar, label: "Avg Duration", value: "8.2h", color: "text-health-orange" },
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

      {/* Chart Content */}
      <div className="px-5 animate-fade-in">
        <div className="bg-card rounded-2xl p-4 shadow-card border border-border">
          {activeTab === "triggers" && (
            <>
              <h3 className="text-sm font-bold text-card-foreground mb-4">
                Top Migraine Triggers
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={triggerData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 15%, 89%)" />
                  <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(210, 10%, 50%)" />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(210, 10%, 50%)" width={60} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid hsl(200, 15%, 89%)",
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(260, 55%, 58%)" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </>
          )}

          {activeTab === "frequency" && (
            <>
              <h3 className="text-sm font-bold text-card-foreground mb-4">
                Monthly Episode Frequency (Avg)
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={frequencyData}>
                  <defs>
                    <linearGradient id="freqGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(210, 70%, 52%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(210, 70%, 52%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 15%, 89%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="hsl(210, 10%, 50%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(210, 10%, 50%)" />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(200, 15%, 89%)", fontSize: 12 }} />
                  <Area type="monotone" dataKey="episodes" stroke="hsl(210, 70%, 52%)" fill="url(#freqGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </>
          )}

          {activeTab === "severity" && (
            <>
              <h3 className="text-sm font-bold text-card-foreground mb-4">
                Severity Distribution
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={severityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={90}
                    dataKey="value"
                    stroke="none"
                  >
                    {severityData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                {severityData.map((s) => (
                  <div key={s.name} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                    <span className="text-[10px] text-muted-foreground font-medium">
                      {s.name} ({s.value}%)
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "medications" && (
            <>
              <h3 className="text-sm font-bold text-card-foreground mb-4">
                Medication Effectiveness (%)
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={medicationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 15%, 89%)" />
                  <XAxis dataKey="name" tick={{ fontSize: 9 }} stroke="hsl(210, 10%, 50%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(210, 10%, 50%)" domain={[0, 100]} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(200, 15%, 89%)", fontSize: 12 }} />
                  <Bar dataKey="effectiveness" fill="hsl(174, 62%, 40%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </>
          )}
        </div>

        {/* Insights */}
        <div className="mt-4 bg-health-purple-light rounded-2xl p-4 border border-border">
          <div className="flex items-start gap-3">
            <Brain className="w-5 h-5 text-health-purple flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-foreground">Key Insight</h4>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Stress is the #1 reported trigger across all demographics. Patients using
                Botox report the highest satisfaction rate at 82%.
              </p>
            </div>
          </div>
        </div>
      </div>

      <MobileNav />
    </div>
  );
};

export default MigraineData;
