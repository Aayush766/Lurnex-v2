import {
  Globe2,
  UsersRound,
  Trophy,
  Star,
  LucideIcon,
} from "lucide-react";

import "./StatsStrip.css";

type Stat = {
  icon: LucideIcon;
  value: string;
  label: string;
  color: string;
  bgTint: string;
};

const stats: Stat[] = [
  {
    icon: Globe2,
    value: "20+ Countries",
    label: "Global Student Reach",
    color: "#087ff5",
    bgTint: "rgba(8, 127, 245, 0.1)",
  },
  {
    icon: UsersRound,
    value: "2,000+ Hrs",
    label: "Interactive Classes Taught",
    color: "#7c3aed",
    bgTint: "rgba(124, 58, 237, 0.1)",
  },
  {
    icon: Trophy,
    value: "10+ Years",
    label: "Teaching Excellence",
    color: "#f59e0b",
    bgTint: "rgba(245, 158, 11, 0.1)",
  },
  {
    icon: Star,
    value: "4.8 / 5",
    label: "Student Satisfaction",
    color: "#10b981",
    bgTint: "rgba(16, 185, 129, 0.1)",
  },
];

export function StatsStrip() {
  return (
    <section className="stats-strip">
      <div className="stats-container">
        <div className="stats-card">
          {stats.map(({ icon: Icon, value, label, color, bgTint }, index) => (
            <div
              className={`stats-item ${
                index !== stats.length - 1 ? "stats-item-divider" : ""
              }`}
              key={value}
            >
              <div
                className="stats-icon-wrapper"
                style={{
                  backgroundColor: bgTint,
                  color: color,
                }}
              >
                <Icon size={24} strokeWidth={2.2} />
              </div>

              <div className="stats-content">
                <div className="stats-value">{value}</div>
                <div className="stats-label">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}