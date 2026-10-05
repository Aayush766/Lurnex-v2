import type { Location } from "@/lib/locations";

const flags: Record<string, string> = {
  oman: "\u{1F1F4}\u{1F1F2}",
  "saudi-arabia": "\u{1F1F8}\u{1F1E6}",
  uae: "\u{1F1E6}\u{1F1EA}",
  bahrain: "\u{1F1E7}\u{1F1ED}",
  qatar: "\u{1F1F6}\u{1F1E6}",
  kuwait: "\u{1F1F0}\u{1F1FC}",
  india: "\u{1F1EE}\u{1F1F3}",
  singapore: "\u{1F1F8}\u{1F1EC}",
  usa: "\u{1F1FA}\u{1F1F8}",
  uk: "\u{1F1EC}\u{1F1E7}",
};

const regions: Record<string, string> = {
  oman: "Gulf", "saudi-arabia": "Gulf", uae: "Gulf", bahrain: "Gulf", qatar: "Gulf", kuwait: "Gulf",
  india: "South Asia", singapore: "Southeast Asia", usa: "North America", uk: "Europe",
};

export const locationFlag = (location: Pick<Location, "slug">) => flags[location.slug] ?? "\u{1F30D}";
export const locationRegion = (location: Pick<Location, "slug">) => regions[location.slug] ?? "Worldwide";
