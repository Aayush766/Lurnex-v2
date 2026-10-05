import { BarChart3, Crown, Headphones, Users, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface FeatureCard {
  icon: LucideIcon;
  title: string;
  description: string;
  badgeBg: string;
  iconColor: string;
  glowColor: string;
}

const features: FeatureCard[] = [
  {
    icon: Users,
    title: "Expert Global Faculty",
    description: "Learn from experienced educators across US, UK, India and more.",
    badgeBg: "bg-blue-50/80 border-blue-200/60",
    iconColor: "text-[#087FF5]",
    glowColor: "from-[#087FF5]",
  },
  {
    icon: Crown,
    title: "Personalised Learning",
    description: "Customized study plans based on your goals and strengths.",
    badgeBg: "bg-rose-50/80 border-rose-200/60",
    iconColor: "text-[#F06A9B]",
    glowColor: "from-[#F06A9B]",
  },
  {
    icon: BarChart3,
    title: "Proven Results",
    description: "Our students get into top universities and colleges worldwide.",
    badgeBg: "bg-teal-50/80 border-teal-200/60",
    iconColor: "text-[#10BBD5]",
    glowColor: "from-[#10BBD5]",
  },
  {
    icon: Headphones,
    title: "End-to-End Support",
    description: "From admission guidance to exam prep — we're with you at every step.",
    badgeBg: "bg-purple-50/80 border-purple-200/60",
    iconColor: "text-[#6C3BFF]",
    glowColor: "from-[#6C3BFF]",
  },
];

export function Whylumex() {
  return (
    <section className="relative overflow-hidden bg-slate-50/80 py-20 md:py-28 mb-0">
      {/* Background Radial Dots & Soft Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-[40rem] rounded-full bg-sky-100/50 blur-[130px]" />
      </div>

      <div className="container-shell relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center">
          <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-white/90 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-widest text-[#087FF5] shadow-xs backdrop-blur-md">
            <Sparkles size={13} className="text-[#087FF5] animate-pulse" />
            <span>The Lurnex Difference</span>
          </div>

          <h2 className="text-3xl font-black tracking-tight text-[#071B3A] sm:text-4xl md:text-5xl">
            A more personal way to{" "}
            <span className="bg-gradient-to-r from-[#087FF5] via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              make progress
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-base text-slate-600 sm:text-lg">
            More than just classes – we build brighter futures.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description, badgeBg, iconColor, glowColor }) => (
            <article
              key={title}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-7 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-200 hover:shadow-xl hover:shadow-sky-500/10"
            >
              {/* Subtle top accent line on hover */}
              <div
                className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${glowColor} to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />

              <div>
                {/* Icon Badge */}
                <div
                  className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl border ${badgeBg} ${iconColor} shadow-xs transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon size={26} strokeWidth={2.2} />
                </div>

                {/* Title & Description */}
                <h3 className="mt-6 text-lg font-black tracking-tight text-[#071B3A] transition-colors duration-200 group-hover:text-[#087FF5]">
                  {title}
                </h3>
                <p className="mt-2.5 text-xs leading-relaxed text-slate-500">
                  {description}
                </p>
              </div>

              {/* Decorative Dot Accent */}
              <div className="mt-6 flex items-center gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className={`h-1.5 w-1.5 rounded-full ${iconColor.replace('text-', 'bg-')}`} />
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Learn More</span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
