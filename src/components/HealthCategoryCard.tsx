import { LucideIcon } from "lucide-react";

interface HealthCategoryCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  count: number;
  colorClass: string;
  bgClass: string;
  onClick?: () => void;
}

const HealthCategoryCard = ({
  icon: Icon,
  title,
  subtitle,
  count,
  colorClass,
  bgClass,
  onClick,
}: HealthCategoryCardProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 p-4 rounded-2xl bg-card shadow-card border border-border hover:shadow-elevated transition-all duration-300 active:scale-[0.98] text-left"
    >
      <div className={`w-12 h-12 rounded-xl ${bgClass} flex items-center justify-center flex-shrink-0`}>
        <Icon className={`w-6 h-6 ${colorClass}`} />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-card-foreground text-sm">{title}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
      </div>
      <div className="flex flex-col items-end">
        <span className={`text-lg font-bold ${colorClass}`}>{count}</span>
        <span className="text-[10px] text-muted-foreground">records</span>
      </div>
    </button>
  );
};

export default HealthCategoryCard;
