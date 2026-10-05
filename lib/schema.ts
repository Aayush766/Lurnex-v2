import { courses, faqs } from "./constants";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": "https://lurnex.me/#organization",
        name: "lurnex",
        slogan: "Learn. Grow. Excel.",
        url: "https://lurnex.me",
        description: "Global online learning and personalised academic tutoring."
      },
      {
        "@type": "WebSite",
        "@id": "https://lurnex.me/#website",
        url: "https://lurnex.me",
        name: "lurnex",
        publisher: { "@id": "https://lurnex.me/#organization" }
      },
      ...courses.map((course) => ({
        "@type": "Course",
        name: course.title,
        description: course.description,
        provider: {
          "@type": "EducationalOrganization",
          name: "lurnex",
          sameAs: "https://lurnex.me"
        },
        url: `https://lurnex.me${course.href}`
      })),
      {
        "@type": "FAQPage",
        mainEntity: faqs.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer }
        }))
      }
    ]
  };
}
