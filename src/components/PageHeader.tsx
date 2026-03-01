import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
}

const PageHeader = ({ title, subtitle, showBack }: PageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-3 px-5 pt-[env(safe-area-inset-top,16px)] pb-4">
      {showBack && (
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
      )}
      <div>
        <h1 className="text-xl font-bold text-foreground">{title}</h1>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
