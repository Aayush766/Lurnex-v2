const slug = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const contentPaths: Record<string, Record<string, string>> = {
  sat: {
    "preparation tips": "/sat-preparation-tips",
    "sat preparation tips": "/sat-preparation-tips",
    "test strategies": "/sat-preparation-tips",
    "syllabus": "/sat/syllabus",
    "sat syllabus": "/sat/syllabus",
    "study material": "/sat/study-material",
    "sat study material": "/sat/study-material",
    "practice tests": "/sat/practice-sets",
    "sat practice tests": "/sat/practice-sets",
    "practice sets": "/sat/practice-sets",
    "previous papers": "/sat/previous-years",
    "sat previous papers": "/sat/previous-years",
    "previous years": "/sat/previous-years",
    "important books": "/sat/important-books",
    "best books for sat": "/sat/important-books",
  },
  igcse: {
    "syllabus": "/igcse/syllabus",
    "igcse syllabus": "/igcse/syllabus",
    "study material": "/igcse/study-material",
    "igcse study material": "/igcse/study-material",
    "past papers": "/igcse/past-papers",
    "igcse past papers": "/igcse/past-papers",
    "practice tests": "/igcse-practice-test",
    "igcse practice tests": "/igcse-practice-test",
    "subject guides": "/igcse/subject-guides",
    "exam strategies": "/igcse/exam-strategies",
    "exam strategy": "/igcse/exam-strategies",
    "academic roadmap": "/igcse-academic-roadmap",
    "exam preparation tips": "/igcse/exam-strategies",
    "igcse exam preparation tips": "/igcse/exam-strategies",
  },
  ib: {
    "syllabus": "/ib/resources",
    "ib syllabus": "/ib/resources",
    "study material": "/ib-study-material",
    "ib study material": "/ib-study-material",
    "past papers": "/ib-past-paper",
    "ib past papers": "/ib-past-paper",
    "internal assessment": "/ib-internal-assessment",
    "ia guidance": "/ib-internal-assessment",
    "extended essay": "/ib-extented-essay",
    "university guidance": "/ib/university-readiness",
    "university readiness": "/ib/university-readiness",
    "ib subject planning": "/ib-subjet-planning",
    "ib subjects": "/ib-subjet-planning",
    "ib subject groups": "/ib-subjet-planning",
    "ib diploma overview": "/ib-subjet-planning",
    "ia, ee & tok support": "/ib/ia-ee-tok-support",
    "tok & cas": "/ib/ia-ee-tok-support",
    "academic roadmap": "/ib-academic-roadmap",
    "subject planning": "/ib-subjet-planning",
    "ia ee tok support": "/ib/ia-ee-tok-support",
  },
  jee: {
    "preparation tips": "/jee/preparation-tips",
    "preparation strategy": "/jee/preparation-tips",
    "jee preparation strategy": "/jee/preparation-tips",
    "jee preparation tips": "/jee/preparation-tips",
    "syllabus": "/jee/syllabus",
    "jee syllabus": "/jee/syllabus",
    "jee main syllabus": "/jee/syllabus",
    "jee advanced syllabus": "/jee/syllabus",
    "previous year papers": "/jee/previous-year-papers",
    "jee main question papers": "/jee/previous-year-papers",
    "jee advanced question papers": "/jee/previous-year-papers",
    "jee main previous year papers": "/jee/previous-year-papers",
    "previous year questions": "/jee/previous-year-papers",
    "overview": "/jee/overview",
    "jee main overview": "/jee/overview",
    "jee advanced overview": "/jee/overview",
    "cutoff colleges": "/jee/cutoff-colleges",
    "jee cutoff": "/jee/cutoff-colleges",
    "jee main cutoff": "/jee/cutoff-colleges",
    "jee advanced cutoff": "/jee/cutoff-colleges",
    "jee overview": "/jee/overview",
  },
};

export function courseContentHref(course: string, label: string, fallback?: string) {
  const key = label.toLowerCase().replace(/\s+/g, " ").trim();
  return contentPaths[course.toLowerCase()]?.[key] || fallback || `/${course}/${slug(label)}`;
}

// Keep the short public SAT URL while querying the CMS using its configured source path.
export function cmsSourcePath(pathname: string) {
  return pathname.replace(/\/$/, "") === "/sat-preparation-tips" ? "/sat/preparation-tips" : pathname;
}
