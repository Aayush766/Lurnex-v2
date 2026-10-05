"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Check, Clock3, Globe2, MapPin, MonitorPlay, Search, UsersRound } from "lucide-react";
import { locations } from "@/lib/locations";
import { locationFlag, locationRegion } from "@/lib/location-presentation";

const regions = ["All locations", ...Array.from(new Set(locations.map(locationRegion)))];
const totalCities = locations.reduce((sum, location) => sum + location.cities.length, 0);

export function LocationsExplorer() {
  const [region, setRegion] = useState("All locations");
  const [search, setSearch] = useState("");
  const visibleLocations = useMemo(() => locations.filter((location) => {
    const regionMatch = region === "All locations" || locationRegion(location) === region;
    const query = search.trim().toLowerCase();
    const searchMatch = !query || `${location.name} ${locationRegion(location)} ${location.cities.join(" ")}`.toLowerCase().includes(query);
    return regionMatch && searchMatch;
  }), [region, search]);

  return <main className="locations-hub">
    <section className="locations-hero">
      <div className="locations-hero-pattern"/>
      <div className="locations-wrap locations-hero-layout">
        <div className="locations-intro">
          <span className="locations-eyebrow"><Globe2 size={15}/> PERSONAL LEARNING, GLOBAL REACH</span>
          <h1>Local to your life.<br/><span>Built around you.</span></h1>
          <p>One-to-one online tutoring with a schedule that fits your time zone, school week and academic goals.</p>
          <a href="#locations-list" className="locations-main-cta">Find your location <ArrowRight size={17}/></a>
          <div className="locations-data-strip"><div><strong>{locations.length}</strong><span>location hubs</span></div><div><strong>{totalCities}</strong><span>cities listed</span></div><div><strong>{regions.length - 1}</strong><span>global regions</span></div></div>
        </div>
        <div className="locations-globe-card"><div className="locations-globe-orb"><div className="globe-latitude latitude-one"/><div className="globe-latitude latitude-two"/><div className="globe-longitude longitude-one"/><div className="globe-longitude longitude-two"/><span className="globe-pin pin-gulf">✦</span><span className="globe-pin pin-india">✦</span><span className="globe-pin pin-west">✦</span></div><div className="globe-label globe-label-gulf"><i/>Gulf region</div><div className="globe-label globe-label-india"><i/>South Asia</div><div className="globe-label globe-label-west"><i/>UK · US</div><div className="globe-card-caption"><span className="globe-live-dot"/><div><strong>Wherever you learn from</strong><small>We work around your local rhythm</small></div><Clock3 size={19}/></div></div>
      </div>
    </section>

    <section className="locations-value-band"><div className="locations-wrap locations-value-grid"><article><span><MonitorPlay size={20}/></span><div><b>Live one-to-one sessions</b><small>Focused time with a tutor</small></div></article><article><span><Clock3 size={20}/></span><div><b>Time-zone aware</b><small>Plan for your local day</small></div></article><article><span><BookOpen size={20}/></span><div><b>Curriculum aligned</b><small>Support shaped to your studies</small></div></article><article><span><UsersRound size={20}/></span><div><b>Personal learning plans</b><small>Goals that fit each learner</small></div></article></div></section>

    <section className="locations-wrap locations-directory" id="locations-list">
      <div className="locations-section-heading"><div><span className="locations-eyebrow locations-eyebrow-light">OUR GLOBAL DIRECTORY</span><h2>Find your local learning hub.</h2><p>Choose a market to see the cities and time-zone arrangements we support.</p></div><div className="locations-directory-count"><strong>{visibleLocations.length.toString().padStart(2,"0")}</strong><span>locations</span></div></div>
      <div className="locations-controls"><div className="locations-region-filters" role="tablist" aria-label="Filter locations by region">{regions.map((item) => <button type="button" key={item} role="tab" aria-selected={item === region} className={item === region ? "active" : ""} onClick={() => setRegion(item)}>{item}{item === "All locations" && <span>{locations.length}</span>}</button>)}</div><label className="locations-search"><Search size={17}/><input aria-label="Search countries or cities" placeholder="Search country or city" value={search} onChange={(event) => setSearch(event.target.value)}/>{search && <button type="button" onClick={() => setSearch("")} aria-label="Clear search">×</button>}</label></div>
      <div className="locations-card-grid">{visibleLocations.map((location, index) => <Link href={`/locations/${location.slug}`} key={location.slug} className={`location-hub-card location-hub-${index % 4}`}><div className="location-hub-top"><span className="location-flag">{locationFlag(location)}</span><span className="location-region-pill">{locationRegion(location)}</span></div><h3>{location.name}</h3><div className="location-hub-cities"><MapPin size={15}/><span>{location.cities.slice(0,4).join(" · ")}{location.cities.length > 4 ? ` +${location.cities.length - 4}` : ""}</span></div><div className="location-hub-meta"><span><Clock3 size={14}/>{location.timezone}</span><span><MapPin size={14}/>{location.cities.length} {location.cities.length === 1 ? "city" : "cities"}</span></div><div className="location-hub-bottom"><span>Explore local support</span><i><ArrowRight size={16}/></i></div></Link>)}</div>
      {!visibleLocations.length && <div className="locations-no-results"><Search size={23}/><b>No locations found</b><span>Try another city, country or region.</span><button onClick={() => { setSearch(""); setRegion("All locations"); }}>View all locations</button></div>}
    </section>

    <section className="locations-final"><div className="locations-wrap locations-final-inner"><div><span className="locations-eyebrow"><Check size={14}/> YOUR SCHEDULE, YOUR GOALS</span><h2>Let’s find a time that works.</h2><p>Share your location and learning goals with our team. We’ll help map out a practical next step.</p></div><Link href="/contact">Talk to an academic counsellor <ArrowRight size={17}/></Link><span className="locations-final-decoration"/></div></section>
  </main>;
}
