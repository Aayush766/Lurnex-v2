import { courses, faqs } from "./constants";
import { siteUrl } from "./seo";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": `${siteUrl}/#organization`,
        name: "lurnex",
        slogan: "Learn. Grow. Excel.",
        url: siteUrl,
        logo: `${siteUrl}/logo.png`,
        description: "Global online learning and personalised academic tutoring.",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+919990054003",
          contactType: "customer support",
          areaServed: "Worldwide",
          availableLanguage: ["English", "Hindi", "French"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
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
          sameAs: siteUrl
        },
        url: `${siteUrl}${course.href}`
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
