import Link from "next/link";
import { Instagram, MessageCircle } from "lucide-react";
import { locations } from "@/lib/locations";
import { locationFlag } from "@/lib/location-presentation";

const quickLinks = [
  ["Home", "/"],
  ["About", "/about"],
  ["Courses", "/courses"],
  ["Contact", "/contact"],
] as const;

const socialLinks = [
  { label: "WhatsApp", href: "https://wa.me/919990054003", icon: MessageCircle },
  { label: "Instagram", href: "https://www.instagram.com/lurnex.me", icon: Instagram },
];

export function Footer() {
  return (
    <footer className="bg-[#071b3a] py-12 text-white">
      <div className="container-shell">
        <div className="grid grid-cols-1 gap-9 md:grid-cols-5 md:gap-8">
          <div className="flex flex-col items-start md:col-span-1">
            <Link href="/" aria-label="lurnex home">
              <img src="/logo.png" alt="lurnex" className="mb-2 h-20 w-auto object-contain object-left" />
            </Link>
            <p className="text-slate-400">Your partner in global education.</p>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              One-to-one classes and IIT JEE, NEET classes, delivered live online.
            </p>
          </div>

          <nav aria-label="Quick links">
            <h2 className="mb-4 text-lg font-semibold text-white">Quick Links</h2>
            <ul className="space-y-2">
              {quickLinks.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-slate-400 transition-colors hover:text-white">{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <h2 className="mb-4 text-lg font-semibold text-white">Countries We Serve</h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {locations.map((country) => (
                <Link
                  key={country.slug}
                  href={`/locations/${country.slug}`}
                  className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
                >
                  <span aria-hidden="true">{locationFlag(country)}</span>{country.name}
                </Link>
              ))}
            </div>
            <Link href="/locations" className="mt-4 inline-block text-sm font-semibold text-teal-400 transition-colors hover:text-teal-300">
              View all locations <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold text-white">Contact</h2>
            <a href="mailto:support@lurnex.me" className="block text-slate-400 transition-colors hover:text-white">support@lurnex.me</a>
            <a href="tel:+919990054003" className="mt-1 block text-slate-400 transition-colors hover:text-white">+91-9990-054003</a>

            <h2 className="mb-4 mt-6 text-lg font-semibold text-white">Follow Us</h2>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-slate-700 pt-8 text-center text-slate-500">
        <p>© {new Date().getFullYear()} lurnex. All rights reserved.</p>
      </div>
    </footer>
  );
}
