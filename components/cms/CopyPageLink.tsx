"use client";

import { useState } from "react";
import { Facebook, Link2, Linkedin } from "lucide-react";

export function CopyPageLink() {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  function shareTo(network: "facebook" | "x" | "linkedin") {
    const url = encodeURIComponent(window.location.href);
    const destinations = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      x: `https://twitter.com/intent/tweet?url=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };
    window.open(destinations[network], "_blank", "noopener,noreferrer");
  }

  return <div className="cms-share">
    <span>Share:</span>
    <button type="button" aria-label="Share on Facebook" onClick={() => shareTo("facebook")}><Facebook size={16} /></button>
    <button type="button" aria-label="Share on X" onClick={() => shareTo("x")}><b className="cms-x-mark">X</b></button>
    <button type="button" aria-label="Share on LinkedIn" onClick={() => shareTo("linkedin")}><Linkedin size={17} /></button>
    <button type="button" aria-label="Copy page link" onClick={copyLink}><Link2 size={17} /></button>
    {copied && <span role="status">Link copied</span>}
  </div>;
}
