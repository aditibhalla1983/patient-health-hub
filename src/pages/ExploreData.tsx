import { Brain, HeartPulse, Activity, Pill, Stethoscope, Thermometer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HealthCategoryCard from "@/components/HealthCategoryCard";
import PageHeader from "@/components/PageHeader";
import MobileNav from "@/components/MobileNav";

const categories = [
  {
    icon: Brain,
    title: "Migraine Data",
    subtitle: "Triggers, frequency, treatments",
    count: 1248,
    colorClass: "text-health-purple",
    bgClass: "bg-health-purple-light",
    path: "/explore/migraine",
  },
  {
    icon: HeartPulse,
    title: "Lupus Data",
    subtitle: "Symptoms, flares, medications",
    count: 892,
    colorClass: "text-health-rose",
    bgClass: "bg-health-rose-light",
    path: "/explore/lupus",
  },
  {
    icon: Activity,
    title: "Diabetes Data",
    subtitle: "Blood sugar, diet, insulin",
    count: 1567,
    colorClass: "text-health-blue",
    bgClass: "bg-health-blue-light",
    path: "/explore",
  },
  {
    icon: Pill,
    title: "Arthritis Data",
    subtitle: "Joint pain, mobility, treatment",
    count: 634,
    colorClass: "text-health-orange",
    bgClass: "bg-health-orange-light",
    path: "/explore",
  },
  {
    icon: Stethoscope,
    title: "Asthma Data",
    subtitle: "Triggers, peak flow, medication",
    count: 421,
    colorClass: "text-health-teal",
    bgClass: "bg-health-teal-light",
    path: "/explore",
  },
  {
    icon: Thermometer,
    title: "Depression & Anxiety",
    subtitle: "Mood, therapy, coping strategies",
    count: 1089,
    colorClass: "text-health-green",
    bgClass: "bg-health-green-light",
    path: "/explore",
  },
];

const ExploreData = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24 max-w-lg mx-auto">
      <PageHeader title="Explore Data" subtitle="Browse shared health information" showBack />

      <div className="px-5 space-y-3 animate-fade-in">
        {categories.map((cat) => (
          <HealthCategoryCard
            key={cat.title}
            {...cat}
            onClick={() => navigate(cat.path)}
          />
        ))}
      </div>

      <MobileNav />
    </div>
  );
};

export default ExploreData;
