export type CourseMenuCategory = {
  title: string;
  links: { label: string; hash: string }[];
};

export type CourseMenuItem = {
  slug: string;
  title: string;
  href: string;
  description: string;
  categories: CourseMenuCategory[];
};

const curriculumCategories = (name: string): CourseMenuCategory[] => [
  { title: "Programme", links: [{ label: `${name} overview`, hash: "#overview" }, { label: "Academic roadmap", hash: "#roadmap" }, { label: "Subjects", hash: "#subjects" }] },
  { title: "Study & practice", links: [{ label: "Study resources", hash: "#resources" }, { label: "Practice and assessments", hash: "#assessments" }, { label: "Downloads", hash: "#downloads" }] },
];

export const courseMenu: CourseMenuItem[] = [
  { slug: "ib", title: "IB", href: "/courses/ib", description: "IB subjects, assessments and Diploma guidance", categories: curriculumCategories("IB") },
  { slug: "igcse", title: "IGCSE", href: "/courses/igcse", description: "IGCSE curriculum, subjects and exam preparation", categories: curriculumCategories("IGCSE") },
  { slug: "sat", title: "SAT", href: "/courses/sat", description: "Digital SAT preparation and score planning", categories: [
    { title: "SAT programme", links: [{ label: "SAT overview", hash: "#overview" }, { label: "Exam dates & planning", hash: "#exam-dates" }, { label: "SAT syllabus", hash: "#syllabus" }] },
    { title: "Practice & resources", links: [{ label: "Study resources", hash: "#resources" }, { label: "Books & mock tests", hash: "#practice" }, { label: "Downloads", hash: "#downloads" }] },
  ] },
  { slug: "ap", title: "AP", href: "/courses/ap", description: "AP courses, exam strategy and college-level learning", categories: curriculumCategories("AP") },
  { slug: "foundation", title: "Foundation", href: "/courses/foundation", description: "Build strong academic and competitive exam foundations", categories: [
    { title: "Programme", links: [{ label: "Foundation overview", hash: "#overview" }, { label: "Subjects", hash: "#subjects" }, { label: "Learning pathways", hash: "#pathways" }] },
    { title: "Study support", links: [{ label: "Study resources", hash: "#resources" }, { label: "Frequently asked questions", hash: "#faqs" }] },
  ] },
  { slug: "jee", title: "JEE", href: "/courses/jee", description: "JEE Main, Advanced and engineering entrance prep", categories: [
    { title: "JEE pathways", links: [{ label: "JEE overview", hash: "#overview" }, { label: "JEE Main", hash: "#jee-main" }, { label: "JEE Advanced", hash: "#jee-advanced" }, { label: "Exam dates", hash: "#exam-dates" }] },
    { title: "Preparation", links: [{ label: "Study resources", hash: "#jee-main" }, { label: "Mock tests & practice", hash: "#practice" }, { label: "Downloads", hash: "#downloads" }] },
  ] },
  { slug: "neet", title: "NEET", href: "/courses/neet", description: "NEET UG preparation and medical entrance support", categories: [
    { title: "NEET preparation", links: [{ label: "NEET overview", hash: "#overview" }, { label: "Exam dates", hash: "#exam-dates" }, { label: "Subject-wise study", hash: "#subjects" }] },
    { title: "Study & practice", links: [{ label: "Study resources", hash: "#resources" }, { label: "Important books", hash: "#books" }, { label: "Colleges & pathways", hash: "#colleges" }] },
  ] },
  { slug: "cbse", title: "CBSE", href: "/courses/cbse", description: "CBSE subjects, board preparation and practice", categories: curriculumCategories("CBSE") },
  { slug: "languages", title: "Languages", href: "/courses/languages", description: "English, Hindi and French language programmes", categories: [
    { title: "Language programmes", links: [{ label: "English communication", hash: "#language-programs" }, { label: "Hindi language & culture", hash: "#language-programs" }, { label: "French fluency", hash: "#language-programs" }] },
    { title: "Get started", links: [{ label: "Explore language programmes", hash: "#language-programs" }] },
  ] },
];
