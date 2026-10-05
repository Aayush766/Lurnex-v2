"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowDown, ArrowRight, BookOpen, ChevronRight, Quote, Search, Sparkles, Star } from "lucide-react";
import { testimonials } from "@/lib/constants";
import "./success-stories.css";

const categories = ["All stories", "SAT", "JEE", "IB", "AP", "IGCSE", "Learning Experience"];

export default function Page() {
  const [activeCategory, setActiveCategory] = useState("All stories");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => testimonials.filter((story) => {
    const categoryMatches = activeCategory === "All stories" || story.category === activeCategory;
    const text = `${story.name} ${story.location} ${story.quote} ${story.category}`.toLowerCase();
    return categoryMatches && text.includes(query.trim().toLowerCase());
  }), [activeCategory, query]);
  const featured = testimonials[0];

  return (
    <main className="stories-page">
      <section className="stories-hero">
        <div className="stories-hero-glow" />
        <div className="stories-container stories-hero-inner">
          <div className="stories-hero-copy">
            <Link href="/" className="stories-breadcrumb">Home <ChevronRight size={14}/> Success Stories</Link>
            <span className="stories-eyebrow"><Sparkles size={14}/> LEARNER VOICES</span>
            <h1>Big goals.<br/><span>Real progress.</span></h1>
            <p>Every learner has a different starting point. Explore their experiences across exams, subjects and learning journeys.</p>
            <a href="#stories" className="stories-hero-link">Explore learner stories <ArrowDown size={16}/></a>
            <div className="stories-proof"><div className="stories-avatar-stack">{testimonials.slice(0,4).map((story, i) => <Image key={`${story.name}-${i}`} src={story.avatar} alt="" width={34} height={34} />)}</div><div><strong>{testimonials.length} learner stories</strong><span>Shared across {categories.length - 1} learning paths</span></div></div>
          </div>
          <article className="stories-featured">
            <div className="stories-feature-top"><span><Star size={14} fill="currentColor"/> FEATURED STORY</span><span className="stories-feature-tag">{featured.category}</span></div>
            <div className="stories-feature-quote"><Quote size={29} fill="currentColor"/><p>“{featured.quote}”</p></div>
            <div className="stories-feature-result"><span className="stories-result-number">+350</span><span className="stories-result-label">SAT score improvement<br/><small>as shared by Aisha</small></span></div>
            <div className="stories-feature-person"><Image src={featured.avatar} alt={`${featured.name}`} width={48} height={48}/><div><strong>{featured.name}</strong><span>{featured.location}</span></div><div className="stories-stars" aria-label="5 out of 5 stars">{Array.from({length:5}).map((_, i)=><Star key={i} size={13} fill="currentColor"/>)}</div></div>
          </article>
          <div className="stories-hero-decoration stories-decor-one"><BookOpen size={21}/></div><div className="stories-hero-decoration stories-decor-two"><Star size={17} fill="currentColor"/></div>
        </div>
      </section>

      <section className="stories-container stories-content" id="stories">
        <div className="stories-heading-row"><div><span className="stories-eyebrow">THE LURNEX COMMUNITY</span><h2>Find a story that feels like yours</h2><p>Browse by learning path or search for a learner, location or subject.</p></div><div className="stories-total"><strong>{filtered.length.toString().padStart(2,"0")}</strong><span>stories shown</span></div></div>
        <div className="stories-toolbar"><div className="stories-tabs" role="tablist" aria-label="Filter success stories">{categories.map((category) => { const count = category === "All stories" ? testimonials.length : testimonials.filter((story) => story.category === category).length; return <button type="button" key={category} role="tab" aria-selected={activeCategory === category} className={activeCategory === category ? "active" : ""} onClick={() => setActiveCategory(category)}>{category}<span>{count}</span></button>; })}</div><label className="stories-search"><Search size={17}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search stories" aria-label="Search stories"/>{query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search">×</button>}</label></div>

        {filtered.length ? <div className="stories-grid">{filtered.map((story, index) => <article className={`story-card story-tone-${index % 4}`} key={`${story.name}-${story.category}-${index}`}><div className="story-card-top"><span className="story-category">{story.category}</span><Quote size={24} className="story-quote-icon" fill="currentColor"/></div><div className="story-card-rating" aria-label="5 out of 5 stars">{Array.from({length:5}).map((_, i)=><Star key={i} size={13} fill="currentColor"/>)}</div><blockquote>“{story.quote}”</blockquote><div className="story-card-person"><Image src={story.avatar} alt={`${story.name} avatar`} width={46} height={46}/><div><strong>{story.name}</strong><span>{story.location}</span></div><ChevronRight size={17}/></div></article>)}</div> : <div className="stories-empty"><span><Search size={21}/></span><h3>No stories found</h3><p>Try a different search or choose another category.</p><button onClick={() => { setQuery(""); setActiveCategory("All stories"); }}>Show all stories <ArrowRight size={15}/></button></div>}
      </section>

      <section className="stories-cta-wrap"><div className="stories-container stories-cta"><div><span className="stories-eyebrow"><Sparkles size={14}/> YOUR NEXT CHAPTER</span><h2>Ready to make progress of your own?</h2><p>Tell us what you’re working toward. We’ll help you find the right next step.</p></div><Link href="/contact">Talk to our team <ArrowRight size={17}/></Link><div className="stories-cta-orb"/></div></section>
    </main>
  );
}
