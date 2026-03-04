import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import PageHeader from "@/components/PageHeader";
import MobileNav from "@/components/MobileNav";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const conditionOptions = [
  "Migraine", "Lupus", "Arthritis", "Diabetes", "Asthma",
  "Heart Disease", "Depression", "Anxiety", "Other",
];

const SubmitHealth = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [form, setForm] = useState({
    age: "",
    gender: "",
    condition: "",
    symptoms: "",
    duration: "",
    medications: "",
    triggers: "",
    notes: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.age || !form.condition || !form.symptoms) {
      toast.error("Please fill in required fields");
      return;
    }
    if (!user) {
      toast.error("You must be logged in");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("health_submissions").insert({
      user_id: user.id,
      age: parseInt(form.age),
      condition: form.condition as any,
      symptoms: form.symptoms,
      gender: form.gender ? (form.gender as any) : null,
      duration: form.duration || null,
      medications: form.medications || null,
      triggers: form.triggers || null,
      notes: form.notes || null,
    });
    setLoading(false);
    if (error) {
      toast.error("Failed to submit: " + error.message);
    } else {
      setSubmitted(true);
      toast.success("Health information submitted successfully!");
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background pb-24 max-w-lg mx-auto flex flex-col">
        <PageHeader title="Submitted" showBack />
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-health-green-light flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-health-green" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Thank You!</h2>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            Your health information has been submitted to the Human Health Project.
            Your data helps advance research and improve outcomes for patients worldwide.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-8 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm active:scale-95 transition-transform"
          >
            Submit Another Entry
          </button>
        </div>
        <MobileNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24 max-w-lg mx-auto">
      <PageHeader title="Add Health Info" subtitle="Share anonymized health data" showBack />

      <form onSubmit={handleSubmit} className="px-5 space-y-4 animate-fade-in">
        {/* Age & Gender */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-foreground mb-1.5 block">
              Age <span className="text-destructive">*</span>
            </label>
            <input
              type="number"
              placeholder="e.g. 35"
              value={form.age}
              onChange={(e) => handleChange("age", e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-secondary text-foreground text-sm border border-border focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground mb-1.5 block">Gender</label>
            <select
              value={form.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-secondary text-foreground text-sm border border-border focus:ring-2 focus:ring-ring outline-none transition-all"
            >
              <option value="">Select</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="non-binary">Non-binary</option>
              <option value="prefer-not">Prefer not to say</option>
            </select>
          </div>
        </div>

        {/* Condition */}
        <div>
          <label className="text-xs font-semibold text-foreground mb-1.5 block">
            Condition <span className="text-destructive">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {conditionOptions.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => handleChange("condition", c)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  form.condition === c
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Symptoms */}
        <div>
          <label className="text-xs font-semibold text-foreground mb-1.5 block">
            Symptoms <span className="text-destructive">*</span>
          </label>
          <textarea
            placeholder="Describe your symptoms..."
            value={form.symptoms}
            onChange={(e) => handleChange("symptoms", e.target.value)}
            rows={3}
            className="w-full px-3 py-2.5 rounded-xl bg-secondary text-foreground text-sm border border-border focus:ring-2 focus:ring-ring outline-none transition-all resize-none"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="text-xs font-semibold text-foreground mb-1.5 block">Duration</label>
          <input
            type="text"
            placeholder="e.g. 3 years, 6 months"
            value={form.duration}
            onChange={(e) => handleChange("duration", e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-secondary text-foreground text-sm border border-border focus:ring-2 focus:ring-ring outline-none transition-all"
          />
        </div>

        {/* Medications */}
        <div>
          <label className="text-xs font-semibold text-foreground mb-1.5 block">
            Current Medications
          </label>
          <input
            type="text"
            placeholder="e.g. Sumatriptan, Ibuprofen"
            value={form.medications}
            onChange={(e) => handleChange("medications", e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-secondary text-foreground text-sm border border-border focus:ring-2 focus:ring-ring outline-none transition-all"
          />
        </div>

        {/* Triggers */}
        <div>
          <label className="text-xs font-semibold text-foreground mb-1.5 block">
            Known Triggers
          </label>
          <input
            type="text"
            placeholder="e.g. Stress, weather changes"
            value={form.triggers}
            onChange={(e) => handleChange("triggers", e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-secondary text-foreground text-sm border border-border focus:ring-2 focus:ring-ring outline-none transition-all"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="text-xs font-semibold text-foreground mb-1.5 block">
            Additional Notes
          </label>
          <textarea
            placeholder="Anything else you'd like to share..."
            value={form.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            rows={2}
            className="w-full px-3 py-2.5 rounded-xl bg-secondary text-foreground text-sm border border-border focus:ring-2 focus:ring-ring outline-none transition-all resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-2xl gradient-primary text-primary-foreground font-semibold text-sm active:scale-[0.98] transition-transform mt-2 disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit to Human Health Project"}
        </button>

        <p className="text-[10px] text-muted-foreground text-center pb-4">
          Your data is anonymized and encrypted. By submitting, you agree to contribute
          to medical research.
        </p>
      </form>

      <MobileNav />
    </div>
  );
};

export default SubmitHealth;
